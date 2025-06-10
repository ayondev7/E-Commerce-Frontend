"use client";
import React, { useState } from "react";
import { Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GeneralInformationForm = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && 
      file.size <= 5 * 1024 * 1024 && 
      images.length + files.length <= 4
    );
    setImages(prev => [...prev, ...validFiles]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter(file => 
        file.type.startsWith('image/') && 
        file.size <= 5 * 1024 * 1024 && 
        images.length + files.length <= 4
      );
      setImages(prev => [...prev, ...validFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 bg-background-primary p-6 rounded-sm border border-border-primary">
      <h2 className="text-xl font-semibold">General Information</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Product Title <span className="text-danger-primary">*</span>
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Enter product title"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description <span className="text-danger-primary">*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full px-4 py-2 border border-border-primary rounded-sm focus:outline-none focus:ring-1 focus:ring-primary resize-none"
            placeholder="Enter product description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Product Images <span className="text-danger-primary">*</span>
          </label>
          <div
            className="border-2 border-dashed border-border-primary rounded-sm p-6 text-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleImageDrop}
          >
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="images"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="w-8 h-8 text-text-secondary" />
              <div className="text-sm">
                <span className="text-primary">Click to upload</span> or drag and drop
              </div>
              <div className="text-xs text-text-secondary">
                Maximum 4 images, 5MB each
              </div>
            </label>
          </div>

          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-sm"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-danger-primary text-white p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Category <span className="text-danger-primary">*</span>
          </label>
          <Select>
            <SelectTrigger className="w-full border-border-primary text-text-primary focus:ring-0">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              <SelectItem value="books">Books</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default GeneralInformationForm; 