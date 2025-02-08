import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/ui/video-player";
import { Download, Share2, Settings, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VideoDetailsProps {
  video: {
    id: string;
    title: string;
    url: string;
    thumbnail: string;
    duration: string;
    status: string;
    resolution: string;
    size: string;
    created: string;
  };
  onClose: () => void;
}

export default function VideoDetails({ video, onClose }: VideoDetailsProps) {
  return (
    <Card className="bg-black/40 backdrop-blur-xl border-slate-800 p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{video.title}</h2>
          <p className="text-slate-400">Uploaded on {video.created}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      <VideoPlayer
        src={video.url}
        poster={video.thumbnail}
        className="rounded-lg overflow-hidden aspect-video w-full"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-black/20 rounded-lg">
          <p className="text-sm text-slate-400 mb-1">Resolution</p>
          <p className="text-white font-medium">{video.resolution}</p>
        </div>
        <div className="p-4 bg-black/20 rounded-lg">
          <p className="text-sm text-slate-400 mb-1">Size</p>
          <p className="text-white font-medium">{video.size}</p>
        </div>
        <div className="p-4 bg-black/20 rounded-lg">
          <p className="text-sm text-slate-400 mb-1">Duration</p>
          <p className="text-white font-medium">{video.duration}</p>
        </div>
        <div className="p-4 bg-black/20 rounded-lg">
          <p className="text-sm text-slate-400 mb-1">Status</p>
          <p className="text-white font-medium capitalize">{video.status}</p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button className="bg-violet-600 hover:bg-violet-700">
            <Download className="w-4 h-4 mr-2" /> Download
          </Button>
          <Button variant="outline" className="border-slate-700">
            <Share2 className="w-4 h-4 mr-2" /> Share
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-slate-700">
              <Settings className="w-4 h-4 mr-2" /> Settings
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Change Quality</DropdownMenuItem>
            <DropdownMenuItem>Add Watermark</DropdownMenuItem>
            <DropdownMenuItem>Export Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
