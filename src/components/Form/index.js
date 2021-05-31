import {
  Button,
  FormControl,
  Grid,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import React from "react";
import { useGlobalContext } from "../../context";

const METHOD = "selected-method";
const URL = "url";

const useStyles = makeStyles((theme) => ({
  formcontrol: {
    marginTop: 15,
  },
  input: {
    marginRight: 2,
    width: "80%",
    marginLeft: 1,
  },
}));

const Form = () => {
  const classes = useStyles();
  const { handleSubmit, setMethod, setUrl, httpMethods, url, method } = useGlobalContext();


  const handleChange = (e) => {
    const node = e.target;
    const nodeValue = node.value;
    if (node.name === METHOD && nodeValue !== '') {
      setMethod(nodeValue);
    } else if (node.name === URL && nodeValue !== '') {
      setUrl(nodeValue);
    }
  };

  return (
    <Grid item xs={12}>
      <form noValidate onSubmit={handleSubmit}>
        <FormControl variant="outlined" className={classes.formcontrol}>
          <Select
            id="demo-simple-select-outlined"
            value={method}
            name={METHOD}
            onChange={handleChange}
          >
            {httpMethods.map((method, index) => (
              <MenuItem key={index} value={method}>
                {method}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          id="outlined-full-width"
          className={classes.input}
          label="Enter a url"
          placeholder="Enter a url"
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          name={URL}
          onChange={handleChange}
          value={url}
        />
        <Button
          endIcon={<Send />}
          style={{ marginTop: 19, padding: 12 }}
          variant="contained"
          color="secondary"
          size="large"
          type="submit"
        >
          Send
        </Button>
      </form>
    </Grid>
  );
};

export default Form;
