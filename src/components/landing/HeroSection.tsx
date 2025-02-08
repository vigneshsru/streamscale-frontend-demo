import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { VideoPlayer } from "@/components/ui/video-player";
import { Play, Pause, ChevronRight, ArrowRight } from "lucide-react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
}

const HeroSection = ({
  title = "Transform Your Videos with AI-Powered Processing",
  subtitle = "Professional-grade video transcoding with support for all major formats and codecs",
}: HeroSectionProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [comparison, setComparison] = useState(50);
  const originalVideoRef = useRef<HTMLVideoElement>(null);
  const processedVideoRef = useRef<HTMLVideoElement>(null);

  // Example video URLs - replace with actual demo videos
  const demoVideos = {
    original:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    processed:
      "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  };

  useEffect(() => {
    if (originalVideoRef.current && processedVideoRef.current) {
      if (isPlaying) {
        originalVideoRef.current.play();
        processedVideoRef.current.play();
      } else {
        originalVideoRef.current.pause();
        processedVideoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    if (originalVideoRef.current && processedVideoRef.current) {
      if (
        Math.abs(
          originalVideoRef.current.currentTime -
            processedVideoRef.current.currentTime,
        ) > 0.1
      ) {
        processedVideoRef.current.currentTime =
          originalVideoRef.current.currentTime;
      }
    }
  };

  return (
    <div className="relative w-full min-h-[800px] bg-transparent text-white overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute w-96 h-96 bg-violet-500 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-fuchsia-500 rounded-full blur-3xl top-40 right-20 animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
            {title}
          </h1>
          <p className="text-xl text-gray-300 mb-8">{subtitle}</p>
          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              className="bg-violet-600 hover:bg-violet-700"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <>
                  <Pause className="mr-2 h-4 w-4" /> Pause Demo
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" /> Watch Demo
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-violet-500/50 text-violet-400 hover:bg-violet-500/10"
            >
              Try it Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Video Comparison Demo */}
        <Card className="max-w-6xl mx-auto bg-black/40 backdrop-blur-xl border-slate-800/50">
          <div className="p-6 space-y-6">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
              <div className="absolute inset-0">
                <video
                  ref={originalVideoRef}
                  src={demoVideos.original}
                  className="w-full h-full object-cover"
                  onTimeUpdate={handleTimeUpdate}
                  loop
                  muted
                />
              </div>
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - comparison}% 0 0)` }}
              >
                <video
                  ref={processedVideoRef}
                  src={demoVideos.processed}
                  className="w-full h-full object-cover"
                  loop
                  muted
                />
                <div className="absolute inset-y-0 right-0 w-1 bg-white/80"></div>
              </div>

              {/* Labels */}
              <div className="absolute bottom-4 left-4 bg-black/60 px-3 py-1 rounded-full text-sm">
                Original Video
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 px-3 py-1 rounded-full text-sm">
                Processed Video
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Original</span>
                <span>Processed</span>
              </div>
              <Slider
                value={[comparison]}
                onValueChange={(value) => setComparison(value[0])}
                min={0}
                max={100}
                step={1}
                className="cursor-pointer"
              />
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 text-center">
          <div className="p-6 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
              4K
            </div>
            <div className="text-gray-400 mt-2">Resolution Support</div>
          </div>
          <div className="p-6 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
              60FPS
            </div>
            <div className="text-gray-400 mt-2">Smooth Playback</div>
          </div>
          <div className="p-6 rounded-lg bg-black/20 backdrop-blur-sm border border-white/5">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
              99.9%
            </div>
            <div className="text-gray-400 mt-2">Uptime</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
