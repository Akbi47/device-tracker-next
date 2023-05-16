import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import React from "react";

import NavBarUser from "./NavBarUser";

const session: Session = {
  expires: new Date().toLocaleString(),
  user: {
    name: "Anonymous User",
    email: "username@gss-sol.com",
  },
};

export default {
  title: "Components/Molecules/NavBarUser",
  component: NavBarUser,
} as ComponentMeta<typeof NavBarUser>;

const Template: ComponentStory<typeof NavBarUser> = () => (
  <SessionProvider session={session}>
    <NavBarUser />
  </SessionProvider>
);

export const Basic = Template.bind({});
