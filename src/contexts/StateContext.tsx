"use client";

import { usePathname } from "next/navigation";
import React, { createContext, useState, useContext, ReactNode } from "react";
import profileImg from "../../public/assets/verifiedProfile.png";
import { postBy } from "@/Constants/Constants";
import { makeNetworkCall } from "@/utilities/utils";
import type { StaticImageData } from "next/image"; // Import the type

interface DummyUser {
  userId: string;
  name: string;
  city: string;
  profile: string;
  isVerified: boolean;
  profileImg: string | StaticImageData; // Allow both string and StaticImageData
  profileComplete: number;
}

interface Post {
  id: string;
  desc: string;
  post_image: string;
  profileImg: string | StaticImageData; // Update if necessary
  personName: string;
  work: string;
  timeAgo: string;
  likes: string;
  comments: string;
  shares: string;
}

interface StateContextProps {
  pathName: string;
  postModal: boolean;
  setPostModal: React.Dispatch<React.SetStateAction<boolean>>;
  dummyUser: DummyUser;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  submitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  loadingTerm: string;
  setLoadingTerm: React.Dispatch<React.SetStateAction<string>>;
  fetchPostsData: () => Promise<void>;
  editingPost: (post: Post) => void;
  editingItem: Partial<Post>;
  setEditingItem: React.Dispatch<React.SetStateAction<Partial<Post>>>;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

const StateContext = createContext<StateContextProps | undefined>(undefined);

interface StateContextProviderProps {
  children: ReactNode;
}

export const StateContextProvider: React.FC<StateContextProviderProps> = ({
  children,
}) => {
  const pathName = usePathname();

  const [dummyUser] = useState<DummyUser>({
    userId: "SIN177",
    name: "Sindhu Uppalapati",
    city: "Hyderabad",
    profile: "",
    isVerified: true,
    profileImg: profileImg, // This is now correctly typed
    profileComplete: 33,
  });

  const [postModal, setPostModal] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [loadingTerm, setLoadingTerm] = useState("");
  const [edit, setEdit] = useState(false);
  const [editingItem, setEditingItem] = useState<Partial<Post>>({});

  const fetchPostsData = async () => {
    try {
      const { data } = await makeNetworkCall("", "", "get");
      const newPosts = data.map((item: any) => ({
        ...item,
        profileImg: postBy,
        personName: "Ethan Marques",
        work: "Product Designer at Dell Techno",
        timeAgo: "24m ago",
        likes: "20",
        comments: "30",
        shares: "10",
      }));
      setPosts(newPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const editingPost = (post: Post) => {
    setPostModal(true);
    setEdit(true);
    const { id, desc, post_image } = post;
    setEditingItem({ id, desc, post_image });
    console.log("Editing post:", post);
  };

  return (
    <StateContext.Provider
      value={{
        pathName,
        postModal,
        setPostModal,
        dummyUser,
        posts,
        setPosts,
        submitting,
        setSubmitting,
        loadingTerm,
        setLoadingTerm,
        fetchPostsData,
        editingPost,
        editingItem,
        setEditingItem,
        edit,
        setEdit,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextProps => {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error("useStateContext must be used within a StateContextProvider");
  }
  return context;
};
