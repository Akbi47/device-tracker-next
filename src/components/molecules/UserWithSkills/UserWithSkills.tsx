import { Box, Link, styled, Typography } from "@mui/material";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useCallback } from "react";
import ShowMoreText from "react-show-more-text";

import { User } from "../../../types/models";

type UserWithSkillsProps = {
  user: User;
  onUserClick?: (_userId: string) => void;
};

const UserWithSkills = ({ user, onUserClick }: UserWithSkillsProps) => {
  const lastUpdate = useCallback((user: User) => {
    let time = user.updatedAt;
    user.projectUsers.forEach((projectUser) => {
      projectUser.projectUserPlans.forEach((projectUserPlan) => {
        if (time < projectUserPlan.updatedAt) {
          time = projectUserPlan.updatedAt;
        }
      });
    });
    return formatDistanceToNow(new Date(time));
  }, []);

  const handleUserClick = useCallback(
    (userId: string) => (event: any) => {
      event.preventDefault();
      onUserClick && onUserClick(userId);
    },
    [onUserClick]
  );

  const moreLessText = useCallback(
    (label: string) => (
      <Typography color="primary" component="span" variant="body2" fontSize="small">
        {label}
      </Typography>
    ),
    []
  );

  return (
    <Box>
      <Typography>
        <Link href="#" onClick={handleUserClick(user.id)}>
          {user.fullName}
        </Link>
      </Typography>
      <StyledBox>
        <ShowMoreText lines={1} more={moreLessText("Xem thêm")} less={moreLessText("Thu gọn")}>
          {user.userSkills?.map((item, index) => (
            <Typography key={item.id} component="span" variant="body2" fontSize="small">
              {`${item.skill?.name} (${item.level})`}
              {index < user.userSkills.length - 1 && ", "}
            </Typography>
          ))}
        </ShowMoreText>
      </StyledBox>
      <Typography color="text.secondary" textAlign="right" fontSize="small">
        Last update: {lastUpdate(user)}
      </Typography>
    </Box>
  );
};

export default UserWithSkills;

const StyledBox = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "small",
  a: {
    textDecoration: "auto",
  },
}));
