
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";

interface GenerationStatusProps {
  isGenerating: boolean;
  progress: number;
  stage: string;
}

const GenerationStatus: React.FC<GenerationStatusProps> = ({ 
  isGenerating, 
  progress, 
  stage 
}) => {
  if (!isGenerating) {
    return null;
  }

  const getStatusIcon = () => {
    if (progress < 30) return <Clock className="h-4 w-4 text-muted-foreground animate-pulse" />;
    if (progress < 90) return <AlertCircle className="h-4 w-4 text-accent animate-pulse" />;
    return <CheckCircle2 className="h-4 w-4 text-primary" />;
  };

  const getStageDescription = (stage: string) => {
    switch(stage) {
      case "Analyzing scenario...":
        return "Processing text and determining key visual elements";
      case "Generating scenes...":
        return "Creating storyboard and individual frames";
      case "Rendering video...":
        return "Converting frames to motion video";
      case "Applying effects...":
        return "Adding transitions, text overlays, and audio";
      case "Finalizing...":
        return "Compressing and preparing final output";
      default:
        return "Processing your request";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Generating Video</span>
          <Badge variant="outline" className="flex items-center gap-1">
            {getStatusIcon()}
            <span>{progress < 100 ? "Processing" : "Complete"}</span>
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="h-2" />
        
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{stage}</span>
          <span>{progress}%</span>
        </div>
        
        <div className="text-xs text-muted-foreground">
          {getStageDescription(stage)}
        </div>

        {progress > 50 && progress < 100 && (
          <div className="mt-2 text-xs bg-secondary/50 p-2 rounded">
            <p className="font-medium">Estimated time remaining: {Math.ceil((100 - progress) / 10)} min</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GenerationStatus;
