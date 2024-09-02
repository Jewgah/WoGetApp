/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState } from "react";
import "./Carousel.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Small_card from "../Small_Card/Small_card";
import Small_Card_Edit from "../Small_Card_Edit/Small_Card_Edit";
import UserCard from "../UserCard/UserCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Rating from "@mui/material/Rating";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarsIcon from "@mui/icons-material/Stars";
import PeopleIcon from "@mui/icons-material/People";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import LoadingPage from "../LoadingPage/LoadingPage";
import BookedService from "../../services/Api/Controllers/BookedService.js";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import DateRangePickerCustom from "../DateP/DateP";
import { getAverage } from "../../lib/outilsForms";

// ********************* ARROW BUTTON ****************************

function ArrowButton({ children, handleClick }) {
	return (
		<div onClick={() => handleClick()} className="btn">
			<span>{children}</span>
		</div>
	);
}

// ********************* CAROUSEL COMPONENT (MAIN) ***************
function Carousel({ post, user }) {
	let navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [data, setData] = React.useState("");
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();
	const [rating] = useState(user?.averageRate);
	const handleSubmitForm = (current) => {
		if (!startDate || !endDate) {
			alert("Please select a date");
			return;
		}
		const dataToForm = {
			...current,
			from: startDate,
			to: endDate,
			post_id: post._id,
		};
		setData(dataToForm);
		BookedService.bookedNew(dataToForm)
			.then((auth) => {
				if (auth) {
					alert("Date Booked");
					navigate("/");
				} else {
					alert("error is occured on server");
				}
			})
			.catch((error) => {
				console.log(error);
				alert("error is occured");
			});
	};

	var prefix_map = "https://www.google.com/maps/embed/v1/place?q=place_id:";
	var place_id = post?.address?.value?.place_id;
	var suffix_map = "&zoom=18&key=" + {$apikey};
	var full_map = prefix_map + place_id + suffix_map;

	let images =
		post?.pictures?.length > 0
			? post.pictures.map((item) => `data:image/jpeg;base64,${item}`)
			: [
					"https://cdn.autonomous.ai/static/upload/images/common/upload/20210209/MacBook-Desk-Setup-A-Complete-Guide-for-Apple-Lovers_27e2fe6dd0d.jpg",
					"https://theplanetd.com/images/Best-Things-to-do-in-Marseille-France.jpg",
					"https://www.novomeuble.com/img/cms/MCA/BUREAU/meuble-bureau-design-bois-massif-avec-rangement-sur-roulettes.jpg",
			  ];
	let description = post?.description;

	const [index, setIndex] = React.useState(0);

	const handleClickLeft = () => {
		index === 0 ? setIndex(images.length - 1) : setIndex(index - 1);
	};

	const handleClickRight = () => {
		index === images.length - 1 ? setIndex(0) : setIndex(index + 1);
	};
	return (
		<>
			<div className="header_product">
				<div className="product_form">
					<Box
						component="form"
						onSubmit={handleSubmit((data) =>
							handleSubmitForm(data)
						)}
					>
						<h1 className="title_form">BOOK A DATE </h1>

						<Grid
							container
							spacing={8}
							style={{ justifyContent: "center" }}
						>
							<Grid item xs={12} sm={3}>
								<DateRangePickerCustom
									startDate={startDate}
									setStartDate={setStartDate}
									endDate={endDate}
									setEndDate={setEndDate}
									dateOccupied={post.bookedPostsFilter}
								/>
							</Grid>
							<Grid item xs={12} sm={10}>
								<TextField
									name="Number"
									required
									fullWidth
									id="n_host"
									sx={{ mr: 2 }}
									label="Number Of Host"
									type="number"
									size="large"
									{...register("n_host", {
										required: true,
									})}
									error={errors?.n_host ? true : false}
									InputProps={{
										inputProps: { min: 1, max: 100 },
									}}
									helperText={errors?.n_host?.message}
								/>
							</Grid>

							<Grid item xs={12} sm={10}>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="secondary"
									borderRadius="65px"
									item
									xs={12}
									sm={10}
									style={{
										maxHeight: "40px",
										justifyContent: "center",
										maxWidth: "100%",
									}}
								>
									Book a date
								</Button>
							</Grid>
						</Grid>
					</Box>
				</div>

				<div className="product_carousel">
					<div
						className="photos"
						style={{ backgroundImage: `url(${images[index]})` }}
					></div>
					<div className="btnContainer">
						<ArrowButton handleClick={handleClickLeft}>
							<ArrowLeftIcon />
						</ArrowButton>
						<ArrowButton handleClick={handleClickRight}>
							<ArrowRightIcon />
						</ArrowButton>
					</div>
				</div>

				<Typography
					component="h1"
					variant="4"
					sx={{ mt: 12 }}
					width="75%"
					style={{ marginLeft: "10%", marginRight: "10%" }}
				>
					Post Informations :
				</Typography>

				<Divider
					sx={{ mb: 4 }}
					width="75%"
					style={{ marginLeft: "10%", marginRight: "10%" }}
				/>

				<List
					style={{
						display: "flex",
						flexDirection: "row",
						padding: 0,
						marginLeft: "10%",
						marginRight: "10%",
					}}
					sx={{ mb: 3 }}
				>
					<ListItem>
						{" "}
						<CalendarMonthIcon
							style={{
								height: 40,
								width: 40,
								marginRight: "10%",
							}}
							sx={{ mr: 3 }}
						/>{" "}
					</ListItem>
					<ListItem>
						{" "}
						<LocationOnIcon
							style={{
								height: 40,
								width: 40,
								marginRight: "10%",
							}}
							sx={{ mr: 3 }}
						/>{" "}
						<Typography component="h6" variant="h5">
							{" "}
							{post?.address?.label}{" "}
						</Typography>
					</ListItem>
					<ListItem>
						{" "}
						<StarsIcon
							style={{
								height: 40,
								width: 40,
								marginRight: "10%",
							}}
							sx={{ mr: 3 }}
						/>
						<Rating
							name="read-only"
							value={getAverage(post?.rate)}
							readOnly
							size="large"
						/>{" "}
					</ListItem>
					<ListItem>
						{" "}
						<PeopleIcon
							style={{ height: 40, width: 40, marginRight: "5%" }}
							sx={{ mr: 2 }}
						/>
						<Typography component="h6" variant="h5">
							{" "}
							{post?.minimumperson}-{post?.maximumperson}
						</Typography>
					</ListItem>
				</List>

				<Divider
					sx={{ mb: 10, mt: 5 }}
					width="75%"
					style={{ marginLeft: "10%", marginRight: "10%" }}
				/>

				<div className="flex-container">
					{post?.tags?.map((tag, key) => (
						<div className="flex-child" key={key}>
							{" "}
							<Small_card key={key} tag={tag} />{" "}
						</div>
					))}

					{/* <div className="flex-child">
            <Small_card tag={post?.tags} />
          </div> */}
				</div>
			</div>
			<Typography
				component="h1"
				variant="4"
				sx={{ mt: 12 }}
				width="75%"
				style={{ marginLeft: "10%", marginRight: "10%" }}
			>
				Description :
			</Typography>
			<Divider
				sx={{ mb: 10 }}
				width="75%"
				style={{ marginLeft: "10%", marginRight: "10%" }}
			/>
			<Typography
				component="h1"
				value={description}
				variant="h4"
				style={{ marginLeft: "10%", marginRight: "10%" }}
				sx={{ mt: 10, mr: 40 }}
				textAlign="center"
			>
				<div>{description}</div>
			</Typography>

			<Typography
				component="h1"
				variant="4"
				sx={{ mt: 12 }}
				width="75%"
				style={{ marginLeft: "10%", marginRight: "10%" }}
			>
				Host Informations :
			</Typography>

			<Divider
				sx={{ mb: 3 }}
				width="75%"
				style={{ marginLeft: "10%", marginRight: "10%" }}
			/>
			<div className="user_info">
				<List
					style={{
						display: "flex",
						flexDirection: "row",
						padding: 0,
						marginLeft: "10%",
						marginRight: "10%",
					}}
					sx={{ mb: 2 }}
				>
					<ListItem>
						{" "}
						<img
							width="100px"
							height="100px"
							src={"https://zupimages.net/up/22/30/gqua.png"}
							alt=""
						/>{" "}
						<Typography component="h6" variant="h5">
							{" "}
							{user?.firstname} {user?.lastname}
						</Typography>
					</ListItem>
					<ListItem>
						{" "}
						<CallIcon
							style={{ height: 40, width: 40 }}
							sx={{ mr: 3 }}
						/>{" "}
						<a className="tel" href="tel:+1-555-555-1212">
							{" "}
							<Typography component="h6" variant="h5">
								{user?.phone}
							</Typography>
						</a>{" "}
					</ListItem>
					<ListItem>
						{" "}
						<EmailIcon
							style={{ height: 40, width: 40 }}
							sx={{ mr: 3 }}
						/>{" "}
						<a className="tel" href="mailto:webmaster@example.com">
							{" "}
							<Typography component="h6" variant="h5">
								{" "}
								{user?.email}
							</Typography>
						</a>
					</ListItem>
					<ListItem>
						{" "}
						<StarsIcon
							style={{ height: 40, width: 40 }}
							sx={{ mr: 3 }}
						/>
						<Rating
							name="read-only"
							value={rating}
							readOnly
							size="large"
						/>{" "}
						{`(${rating})`}
					</ListItem>
				</List>
			</div>

			<div className="user_info_phone">
				<UserCard user={user} />
			</div>
			<Typography
				component="h1"
				variant="4"
				sx={{ mt: 12 }}
				width="75%"
				style={{ marginLeft: "10%", marginRight: "10%" }}
			>
				Plan :
			</Typography>
			<Divider
				sx={{ mb: 10 }}
				width="75%"
				style={{ marginLeft: "10%", marginRight: "10%" }}
			/>
			{place_id ? (
				<div className="maps">
					<iframe
						src={full_map}
						width="77%"
						border-radius="20"
						height="300"
						frameBorder="0"
						style={{ borderRadius: "50px", marginLeft: "10%" }}
						allowFullScreen=""
						aria-hidden="false"
						tabIndex="0"
					/>
				</div>
			) : (
				<div className="load">
					{" "}
					<LoadingPage />
				</div>
			)}

			<Divider sx={{ mt: 10, mb: 10, ml: 40, mr: 40 }} width="75%" />
		</>
	);
}

export default Carousel;
