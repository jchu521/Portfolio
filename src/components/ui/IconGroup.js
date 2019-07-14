import React, { useState, useReducer } from "react";

//Material UI
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { ButtonBase, Badge } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

//Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// styled-components
import styled, { keyframes } from "styled-components";

import Text from "../text";

const iconAnimation = keyframes`
  0% {
    opacity: 0;
    transform: rotate(30deg);
  }
  40% {
    transform: rotate(50deg);
  }
  80% {
    transform: rotate(-50deg);
  }
  100% {
    opacity: 1;
    transform: rotate(0deg);
  }
`;

const Icon = styled.span`
  animation: ${iconAnimation};
  animation-duration: 1s;
  animation-timing-function: ease-out;
`;

const useStyles = makeStyles(
  createStyles({
    iconGroup: {
      position: "absolute",
      top: 20,
      left: 20
    },

    icon: {
      padding: 10,
      color: "white"
    },

    badge: {
      "& span": {
        top: 70,
        right: 20,
        height: 35,
        whiteSpace: "nowrap"
      }
    },
    copyBadge: {
      "& .MuiBadge-badge": {
        backgroundColor: "red !important"
      }
    },
    badgeColor: {
      "& .MuiBadge-badge": {
        backgroundColor: "#3f51b5"
      }
    },
    badgeHover: { height: "20px !important", padding: "0 5px" }
  })
);

function IconGroup() {
  const classes = useStyles();
  const [icons, setIcons] = useState(Text.icons.iconsButton);
  const [copy, setCopy] = useState(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const handleHoverIcon = (show, index) => {
    let hasHover = icons[index].hover;

    show && hasHover
      ? (icons[index].hideBadge = false)
      : (icons[index].hideBadge = true);

    setIcons(icons);
    setCopy(false);
    forceUpdate();
  };

  const copyToClipboard = e => {
    const textField = document.createElement("textarea");

    textField.innerText = e.target.title;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    setCopy(true);
  };

  return (
    <section className={classes.iconGroup}>
      <Grid container>
        {icons.map((icon, i) => (
          <ButtonBase
            key={i}
            onMouseEnter={() => handleHoverIcon(true, i)}
            onMouseLeave={() => handleHoverIcon(false, i)}>
            <Badge
              className={`${classes.badge} ${
                copy ? classes.copyBadge : classes.badgeColor
              }`}
              badgeContent={
                <span title={icon.text} className={classes.badgeHover}>
                  {icon.hover} {copy ? "Copied !" : ""}
                </span>
              }
              invisible={icon.hideBadge}
              onClick={copyToClipboard}>
              <Icon
                onClick={() => {
                  window.open(
                    icon.link
                      ? icon.link
                      : icon.email
                      ? icon.email
                      : icon.phone,
                    "_blank"
                  );
                }}>
                <FontAwesomeIcon
                  icon={icon.name}
                  size="2x"
                  className={classes.icon}
                />
              </Icon>
            </Badge>
          </ButtonBase>
        ))}
      </Grid>
    </section>
  );
}

export default IconGroup;
