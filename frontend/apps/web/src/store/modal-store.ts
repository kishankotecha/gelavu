"use client";

import { useState } from "react";

export interface ModalState {
  isOpen: boolean;
  type: string | null;
  data?: unknown;
}

export function useModalStore() {
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    type: null,
    data: undefined,
  });

  const openModal = (type: string, data?: unknown) => {
    setModal({ isOpen: true, type, data });
  };

  const closeModal = () => {
    setModal({ isOpen: false, type: null, data: undefined });
  };

  return { modal, openModal, closeModal };
}
