import { Stack, Typography } from "@mui/material";
import { useMemo } from "react";

import { Spinner } from "../../atoms";

type LoadingProps = {
  size?: "small" | "medium" | "large";
  fullScreen?: boolean;
  label?: string;
};

const Loading = ({ size = "medium", fullScreen, label }: LoadingProps) => {
  const labelSize = useMemo(() => (size === "small" ? size : undefined), [size]);

  return (
    <Stack
      paddingY={fullScreen ? 0 : 4}
      height={fullScreen ? "50vh" : "unset"}
      justifyContent="flex-end"
      alignItems="center"
      spacing={2}
    >
      <Spinner size={size} />
      {label && <Typography fontSize={labelSize}>{label}</Typography>}
    </Stack>
  );
};

export default Loading;
