import React from "react";
import { Route, Switch , withRouter} from "react-router-dom";
import Signin from "./signin";
import Signup from "./signup";

const Auth = (props) => {
  return (
    <Switch>
      <Route path="/auth/signup" component={Signup} />
      <Route path="/auth" render={(routeProps) => <Signin {...routeProps} setupSocket={props.setupSocket} />}
      />
    </Switch>
  );
};

export default withRouter(Auth);
