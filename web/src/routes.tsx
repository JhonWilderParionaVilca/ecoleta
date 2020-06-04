import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { Home, RegisterPoint } from "./pages";

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={RegisterPoint} />
    </BrowserRouter>
  );
};

export default Routes;
