import React, { useState } from "react";
import Image from "next/image";
import {
  AnnouncementBg,
  AnnouncementCard1,
  AnnouncementCard2,
} from "core-library/assets";
import { RegAnnouncement } from "./RegAnnouncement";
import { AnnouncementListView } from "./AnnouncementListView";

const announcements = [
  {
    id: 1,
    title: "New Clinical Guidelines Released!",
    description: "Stay updated on the latest protocols.",
    date: "December 12, 2024",
    image: AnnouncementCard1,
  },
  {
    id: 2,
    title: "Upcoming Nursing Skills Workshop",
    description: "Enhance your expertise—join us!",
    date: "December 12, 2024",
    image: AnnouncementCard2,
  },
  {
    id: 3,
    title: "Shift Schedule Updates Effective Soon",
    description: "Stay updated on the latest protocols.",
    date: "December 12, 2024",
    image: null,
  },
  {
    id: 4,
    title: "Continuing Education Credits Available",
    description: "Enhance your expertise—join us!",
    date: "December 12, 2024",
    image: null,
  },
  {
    id: 5,
    title: "Patient Care Best Practices Update",
    description: "Stay updated on the latest protocols.",
    date: "December 12, 2024",
    image: null,
  },
  {
    id: 6,
    title: "Mandatory Training for Staff Nurses",
    description: "Enhance your expertise—join us!",
    date: "December 12, 2024",
    image: null,
  },
  {
    id: 7,
    title: "Mandatory Training for Staff Nurses",
    description: "Enhance your expertise—join us!",
    date: "December 12, 2024",
    image: null,
  },
  {
    id: 8,
    title: "Mandatory Training for Staff Nurses",
    description: "Enhance your expertise—join us!",
    date: "December 12, 2024",
    image: null,
  },
];

interface Props {}

export const AnnouncementBlock: React.FC<Props> = () => {
  const [isGrid, setIsGrid] = useState<boolean>(true);

  const handleClickView = () => {
    setIsGrid((prev) => !prev);
  };
  const handleClick = () => {};

  return (
    <div className="bg-gray-100 min-h-screen mx-auto">
      <header className="relative w-full bg-white">
        <div className="">
          <Image
            className="w-full h-[350px] relative object-cover mx-auto"
            loading="lazy"
            src={AnnouncementBg}
            alt="Announcement"
          />
        </div>
        <div className="relative z-10 py-10 px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 font-ptSans text-[#232323]">
            Announcement Page
          </h1>
          <p className="text-gray-600 mt-2 font-ptSans">
            <i>
              Discover the latest news, important updates, and upcoming events
              all in one place. Check back regularly to stay informed!
            </i>
          </p>
        </div>
      </header>

      <main className="container mx-auto py-10 px-4">
        <section className="mb-8">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-[18px] font-ptSans font-semibold mb-4 text-[#232323]">
              Latest Announcements
            </h2>
            <button
              className="font-ptSans text-[16px]-500 leading-[29px]"
              onClick={handleClickView}
            >
              Change View
            </button>
          </div>
        </section>
        {isGrid ? (
          <RegAnnouncement data={announcements} handleClick={handleClick} />
        ) : (
          <AnnouncementListView
            data={announcements}
            handleClick={handleClick}
          />
        )}
      </main>
    </div>
  );
};
