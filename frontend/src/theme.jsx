// // import { createTheme } from "@mui/material";

// // const theme = createTheme({
// //     typography: {
// //         // The default font family for all MUI components
// //         fontFamily: `'Poppins', Roboto, 'Helvetica Neue', Arial, sans-serif`,
// //     },
// // });

// // export default theme;

// import { createContext, useState, useEffect } from "react";

// export const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//     const [darkMode, setDarkMode] = useState(() => {
//         return localStorage.getItem("theme") === "light" ? false : true;
//     });

//     useEffect(() => {
//         if (darkMode) {
//             document.documentElement.classList.add("dark");
//             localStorage.setItem("theme", "dark");
//         } else {
//             document.documentElement.classList.remove("dark");
//             localStorage.setItem("theme", "light");
//         }
//     }, [darkMode]);

//     return (
//         <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
//             {children}
//         </ThemeContext.Provider>
//     );
// }
