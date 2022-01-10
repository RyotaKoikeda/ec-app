import React from "react";
import Router from "./Router";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  console.log(selector.router);

  return (
    <main>
      <Router />
    </main>
  );
};

export default App;
