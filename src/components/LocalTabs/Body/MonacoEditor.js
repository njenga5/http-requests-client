import React from "react";
import Editor from "@monaco-editor/react";
import { useGlobalContext } from "../../../context";
const MonacoEditor = ({ language }) => {
  const { setRequestBody, requestBody } = useGlobalContext();

  const handleEditorChange = (value, e) => {
    setRequestBody(value);
  };
  const lcLanguage = language.toLowerCase();
  const sanititizeInput = () => {
    if (lcLanguage === "json") {
      return { language: lcLanguage, value: ["{", "}"].join("\n\n") };
    } else if (lcLanguage === "xml") {
      return { language: lcLanguage, value: ["<>", "</>"].join("\n\n") };
    } else if (lcLanguage === "text") {
      return { language: lcLanguage, value: "some text" };
    } else if (lcLanguage === "javascript") {
      return { language: lcLanguage, value: "console.log('Hello world!')" };
    } else if (lcLanguage === "html") {
      return { language: lcLanguage, value: ["<html>", "</html>"].join("\n\n") };
    }
  };

  return <Editor language={lcLanguage} onChange={handleEditorChange} value={requestBody} />;
};

export default MonacoEditor;
