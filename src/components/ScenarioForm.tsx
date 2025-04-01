
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileVideo, Clock, Video, Image } from "lucide-react";
import { toast } from "sonner";

interface ScenarioFormProps {
  onSubmit: (scenario: string, style: string) => void;
  isGenerating: boolean;
}

const videoStyles = [
  { id: "cinematic", name: "Cinematic Trailer", icon: <FileVideo className="h-4 w-4" /> },
  { id: "clips", name: "Clips", icon: <Video className="h-4 w-4" /> },
  { id: "timelapse", name: "Time-Lapse", icon: <Clock className="h-4 w-4" /> },
  { id: "explainer", name: "Explainer Video", icon: <Image className="h-4 w-4" /> }
];

const ScenarioForm: React.FC<ScenarioFormProps> = ({ onSubmit, isGenerating }) => {
  const [scenario, setScenario] = useState('');
  const [style, setStyle] = useState('cinematic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (scenario.trim().length < 10) {
      toast.error("Scenario description must be at least 10 characters long");
      return;
    }
    
    onSubmit(scenario, style);
  };

  const selectedStyle = videoStyles.find(s => s.id === style);

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {selectedStyle?.icon}
            <span>Mission Scenario Generator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Video Style</label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Select a video style" />
              </SelectTrigger>
              <SelectContent>
                {videoStyles.map((style) => (
                  <SelectItem key={style.id} value={style.id}>
                    <div className="flex items-center gap-2">
                      {style.icon}
                      <span>{style.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="scenario" className="text-sm font-medium">Scenario Description</label>
            <Textarea
              id="scenario"
              placeholder="Describe your wargaming scenario in detail..."
              className="min-h-[150px] resize-none"
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Video'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ScenarioForm;
