import { Box } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const TrackerHistoryPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/tracker");
  }, [router]);

  return <Box>Redirecting...</Box>;
};

export default TrackerHistoryPage;
