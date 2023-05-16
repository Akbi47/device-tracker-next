import { styled, Typography } from "@mui/material";
import { useCallback } from "react";
import ShowMoreText from "react-show-more-text";

import { ProjectUser } from "../../../types/models";

type ProjectNamesProps = {
  projectUsers: ProjectUser[];
};

const ProjectNames = ({ projectUsers = [] }: ProjectNamesProps) => {
  const moreLessText = useCallback(
    (label: string) => (
      <Typography color="primary" component="span">
        {label}
      </Typography>
    ),
    []
  );

  return (
    <StyledBox>
      <ShowMoreText lines={1} more={moreLessText("Xem thêm")} less={moreLessText("Thu gọn")}>
        {projectUsers.map((item, index) => (
          <Typography key={item.id} component="span">
            {`${item.project?.name} (${item.position})`}
            {index < projectUsers.length - 1 && ", "}
          </Typography>
        ))}
      </ShowMoreText>
    </StyledBox>
  );
};

export default ProjectNames;

const StyledBox = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  a: {
    textDecoration: "auto",
  },
}));
