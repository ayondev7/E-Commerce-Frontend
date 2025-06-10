"use client";
import React from "react";

const AdditionalInformationForm = () => {
  return (
    <div className="space-y-6 bg-background-primary p-6 rounded-sm border border-border-primary">
      <h2 className="text-xl font-semibold">Additional Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Tags <span className="text-danger-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. smartphone, android, 5G (separate with commas)"
            className="w-full px-3 py-1.5 text-sm border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            SEO Title <span className="text-danger-primary">*</span>
          </label>
          <input
            type="text"
            placeholder="Custom titles for search engines"
            className="w-full px-3 py-1.5 text-sm border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            SEO Description <span className="text-danger-primary">*</span>
          </label>
          <textarea
            placeholder="Custom description for search engines"
            rows={3}
            className="w-full px-3 py-1.5 text-sm border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AdditionalInformationForm; 