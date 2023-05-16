import { Stack } from "@mui/material";

import { FunctionCardItem, FunctionCardItemProps } from "../../molecules";

type FunctionCardListProps = {
  items?: FunctionCardItemProps[];
};

const FunctionCardList = ({ items = [] }: FunctionCardListProps) => {
  return (
    <Stack
      direction="row"
      spacing={3}
      sx={{
        margin: -1,
        flexWrap: "wrap",
        justifyContent: {
          xs: "center",
          md: "flex-start",
        },
      }}
    >
      {items.map((item, index) => (
        <FunctionCardItem key={index} {...item} />
      ))}
    </Stack>
  );
};

export default FunctionCardList;
