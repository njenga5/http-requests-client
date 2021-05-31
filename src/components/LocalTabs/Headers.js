import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import React, { useEffect } from "react";
import { useGlobalContext } from "../../context";
import HeadersParams from "./HeadersParams";
import allHeaders from "./utils/AllHeaders";

const Headers = () => {
  const { setHeaders, headersKey, setHeadersKey, headersValue, setHeadersValue } =
    useGlobalContext();

  const handleChange = (e, value) => {
    const node = e.target;
    if (node.name === "value") {
      setHeadersValue(node.value);
    } else {
      setHeadersKey(value);
    }
  };
  useEffect(() => {
    const headersL = JSON.parse(`{"${headersKey}":"${headersValue}"}`)
    setHeaders(headersL);
  }, [headersKey, headersValue, setHeaders]);
  return (
    <HeadersParams handleChange={handleChange} value={headersValue}>
      <Autocomplete
        id="free-solo-demo"
        fullWidth
        freeSolo
        value={headersKey}
        onChange={handleChange}
        inputValue={headersKey}
        onInputChange={(event, newInputValue) => {
          setHeadersKey(newInputValue);
        }}
        options={allHeaders}
        renderInput={(params) => (
          <TextField {...params} margin="normal" variant="outlined" name="key" />
        )}
      />
    </HeadersParams>
  );
};

export default Headers;
