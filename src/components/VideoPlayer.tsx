import { CircleNotch } from "@phosphor-icons/react";
import ReactPlayer from "react-player";

import { useCurrentLesson, useStore } from "../zustand-store";

export function VideoPlayer() {
  const { currentLesson } = useCurrentLesson();

  const { isLoading, next } = useStore((store) => {
    return {
      isLoading: store.isLoading,
      next: store.next,
    };
  });

  function handlePlayNext() {
    next();
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex h-full items-center justify-center ">
          <CircleNotch className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width="100%"
          height="100%"
          onEnded={handlePlayNext}
          playing
          controls
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
        />
      )}
    </div>
  );
}
