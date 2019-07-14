import React from "react";
import Text from "../text";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(
  createStyles({
    education: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      height: "100%",
      margin: 20
    },
    ul: {
      columns: 2
    },
    logo: {
      height: 60,
      width: 60
    },
    left: { float: "left" },
    right: { float: "right" },
    list: {
      lineHeight: 1.5,
      fontWeight: 500
    }
  })
);

function Eduction() {
  const { educationText } = Text;
  const classes = useStyles();

  return (
    <section className={classes.education}>
      {educationText.map(o => (
        <Grid container key={o.index} spacing={2}>
          <Grid item>
            <img alt={o.organization} src={o.logo} className={classes.logo} />
          </Grid>
          <Grid item xs={10}>
            <Grid container>
              <Grid item xs={12}>
                <h2 style={{ margin: 0 }}>
                  <span className={classes.left}>{o.organization}</span>
                  <span className={classes.right}>{o.period}</span>
                </h2>
              </Grid>
              <Grid item xs={12}>
                <h4 style={{ margin: 0 }}>
                  <span className={classes.left}>{o.degree}</span>
                </h4>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <ul className={classes.ul}>
              {o.list.map((l, i) => (
                <li key={i} className={classes.list}>
                  {l}
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
      ))}
    </section>
  );
}

export default Eduction;
