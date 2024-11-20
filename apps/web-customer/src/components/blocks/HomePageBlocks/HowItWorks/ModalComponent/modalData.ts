/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import {
  PracticeCarouselOne,
  PracticeCarouselThree,
  PracticeCarouselTwo,
  StudyCarouselOne,
  StudyCarouselThree,
  StudyCarouselTwo,
  WatchVideosModal,
} from 'core-library/assets';

export const modalContent: {
  WatchVideos: {
    title: string;
    paragraphOne: string;
    paragraphTwo: string;
    image: string;
  };
  Study: {
    title: string;
    paragraphOne: string;
    paragraphTwo: string;
    carouselImages: string[];
  };
  Practice: {
    title: string;
    paragraphOne: string;
    paragraphTwo: string;
    carouselImages: string[];
  };
} = {
  WatchVideos: {
    title: 'Watch Videos',
    paragraphOne: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
    do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    paragraphTwo: ` Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    image: WatchVideosModal,
  },
  Study: {
    title: 'Study Cards',
    paragraphOne: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
    do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    paragraphTwo: ` Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    carouselImages: [StudyCarouselOne, StudyCarouselTwo, StudyCarouselThree],
  },
  Practice: {
    title: 'Practice Test',
    paragraphOne: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
    do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
    irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
    paragraphTwo: ` Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    carouselImages: [
      PracticeCarouselOne,
      PracticeCarouselTwo,
      PracticeCarouselThree,
    ],
  },
};

export const sliderConfig = {
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 500,
  fade: true,
  speed: 700,
  cssEase: 'linear',
  arrows: false,
};
