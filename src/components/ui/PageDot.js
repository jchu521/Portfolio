import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Text from "../text";

const useStyles = makeStyles(
  createStyles({
    dotIcon: {
      position: "absolute",
      right: "95vw"
    }
  })
);

function PageDot(props) {
  const classes = useStyles();
  const { icons } = Text;

  const Dots = () => {
    const { index, page } = props;
    const array = [];
    console.log(page);

    for (let i = 1; i < index + 1; i++) {
      array.push(
        <FontAwesomeIcon
          key={i}
          icon={icons.faCircle}
          style={{ margin: `${i * 30}px 0` }}
          size="1x"
          color={page === i ? "black" : "grey"}
          className={classes.dotIcon}
        />
      );
    }
    console.log(array);
    return array;
  };

  return <Dots />;
}
export default PageDot;
