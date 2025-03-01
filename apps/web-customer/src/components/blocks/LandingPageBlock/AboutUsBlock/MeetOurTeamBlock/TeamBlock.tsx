import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';

interface TeamBlockProps {
  data: { id: number; name: string; division: string }[];
  icon: string;
  iconAlt: string;
}

export const TeamBlock: React.FC<TeamBlockProps> = ({ data, icon, iconAlt }) => (
  <Box className="flex w-full mx-auto justify-center mb-3 ">
    <Box className="flex flex-col md:flex-row items-end bg-[#D7DCE8E5] rounded-lg">
      <Box className="flex flex-wrap gap-2 p-5">
        {data.map((item) => {
          const { id, name, division } = item;
          return (
            <div key={id} className='py-2 w-full md:w-[clamp(1px,15.625vw,600px)] text-center md:text-left'>
              <h4 className="font-ptSans text-[clamp(1px,3.72092vw,36px)] md:text-[clamp(1px,0.9375vw,36px)] text-darkBlue font-bold">
                {name}
              </h4>
              <h4 className="font-ptSans text-[clamp(1px,3.72092vw,36px)] md:text-[clamp(1px,0.9375vw,36px)] text-[#6C6C6C] font-regular">
                {division}
              </h4>
            </div>
          );
        })}
      </Box>
      <Image src={icon} alt={iconAlt} className="md:block hidden w-[clamp(1px,10.84vw,420px)] h-auto" />
    </Box>
  </Box>

);
