import { useLocation } from "react-router-dom";
import { Card, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledCardContent = styled("div")`
	padding: 0rem;
`;

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
					gap: "0.2rem",
					padding: "1.4rem",
					borderRadius: "12px",
					margin: "0",
					boxShadow: "3px 6px 24px rgba(0,0,0,0.1) ",
				}}
			>
				<StyledCardContent>
					<Typography variant="h5">Name</Typography>
					<Typography gutterBottom variant="h6" color="text.secondary">
						{name}
					</Typography>
				</StyledCardContent>
				<StyledCardContent>
					<Typography variant="h5">Bank ID:</Typography>
					<Typography gutterBottom variant="h6" color="text.secondary">
						{bank_id}
					</Typography>
				</StyledCardContent>
				<StyledCardContent>
					<Typography variant="h5">IFSC:</Typography>
					<Typography gutterBottom variant="h6" color="text.secondary">
						{ifsc}
					</Typography>
				</StyledCardContent>
				<StyledCardContent>
					<Typography variant="h5">Branch:</Typography>
					<Typography gutterBottom variant="h6" color="text.secondary">
						{branch}
					</Typography>
				</StyledCardContent>
				<StyledCardContent>
					<Typography variant="h5">District:</Typography>
					<Typography gutterBottom variant="h6" color="text.secondary">
						{district}
					</Typography>
				</StyledCardContent>
				<StyledCardContent>
					<Typography variant="h5">Address:</Typography>
					<Typography gutterBottom variant="h6" color="text.secondary">
						{address}
					</Typography>
				</StyledCardContent>
				<StyledCardContent>
					<Typography variant="h5">State:</Typography>
					<Typography gutterBottom variant="h6" color="text.secondary">
						{bank_state}
					</Typography>
				</StyledCardContent>
			</Card>
		</>
	);
};

export default BankDetails;
