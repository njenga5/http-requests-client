import axios from "axios";
import React, { useContext, useState } from "react";

const AppContext = React.createContext();

const httpMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
const bodyLabels = ["none", "raw"];

const AppProvider = ({ children }) => {
  const [response, setResponse] = useState("");
  const [requestBody, setRequestBody] = useState(["{", "}"].join("\n\n"));
  const [params, setParams] = useState({});
  const [headers, setHeaders] = useState({});
  const [method, setMethod] = useState(httpMethods[0]);
  const [url, setUrl] = useState("");
  const [headersKey, setHeadersKey] = useState("");
  const [headersValue, setHeadersValue] = useState("");
  const [paramsKey, setParamsKey] = useState("");
  const [paramsValue, setParamsValue] = useState("");
  const [label, setLabel] = useState(bodyLabels[0]);
  const [isRaw, setIsRaw] = useState(false);
  const [language, setLanguage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        url,
        method: method.toLowerCase(),
        validateStatus: (status) => true,
        data: requestBody && JSON.parse(requestBody),
        params: params.key ? null : params,
        headers,
      });
      // const data = await res.data;
      setResponse(res);
    } catch (err) {
      setResponse(err);
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
        headers,
        setHeaders,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);
export { AppProvider };
