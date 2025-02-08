import React from "react";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FileVideo2,
  Code2,
  Clapperboard,
  Waves,
  Zap,
  Share2,
} from "lucide-react";

interface FeatureGridProps {
  features?: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
    tooltip?: string;
  }>;
}

const defaultFeatures = [
  {
    icon: <FileVideo2 className="w-8 h-8" />,
    title: "Multiple Formats",
    description: "Support for MP4, MOV, AVI, MKV and more",
    tooltip: "Convert between any popular video format",
  },
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Advanced Codecs",
    description: "H.264, HEVC, VP9 encoding support",
    tooltip: "Industry standard codec support",
  },
  {
    icon: <Clapperboard className="w-8 h-8" />,
    title: "Streaming Ready",
    description: "HLS and DASH streaming protocols",
    tooltip: "Optimized for streaming platforms",
  },
  {
    icon: <Waves className="w-8 h-8" />,
    title: "Quality Control",
    description: "Adjustable bitrate and resolution",
    tooltip: "Fine-tune your video quality",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Fast Processing",
    description: "GPU-accelerated encoding",
    tooltip: "Lightning fast video processing",
  },
  {
    icon: <Share2 className="w-8 h-8" />,
    title: "Easy Integration",
    description: "RESTful API and SDKs available",
    tooltip: "Seamless integration with your stack",
  },
];

const FeatureGrid = ({ features = defaultFeatures }: FeatureGridProps) => {
  return (
    <div className="w-full min-h-[600px] bg-transparent p-8 md:p-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          Powerful Features for Video Processing
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card className="p-6 bg-slate-900 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 text-primary">{feature.icon}</div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-400">{feature.description}</p>
                    </div>
                  </Card>
                </TooltipTrigger>
                {feature.tooltip && (
                  <TooltipContent>
                    <p>{feature.tooltip}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureGrid;
