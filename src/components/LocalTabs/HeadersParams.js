import React from "react";
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  table: {
    width: "100%",
  },
}));

const Headers_Params = ({ children, value, handleChange }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table styles={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>KEY</TableCell>
            <TableCell align="left">VALUE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell scope="row">{children}</TableCell>
            <TableCell align="left">
              <TextField
                variant="outlined"
                style={{ width: "100%" }}
                value={value}
                onChange={handleChange}
                name="value"
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Headers_Params;
