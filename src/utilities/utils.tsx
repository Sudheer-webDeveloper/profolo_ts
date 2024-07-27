import { postBy } from "@/Constants/Constants";
import axios, { AxiosRequestConfig } from "axios";

interface Headers {
  "Content-Type": string;
  "x-auth-token": string;
}

interface Options extends AxiosRequestConfig {
  method: string;
  url: string;
  responseType: string;
  headers?: Headers;
  data?: any;
}

export const makeNetworkCall = async (route: string, obj?: any, method: string = 'GET', headers?: Headers): Promise<any> => {
  try {
    const options: Options = {
      method,
      url: `http://localhost:4000/${route}`,
      responseType: "json",
    };
    if (headers) {
      options.headers = {
        "Content-Type": "application/json",
        "x-auth-token": headers["x-auth-token"] || "",
      };
    }
    if (obj) {
      options.data = obj;
    }
    const response = await axios(options);
    return response.data;
  } catch (error) {
    return Promise.reject({ error });
  }
};

interface DataItem {
  profileImg?: string;
  personName?: string;
  work?: string;
  timeAgo?: string;
  likes?: string;
  comments?: string;
  shares?: string;
  [key: string]: any;
}

export const creatingDummyData = async (data: DataItem[]): Promise<DataItem[]> => {
  const dummyData = data.map((item) => {
    return {
      ...item,
      profileImg: postBy,
      personName: "Ethan Marques",
      work: "Product Designer at Dell Techno",
      timeAgo: "24m ago",
      likes: "20",
      comments: "30",
      shares: "10",
    };
  });

  return dummyData;
};


