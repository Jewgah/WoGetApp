import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AuthService from "../../services/Api/Controllers/AuthService";
import BookedService from "../../services/Api/Controllers/BookedService";
import { useEffect } from "react";
import { useState } from "react";
import PostService from "../../services/Api/Controllers/PostService";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import DialogRate from "../../components/Dialog/DialogRate";
import { Rating } from "@mui/material";

export default function AccountPage() {
	const [user, setUser] = useState({});
	const [userPost, setUserPost] = useState([]);
	const [myBookings, setMyBookings] = useState([]);
	const [reateIdSelect, setReateIdSelect] = useState("");
	const [loading, setLoading] = useState(true);
	let navigate = useNavigate();


	const deleteById = (id) => {
		confirm("Are you sure you want to delete this post ?")
			? PostService.deleteById({ id })
					.then(() => {
						window.location.reload();
					})
					.catch((err) => {
						console.log(err);
						alert("Error while deleting post");
					})
					.finally(() => {
						setLoading(false);
					})
			: null;
	};
	useEffect(() => {
		if (loading) {
			AuthService.getMe()
				.then((thisUser) => setUser(thisUser))
				.then(() =>
					PostService.getMyPost().then((thisUser) =>
						setUserPost(thisUser)
					)
				)
				.finally(() => {
					BookedService.getMyBooked().then((thisUser) =>
						setMyBookings(thisUser)
					);
				})
				.then(() => setLoading(false))
				.catch((err) => console.log(err));
		}
	}, []);

	if (loading) return <LoadingPage />;

	return (
		<div className="Album">
			<Box
				sx={{
					bgcolor: "background.paper",
					pt: 8,
					pb: 6,
				}}
			>
				<Container maxWidth="sm">
					<Typography
						component="h1"
						variant="h3"
						align="center"
						color="text.primary"
						gutterBottom
					>
						Your Profil
					</Typography>
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
									height: "55%",
									width: "40%",
									margin: "5%",
									marginLeft: "30%",
									borderRadius: "35px",
								}}
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
									{`${user?.firstname} ${user?.lastname}`}
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
									<LocationOnIcon
										style={{ height: 20, width: 20 }}
										sx={{ mr: 1 }}
									/>
									7 Smilansky Netanya
								</Typography>
							</CardContent>
							<Stack
								sx={{ pt: 4, mb: 10 }}
								direction="row"
								spacing={2}
								justifyContent="center"
							>
								<Button variant="contained">Edit Profil</Button>
								<Button variant="outlined">
									Manage Access
								</Button>
							</Stack>
						</Card>
					</Grid>
				</Container>
			</Box>
			<Typography
				component="h1"
				variant="4"
				sx={{ mt: 12 }}
				width="75%"
				style={{ marginLeft: "10%", marginRight: "10%" }}
			>
				Office Posted by you:
			</Typography>
			<Divider
				sx={{ mt: 2 }}
				width="75%"
				style={{ marginLeft: "10%", marginRight: "10%" }}
			/>
			<Container sx={{ py: 8, borderRadius: "55px" }} maxWidth="xl">
				{/* End hero unit */}
				<Grid container spacing={10}>
					{userPost?.map((card, key) => (
						<Grid item key={key} xs={12} sm={6} md={4}>
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
										height: "55%",
										width: "90%",
										margin: "5%",
										borderRadius: "35px",
									}}
									image={usePicture(card?.pictures[0])}
									alt="random"
								/>
								<CardContent sx={{ flexGrow: 1 }}>
									<Typography
										gutterBottom
										variant="4"
										component="h2"
										textAlign="center"
									>
										{card?.title}
									</Typography>
									<Typography textAlign="center">
										{card?.description}
									</Typography>
								</CardContent>
								<CardActions
									sx={{ mb: 2, justifyContent: "center" }}
								>
									<Button
										onClick={() => {
											navigate("/product/" + card?._id);
										}}
										color="warning"
										variant="contained"
										size="large"
									>
										View
									</Button>
									<Button
										onClick={() => {
											navigate("/edit/" + card?._id);
										}}
										color="grey"
										variant="contained"
										size="large"
									>
										Edit
									</Button>
									<Button
										onClick={() => deleteById(card?._id)}
										color="secondary"
										variant="contained"
										size="large"
									>
										Delete
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
			<Typography
				component="h1"
				variant="4"
				sx={{ mt: 12 }}
				width="75%"
				style={{ marginLeft: "10%", marginRight: "10%" }}
			>
				Booked Office :
			</Typography>
			<Divider
				sx={{ mt: 2 }}
				width="75%"
				style={{ marginLeft: "10%", marginRight: "10%" }}
			/>
			<Container sx={{ py: 8, borderRadius: "55px" }} maxWidth="xl">
				{/* End hero unit */}
				<Grid container spacing={10}>
					{myBookings.map((card) => (
						<Grid item key={card} xs={12} sm={6} md={4}>
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
										width: "90%",
										margin: "5%",
										borderRadius: "35px",
									}}
									// image="https://source.unsplash.com/random"
									image={usePicture(card?.pictures[0])}
									alt="random"
								/>
								<CardContent sx={{ flexGrow: 1 }}>
									<Typography
										gutterBottom
										variant="4"
										component="h2"
										textAlign="center"
									>
										{card?.title}
									</Typography>
									<Typography textAlign="center">
										This is a media card. You can use this
										section to describe the content.
									</Typography>
								</CardContent>
								<CardActions sx={{ mb: 2 }}>
									<Button
										style={{
											margin: "10%",
											marginLeft: "17%",
										}}
										color="secondary"
										variant="contained"
										size="large"
										onClick={() => {
											navigate("/product/" + card?._id);
										}}
									>
										View
									</Button>
									{!card.booked_this?.rate ? (
										<Button
											style={{
												margin: "10%",
												marginLeft: "17%",
											}}
											variant="contained"
											size="large"
											onClick={() =>
												setReateIdSelect(card?._id)
											}
										>
											Rate
										</Button>
									) : (
										<Rating
											value={
												card.booked_this?.rate
													?.averageRate
											}
											readOnly
											size="large"
										/>
									)}
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
			<DialogRate
				open={reateIdSelect !== ""}
				setOpenRate={setReateIdSelect}
				id={reateIdSelect}
			>
				<p>test</p>
			</DialogRate>
		</div>
	);
}

const usePicture = (base64) => {
	if (base64 === undefined) {
		return "https://zupimages.net/up/22/19/hfdp.png";
	} else {
		return `data:image/jpeg;base64,${base64}`;
	}
};
