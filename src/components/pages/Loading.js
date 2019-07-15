import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  loading: {
    backgroundColor: "lightgrey",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  progress: {
    width: 120,
    height: 120
  },
  loadingText: {
    position: "absolute",
    margin: 0
  }
}));

function Loading() {
  const classes = useStyles();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function tick() {
      // reset when reaching 100%
      setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, 30);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <section className={classes.loading}>
      <h3 className={classes.loadingText}>Loading...</h3>
      <CircularProgress
        size={240}
        className={classes.progress}
        variant="determinate"
        value={progress}
      />
    </section>
  );
}

export default Loading;
