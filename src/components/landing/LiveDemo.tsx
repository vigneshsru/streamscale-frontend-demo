import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Upload, Play, CheckCircle2, AlertCircle } from "lucide-react";
import { VideoPlayer } from "@/components/ui/video-player";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

interface LiveDemoProps {
  onUpload?: (file: File) => void;
  onProcessingComplete?: () => void;
  isProcessing?: boolean;
  progress?: number;
  processedVideoUrl?: string;
}

const LiveDemo = ({
  onUpload = () => {},
  onProcessingComplete = () => {},
  isProcessing = false,
  progress = 0,
  processedVideoUrl = "https://example.com/sample-processed-video.mp4",
}: LiveDemoProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [hasUploadedFile, setHasUploadedFile] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndUpload(file);
    }
  };

  const validateAndUpload = (file: File) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const maxSize = 1024 * 1024 * 1024; // 1GB
    const validTypes = ["video/mp4", "video/quicktime", "video/x-msvideo"];

    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid video file (MP4, MOV, or AVI)");
      return;
    }

    if (file.size > maxSize) {
      setError("File size must be less than 1GB");
      return;
    }

    setError(null);
    setHasUploadedFile(true);
    onUpload(file);
  };

  return (
    <div className="w-full min-h-[600px] bg-gradient-to-b from-transparent to-black/20 p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
            Try It Now
          </h2>
          <p className="text-lg text-slate-300">
            Upload your video and watch it transform in real-time
          </p>
        </div>

        <Card
          className={`p-8 border-2 border-dashed transition-all duration-300 ${
            isDragActive
              ? "border-violet-500 bg-violet-500/10 scale-[1.02]"
              : "border-slate-700 bg-black/40 backdrop-blur-xl"
          } rounded-xl shadow-2xl`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!hasUploadedFile ? (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-violet-500/10 flex items-center justify-center">
                <Upload className="w-10 h-10 text-violet-400" />
              </div>
              <div className="space-y-4">
                <p className="text-xl font-semibold text-white">
                  Drag and drop your video here
                </p>
                <p className="text-slate-400">or</p>
                <Button
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                  size="lg"
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "video/*";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) validateAndUpload(file);
                    };
                    input.click();
                  }}
                >
                  Select video file
                </Button>
              </div>
              {error && (
                <div className="flex items-center justify-center text-red-400 gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-sm">{error}</p>
                </div>
              )}
              <p className="text-sm text-slate-500">
                Supports MP4, MOV, AVI up to 1GB
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {isProcessing ? (
                    <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center animate-pulse">
                      <Play className="w-6 h-6 text-violet-400" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    </div>
                  )}
                  <div>
                    <p className="text-lg font-semibold text-white">
                      {isProcessing
                        ? "Processing video..."
                        : "Processing complete!"}
                    </p>
                    <p className="text-sm text-slate-400">
                      {isProcessing
                        ? "This might take a few minutes"
                        : "Your video is ready to preview"}
                    </p>
                  </div>
                </div>
                {!isProcessing && (
                  <Button
                    variant="outline"
                    className="border-violet-500/50 text-violet-400 hover:bg-violet-500/10"
                    onClick={() => {
                      setHasUploadedFile(false);
                      setError(null);
                    }}
                  >
                    Process another video
                  </Button>
                )}
              </div>

              <Progress
                value={progress}
                className="w-full h-2"
                indicatorClassName="bg-gradient-to-r from-violet-500 to-fuchsia-500"
              />

              {!isProcessing && processedVideoUrl && (
                <div className="mt-8">
                  <VideoPlayer
                    src={processedVideoUrl}
                    poster="https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3"
                    className="rounded-lg overflow-hidden shadow-2xl aspect-video"
                  />
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default LiveDemo;
