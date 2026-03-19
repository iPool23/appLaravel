import { Title } from "../typography/Title";

interface CustomCardStaticsProps {
  centerText?: string;
  bottomText?: string;

  colorCard?: string;
  textCenterColor?: string;
  textBottomColor?: string;
}

export default function CustomCardStatics({
  centerText = "",
  bottomText = "",
  colorCard = "bg-[#061744]",
  textCenterColor = "text-white",
  textBottomColor = "text-white",
}: CustomCardStaticsProps) {
  return (
    <div
      className={`${colorCard} rounded-3xl p-10 pt-32 h-full flex flex-col shadow-lg`}
    >
      <Title
        title={centerText}
        fontSize="8xl"
        color="text-white"
        className={`${textCenterColor}`}
      />

      <Title
        title={bottomText}
        fontSize="xl"
        color="text-white"
        className={`${textBottomColor}`}
      />
    </div>
  );
}
