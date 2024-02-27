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
