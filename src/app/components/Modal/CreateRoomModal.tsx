import React, { useState } from "react";

interface CreateRoomModalProps {
  onClose: () => void;
  onSubmit: (name: string, description: string) => void;
}

export default function CreateRoomModal({
  onClose,
  onSubmit,
}: CreateRoomModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    onSubmit(name, description);
  };

  return (
    <div className="flex flex-col space-y-4 items-center pt-[40px] pb-[24px] px-[24px]">
      <div className="w-[322px] flex flex-col items-center">
        <h2 className="font-bold text-[24px] leading-[30px] mb-[24px]">
          새로운 공유방 만들기
        </h2>
        <input
          type="text"
          placeholder="공유방 이름"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-[16px]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="공유방 설명"
          className="w-full h-[100px] px-4 py-2 border border-gray-300 rounded-lg mb-[24px] resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex gap-2 w-full">
          <button
            onClick={onClose}
            className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2 bg-primary text-white rounded-lg"
          >
            만들기
          </button>
        </div>
      </div>
    </div>
  );
}
