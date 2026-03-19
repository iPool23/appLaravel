import { ReactNode } from "react";
import { MdFoundation } from "react-icons/md";

interface CustomCardIconProps {
  icon?: ReactNode;
  centerText?: string;
  bottomText?: string;
  colorCard?: string;
  iconColor?: string;
  textCenterColor?: string;
  textBottomColor?: string;
}

export default function CustomCardIcon({
  icon = <MdFoundation />,
  centerText = "Service Title",
  bottomText = "Service description goes here.",
  colorCard = "bg-white dark:bg-cb-900",
  iconColor = "text-cr-600",
  textCenterColor = "text-cb-800 dark:text-white",
  textBottomColor = "text-cb-600 dark:text-cb-300",
}: CustomCardIconProps) {
  return (
    <div className="cursor-default group w-full h-full">
      <div
        className={`${colorCard} rounded-2xl p-8 h-full flex flex-col items-center text-center transition-all duration-300`}
      >
        <div className={`${iconColor} p-4 rounded-2xl`}>
          <div className="text-7xl">
            {icon}
          </div>
        </div>

        <h3
          className={`text-xl font-bold ${textCenterColor} mb-4 leading-tight group-hover:text-cr-700 dark:group-hover:text-cr-400 transition-colors duration-300`}
        >
          {centerText}
        </h3>

        <p className={`${textBottomColor} leading-relaxed text-sm font-light`}>
          {bottomText}
        </p>
      </div>
    </div>
  );
}
