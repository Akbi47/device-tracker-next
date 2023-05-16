import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useAuth = (autoRedirect = true) => {
  const router = useRouter();
  const { data, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated" && autoRedirect) {
      router.replace("/auth/login");
    }
  }, [autoRedirect, router, status]);

  // TODO: Log for development
  useEffect(() => {
    console.log("Session:", data);
  }, [data]);

  return {
    ...data,
    status,
    session: data,
    loading: status !== "authenticated",
  };
};

export default useAuth;
