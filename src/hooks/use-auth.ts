import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const router = useRouter();

  const signOut = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      toast.success("Sesión Cerrada Correctamente");

      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      toast.error("Algo esta ocurriendo. Por favor intenta nuevamente");
    }
  };

  return {
    signOut,
  };
};
