import { Button, Grid } from "@mui/material";

type PropNotFound = {
  handelFunction?: any;
  showButton?: boolean;
};

export const NotFound = ({ handelFunction, showButton = true }: PropNotFound) => {
  return (
    <Grid item xs={12} sx={{ textAlign: "center", paddingTop: 4 }}>
      <Grid item sx={{ color: "#9f9e9e" }}>
        Data not found
      </Grid>
      {showButton && (
        <Button
          onClick={() => handelFunction()}
          sx={{ marginTop: 2, textTransform: "unset", backgroundColor: "#1ab394", padding: "10px 35px" }}
          variant="contained"
        >
          Add device
        </Button>
      )}
    </Grid>
  );
};
