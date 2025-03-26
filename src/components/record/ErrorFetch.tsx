import { Box, Typography } from "@mui/material";

type ErrorFetchProps = {};

export const ErrorFetch = ({}: ErrorFetchProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        minHeight: "50px",
      }}
    >
      <Typography variant="h5">
        Não foi possível carregar os dados. Tente novamente ou mais tarde
      </Typography>
    </Box>
  );
};
