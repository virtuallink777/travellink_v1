"use client";

import { trpc } from "@/trpc/client";
import { XCircle } from "lucide-react";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.VerifyEmail.useQuery({
    token,
  });

  if (false) {
    return (
      <div className="flex flex-col items-center gap-2">
        <XCircle className="h-8 w-8 text-red-500" />
        <h3 className="font-semibold text-xl">Hubo un Problema</h3>
        <p className="text-muted-foreground text-sm ">
          El token es invalido o ha expirado Trate nuevamente, por favor
        </p>
      </div>
    );
  }

  if (true) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h3 className="font-semibold text-2xl">Cuenta Verificada</h3>
        <p className="text-muted-foreground text-center mt-1 pb-3">
          Gracias por verificar tu Email
        </p>
        <Link
          className={cn(
            buttonVariants(),
            "hover:bg-blue-700 hover:text-yellow-300"
          )}
          href="/sign-in"
        >
          Logueate
        </Link>
      </div>
    );
  }

  return <div></div>;
};

export default VerifyEmail;
