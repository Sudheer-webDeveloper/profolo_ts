"use client";

import { GoHomeFill } from "react-icons/go";
import { IoBag, IoPeopleSharp } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

import postBy from "../../public/assets/postBy.png";

export { postBy };

export const checkPath = (pathName: string): JSX.Element | null => {
  switch (pathName) {
    case "/":
      return <GoHomeFill />;
    case "/jobs":
      return <IoBag />;
    case "/candidates":
      return <IoPeopleSharp />;
    case "/chat":
      return <IoChatbubbleEllipsesOutline />;
    default:
      return null;
  }
};


