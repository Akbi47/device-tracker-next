import { Box, Link, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        height: 50,
        backgroundColor: "#1ab394",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        position: "absolute",
        bottom: 0,
      }}
    >
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 3, color: "white" }}>
        {"Copyright © "}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{" "}
        {new Date().getFullYear()}.
      </Typography>
    </Box>
  );
}

export default Footer;
