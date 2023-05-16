import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import moment from "moment";

import { useUser } from "../../../../hooks";
import { Spinner } from "../../../atoms";
import { Loading } from "../../../molecules";

type UserDetailDialogProps = {
  open: boolean;
  userId?: string;
  onClose?: () => void;
};

const UserDetailDialog = ({ open, userId, onClose }: UserDetailDialogProps) => {
  const { user, loading } = useUser(userId);

  return (
    <Dialog open={open} onClose={onClose} scroll="paper" fullWidth maxWidth="xs">
      <DialogTitle sx={{ display: "flex" }}>
        {loading ? <Spinner size="small" /> : `${user?.fullName} (${user?.username})`}
      </DialogTitle>
      <DialogContent dividers>
        {loading ? (
          <Loading />
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={4}>
                  <Typography fontWeight="bold">Họ tên</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{user?.fullName}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography fontWeight="bold">Email</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{user?.email}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography fontWeight="bold">Số điện thoại</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography>{user?.phone}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography fontWeight="bold">Trình độ kỹ thuật</Typography>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={11}>
                  {user?.userSkills?.length === 0 && <Typography color="gray">Chưa cập nhật</Typography>}
                  {user?.userSkills?.map((userSkill) => (
                    <Typography key={userSkill.id}>{`- ${userSkill.skill?.name} (${userSkill.level})`}</Typography>
                  ))}
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography fontWeight="bold">Dự án đang tham gia</Typography>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={11}>
                  {user?.projectUsers?.length === 0 && <Typography color="gray">Chưa cập nhật</Typography>}
                  {user?.projectUsers?.map((projectUser) => (
                    <Typography key={projectUser.id}>
                      {`- ${projectUser.project?.name} (${projectUser.position}): từ ngày ${moment(
                        projectUser.joinDate
                      ).format("DD/MM/YYYY")}`}
                    </Typography>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailDialog;
