import { AbcTwoTone } from "@mui/icons-material";
import { Box, Card, CardActionArea, CardContent, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";

export type FunctionCardItemProps = {
  icon: typeof AbcTwoTone;
  title: string;
  description: string;
  href?: string;
};

const FunctionCardItem = ({ icon: Icon, title, description, href }: FunctionCardItemProps) => {
  const router = useRouter();

  const handleClick = useCallback(() => href && router.push(href), [href, router]);

  return (
    <Card
      sx={{
        margin: (theme) => `${theme.spacing(2)} !important`,
        width: {
          xs: "100%",
          md: "350px",
        },
      }}
    >
      <CardActionArea sx={{ minHeight: (theme) => theme.spacing(16) }} onClick={handleClick}>
        <CardContent>
          <Stack direction="row" alignItems="center" height="100%">
            <Icon
              color="success"
              sx={{
                paddingRight: (theme) => theme.spacing(2),
                fontSize: (theme) => theme.spacing(7),
              }}
            />
            <Box>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default FunctionCardItem;
