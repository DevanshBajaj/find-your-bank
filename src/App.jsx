import { useState, useMemo, createContext, useContext } from "react";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";

import Sidebar from "./components/Sidebar";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
	const theme = useTheme();
	const colorMode = useContext(ColorModeContext);
	return (
		<>
			<Sidebar
				theme={theme.palette.mode}
				colorMode={colorMode.toggleColorMode}
			/>
		</>
	);
}

export default function ToggleColorMode() {
	const [mode, setMode] = useState("light");
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
			},
		}),
		[]
	);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode,
					...(mode === "light"
						? {
								// palette values for light mode
								primary: {
									main: "#26d7ab",
									nav: "#efefef",
								},
								secondary: {
									main: "#5367FF",
								},
								background: {
									default: "#ffffff",
									paper: "#fff",
								},
								divider: "#ecedef",
								text: {
									primary: "#44475b",
									secondary: "#7c7e8c",
									disabled: "#b0b2ba",
								},
						  }
						: {
								// palette values for dark mode
								primary: {
									main: "#26d7ab",
									nav: "#363434",
								},
								secondary: {
									main: "#5367FF",
								},
								background: {
									default: "#191C27",
									paper: "#1e2232",
								},
								divider: "#ecedef",
								text: {
									primary: "#eff0f3",
									secondary: "#c3c3cb",
									disabled: "#bebebe",
								},
						  }),
				},
			}),
		[mode]
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
