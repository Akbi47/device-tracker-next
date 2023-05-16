import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MarkEmailUnreadOutlinedIcon from "@mui/icons-material/MarkEmailUnreadOutlined";
import { Avatar, Box, Grid, styled, Typography } from "@mui/material";
import { green, grey } from "@mui/material/colors";

const CustomBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyItems: "center",
  gap: theme.spacing(2),
}));

const AuthFooter = () => {
  return (
    <Box sx={{ borderTop: "1px solid", borderColor: grey[200] }}>
      <Box marginY={2}>
        <Grid container spacing={2}>
          <Grid item md={6}>
            <CustomBox>
              <Avatar sx={{ bgcolor: green[700] }}>
                <MarkEmailUnreadOutlinedIcon />
              </Avatar>
              <Box>
                <a href="contact@gss-sol.com">contact@gss-sol.com</a> <br />
                <a href="https://st.logistech247.com"> https://st.logistech247.com</a>
              </Box>
            </CustomBox>
          </Grid>
          <Grid item md={6}>
            <CustomBox>
              <Avatar sx={{ bgcolor: green[700] }}>
                <LocationOnOutlinedIcon />
              </Avatar>
              <Typography>BS9, Diamond Riverside, 1646A Vo Van Kiet, Ward 16, Dist 8, HCM City, VietNam</Typography>
            </CustomBox>
          </Grid>
        </Grid>
      </Box>
      <Box textAlign="center">
        <Typography>
          <strong>Copyright</strong> © 2023 Logistech247. All rights reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default AuthFooter;
