import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import { Link, styled } from "@mui/material";
import { useMemo } from "react";

import { DOWNLOAD_APK_NAME } from "../../../constants";

const StyledDownloadLink = styled(Link)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(0.5),
  height: "30px",
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  textDecoration: "none",
}));

export type DownloadButtonProps = {
  color: "default" | "primary";
};

const DownloadButton = ({ color }: DownloadButtonProps) => {
  const colored = useMemo(() => (color === "default" ? "#ffffff" : "#1ab394"), [color]);

  return (
    <StyledDownloadLink
      href={`/assets/resources/${DOWNLOAD_APK_NAME}`}
      target="_blank"
      sx={{
        border: `1px solid ${colored}`,
        color: colored,
      }}
    >
      <GetAppOutlinedIcon />
      Download
    </StyledDownloadLink>
  );
};

export default DownloadButton;
