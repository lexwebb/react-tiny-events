import {
  createEventManager,
  TypedEvent,
  type EventHandlers,
} from "react-tiny-events";

// Create a static list of events
const events = {
  onOpenModal: new TypedEvent<{ modalId: string }>(),
} as const;

const { provider, useEvent, useEvents, useEventHandler } =
  createEventManager(events);

// Export the event provider and hooks
export const ModalEventProvider = provider;
export const useModalEvents = useEvents;
export const useModalEvent = useEvent;
export const useModalEventHandler = useEventHandler;
export type ModalEventHandlers = EventHandlers<typeof events>;
