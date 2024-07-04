"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import FlightSearchForm from "@/components/FlightSearchForm";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col items-center justify-center space-y-6 sm:w-[350px]">
          <h1 className="text-3xl font-bold mt-4 text-center">
            ZONA DE CLIENTE
          </h1>
          <div className="w-full flex justify-center">
            <FlightSearchForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
