"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, Loader2 } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  customerImage: FileList | null;
  phone: string;
}

const CustomerRegistrationForm = ({ onBack }: { onBack: () => void }) => {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const password = watch("password");

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    const image = data.customerImage?.[0];
    if (image) {
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
      ];
      const isValidType = allowedTypes.includes(image.type);
      const isValidSize = image.size <= 5 * 1024 * 1024;

      if (!isValidType) {
        toast.error("Only JPG, JPEG, PNG, or WEBP images are allowed");
        return;
      }

      if (!isValidSize) {
        toast.error("Image must be less than or equal to 5MB");
        return;
      }
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("phone", data.phone);
      if (image) {
        formData.append("customerImage", image);
      }

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/customers/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const loginRes = await axios.post(
        "/api/session/login",
        {
          email: data.email,
          password: data.password,
          userType: "customer",
        },
        { withCredentials: true }
      );

      const { accessToken, user } = loginRes.data;
      sessionStorage.setItem("accessToken", accessToken);
      setUser({
        userType: "customer",
        name: `${user?.firstName || ""} ${user?.lastName || ""}`.trim(),
      });

      toast.success("Registration successful!");
      router.push("/customer/overview");
    } catch (err: any) {
      toast.error(
        err.response?.data?.error || "Registration failed. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded shadow-md w-full max-w-5xl"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-button-primary">
          Register as a Customer
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
          <div>
            <label className="block mb-1.5 text-xl text-text-primary">
              First Name
            </label>
            <input
              placeholder="Enter your first name"
              {...register("firstName", { required: "First name is required" })}
              className={`w-full border border-border-primary rounded-md px-5 min-h-13 focus:outline-none text-base text-primary placeholder:text-secondary ${
                errors.firstName ? "border-red-500" : ""
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1.5 text-xl text-text-primary">
              Last Name
            </label>
            <input
              placeholder="Enter your last name"
              {...register("lastName", { required: "Last name is required" })}
              className={`w-full border border-border-primary rounded-md px-5 min-h-13 focus:outline-none text-base text-primary placeholder:text-secondary ${
                errors.lastName ? "border-red-500" : ""
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1.5 text-xl text-text-primary">
              Email
            </label>
            <input
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full border border-border-primary rounded-md px-5 min-h-13 focus:outline-none text-base text-primary placeholder:text-secondary ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block mb-1.5 text-xl text-text-primary">
              Password
            </label>
            <input
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full border border-border-primary rounded-md px-5 min-h-13 pr-10 focus:outline-none text-base text-primary placeholder:text-secondary ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              className="absolute right-3 top-12 text-text-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-6 h-6" />
              ) : (
                <Eye className="w-6 h-6" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block mb-1.5 text-xl text-text-primary">
              Confirm Password
            </label>
            <input
              placeholder="Confirm your password"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className={`w-full border border-border-primary rounded-md px-5 min-h-13 pr-10 focus:outline-none text-base text-primary placeholder:text-secondary ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              className="absolute right-3 top-12 text-text-secondary"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff className="w-6 h-6" />
              ) : (
                <Eye className="w-6 h-6" />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1.5 text-xl text-text-primary">
              Phone
            </label>
            <input
              placeholder="Enter your phone number"
              type="tel"
              {...register("phone", { required: "Phone number is required" })}
              className={`w-full border border-border-primary rounded-md px-5 min-h-13 focus:outline-none text-base text-primary placeholder:text-secondary ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1.5 text-xl text-text-primary">
              Profile Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("customerImage")}
              className="w-full border min-h-13 flex items-center border-border-primary rounded-md px-5 py-2 text-base text-primary placeholder:text-secondary"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between items-center gap-y-2.5 mt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-button-primary gap-x-2.5 min-w-full text-white py-2 px-4 rounded-md md:min-w-sm flex justify-center items-center"
          >
            {isLoading && <Loader2 className="size-6 animate-spin" />}
            {isLoading ? "Registering..." : "Register"}
          </button>
          <button
            type="button"
            onClick={onBack}
            className="text-button-primary cursor-pointer"
          >
            Already have an account? Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerRegistrationForm;
