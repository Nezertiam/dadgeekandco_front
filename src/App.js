// Dependencies
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

// Middleware
import ApiHandler from "./middleware/api/ApiHandler";
import { Switch, Route } from "react-router-dom";
import jsonwebtoken from "jsonwebtoken";
import ProtectedRoute from "./components/ProtectedRoute";
import Test from "./pages/Test";
import Blog from "./pages/Blog";


const App = () => {

  const initialValues = {
    // token: localStorage.getItem("token")
    token: "test",
    valid: true
  }
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    const handleIntervalCheck = () => {
      if (values.token) {
        try {
          jsonwebtoken.verify(values.token, "myscrettoken"); // TODO : Make dotenv works
          console.log("ok");
        } catch (err) {
          localStorage.removeItem("token");
          const newValues = { ...values };
          newValues.token = undefined;
          newValues.valid = false;
          setValues(newValues);
          console.log("pas ok");
        }
      }
    }
    const interval = setInterval(
      handleIntervalCheck,
      5000
    )
    handleIntervalCheck();
  }, [])

  return (
    <>
      <Switch>
        <ProtectedRoute path="/test" validity={values.valid} component={Test} />
        <Route path="/blog" component={Blog} />
      </Switch>
    </>
  );
}

export default App;
