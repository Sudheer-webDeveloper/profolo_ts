"use client";

import Image from "next/image";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import logo from "../../public/assets/wta.png";
import { Faders } from "phosphor-react/dist";
import { checkPath } from "@/Constants/Constants";
import { useStateContext } from "@/contexts/StateContext";
import PostModal from "./PostModal";
import { List } from "lucide-react";

const Navbar: React.FC = () => {
  const { pathName, dummyUser, postModal } = useStateContext();

  return (
    <>
      <header className="w-full flex flex-col gap-2 ">
        <nav className="flex w-full justify-between items-center pr-2 bg-mainBg ">
          <section className="flex gap-2 items-center ">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16.3757 1.50124C18.3773 -0.500411 21.6227 -0.500413 23.6243 1.50124L38.4988 16.3757C40.5004 18.3773 40.5004 21.6227 38.4988 23.6243L23.6243 38.4988C21.6227 40.5004 18.3773 40.5004 16.3757 38.4988L1.50124 23.6243C-0.500412 21.6227 -0.500413 18.3773 1.50124 16.3757L16.3757 1.50124ZM30.55 15.6756L34.8745 20L20 34.8745L5.12554 20L20 5.12554L26.9257 12.0512L19.1991 19.7778L15.355 15.9337L11.7307 19.558L19.1991 27.0264L30.55 15.6756Z"
                fill="#574C95"
              />
              <path
                d="M34.8745 20L30.55 15.6756L19.1991 27.0264L11.7307 19.558L15.355 15.9337L19.1991 19.7778L26.9257 12.0512L20 5.12554L5.12554 20L20 34.8745L34.8745 20Z"
                fill="white"
              />
            </svg>
            <span className="text-[32px] max-lg:text-[25px] text-sidebar ">Profolo</span>
          </section>

          {/* search section */}
          <section className="bg-white hidden lg:flex items-center justify-start w-[30rem] px-1 py-5 h-9 rounded-sm gap-2 ">
            <label htmlFor="search" className="text-xl ml-1 text-[#515151] ">
              <CiSearch />{" "}
            </label>

            <input
              name="search"
              className="flex-1 bg-transparent outline-0 "
              placeholder="search"
            />
          </section>

          {/* WTA studios section */}
          <section className="items-center hidden lg:flex gap-2">
            <span className="mr-2.5 text-lg ">
              <FaBell />
            </span>

            <div className="relative justify-center rounded-2xl border w-[200px] p-3 flex">
              <Image
                alt="WTA"
                height={50}
                width={55}
                src={logo}
                className="bg-white absolute top-[0px] h-[50px] -left-2 rounded-xl object-contain p-1.5 "
              />

              <span className="font-semibold ml-5 tracking-[0.28px] ">
                WTA Studios
              </span>
              <span className="absolute -right-3 top-[15%] ">
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13.1006 1.20099C14.7019 -0.400329 17.2981 -0.400331 18.8994 1.20099L30.799 13.1006C32.4003 14.7019 32.4003 17.2981 30.799 18.8994L18.8994 30.799C17.2981 32.4003 14.7019 32.4003 13.1006 30.799L1.20099 18.8994C-0.400329 17.2981 -0.40033 14.7019 1.20099 13.1006L13.1006 1.20099ZM24.44 12.5404L27.8996 16L16 27.8996L4.10043 16L16 4.10043L21.5406 9.641L15.3593 15.8223L12.284 12.7469L9.38454 15.6464L15.3593 21.6211L24.44 12.5404Z"
                    fill="#1AA94A"
                  />
                  <path
                    d="M27.8996 16L24.44 12.5404L15.3593 21.6211L9.38454 15.6464L12.284 12.7469L15.3593 15.8223L21.5406 9.641L16 4.10043L4.10043 16L16 27.8996L27.8996 16Z"
                    fill="white"
                  />
                </svg>
              </span>
            </div>
          </section>
          <div className="lg:hidden flex ">
            <List size={25} />
          </div>
        </nav>

        <div className="flex justify-between my-3">
          <span className="text-xl">
            {" "}
            {pathName.includes("/profile") ? (
              <>
                <h2 className="font-medium text-2xl max-lg:text-lg ">
                  Welcome to Profolo, {dummyUser?.name || ""}{" "}
                </h2>
              </>
            ) : (
              checkPath(pathName)
            )}
          </span>
          <span className="pr-1">
            <Faders size={20} />
          </span>
        </div>
      </header>

      {postModal && <PostModal />}
    </>
  );
};

export default Navbar;


