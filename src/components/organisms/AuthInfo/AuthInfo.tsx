import { Box, styled, Typography } from "@mui/material";

import { DownloadButton } from "../../molecules";

const List = styled("ul")(() => ({
  margin: "5px 0",
  "& li": {
    fontSize: "16px",
    padding: "5px",
  },
}));

const AuthInfo = () => {
  return (
    <Box>
      <Typography fontSize="16px">Thank you for your trusting and choosing the Device Tracker system!</Typography>
      <Typography fontSize="16px" paddingTop="5px">
        We are committed to satisfying you:
      </Typography>
      <List>
        <li>Protect customer information by using advanced technology.</li>
        <li>Reduce loading time by lightning processing speed.</li>
        <li>System can run on different devices.</li>
      </List>
      <Typography
        fontSize="16px"
        paddingTop="5px"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        Download app to track your device <DownloadButton color="primary" />
      </Typography>
    </Box>
  );
};

export default AuthInfo;
