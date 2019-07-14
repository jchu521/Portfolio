import React, { useState } from "react";
import Text from "../text";
import PageDot from "../ui/PageDot";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
//Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles(
  createStyles({
    left: { float: "left" },
    right: { float: "right" },
    list: {
      lineHeight: 1.8,
      fontWeight: 500
    },
    experience: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      margin: 20
    },
    upButton: {
      position: "absolute",
      left: "45vw",
      top: "40vh",
      color: "grey"
    },
    downButton: {
      position: "absolute",
      left: "45vw",
      top: "95vh",
      color: "grey"
    },
    leftButton: {
      position: "absolute",
      left: "2.5vw",
      top: "67vh"
    },
    rightButton: {
      position: "absolute",
      left: "90vw",
      top: "67vh"
    }
  })
);
function Experience() {
  const { experienceText, icons } = Text;
  const classes = useStyles();
  const [index, setIndex] = useState(1);
  const [context, setContext] = useState(icons.directionIcon);

  const handleChangeText = value => {
    const newIndex = index + value;

    if (newIndex === 1) {
      context[0].show = false;
      context[1].show = true;

      setContext(context);
      setIndex(newIndex);
    } else if (newIndex === experienceText.length) {
      context[0].show = true;
      context[1].show = false;

      setContext(context);
      setIndex(newIndex);
    } else if (newIndex > 0 && newIndex < experienceText.length) {
      setIndex(newIndex);
    }
  };

  const handleMouseWheel = e => {
    const wheelUp = e.nativeEvent.wheelDeltaY > 0 ? true : false;
    if (wheelUp) {
      handleChangeText(-1);
    } else {
      handleChangeText(1);
    }
  };

  return (
    <section onWheel={handleMouseWheel} className={classes.experience}>
      {context.map(item => (
        <React.Fragment key={item.name}>
          {item.show && (
            <Button
              onClick={() => handleChangeText(item.value)}
              className={classes[item.style]}>
              <FontAwesomeIcon
                icon={item.icon}
                size="2x"
                className={classes.icon}
              />
            </Button>
          )}
        </React.Fragment>
      ))}

      <PageDot index={experienceText.length} page={index} />

      {experienceText
        .filter(o => o.index === index)
        .map(o => (
          <React.Fragment key={o.index}>
            <Grid container>
              <Grid item xs={12}>
                <h3>
                  <span className={classes.left}>{o.organization}</span>
                  <span
                    className={classes.right}
                    dangerouslySetInnerHTML={{
                      __html: o.website
                    }}
                  />
                </h3>
              </Grid>
              <Grid item xs={12}>
                <h4>
                  <span className={classes.left}>{o.role}</span>
                  <span className={classes.right}>{o.workPeriod}</span>
                </h4>
              </Grid>
              {o.body && (
                <Grid item xs={12}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: o.body
                    }}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <ul>
                  {o.list.map((l, i) => (
                    <li key={i} className={classes.list}>
                      {l}
                    </li>
                  ))}
                </ul>
              </Grid>
            </Grid>
          </React.Fragment>
        ))}
    </section>
  );
}

export default Experience;
