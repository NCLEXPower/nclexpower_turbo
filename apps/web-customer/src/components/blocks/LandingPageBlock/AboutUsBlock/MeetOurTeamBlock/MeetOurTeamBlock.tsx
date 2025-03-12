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
      className='w-full h-auto overflow-hidden bg-darkBlue py-[clamp(1px,11.1628vw,96px)] md:py-[clamp(1px,4.999998vw,96px)]'
    >
      <Box className='flex flex-col w-full items-center p-10 gap-10'>
        <div className='flex flex-col gap-4 items-center'>
          <h4 className='font-ptSans text-[26px] md:text-[38px] text-yellow font-bold'>
            Meet our Core Team
          </h4>
          <div className='flex flex-col lg:flex-row gap-2 lg:gap-8 text-center'>
            {executivesMockData.map((item) => {
              const { id, name, division } = item;
              return (
                <>
                  <div className='flex flex-col' key={id}>
                    <h4 className='font-ptSansNarrow text-[22px] lg:text-[30px] text-yellow font-bold'>
                      {name}
                    </h4>
                    <h5 className='font-ptSansNarrow text-[18px] lg:text-[24px] text-white font-bold'>
                      {division}
                    </h5>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <Tabs tabsItem={tabs} justifyContent='center' customStyle={tabStyles} />
      </Box>
    </section>
  );
};
