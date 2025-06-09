import React from "react";
import Link from "next/link";
import { Globe, HelpCircle, Bell } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-sm py-6 px-18">
      <div className="container h-full flex items-center justify-between">
        <Link
          href="/overview"
          className="text-[32px] font-bold text-text-tertiary"
        >
          Logo
        </Link>
        <div className="flex items-center gap-6">
          <Select>
            <SelectTrigger className="w-[100px] border-0 focus:ring-0 focus:ring-offset-0">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-text-secondary" />
                <SelectValue placeholder="EN" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="de">German</SelectItem>
            </SelectContent>
          </Select>

          <button className="p-2 hover:bg-background-secondary rounded-full transition-colors">
            <HelpCircle className="h-5 w-5 text-text-secondary" />
          </button>

          <div className="relative">
            <button className="p-2 hover:bg-background-secondary rounded-full transition-colors">
              <Bell className="h-5 w-5 text-text-secondary" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-danger-primary rounded-full text-[10px] text-white flex items-center justify-center">
                3
              </span>
            </button>
          </div>

          <Select>
            <SelectTrigger className="w-[180px] border-0 focus:ring-0 focus:ring-offset-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200">
                  <img
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    alt="Profile"
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">John Doe</span>
                  <span className="text-xs text-text-secondary">Seller</span>
                </div>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="profile">Profile</SelectItem>
              <SelectItem value="logout">Logout</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
