// Dependencies
import { Switch, Route } from "react-router-dom";
import jsonwebtoken from "jsonwebtoken";

// Middleware
import Requests from "./middleware/Requests";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Test from "./pages/Test";
import Blog from "./pages/Blog";
import { useSelector, useDispatch } from "react-redux";


const App = () => {

  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.isLoading);
  const isLogged = useSelector((state) => state.isLogged);
  localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3YWFlYmIxYjIzMDE0YmEwY2Q3NDg1In0sImlhdCI6MTYzNTQzNDYzMSwiZXhwIjoxNjM1NDM4MjMxfQ.M905NQl6eFkKF_zmI7QCn6Yofbhqoc8tsVf73sm4ptk")

  const handleIntervalCheck = () => {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      try {
        jsonwebtoken.verify(token, "myscrettoken"); // TODO : Make dotenv works
      } catch (err) {
        localStorage.removeItem("token");
        if (isLogged) dispatch({ type: "DISCONNECT" });
      }
    }
  }
  handleIntervalCheck();
  setInterval(
    handleIntervalCheck,
    5000
  )

  if (isLoading) {
    const init = async () => {
      if (localStorage.getItem("token")) {
        let token = localStorage.getItem("token");
        try {
          jsonwebtoken.verify(token, "myscrettoken"); // TODO : Make dotenv works
          const response = await Requests.getUser();
          dispatch({ type: "SET_USER", payload: response.user });
          dispatch({ type: "SET_PROFILE", payload: response.profile });
        } catch (err) {
          localStorage.removeItem("token");
          if (isLogged) dispatch({ type: "DISCONNECT" });
        }
      }

      dispatch({ type: "UNSET_LOADING" });
    }

    init();
  }



  if (isLoading) return (
    <>
      <Switch>
        <Route path="/">
          <p>Chargement...</p>
        </Route>
      </Switch>
    </>
  )

  return (
    <>
      <Switch>
        <ProtectedRoute path="/test" validity={false} component={Test} />
        <Route path="/blog" component={Blog} />
      </Switch>
    </>
  );
}

export default App;
