"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const SpecificationsForm = () => {
  const [conditions, setConditions] = useState<string[]>([
    "New",
    "Like New",
    "Good",
    "Fair",
    "Poor"
  ]);
  const [features, setFeatures] = useState<string[]>([
    "Water Resistant",
    "Bluetooth",
    "Wi-Fi",
    "GPS",
    "Touch Screen"
  ]);
  const [showConditionInput, setShowConditionInput] = useState(false);
  const [showFeatureInput, setShowFeatureInput] = useState(false);
  const [newCondition, setNewCondition] = useState("");
  const [newFeature, setNewFeature] = useState("");

  const addCondition = () => {
    if (newCondition.trim()) {
      setConditions([...conditions, newCondition.trim()]);
      setNewCondition("");
      setShowConditionInput(false);
    }
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
      setShowFeatureInput(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Specifications</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Brand <span className="text-danger-primary">*</span>
          </label>
          <Select>
            <SelectTrigger className="w-full border-border-primary text-text-primary focus:ring-0">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="apple">Apple</SelectItem>
              <SelectItem value="samsung">Samsung</SelectItem>
              <SelectItem value="sony">Sony</SelectItem>
              <SelectItem value="lg">LG</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Model <span className="text-danger-primary">*</span>
            </label>
            <Select>
              <SelectTrigger className="w-full border-border-primary text-text-primary focus:ring-0">
                <SelectValue placeholder="Select model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="iphone14">iPhone 14</SelectItem>
                <SelectItem value="iphone13">iPhone 13</SelectItem>
                <SelectItem value="iphone12">iPhone 12</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Storage <span className="text-danger-primary">*</span>
            </label>
            <Select>
              <SelectTrigger className="w-full border-border-primary text-text-primary focus:ring-0">
                <SelectValue placeholder="Select storage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="64">64GB</SelectItem>
                <SelectItem value="128">128GB</SelectItem>
                <SelectItem value="256">256GB</SelectItem>
                <SelectItem value="512">512GB</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              RAM <span className="text-danger-primary">*</span>
            </label>
            <Select>
              <SelectTrigger className="w-full border-border-primary text-text-primary focus:ring-0">
                <SelectValue placeholder="Select RAM" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="4">4GB</SelectItem>
                <SelectItem value="6">6GB</SelectItem>
                <SelectItem value="8">8GB</SelectItem>
                <SelectItem value="12">12GB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Color <span className="text-danger-primary">*</span>
            </label>
            <Select>
              <SelectTrigger className="w-full border-border-primary text-text-primary focus:ring-0">
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Condition <span className="text-danger-primary">*</span>
          </label>
          <div className="space-y-2">
            {conditions.map((condition) => (
              <div key={condition} className="flex items-center space-x-2">
                <Checkbox id={condition} className="rounded-full" />
                <label htmlFor={condition} className="text-sm">
                  {condition}
                </label>
              </div>
            ))}
            {!showConditionInput ? (
              <button
                onClick={() => setShowConditionInput(true)}
                className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
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
                  className="w-48 px-3 py-1.5 text-sm border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  autoFocus
                />
                <button
                  onClick={addCondition}
                  className="px-3 py-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Features <span className="text-danger-primary">*</span>
          </label>
          <div className="space-y-2">
            {features.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox id={feature} className="rounded-full" />
                <label htmlFor={feature} className="text-sm">
                  {feature}
                </label>
              </div>
            ))}
            {!showFeatureInput ? (
              <button
                onClick={() => setShowFeatureInput(true)}
                className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
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
                  className="w-48 px-3 py-1.5 text-sm border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  autoFocus
                />
                <button
                  onClick={addFeature}
                  className="px-3 py-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificationsForm; 