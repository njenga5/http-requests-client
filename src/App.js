import { AppBar, Box, Grid, makeStyles, Slide, Snackbar, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Editor from "@monaco-editor/react";
import { useEffect, useRef } from "react";
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

const pretiffyResponse = (response, resLang) => {
  if (response.message) {
    return JSON.stringify(response.message);
  }
  if (resLang !== "json") {
    return response.data;
  }
  return JSON.stringify(response.data);
};

function App() {
  const classes = useStyles();
  const { response, openSnackbar, setOpenSnackbar, constructUrl } = useGlobalContext();
  let responseLang = "json";
  if (response.headers) {
    responseLang = response.headers["content-type"].split(";")[0].split("/")[1];
  }
  const editorRef = useRef(null);

  const handleClose = (ev, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const editorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  useEffect(() => {
    editorRef.current && editorRef.current.getAction("editor.action.formatDocument").run();
  }, [response]);
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar} color="default">
        <Typography variant="h3" className={classes.header}>
          Web Requests
        </Typography>
      </AppBar>
      <Grid container direction="row" alignItems="center" justify="space-between">
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            {constructUrl}
          </Typography>
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
            <Editor
              language={responseLang}
              value={pretiffyResponse(response, responseLang)}
              onMount={editorDidMount}
            />
          </Box>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openSnackbar}
        onClose={handleClose}
        autoHideDuration={6000}
        key="bottomright"
        TransitionComponent={(props) => <Slide  {...props} direction="right" />}
      >
        <Alert severity="warning" onClose={handleClose}>
          Please enter a url
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
