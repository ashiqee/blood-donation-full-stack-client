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

        bgolor: {
            main: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
        },
        error: {
            main: red.A400,
        }
    }
})

export default theme;