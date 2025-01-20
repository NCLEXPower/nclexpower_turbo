/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */

interface ContentSectionProps {
  title: string;
  paragraphOne: string;
  paragraphTwo: string;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  paragraphOne,
  paragraphTwo,
}) => (
  <div className='w-full sm:w-1/2 h-[66.67vh] sm:h-full p-6 sm:p-8 flex flex-col justify-start'>
    <h1 className='text-[#60AEF0] text-lg sm:text-2xl md:text-3xl font-bold font-ptSans mb-3 sm:mb-6 md:mb-8'>
      {title}
    </h1>
    <p className='text-xs sm:text-sm md:text-base lg:text-lg leading-4 sm:leading-6 md:leading-7 font-ptSans indent-6 mb-2 sm:mb-4 md:mb-6'>
      {paragraphOne}
    </p>
    <p className='text-xs sm:text-sm md:text-base lg:text-lg leading-4 sm:leading-6 md:leading-7 font-ptSans indent-6 mt-2 sm:mt-4 md:mt-6'>
      {paragraphTwo}
    </p>
  </div>
);
