import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  withStyles,
} from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";
import React, { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 1,
  },
}));

const InlineListItemText = withStyles({
  primary: {
    display: "inline",
    color: green[400],
  },
})((props) => <ListItemText {...props} />);

const options = ["JSON", "XML", "Text", "Javascript", "HTML"];

const BodyTypeMenu = ({ setLanguage }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  useEffect(() => {
    setLanguage(options[selectedIndex]);
  }, [selectedIndex, setLanguage]);

  const handleClickListItem = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuItemClick = (e, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <List component="nav" aria-label="Post request data type" className={classes.root}>
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="bodytype-menu"
          aria-label="Data type"
          onClick={handleClickListItem}
        >
          <InlineListItemText
            primary={options[selectedIndex]}
            secondary={<KeyboardArrowDown fontSize="small" />}
          />
        </ListItem>
      </List>
      <Menu
        id="bodytype-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            selected={index === selectedIndex}
            onClick={(e) => handleMenuItemClick(e, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default BodyTypeMenu;
