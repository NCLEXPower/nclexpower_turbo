import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

interface TeamBlockProps {
  data: { id: number; name: string; division: string }[];
  icon: string;
  iconAlt: string;
}

export const TeamBlock: React.FC<TeamBlockProps> = ({ data, icon, iconAlt }) => (
<Box className="flex w-full mx-auto justify-center mt-0 lg:mt-[-40px]">
    <Box className="flex flex-col lg:flex-row items-end bg-[#D7DCE8E5] rounded-[8px]">
    <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6 lg:p-12">
      {data.map((item) => {
        const { id, name, division } = item;
        return (
          <div key={id}>
            <h4 className="font-ptSansNarrow text-[18px] text-darkBlue font-bold">
              {name}
            </h4>
            <h4 className="font-ptSansNarrow text-[18px] text-[#6C6C6C] font-regular">
              {division}
            </h4>
          </div>
        );
      })}
    </Box>
    <Image src={icon} alt={iconAlt} width={208} height={228} className="lg:block hidden" />
  </Box>
</Box>
  
);
