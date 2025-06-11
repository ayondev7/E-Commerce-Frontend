import { Check } from "lucide-react";

type TimelineStep = {
  label: string;
  value: string;
  done: boolean;
};

const timelineData: TimelineStep[] = [
  { label: "Order Placed", value: "May 15, 2025", done: true },
  { label: "Payment Confirmed", value: "May 15, 2025", done: true },
  { label: "Processed", value: "Waiting for processing", done: false },
  { label: "Shipped", value: "Not shipped yet", done: false },
  { label: "Delivered", value: "Waiting for delivery", done: false },
];

export default function Timeline() {
  return (
    <div className="bg-white p-5 border border-gray-300 rounded-md w-full max-w-xs">
      <div className="text-xl font-semibold mb-5">Timeline</div>
       
      <div className="relative">
        {timelineData.map((item, idx) => (
          <div key={idx} className="relative flex items-start pb-6 last:pb-0">
            
            {idx !== timelineData.length - 1 && (
              <div className="absolute left-3 top-6 w-px h-full bg-gray-300"></div>
            )}
            
           
            <div className="relative z-10 mr-4">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
                  item.done
                    ? "border-blue-500 text-blue-500"
                    : "border-gray-300 text-gray-300"
                } bg-white`}
              >
                <Check className="w-4 h-4" />
              </div>
            </div>
             
      
            <div className="flex-1">
              <div className="text-sm font-semibold text-black">{item.label}</div>
              <div className="text-sm text-gray-500">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}