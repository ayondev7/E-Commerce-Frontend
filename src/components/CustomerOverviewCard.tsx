import React from "react";
import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  value: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
};

const CustomerOverviewCard: React.FC<Props> = ({ title, value, icon: Icon, iconBgColor, iconColor }) => {
  return (
    <div className="bg-white rounded-sm border border-border-primary p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-text-secondary text-base mb-2.5">{title}</p>
          <p className="text-3xl font-medium text-text-primary">{value}</p>
        </div>
        <div className={`w-14 h-14 p-3 rounded-full ${iconBgColor} flex items-center justify-center`}>
          <Icon className={`w-7 h-7 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default CustomerOverviewCard;
