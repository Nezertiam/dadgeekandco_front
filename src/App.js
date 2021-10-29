// Dependencies
import jsonwebtoken from "jsonwebtoken";
import { useSelector, useDispatch } from "react-redux";
import hooks from "./hooks";

// Middleware
import Requests from "./middleware/Requests";

// Router
import Router from "./Router";


const App = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector((state) => state.isLoading);
  const isLogged = useSelector((state) => state.isLogged);
  localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3YWFlYmIxYjIzMDE0YmEwY2Q3NDg1In0sImlhdCI6MTYzNTQ5NDQ0NCwiZXhwIjoxNjM1NDk4MDQ0fQ.yBEMP3UttGo6mhwxKhdQvsRbEYfdHV20E0dhPusuYuA")

  const handleIntervalCheck = () => {
    if (localStorage.getItem("token")) {
      try {
        const isExp = hooks.isTokenExpired();
        if (isExp) throw Error("Token expired");
      } catch (err) {
        console.log("Bad token or token expired.")
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



  const init = async () => {
    if (localStorage.getItem("token")) {
      let token = localStorage.getItem("token");
      try {
        jsonwebtoken.verify(token, "myscrettoken"); // TODO : Make dotenv works
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
      <Router />
    </>
  )
}

export default App;
