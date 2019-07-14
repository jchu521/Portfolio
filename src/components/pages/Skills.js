import React from "react";
import Text from "../text";

//material ui
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Divider, Grid } from "@material-ui/core";
// const { skillIcons } = Text.icons;

const useStyles = makeStyles(
  createStyles({
    skills: {
      display: "flex",
      justifyContent: "center",
      // alignItems: "center",
      height: "100%",
      margin: 20
    },
    icon: {
      height: 120,
      width: 120
    }
  })
);

function Skills() {
  const classes = useStyles();
  const { icons } = Text;

  return (
    <section className={classes.skills}>
      <Grid container>
        {icons.skillIcons.map(item => (
          <React.Fragment key={item.type}>
            <Grid container alignItems="center" justify="center">
              <h1>{item.type}</h1>
            </Grid>
            <Grid container justify="space-evenly">
              {item.icons.map(icon => (
                <svg
                  key={icon.name}
                  className={classes.icon}
                  viewBox={icon.viewBox ? icon.viewBox : "0 0 128 128"}
                  style={{ paddingRight: 20 }}>
                  {icon.path}
                </svg>
              ))}
            </Grid>
            <Divider
              style={{
                margin: 20,
                color: "black",
                width: "100%"
              }}
            />
          </React.Fragment>
        ))}
      </Grid>
    </section>
  );
}

export default Skills;
