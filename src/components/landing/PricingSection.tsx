import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, X, Sparkles } from "lucide-react";

interface PricingTier {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  description: string;
  features: string[];
  highlighted?: boolean;
}

interface PricingFeature {
  name: string;
  basic: boolean;
  pro: boolean;
  enterprise: boolean;
}

interface PricingSectionProps {
  pricingTiers?: PricingTier[];
  features?: PricingFeature[];
}

const defaultPricingTiers: PricingTier[] = [
  {
    name: "Basic",
    monthlyPrice: 49,
    annualPrice: 39,
    description: "Perfect for small projects and individual creators",
    features: [
      "720p/1080p Video Processing",
      "2 Concurrent Jobs",
      "Basic Email Support",
      "100GB Storage",
      "Standard Encoding Speed",
    ],
  },
  {
    name: "Pro",
    monthlyPrice: 99,
    annualPrice: 89,
    description: "Ideal for growing businesses and teams",
    features: [
      "Up to 4K Video Processing",
      "10 Concurrent Jobs",
      "Priority Support",
      "500GB Storage",
      "2x Faster Encoding",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    monthlyPrice: 299,
    annualPrice: 249,
    description: "For large scale operations and custom needs",
    features: [
      "Up to 8K Video Processing",
      "Unlimited Jobs",
      "24/7 Dedicated Support",
      "Custom Storage Limits",
      "4x Faster Encoding",
    ],
  },
];

const defaultFeatures: PricingFeature[] = [
  { name: "Video Processing", basic: true, pro: true, enterprise: true },
  { name: "HLS/DASH Streaming", basic: true, pro: true, enterprise: true },
  {
    name: "Custom Encoding Presets",
    basic: false,
    pro: true,
    enterprise: true,
  },
  { name: "REST API Access", basic: true, pro: true, enterprise: true },
  { name: "Watermarking", basic: false, pro: true, enterprise: true },
  { name: "Advanced Analytics", basic: false, pro: true, enterprise: true },
  { name: "Custom Branding", basic: false, pro: false, enterprise: true },
  { name: "White Label Solution", basic: false, pro: false, enterprise: true },
];

const PricingSection = ({
  pricingTiers = defaultPricingTiers,
  features = defaultFeatures,
}: PricingSectionProps) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="w-full py-20 bg-gradient-to-b from-black/20 to-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Choose the perfect plan for your video processing needs
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`${!isAnnual ? "text-white" : "text-slate-400"}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-violet-600"
            />
            <span className={`${isAnnual ? "text-white" : "text-slate-400"}`}>
              Annual
            </span>
            <span className="ml-2 text-sm text-violet-400 bg-violet-400/10 px-3 py-1 rounded-full">
              Save 20%
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`relative p-8 bg-black/40 backdrop-blur-xl border-slate-800 hover:border-slate-700 transition-all duration-300 ${
                tier.highlighted
                  ? "border-violet-500/50 shadow-lg shadow-violet-500/10"
                  : ""
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 px-4 py-1 rounded-full text-sm font-medium text-white flex items-center gap-1">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-slate-400 mb-4">{tier.description}</p>
                <div className="text-4xl font-bold text-white mb-2">
                  ${isAnnual ? tier.annualPrice : tier.monthlyPrice}
                  <span className="text-lg font-normal text-slate-400">
                    /mo
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-slate-300"
                  >
                    <Check className="h-5 w-5 text-violet-400 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  tier.highlighted
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                Get Started
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-20 bg-black/40 backdrop-blur-xl rounded-xl p-8 border border-slate-800">
          <h3 className="text-2xl font-bold text-center text-white mb-8">
            Feature Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left py-4 px-4 text-slate-400">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 text-slate-400">
                    Basic
                  </th>
                  <th className="text-center py-4 px-4 text-slate-400">Pro</th>
                  <th className="text-center py-4 px-4 text-slate-400">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr
                    key={index}
                    className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors"
                  >
                    <td className="py-4 px-4 text-white">{feature.name}</td>
                    <td className="text-center py-4 px-4">
                      {feature.basic ? (
                        <Check className="h-5 w-5 text-violet-400 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {feature.pro ? (
                        <Check className="h-5 w-5 text-violet-400 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-slate-600 mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {feature.enterprise ? (
                        <Check className="h-5 w-5 text-violet-400 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-slate-600 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
