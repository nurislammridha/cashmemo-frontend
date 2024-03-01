import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useHistory } from "react-router";

const TheHeaderDropdown = () => {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.setItem("access_token", "");
    localStorage.setItem("isLogin", "false");
    history.push("/login");
  };
  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={"avatars/6.jpg"}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Account</strong>
        </CDropdownItem> */}
        {/* <CDropdownItem>Name: Anikh</CDropdownItem>
        <CDropdownItem>Email: Anikh</CDropdownItem> */}
        <CDropdownItem onClick={() => handleLogout()}>
          <a className="ml-5">LOGOUT</a>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
