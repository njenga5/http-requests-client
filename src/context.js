import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const httpMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
const bodyLabels = ["none", "raw"];

const AppProvider = ({ children }) => {
  const [response, setResponse] = useState("");
  const [requestBody, setRequestBody] = useState(["{", "}"].join("\n\n"));
  const [params, setParams] = useState({});
  const [requestHeaders, setRequestHeaders] = useState({});
  const [method, setMethod] = useState(httpMethods[0]);
  const [url, setUrl] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [headersKey, setHeadersKey] = useState("");
  const [headersValue, setHeadersValue] = useState("");
  const [paramsKey, setParamsKey] = useState("");
  const [paramsValue, setParamsValue] = useState("");
  const [label, setLabel] = useState(bodyLabels[0]);
  const [isRaw, setIsRaw] = useState(false);
  const [constructUrl, setConstructUrl] = useState("");
  const [language, setLanguage] = useState("");


  useEffect(()=>{
    url  ? 
    setConstructUrl(`${url}${paramsKey && '/?'}${paramsKey}${paramsKey && '='}${paramsValue}`)
    :
    setConstructUrl('')
  }, [setConstructUrl, url, paramsKey, paramsValue])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (url) {
      setOpenSnackbar(false);
      try {
        const res = await axios({
          url,
          method: method.toLowerCase(),
          validateStatus: (status) => true,
          data: requestBody && JSON.parse(requestBody),
          params: params.key ? null : params,
          headers:requestHeaders,
        });
        console.log(res.headers);
        setResponse(res);
      } catch (err) {
        setResponse(err);
      }
    } else {
      setOpenSnackbar(true);
    }
  };

  return (
    <AppContext.Provider
      value={{
        response,
        setResponse,
        requestBody,
        setRequestBody,
        params,
        setParams,
        requestHeaders,
        setRequestHeaders,
        handleSubmit,
        method,
        setMethod,
        url,
        setUrl,
        httpMethods,
        headersKey,
        setHeadersKey,
        headersValue,
        setHeadersValue,
        paramsKey,
        setParamsKey,
        paramsValue,
        setParamsValue,
        label,
        setLabel,
        isRaw,
        setIsRaw,
        language,
        setLanguage,
        bodyLabels,
        openSnackbar,
        setOpenSnackbar,
        constructUrl,
        setConstructUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
export { AppProvider };
