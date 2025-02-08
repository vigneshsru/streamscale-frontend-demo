import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VideoPlayer } from "@/components/ui/video-player";
import {
  Play,
  Upload,
  MoreVertical,
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  Share2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Video {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  duration: string;
  status: "processed" | "processing" | "failed";
  resolution: string;
  size: string;
  created: string;
}

const mockVideos: Video[] = [
  {
    id: "1",
    title: "Product Demo Video",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3",
    duration: "2:30",
    status: "processed",
    resolution: "1920x1080",
    size: "45.2 MB",
    created: "Apr 15, 2024",
  },
  {
    id: "2",
    title: "Marketing Campaign",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3",
    duration: "5:45",
    status: "processing",
    resolution: "3840x2160",
    size: "128.7 MB",
    created: "Apr 14, 2024",
  },
  {
    id: "3",
    title: "Tutorial Series Intro",
    url: "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    thumbnail:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?ixlib=rb-4.0.3",
    duration: "1:15",
    status: "failed",
    resolution: "1280x720",
    size: "18.3 MB",
    created: "Apr 13, 2024",
  },
];

export default function VideoList() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredVideos = mockVideos.filter((video) => {
    const matchesSearch = video.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || video.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processed":
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case "processing":
        return <Clock className="w-4 h-4 text-yellow-400 animate-spin" />;
      case "failed":
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const handleVideoAction = (action: string, video: Video) => {
    switch (action) {
      case "download":
        window.open(video.url, "_blank");
        break;
      case "share":
        navigator.clipboard.writeText(video.url);
        // You could add a toast notification here
        break;
      case "delete":
        // Add delete functionality
        break;
    }
  };

  return (
    <div className="space-y-6">
      {selectedVideo ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {selectedVideo.title}
              </h2>
              <p className="text-slate-400">
                Uploaded on {selectedVideo.created}
              </p>
            </div>
            <Button variant="ghost" onClick={() => setSelectedVideo(null)}>
              Back to List
            </Button>
          </div>

          <Card className="bg-black/40 backdrop-blur-xl border-slate-800 overflow-hidden">
            <VideoPlayer
              src={selectedVideo.url}
              poster={selectedVideo.thumbnail}
              className="aspect-video"
            />
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-black/20 backdrop-blur-sm border-slate-800">
              <p className="text-sm text-slate-400 mb-1">Resolution</p>
              <p className="text-white font-medium">
                {selectedVideo.resolution}
              </p>
            </Card>
            <Card className="p-4 bg-black/20 backdrop-blur-sm border-slate-800">
              <p className="text-sm text-slate-400 mb-1">Size</p>
              <p className="text-white font-medium">{selectedVideo.size}</p>
            </Card>
            <Card className="p-4 bg-black/20 backdrop-blur-sm border-slate-800">
              <p className="text-sm text-slate-400 mb-1">Duration</p>
              <p className="text-white font-medium">{selectedVideo.duration}</p>
            </Card>
            <Card className="p-4 bg-black/20 backdrop-blur-sm border-slate-800">
              <p className="text-sm text-slate-400 mb-1">Status</p>
              <div className="flex items-center gap-2">
                {getStatusIcon(selectedVideo.status)}
                <p className="text-white font-medium capitalize">
                  {selectedVideo.status}
                </p>
              </div>
            </Card>
          </div>

          <div className="flex gap-4">
            <Button
              className="bg-violet-600 hover:bg-violet-700"
              onClick={() => handleVideoAction("download", selectedVideo)}
            >
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
            <Button
              variant="outline"
              className="border-slate-700"
              onClick={() => handleVideoAction("share", selectedVideo)}
            >
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-black/20 border-slate-800 text-white w-full"
                />
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <div className="flex items-center gap-2 flex-1 md:flex-none">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-black/20 border-slate-800 text-white rounded-md px-3 py-2 flex-1"
                >
                  <option value="all">All Status</option>
                  <option value="processed">Processed</option>
                  <option value="processing">Processing</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
              <Button className="bg-violet-600 hover:bg-violet-700 flex-1 md:flex-none">
                <Upload className="w-4 h-4 mr-2" />
                Upload New
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card
                key={video.id}
                className="bg-black/20 backdrop-blur-xl border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/80 transition-all">
                    <div className="absolute bottom-2 left-2 flex items-center space-x-2 text-white">
                      <Play className="w-4 h-4" />
                      <span className="text-sm">{video.duration}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white mb-1 line-clamp-1">
                        {video.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(video.status)}
                        <span
                          className={`text-sm capitalize ${
                            video.status === "processed"
                              ? "text-green-400"
                              : video.status === "processing"
                                ? "text-yellow-400"
                                : "text-red-400"
                          }`}
                        >
                          {video.status}
                        </span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white/70 hover:text-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => handleVideoAction("download", video)}
                        >
                          <Download className="w-4 h-4 mr-2" /> Download
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleVideoAction("share", video)}
                        >
                          <Share2 className="w-4 h-4 mr-2" /> Share
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
