import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          IT Solutions
        </a>
        <span className="ml-1">&copy; 2024 IT Solutions.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Powered by</span>
        <a
          href="https://coreui.io/react"
          target="_blank"
          rel="noopener noreferrer"
        >
          IT Solutions for React
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);