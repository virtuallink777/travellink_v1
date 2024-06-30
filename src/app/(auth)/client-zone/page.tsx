"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="flex items-center justify-center">
      <h1 className="text-3xl font-bold mt-4">ZONA DE CLIENTE</h1>
    </div>
  );
};

export default Page;
