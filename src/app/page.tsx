import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";


export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Bienvenidos a Travel Link, donde encontraras tiquetes al instante a los mas bajos precios, y hoteles de 
          primera a precios bajos {''}
          <span className="text-blue-600">en todo el mundo</span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link href='/tiquetes' className={cn(buttonVariants(), 'hover:bg-blue-950 hover:text-yellow-500')}>
            Buscar tiquetes
          </Link>
          <Link href='/hoteles' className={cn(buttonVariants(), 'hover:bg-blue-950 hover:text-yellow-500')}>
            Buscar Hoteles
          </Link>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
