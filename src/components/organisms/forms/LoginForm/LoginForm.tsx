import { LoadingButton } from "@mui/lab";
import { Alert, Container, FormControl, Grid, Stack, styled, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

import { LoginForm as InputForm, loginFormSchema } from "../../../../forms/login";
import { PasswordField } from "../../../atoms";
import { DownloadButton } from "../../../molecules";

const DownloadBox = styled(Typography)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
  marginTop: theme.spacing(2),
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const initialFormValues: InputForm = {
  email: "",
  password: "",
};

type LoginFormProps = {};

const LoginForm = (_: LoginFormProps) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const nameElement = document.querySelector('[name="email"]') as HTMLInputElement;
    nameElement && nameElement.focus();
  }, []);

  const handleSubmitFormik = async (values: InputForm) => {
    const result = await signIn("credentials", {
      redirect: false,
      ...values,
    });

    console.log(result);

    if (result?.ok) {
      router.replace("/");
      return;
    }

    setSubmitting(false);
    setErrorMessage("The email address or password is incorrect.");
  };

  const { values, errors, touched, isSubmitting, setSubmitting, handleChange, handleSubmit } = useFormik({
    initialValues: initialFormValues,
    validationSchema: loginFormSchema,
    onSubmit: handleSubmitFormik,
  });

  return (
    <Stack>
      <Container maxWidth="xs" sx={{ border: "1px solid #ededed", paddingY: 3, borderRadius: 2 }}>
        <form autoCapitalize="off" autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {errorMessage && (
              <Grid item xs={12}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>
            )}

            {/* Email or Username */}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </FormControl>
            </Grid>

            {/* Password */}
            <Grid item xs={12} paddingTop="0px">
              <FormControl fullWidth variant="outlined">
                <PasswordField
                  name="password"
                  label="Password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </FormControl>
            </Grid>

            {/* Submit button */}
            <Grid item xs={12}>
              <LoadingButton
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                loading={isSubmitting}
                size="large"
                sx={{ height: (theme) => theme.spacing(6) }}
              >
                Login
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Container>

      <DownloadBox>
        Download app to track your device <DownloadButton color="primary" />
      </DownloadBox>
    </Stack>
  );
};

export default LoginForm;
