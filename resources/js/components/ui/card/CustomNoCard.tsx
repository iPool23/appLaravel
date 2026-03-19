import { Divider } from "../divider/Divider";

interface CustomNoCardProps {
  topText?: string;
  centerText?: string;
  bottomText?: string;

  colorCard?: string;
  textTopColor?: string;
  textCenterColor?: string;
  textBottomColor?: string;
}

export default function CustomNoCard({
  topText = "",
  centerText = "",
  bottomText = "",
  colorCard = "bg-transparent dark:bg-cb-full",
  textTopColor = "text-blue-900 dark:text-cb-200",
  textCenterColor = "text-blue-900 dark:text-cb-100",
  textBottomColor = "text-gray-600 dark:text-cb-300",
}: CustomNoCardProps) {
  return (
    <div
      className={`${colorCard} h-full flex flex-col`}
    >
      <h3
        className={`text-2xl font-bold ${textTopColor} mb-8 leading-tight`}
      >
        {topText}
      </h3>

      <Divider
        className="mb-6"
        showCircle={false}
        leftWidth={100}
        variant="white"
      />

      <h3
        className={`text-2xl font-bold ${textCenterColor} mb-4 leading-tight`}
      >
        {centerText}
      </h3>

      <p className={`${textBottomColor} leading-relaxed text-base text-cb-500`}>
        {bottomText}
      </p>
    </div>
  );
}
