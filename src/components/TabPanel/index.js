import React from "react";
import PropTypes from "prop-types";
import { Box } from "@material-ui/core";

const TabPanel = (props) => {
  const { children, value, field, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== field}
      id={`wrapped-tabpanel-${field}`}
      aria-labelledby={`wrapped-tab-${field}`}
      {...other}
    >
      {value === field && (
        <Box pt={2} style={{ width: "100%" }}>
          {children}
        </Box>
      )}
    </div>
  );
};

export default TabPanel;
TabPanel.propTypes = {
  children: PropTypes.node,
  field: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
