// Dependencies
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from "styled-components";


// Middleware
import Requests from "./middleware/Requests";

// Router
import Router from "./Router";

// Hooks
import hooks from "./hooks";
import { GlobalStyles } from "./themes/GlobalStyles";
import Layout from "./pages/Layout";



const App = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.isLoading);
  const isLogged = useSelector((state) => state.isLogged);
  const selectedTheme = useSelector((state) => state.theme);

  const handleIntervalCheck = () => {
    if (localStorage.getItem("token")) {
      try {
        const isExp = hooks.isTokenExpired();
        if (isExp) throw Error("Token expired.");
      } catch (err) {
        console.log(err.message)
        localStorage.removeItem("token");
        if (isLogged) dispatch({ type: "DISCONNECT" });
      }
    }
    setTimeout(
      handleIntervalCheck,
      5000
    )
  }
  handleIntervalCheck();


  const init = async () => {
    if (localStorage.getItem("token")) {
      try {
        const isExp = hooks.isTokenExpired();
        if (isExp) throw Error("Token expired");
        const response = await Requests.getUser();
        dispatch({ type: "FIRST_CONNEXION", payload: response });
      } catch (err) {
        localStorage.removeItem("token");
        if (isLogged) dispatch({ type: "DISCONNECT" });
      }
    }
    if (isLoading) {
      dispatch({ type: "UNSET_LOADING" });
    }
  }

  if (isLoading) {
    init();
  }



  return (
    <>
      <ThemeProvider theme={selectedTheme}>
        <GlobalStyles />
        <Layout>
          <Router />
        </Layout>
      </ThemeProvider>
    </>
  )
}

export default App;
