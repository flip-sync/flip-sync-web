"use client";

import { Suspense, useEffect, useRef, useCallback } from "react";
import RoomHeader from "./components/RoomHeader";
import RoomListWrapper from "./components/RoomListWrapper";
import CreateCircleButton from "../../components/CreateCircleButton";
import { useModal } from "../../../hooks/useModal";
import { useCreateRoom, useInfiniteGroupList } from "../../../hooks/group";

export default function Rooms() {
  const { openModal } = useModal();
  const observerRef = useRef<IntersectionObserver>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteGroupList();

  const { createRoom } = useCreateRoom();

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries;
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const element = loadMoreRef.current;
    if (!element) return;

    observerRef.current = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });

    observerRef.current.observe(element);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [handleObserver]);

  const handleCreateRoom = () => {
    openModal("createRoom", {
      onSubmit: (name: string) => {
        createRoom.mutate({ name });
      },
    });
  };

  const allRooms = data?.pages.flatMap((page) => page) || [];

  return (
    <div className="space-y-4">
      <RoomHeader />
      <Suspense fallback={<div>Loading...</div>}>
        {status === "error" && <div>Error: {error?.message}</div>}
        <RoomListWrapper rooms={allRooms} />
        <div ref={loadMoreRef} className="h-4" />
        {isFetchingNextPage && (
          <div className="text-center py-4">Loading more...</div>
        )}
      </Suspense>
      <CreateCircleButton onClick={handleCreateRoom} />
    </div>
  );
}
