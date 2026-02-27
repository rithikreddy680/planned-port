"use client";

import { useRef, useEffect } from "react";

const PLAYBACK_RATE = 3;

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const setSpeed = () => {
      video.playbackRate = PLAYBACK_RATE;
    };
    if (video.readyState >= 2) {
      setSpeed();
    } else {
      video.addEventListener("loadedmetadata", setSpeed);
      video.addEventListener("canplay", setSpeed);
      return () => {
        video.removeEventListener("loadedmetadata", setSpeed);
        video.removeEventListener("canplay", setSpeed);
      };
    }
  }, []);

  return (
    <video
      ref={videoRef}
      className="pointer-events-none fixed inset-0 -z-50 h-full w-full object-cover animate-bg-breathe"
      src="/cc3.mp4"
      autoPlay
      muted
      loop
      playsInline
    />
  );
}
