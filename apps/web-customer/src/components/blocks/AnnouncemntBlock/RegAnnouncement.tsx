import { AnnouncementCard1, AnnouncementCard2 } from "core-library/assets";
import Image from "next/image";
import React from "react";

interface Props {
  data: any;
  handleClick: () => void;
}

export const RegAnnouncement: React.FC<Props> = ({ data, handleClick }) => {
  return (
    <section>
      <div className="h-fit  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="relative h-full w-full rounded-[10px] shadow-lg flex flex-col justify-between">
          <div className="h-full w-full rounded-[10px] overflow-hidden">
            <Image
              loading="lazy"
              src={AnnouncementCard1}
              alt="sample"
              className="w-full h-full"
            />
          </div>
          <div className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-black/50 via-transparent to-transparent text-[#ffff]">
            <div className="p-4">
              <h3 className="text-[20px] text-[#4D4D4D] font-ptSans font-semibold leading-7 text-[#ffff]">
                Sample Title
              </h3>
              <p className="text-sm mt-1 text-[#4D4D4D] text-[#ffff]">
                Sample description
              </p>
              <p className="text-[15px] mt-2 text-[#ffff] leading-[29px]">
                Updated: Sample Date
              </p>
            </div>
          </div>
        </div>
        <div className="h-full w-full rounded-[10px]  shadow-lg flex flex-col justify-between p-4">
          <div className="h-full w-full rounded-[10px]">
            <Image
              loading="lazy"
              src={AnnouncementCard2}
              alt="sample"
              className="w-full h-full"
            />
          </div>
          <div className="p-4">
            <h3 className="text-[20px] text-[#4D4D4D] font-ptSans font-semibold leading-7">
              sample title
            </h3>
            <p className="text-gray-600 text-sm mt-1 text-[#4D4D4D]">
              sample description
            </p>
            <p className="text-gray-500 text-[15px] mt-2 text-[#A7A7A7]">
              Updated: sample date
            </p>
          </div>
        </div>
        <div className="h-full w-full flex flex-col gap-4">
          {data.length > 0 &&
            data.slice(0, 3).map((item: any) => (
              <div
                key={item.id}
                className="bg-white rounded-lg p-4 shadow-lg transition"
              >
                <h3 className="text-[20px] text-[#4D4D4D] font-ptSans font-semibold leading-7">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1 text-[#4D4D4D]">
                  {item.description}
                </p>
                <p className="text-gray-500 text-[15px] mt-2 text-[#A7A7A7]">
                  Updated: {item.date}
                </p>
              </div>
            ))}
        </div>
      </div>
      <hr className="border border-gray-400 opacity-50 my-10" />
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        onClick={handleClick}
      >
        {data.length > 0 &&
          data.slice(2).map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-4 shadow-lg transition"
            >
              <h3 className="text-[20px] text-[#4D4D4D] font-ptSans font-semibold leading-7">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mt-1 text-[#4D4D4D]">
                {item.description}
              </p>
              <p className="text-gray-500 text-[15px] mt-2 text-[#A7A7A7]">
                Updated: {item.date}
              </p>
            </div>
          ))}
      </div>
    </section>
  );
};
