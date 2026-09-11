"use client";

import React, { useEffect, useState } from "react";

interface VdoPlayerProps {
  videoId?: string | null;
  otp?: string;
  playbackInfo?: string;
  title?: string;
}

export function VdoPlayer({ videoId, otp, playbackInfo, title }: VdoPlayerProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (otp && playbackInfo) {
      setLoading(false);
    }
  }, [otp, playbackInfo]);

  if (!otp || !playbackInfo) {
    return (
      <div className="w-full aspect-video bg-zinc-900 rounded-xl flex flex-col items-center justify-center text-zinc-400 p-6 text-center border border-zinc-800">
        <p className="text-sm font-medium">
          {videoId ? "Loading DRM Protected Video..." : "No video selected"}
        </p>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden shadow-2xl bg-black border border-zinc-800 relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-white bg-black/60 z-10">
          Loading secure player...
        </div>
      )}
      <iframe
        src={`https://player.vdocipher.com/v2/?otp=${otp}&playbackInfo=${playbackInfo}`}
        className="w-full h-full border-0"
        allow="encrypted-media"
        allowFullScreen
        title={title || "Video Player"}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
}
