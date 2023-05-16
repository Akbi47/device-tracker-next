import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

import { Loading } from "../components/molecules";

type PageProtectedHandlerProps = InferGetServerSidePropsType<GetServerSideProps>;

const withPageProtected = (handler: (_props: PageProtectedHandlerProps) => ReactNode) =>
  function PageProtectedHandler(props: PageProtectedHandlerProps) {
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.replace("/auth/login");
      }
    }, [router, status]);

    if (status !== "authenticated") {
      return <Loading fullScreen />;
    }

    const Component: any = handler;
    return <Component {...{ ...session, ...props }} />;
  };

export default withPageProtected;
