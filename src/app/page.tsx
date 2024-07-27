"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import checkbox_verifications from '../config/checkBoxVerifications.json';
import ProfileCard from "@/components/ProfileCard";
import { useStateContext } from "@/contexts/StateContext";
import { Skeleton } from "@/components/ui/skeleton";
import { CardSkeleton } from "./profile/[profileId]/page";
import DashboardCards from "@/components/DashboardCards";
import DashboardTable from "@/components/DashboardTable";

interface CheckboxVerification {
  name: string;
  label: string;
  isOrg: boolean;
}

export default function Home() {
  const { dummyUser } = useStateContext();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full flex-col flex gap-2">
      <section className="gap-3 max-lg:flex-col flex">
        <section className="flex flex-col items-center gap-6 pt-0 lg:min-w-[300px] lg:w-[296px] ">
          {loading ? (
            <>
              <Skeleton className="bg-white w-full p-6">
                <FakeSkeleton />
              </Skeleton>
            </>
          ) : (
            <ProfileCard userInfo={dummyUser} />
          )}

          {loading ? (
            <CardSkeleton length={4} />
          ) : (
            <>
              <Card className="w-full">
                <CardHeader className="p-2 py-3">
                  <CardTitle className="text-xl">Organisation Info</CardTitle>
                  <CardDescription>
                    Complete your organization profile for a better experience
                  </CardDescription>
                </CardHeader>
                <div className="p-2">
                  {loading ? (
                    <Skeleton className="w-full h-4" />
                  ) : (
                    <Progress value={dummyUser?.profileComplete} className="" />
                  )}
                </div>

                <div className="p-2">
                  {(checkbox_verifications as CheckboxVerification[]).map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center space-x-2 mb-4"
                    >
                      <Checkbox id={item.name} disabled={item.isOrg} />
                      <label
                        htmlFor={item.name}
                        className="text-[16px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:text-[#8A8A8A] peer-disabled:opacity-70"
                      >
                        {item.label}
                      </label>
                    </div>
                  ))}

                  <span className="bg-sidebar text-white mt-3 inline-block w-full text-center px-2 py-1.5 text-[16px] rounded-sm">
                    Complete Profile
                  </span>
                </div>
              </Card>
            </>
          )}
        </section>

        <Card className="w-full lg:p-6 p-3 h-full flex flex-col gap-8">
          <DashboardCards loading={loading} />
          <DashboardTable loading={loading} />
        </Card>
      </section>
    </section>
  );
}

export const FakeSkeleton: React.FC = () => {
  return (
    <div className="w-[35%]  h-[100px] justify-between flex flex-col gap-5 items-start ">
      <div className="flex_center gap-3">
        <Skeleton className="min-w-10 h-10" />
        <Skeleton className="min-w-[10rem] h-5" />
      </div>
      <div>
        <Skeleton className="w-20 h-10" />
      </div>
    </div>
  );
};

