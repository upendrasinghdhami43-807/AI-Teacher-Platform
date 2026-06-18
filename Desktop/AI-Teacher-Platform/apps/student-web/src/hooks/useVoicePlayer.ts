import { useState } from 'react';

export function useVoicePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(342);
  const [volume, setVolume] = useState(80);
  const [showCaptions, setShowCaptions] = useState(true);
  const [speed, setSpeed] = useState(1);

  const togglePlay = () => setIsPlaying(prev => !prev);
  const seek = (time: number) => setCurrentTime(Math.max(0, Math.min(time, duration)));
  const skipForward = () => seek(currentTime + 15);
  const skipBackward = () => seek(currentTime - 15);

  return {
    isPlaying, currentTime, duration, volume, showCaptions, speed,
    togglePlay, seek, skipForward, skipBackward,
    setVolume, setShowCaptions, setSpeed, setDuration,
  };
}
