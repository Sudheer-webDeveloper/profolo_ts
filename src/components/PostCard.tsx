"use client";

import Image from "next/image";
import {
  ChatCenteredDots,
  DotsThreeVertical,
  PaperPlaneTilt,
  ShareNetwork,
  ThumbsUp,
} from "phosphor-react/dist";
import React, { useState } from "react";
import { Card } from "./ui/card";

import recentFriends from '../config/RecentFriends.json';
import { useStateContext } from "@/contexts/StateContext";
import { makeNetworkCall } from "@/utilities/utils";

interface Post {
  id: string;
  personName: string;
  work: string;
  timeAgo: string;
  profileImg: string;
  desc: string;
  post_image: string;
  likes: number;
  comments: number;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    dummyUser,
    loadingTerm,
    setLoadingTerm,
    setSubmitting,
    submitting,
    fetchPostsData,
    editingPost,
  } = useStateContext();
  const [actionRow, setActionRow] = useState<string | null>(null);

  const toggleActionRow = (id: string) => {
    if (actionRow === id) {
      setActionRow(null);
    } else {
      setActionRow(id);
    }
  };

  const deletePost = async (id: string) => {
    try {
      setSubmitting(true);
      setLoadingTerm("delete_post");
      await makeNetworkCall(`delete/${id}`, "", "delete");
      await fetchPostsData();
      setLoadingTerm("");
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingTerm("");
      setSubmitting(false);
    }
  };

  return (
    <Card className="p-4 bg-white rounded-2xl flex flex-col gap-4 ">
      <div className="post_by flex justify-between">
        <div>
          <div className="flex gap-2 items-start">
            {/* <Image
              src={post?.profileImg}
              alt={post.personName || "img"}
              width={50}
              height={50}
              className="h-[50px] w-[50px]  object-contain"
            /> */}

            <div className="flex text-sm flex-col gap-1">
              <span className="font-light">{post.personName}</span>
              <span className="font-light text-[#515151]">
                {post.work} | {post.timeAgo}
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => toggleActionRow(post.id)}
            className=" hover:text-gray-900"
          >
            <DotsThreeVertical size={22} />
          </button>

          {actionRow === post.id && (
            <div className="absolute text-sm right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
              <ul className="text-left">
                <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  <button 
                    className=" w-full h-full text-left"
                    onClick={() => editingPost(post)}
                  > 
                    Edit
                  </button>
                </li>
                <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  <button
                    onClick={() => deletePost(post.id)}
                    disabled={submitting || loadingTerm === "delete_post"}
                    className=" w-full h-full text-left"
                  >
                    {loadingTerm === "delete_post" ? "deleting..." : "delete"}
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <p className="text-sm w-full leading-6 text-[#515151]">{post?.desc}</p>

      <Image
        src={post?.post_image}
        alt={post.desc || "img"}
        width={100}
        height={50}
        className=" w-full max-h-[373px] rounded-lg  object-contain"
      />

      <div className="social_media_status flex gap-2 text-sm  ">
        <span className="flex  gap-1 text-[#515151] ">
          <ThumbsUp size={20} /> {post.likes}{" "}
        </span>
        <span className="flex gap-1 text-[#515151] ">
          <ChatCenteredDots size={20} /> {post.comments}{" "}
        </span>
        <span className="flex gap-1 text-[#515151] ">
          {" "}
          <ShareNetwork size={20} /> {post.comments}{" "}
        </span>
      </div>

      <div className="flex gap-1 w-full items-center">
        <Card className="w-full gap-3 flex max-h-10 overflow-hidden items-center p-2 rounded-3xl ">
          <Image
            src={dummyUser?.profileImg}
            alt={dummyUser?.name || "img"}
            width={30}
            height={30}
            className=" flex rounded-full  "
          />
          <textarea
            className="outline-none flex-1  overflow-scroll resize-none bg-transparent placeholder-gray-500 translate-y-5 placeholder:text-sm  "
            placeholder="Comment "
          />

          <span className="flex text-[#515151] ">
            <PaperPlaneTilt size={20} />
          </span>
        </Card>

        <div className="flex -space-x-2 overflow-hidden w-1/5 ">
          {recentFriends.map((item) => (
            <Image
              src={`/assets/${item.img} `}
              alt={item.name}
              key={item.name}
              height={40}
              width={40}
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PostCard;


