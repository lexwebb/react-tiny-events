import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
} from "react";

import { type TypedEvent } from "./TypedEvent";

type BaseEventType = Record<string, TypedEvent<any>>;

type ExtractEventArgs<Type> = Type extends TypedEvent<infer X> ? X : never;

export type EventHandlers<E extends BaseEventType> = {
  [key in keyof E]: (args: ExtractEventArgs<E[key]>) => void;
};

export const createEventManager = <E extends BaseEventType>(events: E) => {
  const context = createContext(events);
  const provider = ({ children }: PropsWithChildren) => (
    <context.Provider value={events}>{children}</context.Provider>
  );
  const useEvents = () => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!useContext(context)) {
      throw new Error(
        `useEvents must be used within an ${
          // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
          context.displayName ?? "EventProvider"
        }`,
      );
    }
    return useContext(context);
  };

  const useEvent = <T extends keyof E>(event: T): E[T] => {
    const events = useEvents();
    return events[event];
  };

  const useEventHandler = <T extends keyof E>(
    event: T,
    handler: EventHandlers<E>[T],
  ) => {
    const events = useEvents();

    useEffect(() => {
      events[event]?.on(handler);
      return () => {
        events[event]?.off(handler);
      };
    }, [event, handler, events]);
  };

  return {
    context,
    provider,
    useEvents,
    useEvent,
    useEventHandler,
  };
};
