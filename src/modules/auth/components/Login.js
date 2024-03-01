import React, { useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import logo from "../../../assets/images/logo.jfif";
import { useDispatch, useSelector } from "react-redux";
import { SetFalseLogin, SubmitLogin } from "../_redux/AuthAction";
import { useHistory } from "react-router";
const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.authInfo.isLogin);
  const loginSuccess = useSelector((state) => state.authInfo.loginSuccess);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    dispatch(SubmitLogin({ email: email, password: password }));
  };
  useEffect(() => {
    if (loginSuccess) {
      history.push("/dashboard");
      dispatch(SetFalseLogin());
    }
  }, [loginSuccess]);
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin") || "false";
    if (isLogin === true || isLogin === "true") {
      history.push("/dashboard");
    }
  }, []);
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <div>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="enter email"
                        onChange={(e) => setEmail(e.target.value)}
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
                        placeholder="enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={(event) => {
                          if (event.key === "Enter") {
                            handleLogin();
                          }
                        }}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        {isLogin ? (
                          <CButton color="primary" className="px-4">
                            <span
                              class="spinner-border spinner-border-sm"
                              role="status"
                              aria-hidden="true"
                            ></span>
                          </CButton>
                        ) : (
                          <CButton
                            color="primary"
                            className="px-4"
                            onClick={() => handleLogin()}
                          >
                            Login
                          </CButton>
                        )}
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">
                          {/* <Link to="/register">Registration</Link> */}
                        </CButton>
                      </CCol>
                    </CRow>
                  </div>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <div>
                  <img src={logo} className="img-fluid" />
                </div>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
