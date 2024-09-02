/* eslint-disable no-unused-vars */
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Footer from "../../Footer/Footer";
import logoIcon from "../../../assets/images/icons/logo.png";
import { useForm } from "react-hook-form";
import AuthService from "../../../services/Api/Controllers/AuthService";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [data, setData] = React.useState("");
  const [SuccesForm, setSuccesForm] = React.useState(0);
  let navigate = useNavigate();

  const handleSubmitForm = (current) => {
    setData(current);
    onSubmitRegister(current);
  };

  React.useEffect(() => {
    if (SuccesForm !== 0) {
      navigate("/auth/login");
    }
  }, [SuccesForm]);

  const onSubmitRegister = (type) => {
    async function data(type) {
      const boolres = await AuthService.signUp(
        type.email,
        type.password,
        type.lastname,
        type.firstname,
        type.phone
      );
      setSuccesForm(boolres);
    }
    if (SuccesForm === 0) {
      data(type);
    }
  };
  const styles = {
    paperContainer: {
        backgroundSize: 'cover', 
        backgroundImage: `url(${"https://zupimages.net/up/22/21/u6hv.png"})`,
        minHeight: 1400,
    },
    formContainer:{
      padding: '40px'
    }
};
const style_form = {
  paperContainer: {
    borderRadius: '25px',
    boxShadow: '5px 5px 9px 3px rgba(0,0,0,0.78)',
    backgroundColor:'white',
    maxWidth: 550,
    minHeight: 750,

}
};

  return (
    <div style={styles.paperContainer}>
    <div style={styles.formContainer}> 
    <Container component="main" maxWidth="xs" style={style_form.paperContainer}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img alt="WoGet" src={logoIcon} width="300px"  height="150px" />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => handleSubmitForm(data))}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstname"
                required
                fullWidth
                id="firstname"
                label="First Name"
                autoFocus
                {...register("firstname", { required: true, maxLength: 100 })}
                error={errors?.firstname ? true : false}
                helperText={errors?.firstname?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastname"
                label="Last Name"
                name="lastname"
                autoComplete="family-name"
                {...register("lastname", { required: true, maxLength: 100 })}
                error={errors?.lastname ? true : false}
                helperText={errors?.lastname?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                type="tel"
                autoComplete="phone"
                {...register("phone", {
                  required: true,
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter an integer",
                  },
                })}
                error={errors?.phone ? true : false}
                helperText={errors?.phone?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
                error={errors?.email ? true : false}
                helperText={errors?.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="password"
                {...register("password", {
                  required: true,
                  minLength: 7,
                  maxLength: 100,
                })}
                error={errors?.password ? true : false}
                helperText={errors?.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
                {...register("allowExtraEmails")}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/auth/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer sx={{ mt: 5 }} />
    </Container>
    </div>
  </div>
  );
}
