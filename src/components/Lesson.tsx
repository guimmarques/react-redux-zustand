import { PlayCircle, Video } from "@phosphor-icons/react";

interface LessonProps {
  title: string;
  duration: string;
  isCurrent?: boolean;
  onPlay: () => void;
}

export function Lesson(props: LessonProps) {
  const { title, duration, onPlay, isCurrent = false } = props;

  return (
    <button
      onClick={onPlay}
      className="flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-400 data-[active=false]:hover:text-zinc-100"
      data-active={isCurrent}
    >
      {isCurrent ? (
        <PlayCircle className="w-5 h-5 text-emerald-400" />
      ) : (
        <Video className="w-5 h-5 text-zinc-500" />
      )}
      <span>{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">
        {duration}
      </span>
    </button>
  );
}
