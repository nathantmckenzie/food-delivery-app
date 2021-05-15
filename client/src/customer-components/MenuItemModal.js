import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "./AddToCartButton";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    height: "90%",
    borderRadius: "3%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "grid",
    gridTemplateRows: "93% 7%",
  },
  items: {
    overflowY: "scroll",
  },
}));

export default function SimpleModal({ name, price, description }) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={handleOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div className={classes.items}>
            <div className="exit-menu-item-modal" onClick={handleClose}>
              X
            </div>
            <div className="menu-item-modal-name">{name ? name : null}</div>
            <div>{description ? description : null}</div>
            <div>{price ? price : null}</div>
            <div className="test-modal">.</div>
          </div>
          <div className={classes.bottomRow}>
            <Button price={price}>Add to cart - CA${price}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
