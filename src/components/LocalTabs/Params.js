import { TextField } from "@material-ui/core";
import React, { useEffect } from "react";
import { useGlobalContext } from "../../context";
import HeadersParams from "./HeadersParams";

const Params = () => {
  const { setParams, paramsKey, setParamsKey, paramsValue, setParamsValue } = useGlobalContext();
  const handleChange = (e) => {
    const node = e.target;
    if (node.name === "key") {
      node.value ? setParamsKey('key') : setParamsKey(node.value);
    } else if (node.name === "value") {
      node.value ? setParamsValue('value') : setParamsValue(node.value);
    }
  };
  useEffect(() => {
    setParams({ [paramsKey]: paramsValue });
  }, [paramsKey, paramsValue, setParams]);
  return (
    <HeadersParams handleChange={handleChange} value={paramsValue}>
      <TextField
        variant="outlined"
        fullWidth
        value={paramsKey}
        onChange={handleChange}
        name="key"
      />
    </HeadersParams>
  );
};

export default Params;
