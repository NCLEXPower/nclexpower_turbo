/**
 * Property of the Arxon Solutions, LLC.
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
} from "core-library/assets";

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
    paragraphThree: string;
    carouselImages: string[];
  };
  Practice: {
    title: string;
    paragraphOne: string;
    paragraphTwo: string;
    bullets: string[];
    carouselImages: string[];
  };
} = {
  WatchVideos: {
    title: "Watch Videos",
    paragraphOne: `Tutorial videos done right – short, simple, and stunningly sweet!`,
    paragraphTwo: ` Our training videos are planned and produced using learner-centric principles, providing maximum engagement with minimum amount of watching time. With complete topic integration to our Content Cards and Test Simulator, delivered with state-of-the-art 2D and 3D graphics, you'll come to realize how unique and effective our videos are! `,
    image: WatchVideosModal,
  },
  Study: {
    title: "Study Cards",
    paragraphOne: `Made specifically for nursing exam review, our content cards reflect our unique CORE-Zigma design methodology.`,
    paragraphTwo: ` More than just your typical flash cards, these are designed from the ground-up with a distinct game cards look! Each card presents topic information in content-dense yet stunningly visual-rich layout that is sure to wow!`,
    paragraphThree: `Recall facts faster with our Content and Med Cards – there is nothing like it out there!`,
    carouselImages: [StudyCarouselOne, StudyCarouselTwo, StudyCarouselThree],
  },
  Practice: {
    title: "Practice Test",
    paragraphOne: `There are simulators, and then there are simulators. Most would have you do three (3) computer adaptive mock exams, or have a limited-size test bank altogether.`,
    paragraphTwo: ` Backed by the CORE-Zigma system, our simulator leaves the competition behind by giving you:`,
    bullets: [
      "The ability to answer sample questions in a daily topic-focused schedule",
      "Computer-adaptive test algorithm from the very beginning at Day 1 – and NOT just on the final day of review!",
      "Unlimited number of takes for the final CAT exam (and not just 3!)",
      "Performance tracking at every day of your review",
    ],
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
  speed: 3000,
  cssEase: "linear",
  arrows: false,
};
