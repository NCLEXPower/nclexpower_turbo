import React from "react";
import { EvaIcon } from "core-library/components";

interface Props {
  data: any;
  handleClick: () => void;
}

export const AnnouncementListView: React.FC<Props> = ({
  data,
  handleClick,
}) => {
  return (
    <div className="h-[680px] w-full overflow-auto">
      <div className="p-8 flex flex-col gap-4">
        {data.length > 0 &&
          data.map((item: any) => (
            <div className="w-full h-full flex justify-center items-center bg-white p-4 shadow-lg transition rounded-[23px]">
              <div className="w-60px p-4 border-r-2 border-[#999999]">
                <div
                  style={{
                    transform: "rotate(-15deg)",
                  }}
                >
                  <EvaIcon
                    name="message-square-outline"
                    fill="#434343"
                    width={50}
                    height={50}
                  />
                </div>
              </div>

              <div className="p-4 flex justify-between w-full">
                <div className="">
                  <h3 className="text-[20px] text-[#4D4D4D] font-ptSans font-semibold leading-7">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1 text-[#4D4D4D]">
                    {item.description}
                  </p>
                </div>
                <p className="text-gray-500 text-[15px] mt-2 text-[#A7A7A7]">
                  Updated: {item.date}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
