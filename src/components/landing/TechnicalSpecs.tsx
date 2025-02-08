import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code } from "lucide-react";

interface TechnicalSpecsProps {
  encodingParams?: {
    title: string;
    value: string;
  }[];
  apiExamples?: {
    language: string;
    code: string;
  }[];
}

const defaultEncodingParams = [
  { title: "Video Codec", value: "H.264, HEVC, VP9" },
  { title: "Audio Codec", value: "AAC, Opus" },
  { title: "Resolution", value: "Up to 4K (3840x2160)" },
  { title: "Bitrate", value: "100 Kbps - 20 Mbps" },
  { title: "Frame Rate", value: "Up to 60 fps" },
  { title: "Output Formats", value: "MP4, WebM, HLS, DASH" },
];

const defaultApiExamples = [
  {
    language: "curl",
    code: `curl -X POST https://api.videoservice.com/v1/encode \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -F "file=@video.mp4" \
  -F "preset=h264_high"`,
  },
  {
    language: "javascript",
    code: `const response = await fetch('https://api.videoservice.com/v1/encode', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    url: 'https://example.com/video.mp4',
    preset: 'h264_high'
  })
});`,
  },
  {
    language: "python",
    code: `import requests

response = requests.post(
    'https://api.videoservice.com/v1/encode',
    headers={'Authorization': 'Bearer YOUR_API_KEY'},
    json={
        'url': 'https://example.com/video.mp4',
        'preset': 'h264_high'
    }
)`,
  },
];

const TechnicalSpecs: React.FC<TechnicalSpecsProps> = ({
  encodingParams = defaultEncodingParams,
  apiExamples = defaultApiExamples,
}) => {
  return (
    <section className="w-full min-h-[600px] bg-transparent text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Technical Specifications</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Powerful encoding capabilities with flexible API integration options
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Encoding Parameters */}
          <Card className="p-6 bg-slate-900 border-slate-800">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Code className="w-5 h-5" />
              Encoding Parameters
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {encodingParams.map((param, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-slate-800 pb-2"
                >
                  <span className="text-slate-400">{param.title}</span>
                  <span className="font-mono">{param.value}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* API Examples */}
          <Card className="p-6 bg-slate-900 border-slate-800">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Code className="w-5 h-5" />
              API Integration
            </h3>
            <Tabs defaultValue={apiExamples[0].language} className="w-full">
              <TabsList className="w-full bg-slate-800 p-1">
                {apiExamples.map((example) => (
                  <TabsTrigger
                    key={example.language}
                    value={example.language}
                    className="flex-1"
                  >
                    {example.language.toUpperCase()}
                  </TabsTrigger>
                ))}
              </TabsList>
              {apiExamples.map((example) => (
                <TabsContent
                  key={example.language}
                  value={example.language}
                  className="mt-4"
                >
                  <pre className="bg-slate-800 p-4 rounded-lg overflow-x-auto">
                    <code className="text-sm text-slate-300">
                      {example.code}
                    </code>
                  </pre>
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecs;
