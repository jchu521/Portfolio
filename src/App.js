import React, { useState, useEffect } from "react";

//components
import IconGroup from "./components/ui/IconGroup";
import Main from "./components/pages/Main";
import Loading from "./components/pages/Loading";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={classes.app}>
          <IconGroup />
          <Main />
        </div>
      )}
    </>
  );
}

export default App;
