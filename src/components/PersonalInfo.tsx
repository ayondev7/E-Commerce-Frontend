import React, { useState } from "react";
import { X } from "lucide-react";
import NotificationPreferences from "./NotificationPreferences";

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    firstName: "Alex",
    lastName: "Johnson",
    email: "alex.johnson@email.com",
    phone: "+1 (555) 123-4567",
    bio: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-border-primary p-6 w-full">
        <h2 className="text-2xl font-medium text-text-primary mb-1">
          Personal Information
        </h2>
        <p className="text-text-secondary text-base mb-6.5">
          Update your personal details.
        </p>

        <div className="grid grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              First name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              className="w-full px-2.5 py-2.5 min-h-13 border border-border-primary rounded-md focus:outline-none placeholder-text-secondary text-xl font-normal"
              placeholder="Enter first name"
            />
          </div>
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              Last name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              className="w-full px-2.5 py-2.5 min-h-13 border border-border-primary rounded-md focus:outline-none placeholder-text-secondary text-xl font-normal"
              placeholder="Enter last name"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5 mb-5">
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full px-2.5 py-2.5 min-h-13 border border-border-primary rounded-md focus:outline-none placeholder-text-secondary text-xl font-normal"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-xl font-medium text-text-primary mb-2.5">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full px-2.5 py-2.5 min-h-13 border border-border-primary rounded-md focus:outline-none placeholder-text-secondary text-xl font-normal"
              placeholder="Enter phone number"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="block text-xl font-medium text-text-primary mb-2.5">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            placeholder="Tell us about yourself"
            rows={4}
            className="w-full p-4 min-h-40 border border-border-primary rounded-md focus:outline-none resize-none placeholder-text-secondary text-base font-normal"
          />
        </div>

        <div className="flex justify-between text-base">
          <button
            className="flex items-center min-h-13 justify-center rounded-sm border font-medium border-border-primary text-text-primary gap-x-1.5 px-5 py-2.5 cursor-pointer"
          >
            <X className="w-6 h-6" />
            Cancel
          </button>

          <button className="flex items-center min-h-13 justify-center rounded-sm border font-medium text-white bg-button-primary gap-x-1.5 px-5 py-2.5 cursor-pointer">
            Save Changes
          </button>
        </div>
      </div>

      <div className="my-14">
        <NotificationPreferences />
      </div>
    </>
  );
};

export default PersonalInfo;
