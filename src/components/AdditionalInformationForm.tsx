"use client";
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface AdditionalInformationFormProps {
  initialData?: {
    tags?: string;
    seoTitle?: string;
    seoDescription?: string;
  };
}

const AdditionalInformationForm = ({ initialData }: AdditionalInformationFormProps) => {
  const [tags, setTags] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [existingTags, setExistingTags] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      if (initialData.tags !== undefined) {
        setTags("");
        const splitTags = initialData.tags
          .split(",")
          .map(t => t.trim())
          .filter(t => t.length > 0);
        setExistingTags(splitTags);
      }
      if (initialData.seoTitle !== undefined) setSeoTitle(initialData.seoTitle);
      if (initialData.seoDescription !== undefined) setSeoDescription(initialData.seoDescription);
    }
  }, [initialData]);

  const removeExistingTag = (tagToRemove: string) => {
    setExistingTags(existingTags.filter(t => t !== tagToRemove));
  };

  return (
    <div className="space-y-6.5">
      <h2 className="text-2xl font-medium">Additional Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-xl font-medium mb-2.5">
            Tags 
          </label>
          <div className="flex flex-wrap gap-2 my-2.5">
            {existingTags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center bg-[#f5f5f5] text-primary px-3 py-1 rounded-full text-sm"
              >
                {tag}
                <X
                  size={16}
                  className="ml-1 cursor-pointer"
                  onClick={() => removeExistingTag(tag)}
                />
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="e.g. smartphone, android, 5G (separate with commas)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-5 py-2.5 text-base border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-xl font-medium mb-2.5">
            SEO Title 
          </label>
          <input
            type="text"
            placeholder="Custom titles for search engines"
            value={seoTitle}
            onChange={(e) => setSeoTitle(e.target.value)}
            className="w-full px-5 py-2.5 text-base border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-xl font-medium mb-2.5">
            SEO Description 
          </label>
          <textarea
            placeholder="Custom description for search engines"
            rows={3}
            value={seoDescription}
            onChange={(e) => setSeoDescription(e.target.value)}
            className="w-full min-h-[160px] px-5 py-2.5 text-base border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformationForm;
