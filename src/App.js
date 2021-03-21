import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Destination from "./components/Destination/Destination";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";
import { createContext, useState } from "react";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {
  const [loggedInClient, setLoggedInClient] = useState({});
  console.log(loggedInClient);
  return (
    <UserContext.Provider value={[loggedInClient, setLoggedInClient]}>
      <div className="main-area">
        <div className="container">
          <h3>Email: {loggedInClient.email}</h3>
          <Router>
            <Header></Header>
            <Switch>
              <Route path="/home">
                <Home></Home>
              </Route>
              <Route path="/login">
                <Login></Login>
              </Route>
              <PrivateRoute path="/:id">
                <Destination></Destination>
              </PrivateRoute>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route path="*">
                <NotFound></NotFound>
              </Route>
            </Switch>
          </Router>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
