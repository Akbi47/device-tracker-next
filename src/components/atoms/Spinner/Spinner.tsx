import { CircularProgress, useTheme } from "@mui/material";
import { useMemo } from "react";

type SpinnerProps = {
  size?: "small" | "medium" | "large";
};

const Spinner = ({ size = "medium" }: SpinnerProps) => {
  const theme = useTheme();

  const spinnerSize = useMemo(() => {
    switch (size) {
      case "small":
        return theme.spacing(3);
      case "large":
        return theme.spacing(7);
      case "medium":
      default:
        return theme.spacing(5);
    }
  }, [size, theme]);

  return <CircularProgress color="primary" size={spinnerSize} />;
};

export default Spinner;
