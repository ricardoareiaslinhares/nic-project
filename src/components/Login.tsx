import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useAuth } from "../api/auth/auth";
import { LoginDataType } from "../types/types";

const Login = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isAuthenticated, login, logout } = useAuth();

  const onSubmit = async (data: LoginDataType) => {
    await login(data.email, data.password);
  };

  return (
    <Card
      sx={{ maxWidth: 400, margin: "auto", mt: 10, p: 2, textAlign: "center" }}
    >
      <CardContent>
        {isAuthenticated ? (
          <Button onClick={logout} variant="contained" color="secondary">
            Logout
          </Button>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Login
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Email is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Controller
                name="password"
                control={control}
                rules={{ required: "Password is required" }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default Login;
