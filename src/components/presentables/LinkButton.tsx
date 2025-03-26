import { Button } from "@mui/material";
import { Link } from "react-router-dom"; // If using React Router
import OpenInNewIcon from "@mui/icons-material/OpenInNew"; // Optional icon

type LinkButtonProps = {
  to: string;
  label: string;
};

export const LinkButton = ({ to, label }: LinkButtonProps) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      component={Link}
      to={to}
      sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}
      endIcon={<OpenInNewIcon />}
    >
      {label}
    </Button>
  );
};
