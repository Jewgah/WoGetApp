import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
// import LocationOnIcon from '@mui/icons-material/LocationOn';

const theme = createTheme({
	palette: {
		primary: {
			light: "#000000",
			main: "#000000",
			dark: "#000000",
			contrastText: "#fff",
		},
		secondary: {
			light: "#FF385C",
			main: "#FF385C",
			dark: "#FF385C",
			contrastText: "#000",
		},
	},
});
export default function UserCard({ user }) {
	return (
		<ThemeProvider theme={theme}>
			<Box
				sx={{
					bgcolor: "background.paper",
					pt: 8,
					pb: 6,
				}}
			>
				<Container maxWidth="sm">
					<Grid item xs={12} sm={6} md={4}>
						<Card
							sx={{
								height: "100%",
								display: "flex",
								flexDirection: "column",
								borderRadius: "35px",
							}}
						>
							<CardMedia
								component="img"
								sx={{
									// 16:9
									//   pt: '56.25%',
									height: "55%",
									width: "40%",
									margin: "5%",
									marginLeft: "30%",
									borderRadius: "35px",
								}}
								// image="https://source.unsplash.com/random"
								image="https://zupimages.net/up/22/30/gqua.png"
								alt="random"
							/>
							<CardContent sx={{ flexGrow: 1 }}>
								<Typography
									gutterBottom
									variant="4"
									component="h2"
									textAlign="center"
								>
									{user?.firstname} {user?.lastname}
								</Typography>
								<Typography
									gutterBottom
									sx={{ mb: 1 }}
									component="h2"
									textAlign="center"
								>
									<CallIcon
										style={{ height: 20, width: 20 }}
										sx={{ mr: 1 }}
									/>{" "}
									{user?.phone}
								</Typography>
								<Typography
									gutterBottom
									sx={{ mb: 1 }}
									component="h2"
									textAlign="center"
								>
									<EmailIcon
										style={{ height: 20, width: 20 }}
										sx={{ mr: 1 }}
									/>{" "}
									{user?.email}
								</Typography>
								<Typography textAlign="center">
									{/* <LocationOnIcon style={{ height: 20, width: 20 }} sx={{ mr: 1 }} /> */}
								</Typography>
							</CardContent>
							<Stack
								sx={{ pt: 4, mb: 10 }}
								direction="row"
								spacing={2}
								justifyContent="center"
							>
								<Button variant="contained">
									Chat with the host
								</Button>
								<Button variant="outlined">See more</Button>
							</Stack>
						</Card>
					</Grid>
				</Container>
			</Box>
		</ThemeProvider>
	);
}
