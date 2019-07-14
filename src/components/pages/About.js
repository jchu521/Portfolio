import React from "react";
//material ui
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
//static
import photo from "../../static/Jonathan_Chueh.jpg";
//styled-components
import styled, { keyframes } from "styled-components";
import Text from "../text";

const moveInLeft = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  80% {
    transform: translateX(20px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const authorBodyAnimation = keyframes`
  0% { opacity: 1; } 
  50% { opacity: .1; } 
  100% { opacity: 1; }
`;

const AboutHeader = styled.h1`
  animation: ${moveInLeft};
  animation-duration: 1s;
  animation-timing-function: ease-out;
`;

const AboutBody = styled.p`
  animation: ${authorBodyAnimation};
  animation-duration: 1s;
`;

const useStyles = makeStyles(
  createStyles({
    aboutSection: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    },

    aboutHeader: {
      fontSize: "2rem",
      margin: 0
    },

    aboutBody: {
      width: "50vw",
      lineHeight: 2,
      fontSize: 18,
      animation: "flash linear 1s slidein"
    },

    bigAvatar: {
      margin: 10,
      width: 120,
      height: 120
    }
  })
);

function About() {
  const classes = useStyles();
  const { aboutText } = Text;

  return (
    <section className={classes.aboutSection}>
      <Avatar alt="Jonathan Chueh" src={photo} className={classes.bigAvatar} />
      <span className={classes.aboutBody}>
        <AboutHeader className={classes.aboutHeader}>
          {aboutText.header}
        </AboutHeader>
        <AboutBody>{aboutText.body}</AboutBody>
      </span>
    </section>
  );
}

export default About;
