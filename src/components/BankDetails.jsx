import { useLocation } from "react-router-dom";
import { Card, CardContent, Typography } from "@mui/material";

const BankDetails = () => {
	const { state } = useLocation();
	const { name, city, address, district, ifsc, bank_state, bank_id, branch } =
		state;

	return (
		<>
			<Card
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					boxShadow: "3px 6px 24px rgba(0,0,0,0.1) ",
				}}
			>
				<CardContent>
					<Typography gutterBottom variant="h5" component="div">
						{name}
					</Typography>
					<Typography gutterBottom variant="h6" component="div">
						{bank_id}
					</Typography>
					<Typography gutterBottom variant="h6" component="div">
						{branch}
					</Typography>
					<Typography gutterBottom variant="h6" component="div">
						{ifsc}
					</Typography>
					<Typography gutterBottom variant="h6" component="div">
						{district}
					</Typography>
					<Typography gutterBottom variant="h6" component="div">
						{city}
					</Typography>
					<Typography gutterBottom variant="h6" component="div">
						{bank_state}
					</Typography>
					<Typography gutterBottom variant="h6" component="div">
						{address}
					</Typography>
				</CardContent>
			</Card>
		</>
	);
};

export default BankDetails;
