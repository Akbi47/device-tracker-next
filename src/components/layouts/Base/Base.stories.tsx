import { Grid } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { NavBar } from "../../organisms";
import Base from "./Base";

const session: Session = {
  expires: new Date().toLocaleString(),
  user: {
    name: "Anonymous User",
    email: "username@gss-sol.com",
  },
};

export default {
  title: "Components/Layouts/Base",
  component: Base,
  args: {
    children: "Base Layout",
  },
} as ComponentMeta<typeof Base>;

const Template: ComponentStory<typeof Base> = (args) => <Base {...args} />;

export const Basic = Template.bind({});

export const Usage: ComponentStory<typeof Base> = (args) => (
  <Grid container spacing={1}>
    <Grid item xs={12} md={6}>
      <SessionProvider>
        <Base {...args} border="1px solid gray" header={<NavBar />} loading />
      </SessionProvider>
    </Grid>
    <Grid item xs={12} md={6}>
      <SessionProvider session={session}>
        <Base {...args} border="1px solid gray" header={<NavBar />} />
      </SessionProvider>
    </Grid>
  </Grid>
);
