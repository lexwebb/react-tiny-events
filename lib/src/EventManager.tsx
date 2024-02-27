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

/**
 * Create a new event manager, this will be the base for your event system. It will create a context and a provider for the events, as well as hooks to access the events and their handlers.
 * @param events A const typed static list of events
 * @returns An object with the context, provider and hooks to access the events and their handlers
 */
export const createEventManager = <E extends BaseEventType>(events: E) => {
  const context = createContext(events);
  const provider = ({ children }: PropsWithChildren) => (
    <context.Provider value={events}>{children}</context.Provider>
  );

  /**
   * Can be used to access all the events
   * @returns All the events
   */
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

  /**
   * Can be used to access a specific event
   * @param event The event to access
   * @returns The event
   */
  const useEvent = <T extends keyof E>(event: T): E[T] => {
    const events = useEvents();
    return events[event];
  };

  /**
   * Can be used to subscribe to a specific event
   * @param event The event to subscribe to
   * @param handler The handler to subscribe
   */
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
