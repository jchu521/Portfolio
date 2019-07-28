import React, { useState, useCallback } from "react";
import Text from "../text";
import PageDot from "../ui/PageDot";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  Card,
  CardContent,
  Typography,
  Grow
} from "@material-ui/core";
//Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const useStyles = makeStyles(theme => ({
  left: { float: "left" },
  right: { float: "right" },
  list: {
    lineHeight: 1.8,
    fontWeight: 500,
    color: "#555"
  },
  cardSection: {
    padding: "40px 10px",
    [theme.breakpoints.down("sm")]: {
      padding: 0
    }
  },
  card: {
    height: 360,
    maxHeight: 360,
    borderRadius: 20,
    border: "3px solid #fff",
    boxShadow: "2px 2px 5px #000",

    [theme.breakpoints.down("sm")]: {
      height: 200,
      maxHeight: 200
    }
  },
  cardTitle: {
    [theme.breakpoints.down("md")]: {
      fontSize: "1.5rem"
    }
  },
  cardContent: {
    height: "100%"
  },
  ul: {
    [theme.breakpoints.down("sm")]: {
      columns: 2
    }
  },
  li: {
    flex: "0 1 auto"
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
    // transition: "width 2s",
    // "&:hover": {
    //   width: 300
    // }
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
}));

function Experience() {
  let { experienceText, icons } = Text;
  const classes = useStyles();
  const [index, setIndex] = useState(1);
  const [context, setContext] = useState(icons.directionIcon);
  const [, updateState] = useState();
  const forceUpdate = useCallback(() => updateState({}), []);

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
    resetCard();
    const wheelUp = e.nativeEvent.wheelDeltaY > 0 ? true : false;
    if (wheelUp) {
      handleChangeText(-1);
    } else {
      handleChangeText(1);
    }
  };

  const handleOverCard = (pageIndex, cardIndex) => {
    experienceText[pageIndex - 1].section[cardIndex].hide = false;
    forceUpdate();
  };

  const resetCard = () => {
    experienceText.forEach(item =>
      item.section.forEach(card => (card.hide = true))
    );
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

      <Grid container spacing={2}>
        {experienceText
          .filter(o => o.index === index)
          .map(item => (
            <React.Fragment key={item.index}>
              <Grid item xs={12}>
                <h3>
                  <span className={classes.left}>{item.organization}</span>
                  <span
                    className={classes.right}
                    dangerouslySetInnerHTML={{
                      __html: item.website
                    }}
                  />
                </h3>
              </Grid>
              <Grid item xs={12}>
                <h4>
                  <span className={classes.left}>{item.role}</span>
                  <span className={classes.right}>{item.workPeriod}</span>
                </h4>
              </Grid>
              <Grid container spacing={2} className={classes.cardSection}>
                {item.section.map((cardItem, i) => (
                  <Grid
                    item
                    xs={item.width.xs || null}
                    md={item.width.md || null}
                    lg={item.width.lg || null}
                    xl={item.width.xl || null}
                    key={cardItem.title}>
                    <Grow in={true} timeout={1000 * i}>
                      <Card
                        className={classes.card}
                        style={{
                          backgroundImage:
                            "linear-gradient(60deg, rgb(41, 50, 60) 0%, rgb(72, 85, 99) 100%)",
                          color: "white"
                        }}
                        onMouseOver={e => handleOverCard(index, i)}>
                        {cardItem.hide ? (
                          <Grid
                            container
                            justify="space-evenly"
                            alignItems="center"
                            direction="column"
                            style={{ width: "100%", height: "100%" }}>
                            <Typography
                              variant="h5"
                              className={classes.cardTitle}>
                              {cardItem.title}
                            </Typography>
                            <FontAwesomeIcon
                              icon={cardItem.image}
                              size="10x"
                              title="123"
                              className={classes.icon}
                            />
                          </Grid>
                        ) : (
                          <CardContent className={classes.cardContent}>
                            <Typography
                              variant="h5"
                              className={classes.cardTitle}>
                              {cardItem.title}
                            </Typography>
                            {typeof cardItem.body === "string" ? (
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: cardItem.body
                                }}
                              />
                            ) : (
                              <ul className={classes.ul}>
                                {cardItem.body.map((text, i) => (
                                  <li key={i} className={classes.li}>
                                    {cardItem.isLink ? (
                                      <Typography
                                        variant="body1"
                                        dangerouslySetInnerHTML={{
                                          __html: text
                                        }}
                                      />
                                    ) : (
                                      <Typography variant="body1">
                                        {text}
                                      </Typography>
                                    )}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </CardContent>
                        )}
                      </Card>
                    </Grow>
                  </Grid>
                ))}
              </Grid>
            </React.Fragment>
          ))}
      </Grid>
    </section>
  );
}

export default Experience;
