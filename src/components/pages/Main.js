import React, { useState } from "react";
//components
import About from "./About";
import Projects from "./Projects";
import Experience from "./Experience";
import Education from "./Education";
import Skills from "./Skills";
//material ui
import { makeStyles, createStyles } from "@material-ui/core/styles";
//static
import Background from "../../static/Port_2_Background.jpg";
import ButtonGroup from "../ui/ButtonGroup";

const useStyles = makeStyles(
  createStyles({
    MainSection: {
      backgroundImage: `url(${Background})`,
      height: "35vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "white"
    },
    bodySection: {
      margin: "0vw 10vw",
      height: "55vh",
      color: "black"
    }
  })
);

function Main() {
  const classes = useStyles();
  const [page, setPage] = useState("Experience");

  return (
    <>
      <section className={classes.MainSection}>
        <About />
        <ButtonGroup page={page} setPage={setPage} />
      </section>
      <section className={classes.bodySection}>
        {
          {
            Projects: <Projects />,
            Experience: <Experience />,
            Education: <Education />,
            Skills: <Skills />
          }[page]
        }
      </section>
    </>
  );
}

export default Main;
