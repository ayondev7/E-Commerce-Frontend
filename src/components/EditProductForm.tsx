"use client";
import React, { useState, useEffect, useCallback } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import GeneralInformationForm from "./GeneralInformationForm";
import SpecificationsForm from "./SpecificationsForm";
import PricingInventoryForm from "./PricingInventoryForm";
import AdditionalInformationForm from "./AdditionalInformationForm";
import { Checkbox } from "./ui/checkbox";
import { ProductFormData } from "@/types/productTypes";
import { useSingleProduct } from "@/hooks/productHooks";

const EditProductForm = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params?.productId as string;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [negotiable, setNegotiable] = useState(false);

  const { data: productData, isLoading, error } = useSingleProduct(productId);

  console.log("Product Data:", productData);

  const methods = useForm<ProductFormData>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      productImages: [],
      brand: "",
      model: "",
      storage: "",
      ram: "",
      color: "",
      conditions: [],
      features: [],
      price: "",
      salePrice: "",
      quantity: "",
      sku: "",
      tags: "",
      seoTitle: "",
      seoDescription: "",
      specifications: [],
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  // Memoize the form data transformation to prevent unnecessary recalculations
  const transformProductData = useCallback((data: any) => {
    return {
      title: data.title || "",
      description: data.description || "",
      category: data.category || "",
      productImages: [],
      brand: data.brand || "",
      model: data.model || "",
      storage: data.storage || "",
      ram: data.ram || "",
      color: data.colour || data.color || "",
      conditions: data.conditions || [],
      features: data.features || [],
      price: data.price?.toString() || "",
      salePrice: data.salePrice?.toString() || "",
      quantity: data.quantity?.toString() || "",
      sku: data.sku || "",
      tags: Array.isArray(data.tags) ? data.tags.join(", ") : data.tags || "",
      seoTitle: data.seoTitle || "",
      seoDescription: data.seoDescription || "",
      specifications: data.specifications || [],
    };
  }, []);

  // Fixed useEffect - only run once when productData is first loaded
  useEffect(() => {
    if (productData && !isLoading) {
      const formData = transformProductData(productData);
      reset(formData);
      setNegotiable(productData.negotiable || false);
    }
  }, [productData, isLoading, reset, transformProductData]);

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);

      // Prepare the data for patching
      const patchData = {
        ...data,
        negotiable,
        productId,
        // Convert string values back to appropriate types
        price: parseFloat(data.price),
        salePrice: data.salePrice ? parseFloat(data.salePrice) : undefined,
        quantity: parseInt(data.quantity),
        // Convert tags string back to array
        tags: data.tags
          ? data.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag)
          : [],
      };

      // For now, just console.log the data
      console.log("Data to patch:", patchData);

      // TODO: Replace with actual API call
      // const response = await apiClient.patch(`/api/products/${productId}`, patchData);

      alert("Product updated successfully! (Check console for data)");
    } catch (error: unknown) {
      console.error("Error updating product:", error);
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Failed to update product. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const discardChanges = useCallback(() => {
    if (
      confirm(
        "Are you sure you want to discard your changes? All unsaved changes will be lost."
      )
    ) {
      if (productData) {
        // Reset form to original data
        const originalData = transformProductData(productData);
        reset(originalData);
        setNegotiable(productData.negotiable || false);
      }
    }
  }, [productData, reset, transformProductData]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading product data...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg text-red-500">
          Error loading product: {error.message}
        </div>
      </div>
    );
  }

  // No product data
  if (!productData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Product not found</div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="relative">
        <div className="pl-5 pr-14 pb-50">
          <div className="flex items-center gap-x-2">
            <button
              type="button"
              onClick={() => router.push("/seller/products")}
              className="rounded-sm transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-3xl font-semibold">Edit Product Details</h1>
          </div>

          <h2 className="text-lg text-text-secondary ml-7 mt-3 mb-6">
            Edit the details of your product
          </h2>

          <div className="space-y-8">
            <GeneralInformationForm
              initialData={{
                title: productData.title,
                description: productData.description,
                category: productData.category,
                productImages: [], // Handle existing images if needed
              }}
            />

            <SpecificationsForm
              initialData={{
                brand: productData.brand,
                model: productData.model,
                storage: productData.storage,
                ram: productData.ram,
                color: productData.colour || productData.color,
                conditions: productData.conditions,
                features: productData.features,
              }}
            />

            <PricingInventoryForm
              initialData={{
                price: parseFloat(productData.price),
                salePrice: productData.salePrice
                  ? parseFloat(productData.salePrice)
                  : undefined,
                quantity: parseInt(productData.quantity),
                sku: productData.sku,
              }}
            />

            <div className="flex items-center bg-white p-6 gap-x-2.5 border border-border-primary rounded-lg">
              <Checkbox
                id="negotiation"
                checked={negotiable}
                onCheckedChange={(checked) => {
                  if (typeof checked === "boolean") {
                    setNegotiable(checked);
                  }
                }}
                className="rounded-[3px] border-2 border-text-primary data-[state=checked]:border-blue-500 data-[state=checked]:bg-white data-[state=checked]:text-blue-500 [&_svg]:!w-3 [&_svg]:!h-3 [&_svg]:!stroke-5"
              />
              <label htmlFor="negotiation" className="text-xl">
                Enable Negotiation
              </label>
            </div>

            <div className="space-y-6 bg-background-primary p-6 rounded-lg border border-border-primary">
              <AdditionalInformationForm
                initialData={{
                  tags: Array.isArray(productData.tags)
                    ? productData.tags.join(", ")
                    : productData.tags,
                  seoTitle: productData.seoTitle,
                  seoDescription: productData.seoDescription,
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pl-5 pr-14 bg-white border-t border-border-primary h-29 absolute bottom-0 w-full">
          <button
            type="button"
            onClick={discardChanges}
            disabled={isSubmitting}
            className="flex items-center gap-x-1.5 px-4 py-2 hover:bg-background-hover rounded-sm text-danger-primary border border-[#f5cdd5] text-base cursor-pointer disabled:opacity-50"
          >
            <Trash2 className="w-5 h-5" />
            <span className="font-medium">Discard</span>
          </button>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-[10px] bg-button-primary text-white rounded-sm cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? "Updating..." : "Send for Review"}
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default EditProductForm;
