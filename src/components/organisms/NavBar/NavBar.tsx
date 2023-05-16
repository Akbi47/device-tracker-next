import { AppBar, Box, Button, Link, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import { useRouter } from "next/router";

import { Logo } from "../../atoms";
import { NavBarUser } from "../../molecules";

type MenuItem = {
  title: string;
  url: string;
};

const menus: MenuItem[] = [
  {
    title: "Tracker",
    url: "/tracker",
  },
  {
    title: "History",
    url: "/tracker/history",
  },
];

const NavBar = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();

  const handleMenuClick = (menu: MenuItem) => () => {
    router.replace(menu.url);
  };

  return (
    <AppBar
      elevation={smDown ? 4 : 0}
      component="div"
      position="static"
      color="transparent"
      sx={{
        backdropFilter: "blur(3px)",
        backgroundColor: "#1AB394",
      }}
    >
      <Toolbar variant="dense">
        <Link href="/" display="flex">
          <Logo size="smallx" />
        </Link>

        <Box flexGrow={1}>
          <Box display="flex" flexDirection="row">
            {menus.map((item, index) => (
              <Button
                key={index}
                sx={{
                  color: "white",
                  display: "block",
                  ml: 2,
                  textTransform: "none",
                }}
                onClick={handleMenuClick(item)}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Box>
        <NavBarUser />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
