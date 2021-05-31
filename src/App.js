import { AppBar, Box, Grid, makeStyles, Typography } from "@material-ui/core";
import Editor from "@monaco-editor/react";
import Form from "./components/Form";
import LocalTabs from "./components/LocalTabs";
import { useGlobalContext } from "./context";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    maxWidth: "80%",
    margin: "auto",
  },
  appbar: {
    maxWidth: 500,
    margin: 20,
    borderRadius: theme.spacing(3),
  },
  header: {
    textAlign: "center",
  },
  editor: {
    height: "30vh",
    marginTop: 50,
    textAlign: "center",
  },
}));

const pretiffyResponse = (response) => {
  if (response.message ){
    return response.message
  }

  return JSON.stringify(response)
    .split("[")
    .join("[\n\t")
    .split("]")
    .join("\n]")
    .split("{")
    .join("{\n\t")
    .split("}")
    .join("\n\t}")
    .split(",")
    .join(",\n\t");
};

function App() {
  const classes = useStyles();
  const { response } = useGlobalContext();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar} color="default">
        <Typography variant="h3" className={classes.header}>
          Web Requests
        </Typography>
      </AppBar>
      <Grid container direction="row" alignItems="center" justify="space-between">
        <Grid item xs={12}>
          <Form />
        </Grid>
        <Grid item container spacing={1} direction="row">
          <Grid item md={12}>
            <LocalTabs />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.editor}>
            <Typography variant="body2">Response</Typography>
            <Editor language="json" value={pretiffyResponse(response)} />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;