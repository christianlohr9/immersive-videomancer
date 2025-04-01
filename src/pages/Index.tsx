import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import ScenarioForm from "@/components/ScenarioForm";
import VideoPlayer from "@/components/VideoPlayer";
import VideoHistory, { VideoHistoryItem } from "@/components/VideoHistory";
import GenerationStatus from "@/components/GenerationStatus";
import { FileVideo, ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const SAMPLE_VIDEOS = [
  "https://mazwai.com/videvo_files/video/free/2015-09/small_watermarked/MH19_5_original_x264.webm",
  "https://mazwai.com/videvo_files/video/free/2019-01/small_watermarked/190111_07_BuildingsTraffic_1080p_preview.webm",
  "https://mazwai.com/videvo_files/video/free/2019-01/small_watermarked/190111_01_CannonBeach_1080p_preview.webm"
];

const Index = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("");
  const [selectedVideo, setSelectedVideo] = useState<VideoHistoryItem | null>(null);
  const [videos, setVideos] = useState<VideoHistoryItem[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleGenerateVideo = (scenario: string, style: string) => {
    setIsGenerating(true);
    setProgress(0);
    setStage("Analyzing scenario...");
    
    const intervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(intervalId);
          completeGeneration(scenario, style);
          return 100;
        }
        
        if (prev === 10) setStage("Generating scenes...");
        if (prev === 40) setStage("Rendering video...");
        if (prev === 70) setStage("Applying effects...");
        if (prev === 90) setStage("Finalizing...");
        
        return prev + 5;
      });
    }, 500);
  };

  const completeGeneration = (scenario: string, style: string) => {
    const randomVideoUrl = SAMPLE_VIDEOS[Math.floor(Math.random() * SAMPLE_VIDEOS.length)];
    
    const newVideo: VideoHistoryItem = {
      id: Date.now().toString(),
      title: scenario.substring(0, 30) + (scenario.length > 30 ? "..." : ""),
      style,
      videoUrl: randomVideoUrl,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    setVideos((prev) => [newVideo, ...prev]);
    setSelectedVideo(newVideo);
    setIsGenerating(false);
    toast.success("Video generated successfully!");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background military-pattern">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileVideo className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">VideoMancer</h1>
          </div>
          <div className="text-xs bg-secondary px-2 py-1 rounded">
            NATO HACKATHON 2025
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row gap-6 relative">
          <Button 
            variant="outline" 
            size="icon"
            className="absolute top-0 right-0 lg:hidden z-10"
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </Button>

          <div className="lg:flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold mb-4">Generate New Video</h2>
                <ScenarioForm 
                  onSubmit={handleGenerateVideo} 
                  isGenerating={isGenerating} 
                />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Generation Status</h2>
                {isGenerating ? (
                  <GenerationStatus 
                    isGenerating={isGenerating} 
                    progress={progress} 
                    stage={stage} 
                  />
                ) : selectedVideo ? (
                  <VideoPlayer 
                    videoUrl={selectedVideo.videoUrl}
                    title={selectedVideo.title}
                    style={selectedVideo.style}
                  />
                ) : (
                  <Card className="w-full flex items-center justify-center p-6 h-[300px]">
                    <p className="text-muted-foreground text-center">
                      No video selected. Generate a new video or select one from history.
                    </p>
                  </Card>
                )}
              </div>
            </div>

            {videos.length > 0 && (
              <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">Recent Generations</h2>
                <div className="video-grid">
                  {videos.slice(0, 4).map((video) => (
                    <Card 
                      key={video.id} 
                      className={`cursor-pointer hover:border-primary transition-colors ${
                        selectedVideo?.id === video.id ? "border-primary glow-effect" : ""
                      }`}
                      onClick={() => setSelectedVideo(video)}
                    >
                      <div className="relative aspect-video rounded-t-md overflow-hidden">
                        <video 
                          src={video.videoUrl} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-3">
                        <h3 className="font-medium truncate">{video.title}</h3>
                        <p className="text-xs text-muted-foreground">{video.timestamp}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {sidebarOpen && (
            <div className="lg:w-80 space-y-6">
              <h2 className="text-xl font-bold mb-4">Video History</h2>
              {videos.length > 0 ? (
                <VideoHistory 
                  videos={videos} 
                  onSelectVideo={setSelectedVideo}
                  selectedVideoId={selectedVideo?.id || null}
                />
              ) : (
                <Card className="p-6 flex flex-col items-center justify-center h-[200px]">
                  <p className="text-muted-foreground text-center mb-4">
                    No videos generated yet
                  </p>
                  <p className="text-xs text-center">
                    Create your first wargaming video by filling out the scenario form
                  </p>
                </Card>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-border mt-10">
        <div className="container mx-auto p-4 text-sm text-muted-foreground text-center">
          VideoMancer • Immersive Wargaming Video Generator • AI Challenge 2025
        </div>
      </footer>
    </div>
  );
};

export default Index;
