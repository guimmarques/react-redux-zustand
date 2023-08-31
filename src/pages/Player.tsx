import { ChatCircle } from "@phosphor-icons/react";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { Module } from "../components/Module";
import { VideoPlayer } from "../components/VideoPlayer";
import { useCurrentLesson, useStore } from "../zustand-store";

export function Player() {
  const { course, load, isLoading } = useStore((store) => {
    return {
      course: store.course,
      load: store.load,
      isLoading: store.isLoading,
    };
  });

  const { currentLesson } = useCurrentLesson();

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`;
    }
  }, [currentLesson]);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <ChatCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800  bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            {" "}
            <VideoPlayer />{" "}
          </div>

          <aside className="w-80 absolute top-0 bottom-0 right-0 border-l border-zinc-800 bg-zinc-900 overflow-y-scroll divide-y-2 divide-zinc-900 scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {isLoading && (
              <div className="flex w-full items-center gap-3 bg-zinc-800 p-4">
                <div className="animate-pulse flex h-10 w-10 rounded-full items-center justify-center bg-zinc-500 text-xl"></div>

                <div className="flex-1 space-y-2 py-1 animate-pulse">
                  <div className="h-5 bg-zinc-500 rounded"></div>
                  <div className="h-2 bg-zinc-500 rounded"></div>
                </div>
              </div>
            )}

            {course?.modules &&
              course?.modules.map((module, moduleIndex) => {
                return (
                  <Module
                    key={module.id}
                    moduleIndex={moduleIndex}
                    title={module.title}
                    amountOfLessons={module.lessons.length}
                  />
                );
              })}
          </aside>
        </main>
      </div>
    </div>
  );
}
