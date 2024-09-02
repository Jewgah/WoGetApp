import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Rating } from "@mui/material";
import BookedService from "../../services/Api/Controllers/BookedService";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

const BootstrapDialogTitle = (props) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

BootstrapDialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};

export default function DialogRate({ open, setOpenRate, id }) {
	const handleClose = () => {
		setOpenRate("");
	};
	const [Cleanliness, setCleanliness] = React.useState(0);
	const [how_was_your_stay, setHow_was_your_stay] = React.useState(0);
	const [Services_provided, setServices_provided] = React.useState(0);
	const [comment, setComment] = React.useState("");

	const submitReview = () => {
		if (
			Cleanliness === 0 ||
			how_was_your_stay === 0 ||
			Services_provided === 0 ||
			comment === ""
		) {
			alert("Please fill all the fields before submitting");
			return;
		}

		const data = {
			rate: {
				Cleanliness,
				how_was_your_stay,
				Services_provided,
				comment,
				averageRate:
					(Cleanliness + how_was_your_stay + Services_provided) / 3,
			},
			post_id: id,
		};
		BookedService.updateRate(data)
			.then(() => {
				alert("Thank you for your review");
				setOpenRate("");
				window.location.reload(false);
			})
			.catch(() => {
				alert("Something went wrong");
			});
	};

	return (
		<div>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<BootstrapDialogTitle
					id="customized-dialog-title"
					onClose={handleClose}
				>
					Leave a Review for this Office
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>
						Thanks for trusting us! Please leave a review for this
						office. We hope you enjoyed your stay.
					</Typography>

					<h1>How was your stay?</h1>
					<Rating
						id="how_was_your_stay"
						name="how_was_your_stay"
						value={how_was_your_stay}
						onChange={(event, newValue) => {
							setHow_was_your_stay(newValue);
						}}
					/>
					<h1>Cleanliness</h1>
					<Rating
						id="Cleanliness"
						name="cleanliness"
						value={Cleanliness}
						onChange={(event, newValue) => {
							setCleanliness(newValue);
						}}
					/>
					<h1>Services Provided</h1>
					<Rating
						id="Services Provided"
						name="services_provided"
						value={Services_provided}
						onChange={(event, newValue) => {
							setServices_provided(newValue);
						}}
					/>
					<h1>Leave a comment: </h1>
					<textarea
						value={comment}
						rows="4"
						cols="50"
						placeholder="Leave a comment..."
						onChange={(e) => setComment(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={handleClose}
						color="warning"
						variant="contained"
						size="medium"
					>
						Cancel
					</Button>
					<Button
						autoFocus
						onClick={submitReview}
						color="success"
						variant="contained"
						size="medium"
					>
						Save changes
					</Button>
				</DialogActions>
			</BootstrapDialog>
		</div>
	);
}
