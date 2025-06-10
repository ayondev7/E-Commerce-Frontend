"use client";
import React from "react";

const AdditionalInformationForm = () => {
  return (
    <div className="space-y-6.5">
      <h2 className="text-2xl font-medium">Additional Information</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-xl font-medium mb-2.5">
            Tags <span className="text-danger-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. smartphone, android, 5G (separate with commas)"
            className="w-full px-5 py-2.5 text-base border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-xl font-medium mb-2.5">
            SEO Title <span className="text-danger-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="Custom titles for search engines"
            className="w-full px-5 py-2.5 text-base border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-xl font-medium mb-2.5">
            SEO Description <span className="text-danger-primary">*</span>
          </label>
          <textarea
            placeholder="Custom description for search engines"
            rows={3}
            className="w-full min-h-[160px] px-5 py-2.5 text-base border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformationForm; 