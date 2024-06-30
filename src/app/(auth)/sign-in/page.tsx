"use client";

import SvgComponent from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TAuthCredentialsValidator,
  AuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const origin = searchParams.get("origin");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
    onSuccess: ({}) => {
      toast.success("Logueado exitosamente");

      router.refresh();

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      router.push("/");
    },

    onError: (err) => {
      console.log("error", err);
      if (err.data?.code === "UNAUTHORIZED") {
        toast.error("Email o Contraseña Invalidos");
        return;
      }
    },
  });

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    signIn({
      email,
      password,
      confirmPassword: password,
    });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col lg:px-0">
        <div className="mx-auto flex w-full flex-col space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 items-center">
            <div className="flex justify-center w-full">
              <SvgComponent />
            </div>
            <h1 className="text-2xl font-bold">Logueate</h1>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="Email@email.com"
                  />

                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="password de min. 8 caracteres"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  className={cn(
                    buttonVariants(),
                    "hover:bg-blue-700 hover:text-yellow-300"
                  )}
                >
                  Logueate
                </Button>
                <br />
                <br />
                <br />

                <h3 className="font-semibold text-xl text-center">
                  No tienes una cuenta?, entonces Registrate:
                </h3>

                <Link
                  href="/sign-up"
                  className={cn(
                    buttonVariants(),
                    "hover:bg-blue-700 hover:text-yellow-300"
                  )}
                >
                  Crea tu cuenta
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
