/* eslint-disable no-mixed-spaces-and-tabs */

import React from "react";
import "./EditPost.css";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
// import AvailableDayList from "../../components/Lists/AvailableDayList/AvailableDayList";
import { Controller, useForm } from "react-hook-form";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Small_Card_Edit from "../Small_Card_Edit/Small_Card_Edit";
import Small_card from "../Small_Card/Small_card";

//TODO : update image/ update infos. for image: add/delete, without the possibility to delete when there is only one image.
//for infos, possibility to update all the tags displayed in ads component

// ********************* ARROW BUTTON ****************************

function ArrowButton({ children, handleClick }) {
	return (
		<div onClick={() => handleClick()} className="btn">
			<span>{children}</span>
		</div>
	);
}

function EditPost({ post }) {
	const { control } = useForm();

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
			<div className="title_product">
				<Grid container spacing={5} sx={{ ml: 3 }}>
					<Grid item xs={12} sm={4}>
						<TextField
							id="title_product"
							placeholder={post.title}
							label="Post title"
							variant="outlined"
							fullWidth
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<EditIcon />
									</InputAdornment>
								),
							}}
						>
							{" "}
						</TextField>
					</Grid>
				</Grid>
			</div>

			<div className="header_product">
				<div className="product_form">
					<Box component="form">
						<Typography
							component="h1"
							variant="h3"
							style={{ marginLeft: "10%", marginRight: "10%" }}
							sx={{ mt: 2, mr: 40 }}
							textAlign="center"
						>
							<div> Update Post Informations</div>
						</Typography>
						<Grid container spacing={5} sx={{ ml: 3 }}>
							<Grid item xs={12} sm={9}>
								<LocationOnIcon
									style={{
										height: 40,
										width: 40,
										marginRight: "1%",
									}}
									sx={{ mt: 5, mr: 3 }}
								/>
								<Controller
									name="address"
									control={control}
									render={({ field, fieldState }) => (
										<>
											<GooglePlacesAutocomplete
												minLength={2}
												autoFocus={false}
												fetchDetails={true}
												apiKey={$apikey};
												autocompletionRequest={{
													componentRestrictions: {
														country: ["il"],
													},
												}}
												selectProps={{
													...field,
													placeholder:
														post?.address?.label,
													isClearable: true,
													styles: {
														control: (
															base,
															state
														) => ({
															...base,
															background: "white",
															borderRadius:
																state.isFocused
																	? "3px 3px 0 0"
																	: 3,
														}),
														menu: (base) => ({
															...base,
															borderRadius: 0,
															marginTop: 0,
														}),
														menuList: (base) => ({
															...base,
															padding: 0,
															background: "	white",
															zIndex: 999,
															opacity: 1,
														}),
													},
												}}
											/>
											{fieldState.error && (
												<div style={{ color: "red" }}>
													{fieldState.error.message}
												</div>
											)}
										</>
									)}
								/>
							</Grid>

							<Grid item xs={12} sm={11}>
								<CalendarMonthIcon
									style={{
										height: 40,
										width: 40,
										marginRight: "1%",
									}}
									sx={{ mt: 5, mr: 3 }}
								/>
							</Grid>

							<Grid item xs={12} sm={10}>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="secondary"
									borderRadius="65px"
									sx={{ mt: 10, mb: 2, mr: 2 }}
									item
									xs={12}
									sm={10}
									style={{
										maxHeight: "40px",
										justifyContent: "center",
										maxWidth: "100%",
									}}
								>
									Update
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

					<div className="overlay">
						<div className="content">
							<DeleteIcon
								style={{
									height: 70,
									width: 70,
									marginLeft: "40%",
									marginRight: "5%",
								}}
								color="primary"
							/>
							<AddIcon
								style={{
									height: 70,
									width: 70,
									marginRight: "1%",
								}}
								color="primary"
							/>
						</div>
					</div>
					<div className="btnContainer">
						<ArrowButton handleClick={handleClickLeft}>
							<ArrowLeftIcon />
						</ArrowButton>
						<ArrowButton handleClick={handleClickRight}>
							<ArrowRightIcon />
						</ArrowButton>
					</div>
				</div>

				<Divider
					sx={{ mb: 10, mt: 5 }}
					width="75%"
					style={{ marginLeft: "10%", marginRight: "10%" }}
				/>

				<div className="flex-container">
					{post?.tags?.map((tag, key) => (
						<div className="flex-child" key={key}>
							{" "}
							<Small_Card_Edit key={key} tag={tag} />{" "}
						</div>
					))}
					<div className="flex-child">
						<Small_card tag="Add" />
					</div>
				</div>
			</div>

			<Divider
				sx={{ mb: 10, mt: 5 }}
				width="75%"
				style={{
					marginLeft: "10%",
					marginRight: "10%",
					marginTop: "5%",
				}}
			/>

			{/* <Typography component="h1" value={description} variant="h4" style={{  marginLeft: '10%',  marginRight: '10%'}} sx={{ mt: 10, mr: 40 }} textAlign="center" >
                 <div><EditIcon style={{ height: 40, width: 40 ,marginRight: '1%'}} sx={{ mr: 3 }} /> {description}</div>
       </Typography> */}

			<div className="description">
				<Grid container spacing={5} sx={{ ml: "12%", mr: "5%" }}>
					<Grid item xs={12} sm={8}>
						<TextField
							id="description"
							minRows={5}
							multiline="true"
							placeholder={description}
							label="Description"
							variant="outlined"
							fullWidth
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<EditIcon />
									</InputAdornment>
								),
							}}
						>
							{" "}
						</TextField>
					</Grid>
				</Grid>
			</div>

			<Divider
				sx={{ mb: 10 }}
				width="75%"
				style={{
					marginLeft: "10%",
					marginRight: "10%",
					marginTop: "3%",
				}}
			/>

			<div className="flex-child">
				<Button
					variant="contained"
					color="secondary"
					endIcon={<SaveIcon />}
					type="submit"
					fullWidth
					borderRadius="65px"
					sx={{ mt: 3, mb: 2, mr: 2 }}
					item
					xs={12}
					sm={10}
					style={{
						maxHeight: "80px",
						maxWidth: "22%",
						minWidth: "22%",
					}}
				>
					Save Post Informations
				</Button>
				<Button
					variant="contained"
					color="grey"
					endIcon={<ClearIcon />}
					//type="submit" TODO: navigate/discard changes
					fullWidth
					borderRadius="65px"
					sx={{ ml: 2, mt: 3, mb: 2, mr: 2 }}
					item
					xs={12}
					sm={10}
					style={{
						maxHeight: "80px",
						maxWidth: "22%",
						minWidth: "22%",
					}}
				>
					Dicard Changes
				</Button>
			</div>
		</>
	);
}
export default EditPost;
