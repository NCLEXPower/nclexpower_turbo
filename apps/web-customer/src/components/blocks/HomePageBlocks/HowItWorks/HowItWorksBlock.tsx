import { PracticeTest, StudyCards, WatchVideos } from 'core-library/assets'
import Image from 'next/image'
import React from 'react'

interface Props { }

export const HowItWorksBlock: React.FC<Props> = (props) => {
    return (
        <div className='bg-[#f0f2f8] h-fit py-20 items-center justify-center flex'>
            <div className='w-full flex flex-col items-center'>
                <div className='flex flex-col gap-5 items-center px-10 text-center'>
                    <p className='text-4xl font-bold '><span className='text-[#0f2a71]'>Step-by-step</span>  till you pass! </p>
                    <p className='font-bold'>Elevate your learning and critical thinking like never before!</p>
                    <p>With the CORE-Zigma System, you will build your knowledge, confidence, and test-taking skills - step by step with our proven method!</p>
                </div>
                <div className='w-4/6 flex items-center justify-center py-10 flex-wrap gap-5 lg:gap-0'>
                    <div className='w-auto min-w-[200px] flex items-center flex-col hover:scale-105 transition-all duration-300'>
                        <Image src={WatchVideos} alt='WatchVideos' />
                        <p >Step 1 : <span className='text-[#0f2a71] font-bold'>By Watching</span></p>
                    </div>
                    <div className='w-auto min-w-[250px] flex items-center flex-col hover:scale-105 transition-all duration-300'>
                        <Image src={StudyCards} alt='StudyCards' />
                        <p>Step 2 : <span className='text-[#0f2a71] font-bold'>By Studying</span></p>
                    </div>
                    <div className='w-auto min-w-[250px] flex items-center flex-col hover:scale-105 transition-all duration-300'>
                        <Image src={PracticeTest} alt='PracticeTest' />
                        <p >Step 3 : <span className='text-[#0f2a71] font-bold'>By Doing</span></p>
                    </div>
                </div>
                <div className='lg:flex w-5/6 justify-center pt-10 '>
                    <div className='lg:w-2/5 lg:pl-16 text-center lg:text-left flex flex-col gap-5'>
                        <p className='text-4xl font-bold'>Watch  <span className='text-[#0f2a71]'> How it Works</span></p>
                        <p className='font-ptSansNarroxw text-lg'>See for yourself how to use our system, and how much fun and different it is to learn and prepare for NCLEX!</p>
                    </div>
                    <div className=' h-64 lg:w-3/5 px-5 flex justify-center'>
                        <div className='bg-[#0f2a71] w-full mt-5 lg:w-3/4 h-full rounded-lg' />
                    </div>
                </div>
            </div>
        </div>
    )
}

