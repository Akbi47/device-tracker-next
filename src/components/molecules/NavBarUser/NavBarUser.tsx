import { LoginTwoTone, LogoutTwoTone } from "@mui/icons-material";
import {
  alpha,
  Avatar,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { common } from "@mui/material/colors";
import { signOut, useSession } from "next-auth/react";
import { MouseEvent, useMemo, useState } from "react";

import { avatarLetterName, stringToColor } from "../../../utils";
import DownloadButton from "../DownloadButton/DownloadButton";

const NavBarUser = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { data: session, status } = useSession();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => signOut();

  const name = useMemo(() => session?.user?.name || "", [session?.user?.name]);
  const bgColor = useMemo(() => stringToColor(name), [name]);
  const letterName = useMemo(() => avatarLetterName(name), [name]);

  return (
    <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={1}>
      {status === "authenticated" ? (
        <>
          {!smDown && (
            <>
              <DownloadButton color="default" />
              <Typography sx={{ color: "white" }}>
                Hi{" "}
                <Typography component="span" fontWeight="bold">
                  {session?.user?.name}
                </Typography>
              </Typography>
            </>
          )}
          <IconButton onClick={handleClick} color="inherit">
            <Avatar
              alt={name}
              sx={{
                width: (theme) => theme.spacing(4),
                height: (theme) => theme.spacing(4),
                fontSize: "small",
                bgcolor: bgColor,
              }}
            >
              {letterName}
            </Avatar>
          </IconButton>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: `drop-shadow(0px 2px 8px ${alpha(common.black, 0.32)})`,
                marginTop: 1.5,
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: (theme) => theme.palette.background.paper,
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            {/* <MenuItem>
              <ListItemIcon>
                <AccountCircleTwoTone />
              </ListItemIcon>
              Thông tin cá nhân
            </MenuItem>
            <Divider /> */}
            <MenuItem onClick={handleLogoutClick}>
              <ListItemIcon>
                <LogoutTwoTone />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <LoginTwoTone color="primary" />
          <Typography color="primary">Login</Typography>
        </>
      )}
    </Stack>
  );
};

export default NavBarUser;
