import React from "react";

//components
import IconGroup from "./components/ui/IconGroup";
import Main from "./components/pages/Main";

import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  createStyles({
    app: {
      height: "100vh",
      fontFamily: "roboto",
      backgroundColor: "lightgray"
    }
  })
);

function App() {
  const classes = useStyles();

  return (
    <div className={classes.app}>
      <IconGroup />
      <Main />
    </div>
  );
}

export default App;
