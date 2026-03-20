
import { Link } from '@inertiajs/react';

interface CustomCardImageNoBorderProps {
  src?: string;
  topText?: string;
  centerText: string;
  bottomText?: string;
}

export default function CustomCardImageNoBorder({
  src = "/imgs/placeholder.webp",
  topText = "",
  centerText = "",
  bottomText = "",
}: CustomCardImageNoBorderProps) {
  return (
    <Link href="/" className="cursor-pointer">
      <div
        className={`h-full flex flex-col overflow-hidden`}
      >
        <div className="overflow-hidden rounded-2xl mb-8">
          <img
            src={src}
            alt="Campaign image"
            width={760}
            height={579}
            className="rounded-2xl transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>

        <p className={`leading-relaxed text-cb-600 dark:text-cb-400 text-base mb-2`}>
          {topText}
        </p>
        <h3
          className={`text-2xl font-bold mb-2 text-cb-800 dark:text-cb-200 leading-tight`}
        >
          {centerText}
        </h3>

        <p className={`leading-relaxed text-base text-cb-400 dark:text-cb-500`}>
          {bottomText}
        </p>
      </div>
    </Link>
  );
}

