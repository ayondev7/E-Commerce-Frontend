"use client";
import React, { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GeneralInformationFormProps {
  initialData?: {
    title?: string;
    description?: string;
    category?: string;
  };
}

const GeneralInformationForm = ({
  initialData,
}: GeneralInformationFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [images, setImages] = useState<File[]>([]);

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(
      (file) =>
        file.type.startsWith("image/") &&
        file.size <= 5 * 1024 * 1024 &&
        images.length + files.length <= 4
    );
    setImages((prev) => [...prev, ...validFiles]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter(
        (file) =>
          file.type.startsWith("image/") &&
          file.size <= 5 * 1024 * 1024 &&
          images.length + files.length <= 4
      );
      setImages((prev) => [...prev, ...validFiles]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (initialData) {
      if (initialData.title !== undefined) setTitle(initialData.title);
      if (initialData.description !== undefined)
        setDescription(initialData.description);
      if (initialData.category !== undefined) setCategory(initialData.category);
    }
  }, [initialData]);

  return (
    <div className="space-y-6.5 bg-background-primary p-6 rounded-lg border border-border-primary">
      <h2 className="text-2xl font-medium">General Information</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium text-xl mb-2.5">
            Product Title <span className="text-danger-primary">*</span>
          </label>
          <input
            type="text"
            id="title"
            className="w-full min-h-13 px-5 py-2.5 border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-base"
            placeholder="Enter product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block font-medium text-xl mb-2.5"
          >
            Description <span className="text-danger-primary">*</span>
          </label>
          <textarea
            id="description"
            rows={4}
            className="w-full px-5 py-2.5 border border-border-primary rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none text-base"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium text-xl mb-2.5">
            Product Images <span className="text-danger-primary">*</span>
          </label>
          <div
            className="border-2 border-dashed min-h-[280px] border-border-primary rounded-md px-5 py-2.5 text-center flex flex-col justify-center items-center gap-y-5"
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleImageDrop}
          >
            <Upload className="w-9 h-9 text-text-primary" strokeWidth={1} />
            <div className="text-xl font-medium text-text-primary">
              Drag & drop product images
            </div>
            <div className="text-base text-text-secondary">
              or click to browse files (PNG, JPG, WEBP up to 5MB each)
            </div>
            <input
              type="file"
              id="images"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
            <button
              type="button"
              onClick={() => document.getElementById("images")?.click()}
              className="px-5 py-2.5 text-text-primary border font-medium border-border-primary text-base rounded-sm hover:cursor-pointer transition"
            >
              Select Files
            </button>
          </div>
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md"
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
          <label className="block font-medium text-xl mb-2.5">
            Category <span className="text-danger-primary">*</span>
          </label>
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger
              className={`w-full min-h-13 px-5 py-2.5 rounded-md border-border-primary focus:outline-none focus:ring-0 text-base ${
                category ? "text-text-primary" : "text-text-secondary"
              }`}
            >
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
