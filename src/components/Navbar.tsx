import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import SvgComponent from "./Icons";
import NavItems from "./NavItems";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

const Navbar = () => {
  const user = null;

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/*TODO: Mobile navbar*/}

              <div className="ml-4 flex lg:ml:0">
                <Link href="/">
                  <SvgComponent className="mt-7" />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-strech">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/sign-in"
                      className={cn(
                        buttonVariants(),
                        "hover:bg-blue-700 hover:text-yellow-300"
                      )}
                    >
                      Logueate
                    </Link>
                  )}

                  {user ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {user ? (
                    <p></p>
                  ) : (
                    <Link
                      href="/sign-up"
                      className={cn(
                        buttonVariants(),
                        "hover:bg-blue-700 hover:text-yellow-300"
                      )}
                    >
                      Crea una Cuenta
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
