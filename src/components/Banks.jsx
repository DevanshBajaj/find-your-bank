import React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import {
	Table,
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TableFooter,
	TablePagination,
	TableHead,
	TableRow,
	Select,
	FormControl,
	MenuItem,
	InputLabel,
	Autocomplete,
	TextField,
	InputAdornment,
	Input,
	Skeleton,
	Checkbox,
} from "@mui/material";
import { Category, Search, TableBar } from "@mui/icons-material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const columns = [
	{ id: "bank_name", label: "Bank Name", minWidth: 120 },
	{ id: "bank_id", label: "Bank ID", minWidth: 120 },
	{
		id: "branch",
		label: "Branch",
		minWidth: 120,
		align: "left",
	},
	{
		id: "address",
		label: "Address",
		minWidth: 120,
		align: "left",
	},
	{
		id: "city",
		label: "City",
		minWidth: 120,
		align: "left",
	},
	{
		id: "ifsc",
		label: "IFSC",
		minWidth: 120,
		align: "left",
	},
	{
		id: "district",
		label: "District",
		minWidth: 120,
		align: "left",
	},
	{
		id: "state",
		label: "State",
		minWidth: 120,
		align: "left",
	},
];
const NavContainer = styled("div")`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	gap: 2rem;
	margin-bottom: 2rem;
	width: 100%;
	@media (max-width: 620px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;
const CssTextField = styled(TextField)({
	"& label.Mui-focused": {
		color: "primary",
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "grey",
	},
	"& .MuiOutlinedInput-root": {
		"&:hover fieldset": {
			borderColor: "secondary",
		},
		"&.Mui-focused fieldset": {
			borderColor: "primary",
		},
	},
});

const cities = ["MUMBAI", "DELHI", "GHAZIABAD", "GURGAON", "NOIDA"];
const categories = [
	{ id: "ifsc", label: "IFSC" },
	{ id: "branch", label: "Branch" },
	{ id: "bank_name", label: "Bank Name" },
];

const Root = styled(Table)`
	table {
		border-collapse: collapse;
		width: 100%;
	}

	td,
	th {
		padding: 12px;
	}

	th {
		background-color: #1e2232;
		color: #26d7ab;
	}
