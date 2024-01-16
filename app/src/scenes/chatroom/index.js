import React from "react";
import { Route, Switch } from "react-router-dom";

import ChatroomList from "./list";
import Chat from "./view";

function ChatroomRoutes() {
  return (
    <Switch>
      <Route path="/chatroom" exact component={ChatroomList} />
      <Route path="/chatroom/:id" component={Chat} />
    </Switch>
  );
}

export default ChatroomRoutes;
