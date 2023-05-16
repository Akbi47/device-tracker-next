import { Alert, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import moment from "moment";
import { useCallback, useState } from "react";

import { SearchConditionForm } from "../../../forms";
import { useUsers } from "../../../hooks";
import { User } from "../../../types/models";
import { Loading, ProjectNames, UserWithSkills } from "../../molecules";

type UserTableProps = {
  searchConditionForm: SearchConditionForm;
  onUserClick?: (_userId: string) => void;
};

const UserTable = ({ searchConditionForm, onUserClick }: UserTableProps) => {
  const [currentYear] = useState(new Date().getFullYear());
  const [currentMonth] = useState(new Date().getMonth() + 1);
  const { users, error, loading } = useUsers(searchConditionForm);

  const calcPercent = useCallback((month: number, user: User) => {
    let plan = -1;
    let actual = -1;
    const projectUsers = user.projectUsers || [];
    projectUsers.forEach((projectUser) => {
      projectUser.projectUserPlans?.forEach((projectUserPlan) => {
        const pupMonth = moment(projectUserPlan.month).month();
        if (pupMonth === month) {
          if (plan === -1) {
            plan = 0;
          }
          if (actual === -1) {
            actual = 0;
          }
          plan += projectUserPlan.plan || 0;
          actual += projectUserPlan.actual || 0;
        }
      });
    });
    return [plan, actual];
  }, []);

  return (
    <TableContainer
      sx={{
        height: "100%",
        ".sticky-column": {
          left: 0,
          zIndex: 100,
          position: "sticky",
          bgcolor: "#ffffff",
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      <Table stickyHeader size="small" sx={{ width: "100%" }}>
        <TableHead sx={{ th: { bgcolor: "#ffffff" } }}>
          <TableRow>
            <TableCell className="sticky-column" sx={{ width: 200, minWidth: 200, zIndex: "300 !important" }}>
              Nhân sự
            </TableCell>
            <TableCell
              className="sticky-column"
              align="right"
              sx={{
                whiteSpace: "nowrap",
                width: "50px",
                minWidth: "50px",
                left: "233px !important",
                zIndex: "300 !important",
              }}
            >
              G Point
            </TableCell>
            <TableCell sx={{ width: "14%" }}>Dự án</TableCell>
            {Array.from(Array(12).keys()).map((num) => (
              <TableCell
                key={num}
                align="center"
                sx={{
                  bgcolor:
                    searchConditionForm.year === currentYear && num + 1 === currentMonth ? "#e6ffff" : "transparent",
                }}
              >
                T{num + 1}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(error || loading) && (
            <TableRow>
              <TableCell colSpan={15}>{error ? <Alert severity="error">Error</Alert> : <Loading />}</TableCell>
            </TableRow>
          )}
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="sticky-column">
                <UserWithSkills user={user} onUserClick={onUserClick} />
              </TableCell>
              <TableCell align="right" className="sticky-column" sx={{ left: "233px !important" }}>
                {user.gPoint}
              </TableCell>
              <TableCell>
                <ProjectNames projectUsers={user.projectUsers} />
              </TableCell>
              {Array.from(Array(12).keys()).map((num) => {
                const [plan, actual] = calcPercent(num + 1, user);
                if (
                  searchConditionForm.year < currentYear ||
                  (searchConditionForm.year >= currentYear && num + 1 < currentMonth)
                ) {
                  if (actual === -1) {
                    return <TableCell key={num} sx={{ width: "6%" }} />;
                  }
                  return (
                    <TableCell key={num} align="center" sx={{ width: "6%" }}>
                      {actual}
                    </TableCell>
                  );
                }

                if (plan === -1) {
                  return (
                    <TableCell
                      key={num}
                      sx={{ width: "6%", bgcolor: num + 1 === currentMonth ? "#e6ffff" : "transparent" }}
                    />
                  );
                }
                return (
                  <TableCell
                    key={num}
                    align="center"
                    sx={{ width: "6%", bgcolor: num + 1 === currentMonth ? "#e6ffff" : "transparent" }}
                  >
                    {plan}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