`;

const Banks = () => {
	const [banks, setBanks] = useState([]);
	const [filter, setFilter] = useState([]);
	const [searchValue, setSearchValue] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [page, setPage] = React.useState(0);
	const [total, setTotal] = useState(0);
	const [filteredPage, setFilteredPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [city, setCity] = useState("MUMBAI");
	const [category, setCategory] = useState("");
	const [disableSearch, setDisableSearch] = useState(true);
	const [favorite, setFavourite] = useState([]);

	const getArray = JSON.parse(localStorage.getItem("favorites") || "0");
	let navigate = useNavigate();

	useEffect(() => {
		if (getArray !== 0) {
			setFavourite([...getArray]);
		}
	}, []);
	const handleCity = (event) => {
		setCity(event.target.value);
	};
	const handleCategory = (event) => {
		setCategory(event.target.value);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleFilterPage = (event, newPage) => {
		setFilter(newPage);
	};
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleFavourite = (props) => {
		let fav = favorite;
		let addFav = true;
		fav.map((item, key) => {
			if (item === props.i) {
				fav.splice(key, 1);
				addFav = false;
			}
		});
		if (addFav) {
			fav.push(props.i);
		}
		setFavourite([...fav]);
		localStorage.setItem("favorites", JSON.stringify(favorite));
		let storage = localStorage.getItem("favItem" + props.i || "0");
		if (storage == null) {
			localStorage.setItem("favItem" + props.i, JSON.stringify(props.bank));
		} else {
			localStorage.removeItem("favItem" + props.i);
		}
	};

	useEffect(() => {
		setDisableSearch(!category || !city);
	}, [category, city]);

	useEffect(() => {
		fetchData();
	}, [city]);

	useEffect(() => {
		totalPages();
	}, [searchValue, loading, city]);

	const fetchData = async () => {
		try {
			setLoading(true);
			const localdata = JSON.parse(localStorage.getItem(city));
			const diff = Math.round(Date.now() / 1000) - localdata?.timestamp;

			if (!localdata || diff > 200) {
				const requestOptions = {
					method: "GET",
					redirect: "follow",
				};
				const res = await fetch(
					`https://vast-shore-74260.herokuapp.com/banks?city=${city}`,
					requestOptions
				);
				if (res.ok) {
					const result = await res.json();
					const data = {
						timestamp: Math.round(Date.now() / 1000),
						response: result,
					};
					localStorage.setItem(city, JSON.stringify(data));
					setBanks(data);
					setFilter(data);
					console.log("fetching from api");
				} else {
					throw new Error("response not OK");
				}
			} else {
				setBanks(localdata);
				setFilter(localdata);
				console.log("cache");
			}
			setLoading(false);
		} catch (e) {
			setError(true);
			console.log(e);
		}
	};

	const totalPages = () => {
		if (filter?.length > 1) {
			setTotal(filter?.length);
		} else {
			setTotal(banks?.response?.length);
		}
	};
	const searchItems = (searchInput) => {
		setSearchValue(searchInput);
		if (searchValue !== "" && category !== "") {
			const filteredData = banks?.response.filter((bank) =>
				bank[category].toLowerCase().includes(searchValue.toLowerCase())
			);
			setFilter(filteredData);
		} else {
			setFilter(banks);
		}
	};

	return (
		<>
			<NavContainer>
				<TextField
					id="City"
					select
					value={city}
					label="City"
					onChange={handleCity}
					helperText="Please select your city"
				>
					{cities.map((citydown) => {
						return <MenuItem value={citydown}>{citydown}</MenuItem>;
					})}
				</TextField>
				<TextField
					id="Categories"
					select
					value={category}
					label="Category"
					onChange={handleCategory}
					helperText="Select search category"
				>
					{categories.map((categorydown, idx) => {
						return (
							<MenuItem key={idx} value={categorydown.id}>
								{categorydown.label}
							</MenuItem>
						);
					})}
				</TextField>
				<CssTextField
					id="outlined-basic"
					label="Search"
					variant="outlined"
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Search />
							</InputAdornment>
						),
					}}
					disabled={disableSearch}
					onChange={(e) => searchItems(e.target.value)}
				/>
			</NavContainer>

			<div>
				<Paper
					sx={{
						width: { md: "100%", xs: "100%" },
						overflow: "auto",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-around",
					}}
				>
					<TableContainer
						sx={{
							overflowX: "auto",
							maxHeight: 600,
							"&::-webkit-scrollbar": {
								width: 8,
								height: 10,
							},
							"&::-webkit-scrollbar-track": {
								backgroundColor: "background.paper",
							},
							"&::-webkit-scrollbar-thumb": {
								backgroundColor: "primary.main",
								borderRadius: 2,
							},
							"&::-webkit-scrollbar-track-piece:end": {
								marginRight: "10px",
							},

							"&::-webkit-scrollbar-track-piece:start": {
								marginLeft: "5px",
							},
						}}
					>
						{!loading && banks ? (
							<Root stickyHeader aria-label="sticky table">
								<TableHead>
									<TableRow>
										<TableCell>Favorites</TableCell>
										{columns.map((column) => (
											<TableCell
												key={column.id}
												align={column.align}
												style={{ minWidth: column.minWidth }}
											>
												{column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								{searchValue.length > 1 && filter.length > 1 ? (
									<TableBody>
										{filter
											?.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
											.map((bank, i) => {
												return (
													<TableRow
														key={i}
														hover
														tabIndex={-1}
														sx={{
															"&:last-child td, &:last-child th": { border: 0 },
														}}
													>
														<TableCell padding="checkbox" align="center">
															{favorite?.includes(i) ? (
																<BookmarkIcon
																	color="primary"
																	onClick={() => handleFavourite({ bank, i })}
																/>
															) : (
																<BookmarkBorderIcon
																	color="primary"
																	onClick={() => handleFavourite({ bank, i })}
																/>
															)}
														</TableCell>
														{columns.map((column) => {
															return (
																<TableCell
																	onClick={() => {
																		navigate(`/bank-details/${bank.ifsc}`, {
																			state: {
																				ifsc: bank.ifsc,
																				bank_id: bank.bank_id,
																				branch: bank.branch,
																				address: bank.address,
																				city: bank.city,
																				district: bank.district,
																				bank_state: bank.state,
																				name: bank.bank_name,
																			},
																		});
																	}}
																>
																	{bank[column.id]}
																</TableCell>
															);
														})}
													</TableRow>
												);
											})}
									</TableBody>
								) : (
									<TableBody>
										{banks.response
											.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
											)
											.map((bank, i) => {
												return (
													<TableRow key={i} hover tabIndex={-1}>
														<TableCell padding="checkbox" align="center">
															{favorite?.includes(i) ? (
																<BookmarkIcon
																	color="primary"
																	onClick={() => handleFavourite({ bank, i })}
																/>
															) : (
																<BookmarkBorderIcon
																	color="primary"
																	onClick={() => handleFavourite({ bank, i })}
																/>
															)}
														</TableCell>
														{columns.map((column) => {
															return (
																<TableCell
																	onClick={() => {
																		navigate(`/bank-details/${bank.ifsc}`, {
																			state: {
																				ifsc: bank.ifsc,
																				bank_id: bank.bank_id,
																				branch: bank.branch,
																				address: bank.address,
																				city: bank.city,
																				district: bank.district,
																				bank_state: bank.state,
																				name: bank.bank_name,
																			},
																		});
																	}}
																>
																	{bank[column.id]}
																</TableCell>
															);
														})}
													</TableRow>
												);
											})}
									</TableBody>
								)}
							</Root>
						) : (
							<div style={{ margin: "2rem" }}>
								<Skeleton animation="wave" sx={{ maxWidth: "100%" }} />
								<Skeleton animation="wave" sx={{ maxWidth: "100%" }} />
								<Skeleton animation="wave" sx={{ maxWidth: "100%" }} />
								<Skeleton animation="wave" sx={{ maxWidth: "100%" }} />
								<Skeleton animation="wave" sx={{ maxWidth: "100%" }} />
								<Skeleton animation="wave" sx={{ maxWidth: "100%" }} />
								<Skeleton animation="wave" sx={{ maxWidth: "100%" }} />
								<Skeleton animation="wave" sx={{ maxWidth: "100%" }} />
								<Skeleton animation="wave" sx={{ maxWidth: "100%" }} />
							</div>
						)}
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[10, 25, 100, { value: -1, label: "All" }]}
						component="div"
						count={total ?? 0}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
					{!error ? <span></span> : <h1>Oops error occured Please Go back</h1>}
				</Paper>
			</div>
		</>
	);
};

export default Banks;
