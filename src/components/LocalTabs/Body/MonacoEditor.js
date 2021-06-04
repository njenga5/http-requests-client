import React from "react";
import Editor from "@monaco-editor/react";
import { useGlobalContext } from "../../../context";
const MonacoEditor = ({ language }) => {
  const { setRequestBody, requestBody } = useGlobalContext();

  const handleEditorChange = (value, e) => {
    setRequestBody(value);
  };
  const lcLanguage = language.toLowerCase();

  return <Editor language={lcLanguage} onChange={handleEditorChange} value={requestBody} />;
};

export default MonacoEditor;
