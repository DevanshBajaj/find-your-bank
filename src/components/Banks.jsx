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
} from "@mui/material";
import { Category, Search, TableBar } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";

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
	margin: 2rem;
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
const categories = ["ifsc", "branch", "bank_name"];

const Banks = () => {
	const [banks, setBanks] = useState([]);
	const [filter, setFilter] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [searchValue, setSearchValue] = useState("");
	const [city, setCity] = useState("MUMBAI");
	const [category, setCategory] = useState("");
	const [disableSearch, setDisableSearch] = useState(true);

	let navigate = useNavigate();

	const handleCity = (event) => {
		setCity(event.target.value);
	};
	const handleCategory = (event) => {
		setCategory(event.target.value);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleSearchChange = (event) => {
		setSearchValue(event.target.value);
		console.log(searchValue);
	};
	useEffect(() => {
		setDisableSearch(!category);
	}, [category]);

	useEffect(() => {
		fetchData();
	}, [city]);

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
							<MenuItem key={idx} value={categorydown}>
								{categorydown}
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
					onChange={handleSearchChange}
				/>
			</NavContainer>

			<div>
				<Paper sx={{ width: "100%", overflow: "auto" }}>
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
							<Table stickyHeader aria-label="sticky table">
								<TableHead>
									<TableRow>
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

								<TableBody>
									{banks.response
										.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
										.map((bank, idx) => {
											return (
												<TableRow key={idx}>
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
							</Table>
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
						count={banks?.response?.length ?? 0}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				</Paper>
			</div>
		</>
	);
};

export default Banks;
