"use client";

import React, { useEffect } from "react";
import { useAuth } from "./use-auth";
import { useRouter } from "next/navigation";

const INACTIVITY_LIMIT = 5 * 60 * 1000;

const useAutoLogout = () => {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let timeOut: NodeJS.Timeout;

    const resetTimeOut = () => {
      if (timeOut) clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        signOut();
        router.push("/sign-in");
      }, INACTIVITY_LIMIT);
    };
    const handleActivity = () => {
      resetTimeOut();
    };

    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("scroll", handleActivity);
    window.addEventListener("click", handleActivity);

    resetTimeOut();

    return () => {
      clearTimeout(timeOut);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("click", handleActivity);
    };
  }, [signOut, router]);
};

export default useAutoLogout;
