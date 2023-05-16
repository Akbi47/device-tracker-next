import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

import NavBar from "./NavBar";

const session: Session = {
  expires: new Date().toLocaleString(),
  user: {
    name: "Anonymous User",
    email: "username@gss-sol.com",
  },
};

export default {
  title: "Components/Organisms/NavBar",
  component: NavBar,
  args: {},
} as ComponentMeta<typeof NavBar>;

const Template: ComponentStory<typeof NavBar> = () => (
  <SessionProvider session={session}>
    <NavBar />
  </SessionProvider>
);

export const Basic = Template.bind({});
