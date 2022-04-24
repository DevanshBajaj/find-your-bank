import {
	Table,
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	styled,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
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

const Favourites = () => {
	let navigate = useNavigate();
	let favList = [{}];
	const getArray = JSON.parse(localStorage.getItem("favorites") || "0");
	for (var i = 0; i < getArray.length; i++) {
		let x = getArray[i];
		favList[i] = JSON.parse(localStorage.getItem("favItem" + [x]) || "");
	}
	const titles = Object.keys(favList[0]);
	return (
		<>
			<h1>Favourites</h1>
			<h2>Add/Remove Favorites from All Banks list</h2>
			<Paper sx={{ width: "100%", overflow: "auto" }}>
				<TableContainer
					sx={{
						overflow: "auto",
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
					<Root stickyHeader aria-label="sticky table">
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
							{favList.map((bank, i) => {
								return (
									<TableRow key={i} hover tabIndex={-1}>
										{columns.map((column) => {
											return (
												<TableCell
													sx={{ cursor: "pointer" }}
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
					</Root>
				</TableContainer>
			</Paper>
		</>
	);
};

export default Favourites;
