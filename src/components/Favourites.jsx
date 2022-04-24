import {
	Table,
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Favourites = () => {
	let navigate = useNavigate();
	let favList = [{}];
	const getArray = JSON.parse(localStorage.getItem("favorites") || "0");
	for (var i = 0; i < getArray.length; i++) {
		let x = getArray[i];
		favList[i] = JSON.parse(localStorage.getItem("favItem" + [x]) || "");
	}
	const titles = Object.keys(favList[0]);
	console.log(titles);
	return (
		<>
			<h1>Favourites</h1>
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
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{titles.map((column, i) => (
									<TableCell key={i} align="right" style={{ minWidth: 120 }}>
										{column}
									</TableCell>
								))}
							</TableRow>
						</TableHead>

						<TableBody>
							{favList.map((bank, i) => {
								return (
									<TableRow key={i} hover tabIndex={-1}>
										{titles.map((column) => {
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
													{bank[column]}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</>
	);
};

export default Favourites;
