/* eslint-disable no-unused-vars */
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PublishIcon from "@mui/icons-material/Publish";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TagList from "../../components/Lists/TagList/TagList";
import AvailableDayList from "../../components/Lists/AvailableDayList/AvailableDayList";
import MultipleImageUpload from "../../components/MultipleImageUpload/MultipleImageUpload";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import PostService from "../../services/Api/Controllers/PostService.js";
import { useState } from "react";

export default function Ads() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm();

	const styles = {
		paperContainer: {
			backgroundSize: "cover",
			backgroundImage: `url(${"https://zupimages.net/up/22/19/hfdp.png"})`,
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
			paddingBottom: 40,
			maxWidth: 550,
		},
	};

	const [selectedFiles, setSelectedFiles] = useState([]);
	const [tagSelected, setTagSelected] = useState([]);

	const [data, setData] = React.useState("");

	let navigate = useNavigate();

	const handleSubmitForm = (current) => {
		const dataToForm = {
			...current,
			pictures: selectedFiles,
			tags: tagSelected,
		};
		setData(dataToForm);
		PostService.createNewPost(dataToForm)
			.then((auth) => {
				if (auth) {
					alert("Post Created");
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
						<Avatar
							sx={{
								width: 66,
								height: 66,
								m: 1,
								bgcolor: "secondary.main",
								mt: 4,
								mb: 2,
							}}
						>
							<PublishIcon sx={{ width: 40, height: 40, m: 1 }} />
						</Avatar>
						<Typography component="h1" variant="h5">
							NEW POST
						</Typography>
						<Box
							component="form"
							onSubmit={handleSubmit((data) =>
								handleSubmitForm(data)
							)}
							sx={{ mt: 3 }}
						>
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id="title"
										label="Title"
										name="Title"
										type="tel"
										autoComplete="Title"
										{...register("title", {
											required: true,
											pattern: {
												message: "Please enter a Title",
											},
										})}
										error={errors?.title ? true : false}
										helperText={errors?.title?.message}
									/>
								</Grid>

								<Grid item xs={12}>
									<div> Address : </div>
									<Controller
										name="address"
										control={control}
										rules={{
											required: "Please enter a Address",
										}}
										render={({ field, fieldState }) => (
											<>
												<GooglePlacesAutocomplete
													minLength={2}
													autoFocus={false}
													fetchDetails={true}
													apiKey={$apikey}
													autocompletionRequest={{
														componentRestrictions: {
															country: ["il"],
														},
													}}
													selectProps={{
														...field,
														placeholder:
															"Enter Location",
														isClearable: true,
														styles: {
															control: (
																base,
																state
															) => ({
																...base,
																background:
																	"white",
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
															menuList: (
																base
															) => ({
																...base,
																padding: 0,
																background:
																	"	white",
																zIndex: 999,
																opacity: 1,
															}),
														},
													}}
												/>
												{fieldState.error && (
													<div
														style={{ color: "red" }}
													>
														{
															fieldState.error
																.message
														}
													</div>
												)}
											</>
										)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										multiline
										rows={5}
										id="description"
										label="Description"
										name="Description"
										type="Description"
										autoComplete="Description"
										{...register("description", {
											required: true,
											pattern: {
												message:
													"Please enter a valid Description ",
											},
										})}
									/>
								</Grid>

								<Grid item xs={12}>
									<TagList
										tagSelected={tagSelected}
										setTagSelected={setTagSelected}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										name="Minimum Person"
										id="minimumperson"
										label="Minimum Person"
										type="number"
										placeholder={"[1-10]"}
										required
										fullWidth
										autoFocus
										{...register("minimumperson", {
											required: true,
										})}
										error={
											errors?.minimumperson ? true : false
										}
										InputProps={{
											inputProps: { min: 1, max: 10 },
										}}
										helperText={
											errors?.minimumperson?.message
										}
									/>
								</Grid>

								<Grid item xs={12} sm={6}>
									<TextField
										name="Maximum Person"
										id="maximumperson"
										label="Maximum Person"
										type="number"
										placeholder={"[1-100]"}
										required
										fullWidth
										autoFocus
										{...register("maximumperson", {
											required: true,
										})}
										error={
											errors?.maximumperson ? true : false
										}
										InputProps={{ inputProps: { min: 1 } }}
										helperText={
											errors?.maximumperson?.message
										}
									/>
								</Grid>

								<Grid item xs={12}></Grid>
								<Grid item xs={12}>
									<TextField
										name="pricebyday"
										id="pricebyday"
										label="Price By Day in $"
										type="number"
										required
										fullWidth
										autoFocus
										{...register("pricebyday", {
											required: true,
										})}
										error={
											errors?.pricebyday ? true : false
										}
										InputProps={{ inputProps: { min: 1 } }}
										helperText={errors?.pricebyday?.message}
									/>
								</Grid>
								<Grid item xs={12}>
									<MultipleImageUpload
										required
										selectedFiles={selectedFiles}
										setSelectedFiles={setSelectedFiles}
									/>
								</Grid>
							</Grid>

							<Button
								fullWidth
								type="submit"
								variant="contained"
								color="secondary"
								sx={{ mt: 3, mb: 6 }}
							>
								Create post
							</Button>
						</Box>
					</Box>
				</Container>
			</div>
		</div>
	);
}
