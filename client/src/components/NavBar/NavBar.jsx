import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
// import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from "@mui/icons-material/Search";
// import { Search, SearchIconWrapper, StyledInputBase } from "./NavBarStyle";
// import { Search } from "./NavBarStyle";
import AccountCircle from "@mui/icons-material/AccountCircle";
// import MailIcon from "@mui/icons-material/Mail";
// import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import AuthService from "../../services/Api/Controllers/AuthService";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import logoIcon from "../../assets/images/icons/logo_white.png";
import SearchBar from "../SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import { setSearch } from "../../Store/features/Search/searchSlice";
import { Typography } from "@mui/material";
// import Sidebar from "../Sidebar/Sidebar"
import { Button } from "@mui/material";

export default function NavBar() {
	let navigate = useNavigate();
	const dispatch = useDispatch();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};
	const handleHome = () => {
		dispatch(setSearch({}));
		navigate("/");
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMenuAccount = () => {
		navigate("/account");
	};
	const handleMenuLogOut = () => {
		AuthService.logOut();
		navigate("/auth/login");
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const name = AuthService.getNameUser();
	
	const menuId = "primary-search-account-menu";
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuAccount}>My Profile </MenuItem>
			<MenuItem onClick={handleMenuLogOut}>Log out</MenuItem>
		</Menu>
	);

	const mobileMenuId = "primary-search-account-menu-mobile";
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: "top",
				horizontal: "right",
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			{/* <MenuItem>
				<IconButton
					size="large"
					aria-label="show 4 new mails"
					color="inherit"
				>
					<Badge badgeContent={4} color="error">
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem> */}
			{/* <MenuItem>
				<IconButton
					size="large"
					aria-label="show 17 new notifications"
					color="inherit"
				>
					<Badge badgeContent={17} color="error">
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem> */}
			<MenuItem onClick={handleProfileMenuOpen}>
				<IconButton
					size="large"
					aria-label="account of current user"
					aria-controls="primary-search-account-menu"
					aria-haspopup="true"
					color="inherit"
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">

				<Toolbar>
					<Box
						component="img"
						sx={{
							height: 130,
							cursor: "pointer",
						}}
						style={{ marginLeft: "2%" }}
						onClick={handleHome}
						alt="WoGet"
						src={logoIcon}
					/>
					<Box sx={{ flexGrow: 1 }} />
					<SearchBar />
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: "none", md: "flex" } }}>

						<Typography variant="h5" marginRight={3} sx={{ fontWeight: 'bold' , fontFamily:'unset' }} >  {name} </Typography>
							<Button
								startIcon={<MenuIcon  style={{ fontSize: 30 }} />}
								endIcon={<AccountCircle  style={{ fontSize: 30 }} />}
								onClick={handleProfileMenuOpen}
								variant="contained"
								style={{
									textTransform: "capitalize",
									borderRadius: 45,
									backgroundColor: "#FF385C",
									fontSize: "18px",
								}}
								sx={{
									border: 3,
									borderColor: "#FF385C",
									boxShadow: 14,
									width: "50%",
								}}
					>
					</Button>

					</Box>
					<Box sx={{ display: { xs: "flex", md: "none" } }}>
						<IconButton
							size="large"
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
}
