import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { LogOut, Video, Settings } from "lucide-react";
import VideoList from "./VideoList";

export default function DashboardLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0a0f] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <nav className="border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Video className="w-8 h-8 text-fuchsia-500" />
              <span className="ml-2 text-xl font-bold text-white">
                VideoProcessor
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-white/70">{user?.email}</span>
              <Button variant="ghost" size="icon" onClick={() => logout()}>
                <LogOut className="w-5 h-5 text-white/70" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <VideoList />
      </main>
    </div>
  );
}
