import { Divider } from "../divider/Divider";

interface CustomCardProps {
  topText?: string;
  centerText?: string;
  bottomText?: string;

  colorCard?: string;
  textTopColor?: string;
  textCenterColor?: string;
  textBottomColor?: string;
}

export default function CustomCard({
  topText = "",
  centerText = "",
  bottomText = "",
  colorCard = "bg-white",
  textTopColor = "text-blue-600",
  textCenterColor = "text-blue-900",
  textBottomColor = "text-gray-600",
}: CustomCardProps) {
  return (
    <div
      className={`${colorCard} rounded-3xl p-10 h-full flex flex-col shadow-lg`}
    >
      <div className="mb-36">
        <span className={`text-sm ${textTopColor} font-medium tracking-wide`}>
          {topText}
        </span>
      </div>

      <h3
        className={`text-4xl font-bold ${textCenterColor} mb-8 leading-tight`}
      >
        {centerText}
      </h3>

      <Divider
        className="mb-6"
        showCircle={false}
        leftWidth={100}
        variant="white"
      />

      <p className={`${textBottomColor} leading-relaxed text-lg`}>
        {bottomText}
      </p>
    </div>
  );
}
