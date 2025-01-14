"use client";

import { useModal } from "../../hooks/useModal";
import AlertModal from "./AlertModal";
import ConfirmModal from "./ConfirmModal";
import SignupCompleteModal from "./SignupCompleteModal";

type ModalType = "alert" | "confirm" | "signupComplete";

const MODAL_COMPONENTS: Record<ModalType, React.ComponentType<any>> = {
  alert: AlertModal,
  confirm: ConfirmModal,
  signupComplete: SignupCompleteModal,
};

export default function Modal() {
  const { isOpen, modalType, modalProps, closeModal } = useModal();
  if (!isOpen || !modalType) return null;

  const ModalComponent = MODAL_COMPONENTS[modalType as ModalType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/25" onClick={closeModal} />
      <div className="relative z-50 bg-white rounded-lg">
        <ModalComponent {...modalProps} onClose={closeModal} />
      </div>
    </div>
  );
}
