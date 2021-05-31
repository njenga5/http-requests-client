import {
  FormControl,
  FormControlLabel,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useGlobalContext } from "../../../context";
import BodyTypeMenu from "./BodyTypeMenu";
import MonacoEditor from "./MonacoEditor";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    maxHeight: "40vh",
    height: "27vh",
    textAlign: "center",
  },
}));

const Body = () => {
  const classes = useStyles();
  const { label, setLabel, isRaw, setIsRaw, language, setLanguage, bodyLabels } =
    useGlobalContext();

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLabel(newValue);
  };

  useEffect(() => {
    if (label === "raw") {
      setIsRaw(true);
    } else {
      setIsRaw(false);
    }
  }, [label, setIsRaw]);
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="body type"
            name="body-type"
            value={label}
            onChange={(e) => handleChange(e)}
          >
            {bodyLabels.map((label, index) => (
              <FormControlLabel
                key={index}
                value={label}
                control={<Radio color="secondary" />}
                label={label}
              />
            ))}
          </RadioGroup>
        </FormControl>
        {isRaw && <BodyTypeMenu setLanguage={setLanguage} />}
      </div>
      <Paper elevation={3} className={classes.paper}>
        {isRaw ? (
          <MonacoEditor language={language} />
        ) : (
          <Typography variant="body2">This request has no body</Typography>
        )}
      </Paper>
    </div>
  );
};

export default Body;
