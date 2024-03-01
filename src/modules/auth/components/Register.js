import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { showToast } from "src/utils/ToastHelper";

const Register = () => {
  const [regInfo, setRegInfo] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    cupon: "",
  });
  const handleChangeText = (name, value) => {
    const val = { ...regInfo };
    val[name] = value;
    setRegInfo(val);
  };
  const handleReg = () => {
    if (regInfo.name.length === 0) {
      showToast("error", "User name should not be empty!");
      return 0;
    } else if (regInfo.email.length === 0) {
      showToast("error", "Email should not be empty");
      return 0;
    } else if (regInfo.password.length < 6) {
      showToast(
        "error",
        "password should not be empty or less than 6 charector"
      );
      return 0;
    } else if (regInfo.rePassword !== regInfo.password) {
      showToast("error", "Password not matched!");
      return 0;
    } else if (regInfo.cupon.length === 0) {
      showToast("error", "Hidden cupon should not be empty!");
      return 0;
    }
  };
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="enter username"
                      onChange={(e) => handleChangeText("name", e.target.value)}
                      value={regInfo.name}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Email"
                      onChange={(e) =>
                        handleChangeText("email", e.target.value)
                      }
                      value={regInfo.email}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Password"
                      onChange={(e) =>
                        handleChangeText("password", e.target.value)
                      }
                      value={regInfo.password}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="password"
                      placeholder="Repeat password"
                      onChange={(e) =>
                        handleChangeText("rePassword", e.target.value)
                      }
                      value={regInfo.rePassword}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                      type="text"
                      placeholder="Hidden Cupon"
                      onChange={(e) =>
                        handleChangeText("cupon", e.target.value)
                      }
                      value={regInfo.cupon}
                    />
                  </CInputGroup>
                  <CButton color="success" onClick={() => handleReg()}>
                    Create Account
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Register;
