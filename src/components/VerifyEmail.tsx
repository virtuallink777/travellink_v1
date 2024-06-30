"use client";

import { trpc } from "@/trpc/client";
import { Loader2, XCircle } from "lucide-react";
import React, { useEffect } from "react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.VerifyEmail.useQuery({
    token,
  });

  const router = useRouter();

  useEffect(() => {
    if (data?.success) {
      setTimeout(() => {
        router.push("/sign-in");
      }, 5000);
    }
  }, [data, router]);

  if (isError) {
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

  if (data?.success) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <h3 className="font-semibold text-2xl">Cuenta Verificada</h3>
        <p className="text-muted-foreground text-center mt-1 pb-3">
          Gracias por verificar tu Email,{" "}
          <span className="font-bold">
            te vamos a redireccionar para que te Loguees
          </span>
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="animate-spin  h-8 w-8 text-zinc-400" />
        <h3 className="font-semibold text-xl">Estamos verificando</h3>
        <p className="text-muted-foreground text-sm ">
          Esto tardara unos segundos...
        </p>
      </div>
    );
  }
};

export default VerifyEmail;
