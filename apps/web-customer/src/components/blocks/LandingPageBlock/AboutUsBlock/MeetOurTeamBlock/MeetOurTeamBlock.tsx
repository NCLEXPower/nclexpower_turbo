import React from 'react';
import { Box } from '@mui/material';
import {
  nursesMockData,
  engineersMockData,
  executivesMockData,
} from '../../../../../core/constant/AboutUsMock/MeetOurTeamMock';
import { NurseIcon, EngineerIcon } from 'core-library/assets';
import { TeamBlock } from './TeamBlock';
import { Tabs } from 'core-library/components';
import { TabsItem } from 'core-library/core/utils/contants/tabs-item';

export const MeetOurTeamBlock = () => {
  const tabs: TabsItem[] = [
    {
      id: 1,
      title: 'Nurses',
      content: (
        <TeamBlock
          data={nursesMockData}
          icon={NurseIcon}
          iconAlt='Nurse Icon'
        />
      ),
    },
    {
      id: 2,
      title: 'Engineers',
      content: (
        <TeamBlock
          data={engineersMockData}
          icon={EngineerIcon}
          iconAlt='Engineer Icon'
        />
      ),
    },
  ];

  const tabStyles = {
    background: 'transparent',
    selectedColor: '#F4C501',
    defaultColor: '#ffffff',
    borderBottom: '2px solid #F4C501',
    defaultBorderBottom: "2px solid #ffffff"
  };

  return (
    <section
      id='myTeam'
      className='w-full h-auto overflow-hidden bg-darkBlue pb-10'
    >
      <div className='container'>
        <Box className='flex flex-col w-full items-center'>
          <div className='flex flex-col items-center'>
            <h4 className='font-Poppins text-[clamp(1px,7.44185vw,70px)] md:text-[clamp(1px,2.5vw,96px)] text-yellow font-bold mb-3'>
              Meet our Core Team
            </h4>
            <div className='flex flex-col md:flex-row gap-2 md:gap-8 text-center mb-5'>
              {executivesMockData.map((item) => {
                const { id, name, division } = item;
                return (
                  <div className='flex flex-col' key={id}>
                    <h4 className='font-ptSans text-[clamp(1px,5.5814vw,60px)] md:text-[clamp(1px,1.5625vw,60px)] text-yellow font-bold'>
                      {name}
                    </h4>
                    <h5 className='font-ptSans text-[clamp(1px,4.65116vw,48px)] md:text-[clamp(1px,1.25vw,48px)] text-white font-bold'>
                      {division}
                    </h5>
                  </div>
                );
              })}
            </div>
          </div>
          <Tabs tabsItem={tabs} justifyContent='center' customStyle={tabStyles} />
        </Box>
      </div>
    </section>
  );
};
