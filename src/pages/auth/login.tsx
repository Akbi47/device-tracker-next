import { Box, Container, Grid, styled } from "@mui/material";
import type { NextPage } from "next";
import { getSession } from "next-auth/react";

import { Logo } from "../../components/atoms";
import { Base } from "../../components/layouts";
import { AuthFooter, AuthInfo } from "../../components/organisms";
import { LoginForm } from "../../components/organisms/forms";

const MdGrid = styled(Grid)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "inline-block",
  },
}));

const LoginPage: NextPage = () => (
  <Base title="Login">
    <Box
      sx={{
        height: "100%",
        minHeight: "260px",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        gridAutoFlow: "column",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Logo size="largex" />
          </Grid>
          <Grid item xs={12} md={6} />
          <MdGrid item xs={12} md={6}>
            <AuthInfo />
          </MdGrid>
          <Grid item xs={12} md={6}>
            <LoginForm />
          </Grid>
          <Grid item xs={12}>
            <AuthFooter />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </Base>
);
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    // User is logged in, redirect to the dashboard or home page
    return {
      redirect: {
        destination: "/dashboard", // Replace with your desired page
        permanent: false,
      },
    };
  }

  return {
    props: {}, // Proceed with rendering the login page
  };
}
export default LoginPage;
