
import { Link } from '@inertiajs/react';
import { FaClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Line from "../line";

interface CustomCardImageRegionProps {
  image?: string;
  src?: string;
  srcImage?: string;
  region?: string;
  charge?: string;
  slug?: string;
  schedule?: {
    mondayFriday: string;
    saturday: string;
    sunday: string;
  };
  location?: string;
}

export default function CustomCardImageRegion({
  image,
  srcImage = "/imgs/placeholder.webp",
  region = "No definido",
  charge = "Recepción General",
  slug = "/",
  schedule,
  location = "No definido",
}: CustomCardImageRegionProps) {
  return (
    <div className="relative w-full">
      <Link href={slug} className="cursor-pointer group">
        <div className="bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start p-4 sm:p-6 gap-4 sm:gap-6">
            <div className="relative flex-shrink-0 mx-auto sm:mx-0">
              {image && (
                <div className="absolute -top-2 -left-2 z-10 bg-red-600 text-white overflow-hidden shadow-lg">
                  <div className="bg-red-600 text-white w-8 h-12 sm:w-12 sm:h-16 flex flex-col items-center justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 text-white">
                      <img
                        src={image}
                        alt="Icon"
                        width={32}
                        height={32}
                        className="object-cover filter brightness-0 invert w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden">
                <img
                  src={srcImage}
                  alt={region}
                  fill
                  sizes="(max-width: 640px) 128px, 160px"
                  className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </div>
            </div>

            <div className="flex-1 min-w-0 self-center text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <FaClock className="text-cr-600" />
                  <span className="text-xs sm:text-sm text-gray-600">
                    Lun-Vie: {schedule?.mondayFriday || "No definido"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FaClock className="text-cr-600" />
                  <span className="text-xs sm:text-sm text-gray-600">
                    Sáb: {schedule?.saturday || "No definido"}
                  </span>
                </div>
              </div>

              <h2 className="text-base sm:text-lg font-bold text-cb-default group-hover:text-cr-600 mb-2 leading-tight transition-colors duration-300">
                {region}
              </h2>

              <p className="text-xs sm:text-sm text-gray-600 mb-3 overflow-hidden" style={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                {charge}
              </p>

              <div className="block sm:hidden">
                <Line alignment="center" width={200} height={1} rounded={false} />
              </div>

              <div className="hidden sm:block">
                <Line alignment="left" width={200} height={1} rounded={false} />
              </div>

              <div className="flex items-start justify-center sm:justify-start mt-4 gap-2 text-xs sm:text-sm text-gray-500 self-center">
                <FaLocationDot className="mt-0.5 flex-shrink-0" />
                <span className="overflow-hidden text-center sm:text-left" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical'
                }}>{location || "Ubicación no definida"}</span>
              </div>

            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

