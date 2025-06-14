"use client";
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type SpecificationsFormProps = {
  initialData?: {
    brand?: string;
    model?: string;
    storage?: string;
    ram?: string;
    color?: string;
    conditions?: string[];
    features?: string[];
  };
};

const SpecificationsForm = ({ initialData }: SpecificationsFormProps) => {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedStorage, setSelectedStorage] = useState("");
  const [selectedRAM, setSelectedRAM] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  const [conditions, setConditions] = useState<string[]>([
    "New",
    "Like New",
    "Good",
    "Fair",
    "Poor",
  ]);
  const [features, setFeatures] = useState<string[]>([
    "Water Resistant",
    "Bluetooth",
    "Wi‑Fi",
    "GPS",
    "Touch Screen",
  ]);

  const [showConditionInput, setShowConditionInput] = useState(false);
  const [showFeatureInput, setShowFeatureInput] = useState(false);
  const [newCondition, setNewCondition] = useState("");
  const [newFeature, setNewFeature] = useState("");

  useEffect(() => {
    if (initialData) {
      setSelectedBrand(initialData.brand || "");
      setSelectedModel(initialData.model || "");
      setSelectedStorage(initialData.storage || "");
      setSelectedRAM(initialData.ram || "");
      setSelectedColor(initialData.color || "");
      setSelectedConditions(initialData.conditions || []);
      setSelectedFeatures(initialData.features || []);
    }
  }, [initialData]);

  const toggleCondition = (condition: string) => {
    setSelectedConditions((prev) =>
      prev.includes(condition)
        ? prev.filter((c) => c !== condition)
        : [...prev, condition]
    );
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  const addCondition = () => {
    if (newCondition.trim()) {
      const newCond = newCondition.trim();
      setConditions([...conditions, newCond]);
      setSelectedConditions([...selectedConditions, newCond]);
      setNewCondition("");
      setShowConditionInput(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      const newFeat = newFeature.trim();
      setFeatures([...features, newFeat]);
      setSelectedFeatures([...selectedFeatures, newFeat]);
      setNewFeature("");
      setShowFeatureInput(false);
    }
  };

  const cancelCondition = () => {
    setNewCondition("");
    setShowConditionInput(false);
  };

  const cancelFeature = () => {
    setNewFeature("");
    setShowFeatureInput(false);
  };

  return (
    <div className="space-y-6.5 bg-background-primary p-6 rounded-lg border border-border-primary">
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-medium">Specifications</h2>
        <button
          onClick={() => setShowConditionInput(true)}
          className="flex items-center gap-x-1.5 text-base text-custom-blue hover:cursor-pointer transition-colors"
        >
          <Plus className="w-6 h-6" />
          Add another specification
        </button>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block font-medium text-xl mb-2.5">
            Brand <span className="text-danger-primary">*</span>
          </label>
          <Select value={selectedBrand} onValueChange={setSelectedBrand}>
            <SelectTrigger
              className={`w-full min-h-13 px-5 py-2.5 rounded-md border-border-primary focus:ring-0 text-base [&>svg]:w-6 [&>svg]:h-6 ${
                selectedBrand ? "text-text-primary" : "text-text-secondary"
              }`}
            >
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent className="bg-white border-border-primary text-base">
              <SelectItem value="apple" className="text-base">Apple</SelectItem>
              <SelectItem value="samsung" className="text-base">Samsung</SelectItem>
              <SelectItem value="sony" className="text-base">Sony</SelectItem>
              <SelectItem value="lg" className="text-base">LG</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-xl mb-2.5">
              Model <span className="text-danger-primary">*</span>
            </label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger
                className={`w-full min-h-13 px-5 py-2.5 rounded-md border-border-primary focus:ring-0 text-base [&>svg]:w-6 [&>svg]:h-6 ${
                  selectedModel ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent className="bg-white border-border-primary text-base">
                <SelectItem value="iphone14" className="text-base">iPhone 14</SelectItem>
                <SelectItem value="iphone13" className="text-base">iPhone 13</SelectItem>
                <SelectItem value="iphone12" className="text-base">iPhone 12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block font-medium text-xl mb-2.5">
              Storage <span className="text-danger-primary">*</span>
            </label>
            <Select value={selectedStorage} onValueChange={setSelectedStorage}>
              <SelectTrigger
                className={`w-full min-h-13 px-5 py-2.5 rounded-md border-border-primary focus:ring-0 text-base [&>svg]:w-6 [&>svg]:h-6 ${
                  selectedStorage ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                <SelectValue placeholder="Select storage" />
              </SelectTrigger>
              <SelectContent className="bg-white border-border-primary text-base">
                <SelectItem value="64" className="text-base">64GB</SelectItem>
                <SelectItem value="128" className="text-base">128GB</SelectItem>
                <SelectItem value="256" className="text-base">256GB</SelectItem>
                <SelectItem value="512" className="text-base">512GB</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-xl mb-2.5">
              RAM <span className="text-danger-primary">*</span>
            </label>
            <Select value={selectedRAM} onValueChange={setSelectedRAM}>
              <SelectTrigger
                className={`w-full min-h-13 px-5 py-2.5 rounded-md border-border-primary focus:ring-0 text-base [&>svg]:w-6 [&>svg]:h-6 ${
                  selectedRAM ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                <SelectValue placeholder="Select RAM" />
              </SelectTrigger>
              <SelectContent className="bg-white border-border-primary text-base">
                <SelectItem value="4" className="text-base">4GB</SelectItem>
                <SelectItem value="6" className="text-base">6GB</SelectItem>
                <SelectItem value="8" className="text-base">8GB</SelectItem>
                <SelectItem value="12" className="text-base">12GB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block font-medium text-xl mb-2.5">
              Color <span className="text-danger-primary">*</span>
            </label>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger
                className={`w-full min-h-13 px-5 py-2.5 rounded-md border-border-primary focus:ring-0 text-base [&>svg]:w-6 [&>svg]:h-6 ${
                  selectedColor ? "text-text-primary" : "text-text-secondary"
                }`}
              >
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent className="bg-white border-border-primary text-base">
                <SelectItem value="black" className="text-base">Black</SelectItem>
                <SelectItem value="white" className="text-base">White</SelectItem>
                <SelectItem value="silver" className="text-base">Silver</SelectItem>
                <SelectItem value="gold" className="text-base">Gold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8">
          <div>
            <label className="block font-medium text-xl mb-5">
              Condition <span className="text-danger-primary">*</span>
            </label>
            <div className="space-y-4">
              {conditions.map((condition) => (
                <div key={condition} className="flex items-center space-x-2">
                  <Checkbox
                    id={condition}
                    checked={selectedConditions.includes(condition)}
                    onCheckedChange={() => toggleCondition(condition)}
                    className="rounded-full border-text-primary border-2 data-[state=checked]:border-blue-500 data-[state=checked]:bg-white data-[state=checked]:text-blue-500 [&_svg]:!w-2 [&_svg]:!h-2 [&_svg]:!stroke-5"
                  />
                  <label htmlFor={condition} className="text-base">
                    {condition}
                  </label>
                </div>
              ))}
              {!showConditionInput ? (
                <button
                  onClick={() => setShowConditionInput(true)}
                  className="flex items-center gap-1 mt-3 text-base text-blue-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add new condition
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCondition}
                    onChange={(e) => setNewCondition(e.target.value)}
                    placeholder="Enter new condition"
                    className="w-48 min-h-13 px-3 py-1.5 text-base border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    autoFocus
                  />
                  <button
                    onClick={addCondition}
                    className="px-3 py-1.5 text-base text-primary hover:text-primary/80 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={cancelCondition}
                    className="px-3 py-1.5 text-base text-text-secondary hover:text-text-primary transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block font-medium text-xl mb-5">
              Features <span className="text-danger-primary">*</span>
            </label>
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature} className="flex items-center space-x-2">
                  <Checkbox
                    id={feature}
                    checked={selectedFeatures.includes(feature)}
                    onCheckedChange={() => toggleFeature(feature)}
                    className="rounded-full border-text-primary border-2 data-[state=checked]:border-blue-500 data-[state=checked]:bg-white data-[state=checked]:text-blue-500 [&_svg]:!w-2 [&_svg]:!h-2 [&_svg]:!stroke-5"
                  />
                  <label htmlFor={feature} className="text-base">
                    {feature}
                  </label>
                </div>
              ))}
              {!showFeatureInput ? (
                <button
                  onClick={() => setShowFeatureInput(true)}
                  className="flex items-center mt-3 gap-1 text-base text-blue-500 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add new feature
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Enter new feature"
                    className="w-48 min-h-13 px-3 py-1.5 text-base border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                    autoFocus
                  />
                  <button
                    onClick={addFeature}
                    className="px-3 py-1.5 text-base text-primary hover:text-primary/80 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={cancelFeature}
                    className="px-3 py-1.5 text-base text-text-secondary hover:text-text-primary transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificationsForm;
