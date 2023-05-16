import { PeopleAltTwoTone } from "@mui/icons-material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import FunctionCardItem from "./FunctionCardItem";

export default {
  title: "Components/Molecules/FunctionCardItem",
  component: FunctionCardItem,
  args: {
    icon: PeopleAltTwoTone,
    title: "Lizard",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  },
} as ComponentMeta<typeof FunctionCardItem>;

const Template: ComponentStory<typeof FunctionCardItem> = (args) => <FunctionCardItem {...args} />;

export const Basic = Template.bind({});
