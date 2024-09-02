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
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import logoIcon from "../../../assets/images/icons/logo.png";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Footer from "../../Footer/Footer";
import AuthService from "../../../services/Api/Controllers/AuthService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [data, setData] = React.useState("");
	let navigate = useNavigate();

	const handleSubmitForm = (thisData) => {
		setData(thisData);
		onSubmitRegister(thisData);
	};
	const styles = {
		paperContainer: {
			backgroundSize: "cover",
			backgroundImage: `url(${"https://zupimages.net/up/22/21/u6hv.png"})`,
			minHeight: 1400,
		},
		formContainer: {
			padding: "40px",
		},
	};
	const style_form = {
		paperContainer: {
			borderRadius: "25px",
			boxShadow: "5px 5px 9px 3px rgba(0,0,0,0.78)",
			backgroundColor: "white",
			maxWidth: 550,
			minHeight: 650,
		},
	};
	const onSubmitRegister = (type) => {
		AuthService.signIn(type.email, type.password)
			.then((auth) => {
				if (auth) {
					console.log("Connected");
					navigate("/");
				} else {
					alert("incorrect password or email");
				}
			})
			.catch((error) => {
				console.log(error);
				alert("incorrect password or email");
			});
	};

	return (
		<div style={styles.paperContainer}>
			<div style={styles.formContainer}>
				<Container
					component="main"
					maxWidth="xs"
					style={style_form.paperContainer}
				>
					<CssBaseline />
					<Box
						sx={{
							marginTop: 8,
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<img
							alt="WoGet"
							src={logoIcon}
							width="300px"
							height="150px"
						/>
						<Typography component="h1" variant="h4" align="center">
							Sign in
						</Typography>
						<Box
							component="form"
							onSubmit={handleSubmit((data) =>
								handleSubmitForm(data)
							)}
							sx={{ mt: 1 }}
						>
							<TextField
								margin="normal"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								autoFocus
								{...register("email", {
									required: true,
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
										message:
											"Please enter a valid email address",
									},
								})}
								error={errors?.email ? true : false}
								helperText={errors?.email?.message}
							/>
							<TextField
								margin="normal"
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
							<FormControlLabel
								control={
									<Checkbox
										value="remember"
										color="primary"
									/>
								}
								label="Remember me"
							/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								sx={{ mt: 3, mb: 2 }}
							>
								Sign In
							</Button>
							<Grid container>
								<Grid item xs>
									<Link href="#" variant="body2">
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link href="/auth/signup" variant="body2">
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						</Box>
					</Box>
					<Footer sx={{ mt: 8, mb: 4 }} />
				</Container>
			</div>
		</div>
	);
}
