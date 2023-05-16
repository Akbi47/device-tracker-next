import { Box, BoxProps, Stack, styled } from "@mui/material";
import Head from "next/head";
import { ReactNode, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";

import { Loading } from "../../molecules";

const Header = styled("header")(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

type BaseProps = BoxProps & {
  title?: string;
  header?: ReactNode;
  footer?: ReactNode;
  loading?: boolean;
};

const Base = ({ title, header, footer, children, loading = false, ...others }: BaseProps) => {
  const [viewHeight, setViewHeight] = useState<number>(0);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  /**
   * Update height of content when window resize
   */
  const handleWindowResize = useCallback(() => {
    setViewHeight(window.innerHeight);
    let headerHeight = headerRef.current?.clientHeight || 0;
    let footerHeight = footerRef.current?.clientHeight || 0;
    setContentHeight(window.innerHeight - headerHeight - footerHeight);
  }, []);

  useLayoutEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  // Browser title
  const titleHead = useMemo(() => `Device Tracker${title ? ` - ${title}` : ""}`, [title]);

  return (
    <Stack
      flexDirection="column"
      sx={{
        height: `${viewHeight === 0 ? "unset" : `${viewHeight}px`}`,
      }}
      {...others}
    >
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{titleHead}</title>
      </Head>
      {header && <Header ref={headerRef}>{header}</Header>}
      <Box overflow="auto" flex={contentHeight === 0 ? 1 : "unset"} height={`${contentHeight}px`}>
        {loading ? <Loading /> : children}
      </Box>
      {footer && <footer ref={footerRef}>{footer}</footer>}
    </Stack>
  );
};

export default Base;
