import { FormControl, Grid } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import PasswordField from "./PasswordField";

export default {
  title: "Components/Atoms/PasswordField",
  component: PasswordField,
} as ComponentMeta<typeof PasswordField>;

const Template: ComponentStory<typeof PasswordField> = (args) => <PasswordField {...args} />;

export const Basic = Template.bind({});

export const Usage: ComponentStory<typeof PasswordField> = (args) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <FormControl fullWidth variant="outlined">
        <PasswordField {...args} name="password" label="Mật khẩu" size="small" />
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth variant="outlined">
        <PasswordField
          {...args}
          name="password"
          label="Mật khẩu"
          size="small"
          error
          helperText="Xin vui lòng nhập mật khẩu"
        />
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth variant="outlined">
        <PasswordField {...args} name="password" label="Mật khẩu" />
      </FormControl>
    </Grid>
    <Grid item xs={12}>
      <FormControl fullWidth variant="outlined">
        <PasswordField {...args} name="password" label="Mật khẩu" error helperText="Xin vui lòng nhập mật khẩu" />
      </FormControl>
    </Grid>
  </Grid>
);
