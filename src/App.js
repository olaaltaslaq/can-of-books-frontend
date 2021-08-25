import React from "react";

import Header from "./Header";
import Login from "./Login";
import Footer from "./Footer";
import Profile from "./profile";
import BestBooks from './BestBooks';
import { withAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    // console.log("app", this.props);

    const { isAuthenticated } = this.props.auth0;

    // console.log(process.env.REACT_APP_SERVER);

    return (
      <>

        <Router>
          <Header />
          <Switch>
            {(isAuthenticated) ?
              <Route exact path="/">
                {" "}
                <BestBooks />{" "}
              </Route>
              :
              <Route exact path="/">
                <Login />
              </Route>
            }

            <Route exact path="/profile">
              <Profile />
            </Route>



          </Switch>

          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
