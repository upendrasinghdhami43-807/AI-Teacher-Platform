import { useLessonStore } from '@/store/lessonStore';

export function useWhiteboard() {
  const { currentLesson, currentFrame, isPlaying, setPlaying, nextFrame, prevFrame, setFrame } = useLessonStore();
  const totalFrames = currentLesson?.frames.length ?? 0;
  const frame = currentLesson?.frames[currentFrame];
  const progress = totalFrames > 0 ? ((currentFrame + 1) / totalFrames) * 100 : 0;

  return { currentLesson, currentFrame, totalFrames, frame, isPlaying, progress, setPlaying, nextFrame, prevFrame, setFrame };
}
