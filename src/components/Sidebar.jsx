import { useState, useEffect } from "react";
import {
	Box,
	AppBar,
	CssBaseline,
	Divider,
	Drawer,
	IconButton,
	List,
	Toolbar,
	Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Route, Routes, useLocation, NavLink } from "react-router-dom";
import Banks from "./Banks";
import Favourites from "./Favourites";
import BankDetails from "./BankDetails";

const drawerWidth = 240;
function Sidebar(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);
	const [title, setTitle] = useState("");
	const location = useLocation();

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	useEffect(() => {
		titleHandler();
	}, [location]);
	const titleHandler = () => {
		if (location.pathname.includes("/all-banks")) {
			setTitle("All Banks");
		} else if (location.pathname.includes("/favorites")) {
			setTitle("Favorites");
		} else if (location.pathname.includes("/bank-details")) {
			setTitle("Bank Details");
		} else setTitle("Home");
	};
	let activeStyle = {
		textDecoration: "underline",
		color: "#00d09c",
	};

	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			<List>
				<NavLink
					style={({ isActive }) =>
						isActive ? activeStyle : { color: "#5367FF" }
					}
					to="/all-banks"
					exact
				>
					All Banks
				</NavLink>
			</List>
			<Divider />
			<List>
				<NavLink
					style={({ isActive }) =>
						isActive ? activeStyle : { color: "#5367FF" }
					}
					to="/favorites"
					exact
				>
					Favourites{" "}
				</NavLink>
			</List>
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "space-around",
				alignItems: "center",
			}}
		>
			<CssBaseline />
			<AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar
					sx={{
						display: "flex",
						justifyContent: "space-between",
						px: "2rem",
					}}
				>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{
							mr: 2,
							display: { sm: "none" },
							backgroundColor: "#26D7AB",
							boxShadow: "3px 6px 24px rgba(0,0,0,0.1)",
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" color="#44475b" noWrap component="div">
						{title}
					</Typography>
					<IconButton sx={{ ml: 1 }} onClick={props.colorMode} color="inherit">
						{props.theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
					</IconButton>
				</Toolbar>
			</AppBar>
			<Box
				component="nav"
				sx={{
					width: { sm: drawerWidth },
					flexShrink: { sm: 0 },
				}}
				aria-label="mailbox folders"
			>
				{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
							textAlign: "center",
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							fontSize: "1.6rem",
							gap: "2rem",
						},
					}}
				>
					{drawer}
				</Drawer>
				<Drawer
					variant="permanent"
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
							textAlign: "center",
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
							fontSize: "1.6rem",
							gap: "2rem",
						},
					}}
					open
				>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					p: 6,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}
			>
				<Toolbar />
				<Routes>
					<Route exact path="/all-banks" element={<Banks />}></Route>
					<Route exact path="/favorites" element={<Favourites />}></Route>
					<Route path="/bank-details/:id" element={<BankDetails />} />
				</Routes>
			</Box>
		</Box>
	);
}

export default Sidebar;
