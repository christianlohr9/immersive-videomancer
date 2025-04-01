
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface VideoHistoryItem {
  id: string;
  title: string;
  style: string;
  videoUrl: string;
  timestamp: string;
  thumbnailUrl?: string;
}

interface VideoHistoryProps {
  videos: VideoHistoryItem[];
  onSelectVideo: (video: VideoHistoryItem) => void;
  selectedVideoId: string | null;
}

const VideoHistory: React.FC<VideoHistoryProps> = ({ videos, onSelectVideo, selectedVideoId }) => {
  if (videos.length === 0) {
    return null;
  }

  const styleIcons: Record<string, string> = {
    cinematic: "🎬",
    clips: "📹",
    timelapse: "⏱️",
    explainer: "📊"
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          <span>Video History</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-2">
            {videos.map((video) => (
              <div
                key={video.id}
                className={`p-2 rounded-md cursor-pointer transition-colors flex gap-3 ${
                  selectedVideoId === video.id
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-secondary"
                }`}
                onClick={() => onSelectVideo(video)}
              >
                <div className="flex-shrink-0 relative aspect-video w-20 rounded overflow-hidden border border-border">
                  {video.thumbnailUrl ? (
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted text-2xl">
                      {styleIcons[video.style] || "🎥"}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{video.title}</p>
                  <p className="text-xs opacity-70">{video.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default VideoHistory;
