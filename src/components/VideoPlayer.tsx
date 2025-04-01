
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Video, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  videoUrl: string | null;
  title: string;
  style: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, title, style }) => {
  if (!videoUrl) {
    return null;
  }

  const styleNames: Record<string, string> = {
    cinematic: "Cinematic Trailer",
    clips: "Clips",
    timelapse: "Time-Lapse",
    explainer: "Explainer Video"
  };

  const handleDownload = () => {
    // In a real app, this would trigger a download of the video file
    window.open(videoUrl, '_blank');
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-bold truncate">{title}</CardTitle>
        <span className="bg-secondary px-2 py-1 rounded-md text-xs">
          {styleNames[style] || style}
        </span>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative aspect-video rounded-md overflow-hidden border border-border">
          <video 
            src={videoUrl} 
            className="absolute inset-0 w-full h-full object-cover"
            controls
          />
        </div>
        <Button 
          variant="outline" 
          className="w-full flex items-center gap-2"
          onClick={handleDownload}
        >
          <Download className="h-4 w-4" />
          <span>Download Video</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
