"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { X, Image as Kinder } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import imageCompression from "browser-image-compression"; 
import { useStateContext } from "@/contexts/StateContext";
import ProfileCard from "./ProfileCard";
import { makeNetworkCall } from "@/utilities/utils";

const urlRegex = /(https?:\/\/[^\s]+)/g;

const PostModal: React.FC = () => {
  const {
    setPostModal,
    dummyUser,
    submitting,
    setSubmitting,
    fetchPostsData,
    loadingTerm,
    setLoadingTerm,
    edit,
    editingItem,
  } = useStateContext();

  const [form, setForm] = useState<{ desc: string; post_image: string }>(edit ? editingItem : { desc: "", post_image: "" });
  const [urls, setUrls] = useState<string[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === "file" && files) {
      handleImageUpload(e);
    } else {
      setForm((prevForm) => ({ ...prevForm, [name]: value }));

      if (name === "desc") {
        const extractedUrls = extractUrls(value);
        setUrls(extractedUrls);
      }
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(file, options);
      console.log(
        `Compressed file size: ${(compressedFile.size / (1024 * 1024)).toFixed(
          2
        )} MB`
      );

      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onloadend = () => {
        setForm((prevForm) => ({
          ...prevForm,
          post_image: reader.result as string,
        }));
      };
    } catch (error) {
      console.error("Error compressing the image:", error);
    }
  };

  const extractUrls = (text: string): string[] => {
    const urls = text.match(urlRegex);
    return urls || [];
  };

  const createPost = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoadingTerm("creating_post");
      setSubmitting(true);
      delete form.id;
      const response = await makeNetworkCall(edit ? `update/${editingItem.id}` : "create", form, edit ? "put" : "post");
      await fetchPostsData();
      console.log(response);
      setSubmitting(false);
      setPostModal(false);
      setLoadingTerm("");
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
      setLoadingTerm("");
    }
  };

  return (
    <section className="w-[100vw] inset-0 z-20 bg-black/50 fixed h-[100vh] flex justify-center">
      <div
        className="w-full h-full absolute z-8"
        onClick={() => setPostModal(false)}
      />

      <div className="flex relative top-20 flex-col gap-5 w-[60%] max-xl:w-[95%] max-sm:h-[400px] max-sm:p-3 rounded-2xl p-6 h-[500px] bg-white">
        <div className="flex justify-between items-start">
          <ProfileCard userInfo={dummyUser} verifiedButton={true} />
          <span>
            <X
              size={30}
              className="cursor-pointer max-sm:text-sm"
              onClick={() => setPostModal(false)}
            />
          </span>
        </div>

        {/* form - section */}
        <form
          onSubmit={createPost}
          className="w-full relative gap-2 max-h-full min-h-[80%] overflow-scroll"
        >
          <div className="w-full max-h-full overflow-scroll">
            <textarea
              name="desc"
              value={form.desc}
              onChange={onChange}
              className="w-full text-lg resize-none outline-none bg-transparent h-[100px]"
              placeholder="What do You want to talk about?"
              style={{ scrollbarWidth: "none" }}
            />

            <div className="mt-4">
              {urls.map((url, index) => (
                <div key={index} className="mt-2">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    {url}
                  </a>
                </div>
              ))}
            </div>

            <input
              type="file"
              name="post_image"
              id="post_image"
              className="hidden"
              onChange={onChange}
            />

            {form.post_image && (
              <Image
                className="w-full mt-4 object-cover"
                src={form.post_image}
                width={100}
                height={100}
                alt="post-image"
              />
            )}

            {/* Render the extracted URLs as links */}
          </div>

          <div className="gap-2 bg-white p-2 flex justify-between w-full absolute bottom-0 max-sm:bottom-4">
            <div>
              <label htmlFor="post_image">
                <Kinder size={25} className="cursor-pointer text-[#515151]" />
              </label>
            </div>

            <Button
              type="submit"
              disabled={submitting || loadingTerm === "creating_post"}
              className="w-[100px] h-[30px] text-lg text-white"
            >
              {loadingTerm === "creating_post" ? "posting" : "post"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default PostModal;


