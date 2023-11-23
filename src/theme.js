import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";



const theme = createTheme({
    palette: {
        primary: {
            main: '#fb6394',
        },
        secondary: {
            main: '#519fe9',
        },
        error: {
            main: red.A400,
        }
    }
})

export default theme;