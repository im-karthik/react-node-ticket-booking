import Select from "react-select";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import { NavLink } from "react-router-dom";
import FlightDetails from "./components/FlightDetails/FlightDetails";
import image from "./assets/Head-image.png";
import "./App.css";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function App() {
  return (
    <div className="App">
      <div className="head">
        <img src={image} />
        <div className="title-container">
          <NavLink className="title-link" exact activeClassName="active" to="/">
            Home
          </NavLink>
          <h2>International Flight Ticket Booking</h2>
        </div>
        <hr />
      </div>
      <Switch>
        <Route path={"/"} component={HomePage} exact />
        <Route path={"/viewDetail"} component={FlightDetails} />
      </Switch>
    </div>
  );
}

export default App;
