/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

interface ContentSectionProps {
  title: string;
  paragraphOne: string;
  paragraphTwo: string;
  paragraphThree?: string;
  bullets?: string[];
  type: 'WatchVideos' | 'Study' | 'Practice';
}

const contentStyles = {
  WatchVideos: { width: 'md:w-[clamp(1px,23.438vw,900px)]', padding: 'px-md-4 ps-5' },
  Practice: { width: 'md:w-[clamp(1px,25.782vw,990px)]', padding: 'px-md-4 ps-5' },
  Study: { width: 'md:w-[clamp(1px,25.782vw,990px)]', padding: 'px-md-4 pe-5' },
};

export const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  paragraphOne,
  paragraphTwo,
  type,
  paragraphThree,
  bullets,
}) => (
  <div className={`${contentStyles[type].width} ${contentStyles[type].padding} flex flex-col justify-start py-5 py-md-4`}>
    <h1 className='text-[#60AEF0] text-[clamp(1px,5.5814vw,64px)] md:text-[clamp(1px,1.666665vw,64px)] font-bold font-ptSans mb-5 mb-md-3'>
      {title}
    </h1>
    <p className='text-[clamp(1px,4.18604vw,40px)] md:text-[clamp(1px,1.041665vw,40px)]  font-ptSans mb-5 mb-md-3'>
      {paragraphOne}
    </p>
    <p className='text-[clamp(1px,4.18604vw,40px)] md:text-[clamp(1px,1.041665vw,40px)]  font-ptSans mt-5'>
      {paragraphTwo}
    </p>
    {bullets && (
      <ul className='list-disc pl-6 mt-3 space-y-1'>
        {bullets.map((bullet, index) => (
          <li key={index} className='text-xs sm:text-sm leading-4 sm:leading-5 font-ptSans text-gray-200'>
            {bullet}
          </li>
        ))}
      </ul>
    )}
    {paragraphThree && (
      <p className='text-xs sm:text-sm md:text-base lg:text-lg leading-4 sm:leading-6 md:leading-7 font-ptSans indent-6 mt-2 sm:mt-4 md:mt-6'>
        {paragraphThree}
      </p>
    )}
  </div>
);
