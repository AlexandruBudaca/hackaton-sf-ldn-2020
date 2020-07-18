import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./grid.css";
import Nav from "./components/header/Nav";
import Footer from "./components/footer/footer";
import LandingPage from "./components/sections/LandingPage";
import ListOfCompanies from "./components/sections/companies/ListOfCompanies";
import Company from "./components/sections/company/Company";
import ListOfOpportunities from "./components/sections/Opportunities";
import Opportunity from "./components/sections/Opportunity";

import Graduates from "./components/sections/Graduates";
import Tips from "./components/sections/tips/Tips";
import SignIn from "./components/register/SignIn";
import NewOpportunityForm from "./components/register/NewOpportunity";
import GraduateRegistration from "./components/register/GraduateRegistration";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(false);
  return (
    <Router>
      <div className="App">
        <Nav
          loggedInUser={loggedInUser}
          setLoggedInUser={setLoggedInUser}
          btnDisabled={btnDisabled}
          setBtnDisabled={setBtnDisabled}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <LandingPage
                setLoggedInUser={setLoggedInUser}
                loggedInUser={loggedInUser}
                btnDisabled={btnDisabled}
                setBtnDisabled={setBtnDisabled}
              />
            )}
          />
          <Route exact path="/company" component={() => <Company />} />
          <Route path="/listOfCompanies" exact component={ListOfCompanies} />
          <Route path="/listOfCompanies" exact component={ListOfCompanies} />
          <Route path="/Graduates" exact component={Graduates} />
          <Route path="/opportunity" exact component={Opportunity} />
          <Route path="/Opportunities" exact component={ListOfOpportunities} />
          <Route path="/tips" exact component={Tips} />
          <Route path="/signIn" exact component={SignIn} />
          <Route path="/signUp" exact component={GraduateRegistration} />
          <Route
            path="/NewOpportunityForm"
            exact
            component={NewOpportunityForm}
          />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
