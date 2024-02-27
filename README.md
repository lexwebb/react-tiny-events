# React Tiny Events

## Description

This tiny package is a simple event emitter for React. It is a simple and lightweight alternative to the more complex event emitters available. It is designed to be used in a React environment, but it can be used in any JavaScript environment.

## Installation

```bash
#- npm
npm install react-tiny-package
#- yarn
yarn add react-tiny-package
#- pnpm
pnpm add react-tiny-package
```

## Usage
Here's a basic example of how to use this package, where an event can be created to open a modal.

### ModalEventManager.ts
Here, we create a file to manage the events related to the modal. We create a static list of events, and then use the `createEventManager` function to create a provider and hooks for the events. We then export the provider and hooks, as well as the type of event handlers that can be used with the events.

```ts
// ./example/ModalEventManager.ts

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

```

### App.tsx
Here, we create a simple app that uses the `ModalEventProvider` to manage the modal events. The `ModalEventProvider` is used to wrap the app content. We then create a modal component that uses the `useModalEventHandler` hook to listen for the `onOpenModal` event. We also create a button component that uses the `useModalEvent` hook to emit the `onOpenModal` event.
```tsx
// ./example/App.tsx

import React from "react";
import {
  ModalEventProvider,
  useModalEvent,
  useModalEventHandler,
} from "./ModalEventManager";

export default function App() {
  return (
    <ModalEventProvider>
      <MyModalComponent />
      <MyButtonComponent />
      ...appContent
    </ModalEventProvider>
  );
}

function MyModalComponent() {
  const [modalId, setModalId] = React.useState("");

  // Subscribe to the onOpenModal event
  useModalEventHandler("onOpenModal", (event) => {
    setModalId(event.modalId);
  });

  return <div>...modalContent</div>;
}

function MyButtonComponent() {
  const openModal = useModalEvent("onOpenModal");

  return (
    <button onClick={() => openModal.emit({ modalId: "my-modal" })}>
      Open Modal
    </button>
  );
}

```

## API
createEventManager(events: Record<string, TypedEvent<any>>): EventManager

# License
This package is licensed under the MIT license.
