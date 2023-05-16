import { useTheme } from "@mui/material";
import Image from "next/image";
import { useMemo } from "react";

type LogoProps = {
  size?: "small" | "smallx" | "medium" | "large" | "largex" | "large2x";
};

const Logo = ({ size = "medium" }: LogoProps) => {
  const theme = useTheme();

  const imageSize = useMemo(() => {
    switch (size) {
      case "smallx":
        return theme.spacing(4);
      case "small":
        return theme.spacing(5);
      case "large":
        return theme.spacing(7);
      case "largex":
        return theme.spacing(10);
      case "large2x":
        return theme.spacing(12);
      case "medium":
      default:
        return theme.spacing(6);
    }
  }, [size, theme]);

  return <Image src="/assets/images/logo.svg" width={imageSize} height={imageSize} alt="Logo" />;
};

export default Logo;
