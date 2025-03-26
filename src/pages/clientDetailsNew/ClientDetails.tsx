import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Email, Person } from "@mui/icons-material";
import { LinkButton } from "../../components/presentables/LinkButton";
import { useContextRecord } from "../../components/record/context";
import { Client } from "../../types/entities/client";

type ClientDetailsProps = {};

export const ClientDetails = ({}: ClientDetailsProps) => {
  const { data } = useContextRecord<Client>();

  return (
    <Card
      sx={{
        maxWidth: 500,
        mx: "auto",
        mt: 4,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {data.first_name[0]}
            {data.last_name[0]}
          </Avatar>
        }
        title={
          <Typography variant="h6" fontWeight="bold">
            {data.name}
          </Typography>
        }
        subheader={`Id do Cliente: ${data.id}`}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={12}>
            <Chip
              label={data.status.charAt(0).toUpperCase() + data.status.slice(1)}
              color={
                data.status === "published"
                  ? "success"
                  : data.status === "draft"
                  ? "warning"
                  : "default"
              }
              sx={{ fontWeight: "bold" }}
            />
          </Grid>
          <Grid size={12}>
            <Typography variant="body2" color="textSecondary">
              <Person sx={{ verticalAlign: "middle", mr: 1 }} />
              ID do Psicólogo responsável: {data.psychologist}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="body2" color="textSecondary">
              <Email sx={{ verticalAlign: "middle", mr: 1 }} />
              {data.email}
            </Typography>
          </Grid>
          <Grid size={12}>
            <Typography variant="body2" color="textSecondary">
              Criado a: {new Date(data.date_created).toLocaleDateString()}
            </Typography>
          </Grid>
          {data.date_updated && (
            <Grid size={12}>
              <Typography variant="body2" color="textSecondary">
                Atualizado em:{" "}
                {new Date(data.date_updated).toLocaleDateString()}
              </Typography>
            </Grid>
          )}
          <Box
            sx={{
              display: "flex",
              flex: 1,
              justifyContent: "end",
            }}
          >
            <LinkButton to="/items/notes" label="Ver notas de sessão" />
          </Box>
        </Grid>
      </CardContent>
    </Card>
  );
};
