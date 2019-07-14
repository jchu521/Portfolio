import React, { useState, useEffect } from "react";
//material ui
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Text from "../text/";

const useStyles = makeStyles(
  createStyles({
    buttonGroup: {
      width: "100%"
    },

    button: {
      // color: "rgba(255,255,255,.6)",
      // border: "1px solid rgba(255,255,255,.6)",
      transform: "scale(0.9)",
      borderRadius: 25,
      "& MuiTouchRipple-root:focus": {
        outline: "none"
      },
      "&:hover": {
        transform: "scale(1.1)"
      },
      "&:active": {
        borderBlockColor: "red"
      }
    }
  })
);

function ButtonGroup(props) {
  const classes = useStyles();
  const [, setLoading] = useState(true);
  const { page, setPage } = props;
  const [pages, setPages] = useState(Text.pageTitle);
  useEffect(() => {
    const index = Text.pageTitle.findIndex(item => item.name === page);

    pages[index].active = true;
    setPages(pages);
    setLoading(false);
  }, [pages, page]);

  const handleChangePage = (item, index) => {
    const prevIndex = Text.pageTitle.findIndex(item => item.name === page);

    pages[prevIndex].active = false;
    pages[index].active = true;

    setPages(pages);
    setPage(item.name);
  };

  return (
    <section className={classes.buttonGroup}>
      <Grid container justify="center">
        {pages.map((item, i) => (
          <Grid key={item.name} item style={{ padding: "0 5px" }}>
            <Button
              onClick={() => handleChangePage(item, i)}
              variant="outlined"
              color={item.active ? "secondary" : "inherit"}
              className={classes.button}>
              {item.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </section>
  );
}

export default ButtonGroup;
