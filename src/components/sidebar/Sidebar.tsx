"use client";

import React from "react";
import sidebarView from "../../config/SidebarView.json";

import Link from "next/link";
import { TbGridDots } from "react-icons/tb";
import { useStateContext } from "@/contexts/StateContext";
import {
  IoBag,
  IoPeopleSharp,
  IoChatbubbleEllipsesOutline,
} from "react-icons/io5";
import { GoHomeFill } from "react-icons/go";

export const iconMapping: { [key: string]: React.ComponentType } = {
  GoHomeFill,
  IoBag,
  IoPeopleSharp,
  IoChatbubbleEllipsesOutline,
};

const Sidebar: React.FC = () => {
  const pathName = useStateContext();

  return (
    <section className="bg-sidebar h-full flex flex-col gap-3 items-center">
      <section className="w-full border-b p-4 mx-auto border-b-[#8A8A8A] hover:border-b-[#6B6B6B] flex justify-center items-center">
        <span className="text-2xl text-white">
          <TbGridDots />
        </span>
      </section>

      <section className="py-4 flex flex-col gap-8 w-full">
        {sidebarView.map((item: { icon: string; href: string; label: string }) => {
          const IconComponent = iconMapping[item.icon];
          return (
            <Link
              href={item.href}
              key={item.label}
              className={`flex w-full justify-center items-center gap-1.5 flex-col text-white transition-all ${
                item.href === pathName.pathName ? `border-l-[3px] border-white` : ""
              }`}
            >
              <span className="text-2xl mb-1">
                {IconComponent && <IconComponent />}
              </span>
              <span className="text-[12px] text-[#C7C7C7]">{item.label}</span>
            </Link>
          );
        })}
      </section>
    </section>
  );
};

export default Sidebar;

export const MobileSidebar: React.FC = () => {
  const pathName = useStateContext();
  return (
    <section className="bg-sidebar w-[100%] h-[80px] flex flex-col gap-3 items-center">
      <section className="py-4 flex gap-8 w-full">
        {sidebarView.map((item: { icon: string; href: string; label: string }) => {
          const IconComponent = iconMapping[item.icon];
          return (
            <Link
              href={item.href}
              key={item.label}
              className={`flex w-full justify-center items-center gap-1.5 flex-col text-white transition-all ${
                item.href === pathName.pathName ? `border-b-[3px] border-white` : ""
              }`}
            >
              <span className="text-2xl mb">
                {IconComponent && <IconComponent />}
              </span>
              <span className="text-[12px] text-[#C7C7C7] mb-1">
                {item.label}
              </span>
            </Link>
          );
        })}
      </section>
    </section>
  );
};


