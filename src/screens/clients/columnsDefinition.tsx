import { Box, Typography } from "@mui/material";
import { DataGridColumnMapType } from "../../types/dataGrid.types";

export const clientsColumnMap: DataGridColumnMapType = {
  id: {
    field: "id",
    headerName: "ID",
    width: 70,
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          alignSelf: "center",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
          }}
        >
          {params.row.id}
        </Typography>
      </Box>
    ),
  },
  status: {
    hidden: false, // custom field
    field: "status",
    headerName: "Estado",
    width: 150,
    renderCell: (params) => (
      <p style={{ color: params.row.status === "published" ? "green" : "red" }}>
        {params.row.status}
      </p>
    ),
  },
};
