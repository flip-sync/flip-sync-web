"use client";

import { useModal } from "@/hooks/useModal";
import CreateCircleButton from "@/app/components/createCircleButton";

export default function RoomsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { openModal } = useModal();

  return (
    <div className="relative min-h-screen">
      {children}
      <CreateCircleButton onClick={() => openModal("createRoom")} />
    </div>
  );
}
