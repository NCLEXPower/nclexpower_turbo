/**
 * Property of the Arxon Solutions, LLC.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import React from "react";
import Image, { StaticImageData } from "next/image";
import {
  ListViewIcon,
  GridViewIcon,
  AvailableIcon,
  InProgressIcon,
  CompletedIcon,
} from "core-library/assets";

interface Props {
  title?: string;
  subtitle?: string;
  handleClick?: () => void;
  listView?: boolean;
}

interface StatusItemProps {
  icon: StaticImageData;
  label: string;
  altText: string;
}

const StatusItem: React.FC<StatusItemProps> = ({ icon, label, altText }) => (
  <div className="flex items-center gap-1">
    <Image src={icon} alt={altText} width={16} height={16} />
    <h4 className="text-black font-ptSansNarrow font-regular text-[16px]">
      {label}
    </h4>
  </div>
);

const statusItems = [
  { icon: AvailableIcon, label: "Available", altText: "Available" },
  { icon: InProgressIcon, label: "In Progress", altText: "In-Progress" },
  { icon: CompletedIcon, label: "Completed", altText: "Completed" },
];

export const ProgramHeader: React.FC<Props> = ({
  title,
  subtitle,
  listView,
  handleClick,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex w-full justify-between bg-gradient-to-r from-mainBlue to-[#181E2F] rounded-t-[16px] px-4 py-2">
        <h4 className="text-white text-[20px] font-ptSansNarrow font-bold">
          {title}
        </h4>
        <Image
          src={listView ? GridViewIcon : ListViewIcon}
          alt="toggle icon"
          width={20}
          height={16}
          onClick={handleClick}
          className="cursor-pointer"
          data-testid="toggle-icon"
        />
      </div>
      <div className="flex flex-col lg:flex-row w-full justify-between bg-white rounded-b-[16px] px-4 py-2 gap-2 lg:gap-0">
        <h4 className="text-black text-[18px] font-ptSansNarrow font-regular">
          {subtitle}
        </h4>
        <div className="flex gap-4">
          {statusItems.map((item, index) => {
            const { icon, label, altText } = item;
            return (
              <StatusItem
                key={index}
                icon={icon}
                label={label}
                altText={altText}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
