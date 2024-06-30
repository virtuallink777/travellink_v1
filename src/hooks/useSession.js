import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { clearSession, setSession } from "../lib/close-sessions/sessionManager";
import { startInactivityTimer } from "../lib/close-sessions/inactivityHandler";

const useSession = () => {
  const router = useRouter();

  useEffect(() => {
    setSession();
    const handleBeforeUnload = () => {
      clearSession();
      router.push("/sign-in");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    startInactivityTimer(handleLogout);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      clearSession();
    };
  }, [router]);
};

export default useSession;
