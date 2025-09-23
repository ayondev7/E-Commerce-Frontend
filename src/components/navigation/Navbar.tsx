"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Globe, HelpCircle, Bell, PanelLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUserStore } from "@/store/userStore";
import Image from "next/image";
import { useUserProfile } from "@/hooks/userHooks";
import MobileSidebar from "./MobileSidebar";
import { useCartStore } from "@/store/cartStore";
import {
  useGetCustomerNotifications,
  useMarkNotificationsAsSeen,
} from "@/hooks/customerHooks";
import NotificationContainer from "../notifications/NotificationContainer";
import {
  useGetSellerNotifications,
  useUpdateLastNotificationSeen,
} from "@/hooks/sellerHooks";
import SellerNotificationContainer from "../notifications/SellerNotificationContainer";

const Navbar = () => {
  const router = useRouter();
  const { userType } = useUserStore();
  const { resetUser } = useUserStore.getState();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const { data, isLoading } = useUserProfile();
  const { resetEverything } = useCartStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const { data: notificationsData } = useGetCustomerNotifications({
    enabled: userType === "customer",
  });

  const { data: sellerNotificationsData } = useGetSellerNotifications({
    enabled: userType === "seller",
  });

  const { mutate: markCustomerSeen } = useMarkNotificationsAsSeen();
  const { mutate: markSellerSeen } = useUpdateLastNotificationSeen();

  const [hasOpenedNotifications, setHasOpenedNotifications] = useState(false);
  const [hasMarkedSeen, setHasMarkedSeen] = useState(false);

  const customerNotifications = notificationsData?.notifications ?? [];
  const sellerNotifications = sellerNotificationsData?.notifications ?? [];

  const currentNotifications =
    userType === "customer" ? customerNotifications : sellerNotifications;

  const newNotificationCount = currentNotifications.filter(
    (n) => n.isNew
  ).length;
  const latestNewNotification = currentNotifications.find((n) => n.isNew);

  const handleLogout = async () => {
    if (typeof window !== "undefined") {
      sessionStorage.clear();
      resetUser();
      resetEverything();
      await fetch("/api/session/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/auth");
    }
  };

  const handleUserMenuChange = (value: string) => {
    if (value === "logout") {
      handleLogout();
    } else if (value === "profile") {
      router.push("/profile");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleBellClick = () => {
    if (!showNotifications) {
      setShowNotifications(true);
      if (!hasOpenedNotifications) {
        setHasOpenedNotifications(true);
      }
    } else {
      setShowNotifications(false);
      if (hasOpenedNotifications && !hasMarkedSeen) {
        const latestNewNotification = currentNotifications?.find(
          (n) => n.isNew
        );
        if (latestNewNotification && latestNewNotification._id) {
          if (userType === "customer") {
            markCustomerSeen(latestNewNotification._id, {
              onSuccess: () => {
                setHasMarkedSeen(true);
              },
            });
          } else if (userType === "seller") {
            markSellerSeen(latestNewNotification._id, {
              onSuccess: () => {
                setHasMarkedSeen(true);
              },
            });
          }
        }
      }
    }
  };

  return (
    <div className="w-full bg-white">
      <nav className="md:hidden block w-full py-6 px-4 lg:px-18">
        <div className="container w-full h-full flex items-center justify-between">
          <MobileSidebar
            isOpen={isMobileSidebarOpen}
            setIsOpen={setIsMobileSidebarOpen}
            trigger={
              <button>
                <PanelLeft className="w-6 h-6" />
              </button>
            }
          />
          <Link
            href={`/${userType}/overview`}
            className="text-[32px] font-bold text-text-tertiary"
          >
            ShopNest
          </Link>
          <div className="flex items-center gap-x-5">
            <Select onValueChange={handleUserMenuChange}>
              <SelectTrigger className="w-15 px-0 py-0 justify-start rounded-none border-0 focus:ring-0 focus:ring-offset-0 [&>svg]:ml-1.5 [&>svg]:w-5 [&>svg]:h-5 [&[data-state=open]>svg]:rotate-180">
                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full">
                    <Image
                      width={32}
                      height={32}
                      src={
                        data?.data?.image
                          ? `data:image/jpeg;base64,${data?.data?.image}`
                          : "https://github.com/shadcn.png"
                      }
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border-border-primary">
                <SelectItem value="logout" className="text-base">
                  Logout
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </nav>

      <nav className="hidden md:block w-full py-6 px-8 lg:px-18">
        <div className="container w-full h-full flex items-center justify-between">
          <Link
            href={`/${userType}/overview`}
            className="text-[32px] font-bold text-text-tertiary"
          >
            ShopNest
          </Link>
          <div className="flex items-center gap-x-5">
            <Select>
              <SelectTrigger className="space-x-2.5 w-30 border-0 px-4 py-2 focus:ring-0 text-text-secondary text-base focus:ring-offset-0 [&>svg]:w-6 [&>svg]:h-6 rounded-none rounded-l-md [&[data-state=open]>svg]:rotate-180">
                <div className="flex items-center gap-x-2.5">
                  <Globe className="h-6 w-6 text-text-secondary" />
                  <SelectValue placeholder="EN" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en" className="text-text-primary text-base">
                  EN
                </SelectItem>
                <SelectItem value="es" className="text-text-primary text-base">
                  ES
                </SelectItem>
                <SelectItem value="fr" className="text-text-primary text-base">
                  FR
                </SelectItem>
                <SelectItem value="de" className="text-text-primary text-base">
                  DE
                </SelectItem>
              </SelectContent>
            </Select>

            <button className="flex gap-x-2.5 px-4 py-2">
              <HelpCircle className="h-6 w-6 text-text-secondary" />
              <span className="text-base text-text-secondary">Help</span>
            </button>

            <div className="relative" ref={notifRef}>
              <button
                className="w-10 h-10 p-[1px] border border-border-primary rounded-md flex justify-center items-center"
                onClick={handleBellClick}
              >
                <Bell className="h-6 w-6 text-text-primary" />
                {newNotificationCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-button-primary font-medium rounded-full text-[10px] text-white flex items-center justify-center">
                    {newNotificationCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 z-50">
                  {userType === "customer" ? (
                    <NotificationContainer
                      notifications={notificationsData?.notifications || []}
                    />
                  ) : (
                    <SellerNotificationContainer
                      notifications={
                        sellerNotificationsData?.notifications || []
                      }
                    />
                  )}
                </div>
              )}
            </div>

            <Select onValueChange={handleUserMenuChange}>
              <SelectTrigger className="min-w-36.5 px-0 py-0 justify-start rounded-none border-0 focus:ring-0 focus:ring-offset-0 [&>svg]:ml-1.5 [&>svg]:w-5 [&>svg]:h-5 [&[data-state=open]>svg]:rotate-180">
                <div className="flex items-center gap-1.5">
                  <div className="w-8 h-8 rounded-full">
                    <Image
                      width={32}
                      height={32}
                      src={
                        data?.data?.image
                          ? `data:image/jpeg;base64,${data?.data?.image}`
                          : "https://github.com/shadcn.png"
                      }
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <p className="text-base text-text-primary font-medium">
                    {data?.data?.name}
                  </p>
                </div>
              </SelectTrigger>
              <SelectContent className="bg-white border-border-primary">
                <SelectItem value="logout" className="text-base">
                  Logout
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
