import { AccountTreeTwoTone, PeopleAltTwoTone } from "@mui/icons-material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { FunctionCardItemProps } from "../../molecules/FunctionCardItem/FunctionCardItem";
import FunctionCardList from "./FunctionCardList";

const items: FunctionCardItemProps[] = [
  {
    icon: PeopleAltTwoTone,
    title: "Lizard",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  },
  {
    icon: AccountTreeTwoTone,
    title: "Lizard",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
  },
];

export default {
  title: "Components/Organisms/FunctionCardList",
  component: FunctionCardList,
  args: {
    items,
  },
} as ComponentMeta<typeof FunctionCardList>;

const Template: ComponentStory<typeof FunctionCardList> = (args) => <FunctionCardList {...args} />;

export const Basic = Template.bind({});
