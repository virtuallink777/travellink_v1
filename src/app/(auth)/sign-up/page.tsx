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

const Page = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({});

  const onSubmit = ({ email, password }: TAuthCredentialsValidator) => {
    mutate({
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
            <h1 className="text-2xl font-bold">Crea una Cuenta</h1>
            <Link
              href="/sign-in"
              className={cn(
                buttonVariants(),
                "hover:bg-blue-700 hover:text-yellow-300"
              )}
            >
              Ya tienes una cuenta?, entonces Logueate
            </Link>
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
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="confirmPassword">Confirma tu password</Label>
                  <Input
                    {...register("confirmPassword")}
                    id="confirmPassword"
                    type="password"
                    className={cn({ "focus-visible:ring-red-500": true })}
                    placeholder="password de min. 8 caracteres"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button
                  className={cn(
                    buttonVariants(),
                    "hover:bg-blue-700 hover:text-yellow-300"
                  )}
                >
                  Crea la Cuenta
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
