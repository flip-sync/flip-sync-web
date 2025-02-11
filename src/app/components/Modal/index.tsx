"use client";

import { useModal } from "../../../hooks/useModal";
import AlertModal from "./AlertModal";
import ConfirmModal from "./ConfirmModal";
import SignupCompleteModal from "./SignupCompleteModal";
import SignupErrorModal from "./SignupErrorModal";

type ModalType = "alert" | "confirm" | "signupComplete" | "signupError";

const MODAL_COMPONENTS = {
  alert: AlertModal,
  confirm: ConfirmModal,
  signupComplete: SignupCompleteModal,
  signupError: SignupErrorModal,
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
