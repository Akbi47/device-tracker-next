import { VisibilityOffTwoTone, VisibilityTwoTone } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { useCallback, useState } from "react";

type PasswordFieldProps = Omit<TextFieldProps, "type" | "InputProps">;

const PasswordField = (props: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = useCallback(() => setShowPassword(!showPassword), [showPassword]);

  return (
    <TextField
      {...props}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton edge="end" onClick={handleClick}>
              {showPassword ? <VisibilityTwoTone /> : <VisibilityOffTwoTone />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
