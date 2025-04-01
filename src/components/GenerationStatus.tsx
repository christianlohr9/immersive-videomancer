
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Generating Video</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{stage}</span>
          <span>{progress}%</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default GenerationStatus;
