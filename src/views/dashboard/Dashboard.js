import React, { lazy, useEffect } from "react";
import Axios from "axios";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CWidgetProgressIcon,
  CCardGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import MainChartExample from "../charts/MainChartExample.js";
import { useHistory } from "react-router";

const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Dashboard = () => {
  // const history = useHistory();
  // useEffect(() => {
  //   const isLogin = localStorage.getItem("isLogin") || "false";
  //   if (isLogin === false || isLogin === "false") {
  //     history.push("/login");
  //   }
  // }, []);

  return (
    <>
      <h4 className="alert text-center">Welcome to dashboard</h4>
      {/* <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-muted">November 2017</div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButton color="primary" className="float-right">
                <CIcon name="cil-cloud-download" />
              </CButton>
              <CButtonGroup className="float-right mr-3">
                {["Day", "Month", "Year"].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === "Month"}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <MainChartExample style={{ height: "300px", marginTop: "40px" }} />
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Visits</div>
              <strong>29.703 Users (40%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Unique</div>
              <strong>24.093 Users (20%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Pageviews</div>
              <strong>78.706 Views (60%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">New Users</div>
              <strong>22.123 Users (80%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Bounce Rate</div>
              <strong>Average Rate (40.15%)</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                value={40}
              />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>

      <WidgetsBrand withCharts />

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>Traffic {" & "} Sales</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="6" xl="6">
                  <CRow>
                    <CCol sm="6">
                      <CCallout color="info">
                        <small className="text-muted">New Clients</small>
                        <br />
                        <strong className="h4">9,123</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="danger">
                        <small className="text-muted">Recurring Clients</small>
                        <br />
                        <strong className="h4">22,643</strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Monday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="34"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="78"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Tuesday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="56"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="94"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Wednesday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="12"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="67"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Thursday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="43"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="91"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Friday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="22"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="73"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Saturday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="53"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="82"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">Sunday</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="info"
                        value="9"
                      />
                      <CProgress
                        className="progress-xs"
                        color="danger"
                        value="69"
                      />
                    </div>
                  </div>
                  <div className="legend text-center">
                    <small>
                      <sup className="px-1">
                        <CBadge shape="pill" color="info">
                          &nbsp;
                        </CBadge>
                      </sup>
                      New clients &nbsp;
                      <sup className="px-1">
                        <CBadge shape="pill" color="danger">
                          &nbsp;
                        </CBadge>
                      </sup>
                      Recurring clients
                    </small>
                  </div>
                </CCol>

                <CCol xs="12" md="6" xl="6">
                  <CRow>
                    <CCol sm="6">
                      <CCallout color="warning">
                        <small className="text-muted">Pageviews</small>
                        <br />
                        <strong className="h4">78,623</strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="success">
                        <small className="text-muted">Organic</small>
                        <br />
                        <strong className="h4">49,123</strong>
                      </CCallout>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  <div className="progress-group mb-4">
                    <div className="progress-group-header">
                      <CIcon className="progress-group-icon" name="cil-user" />
                      <span className="title">Male</span>
                      <span className="ml-auto font-weight-bold">43%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="warning"
                        value="43"
                      />
                    </div>
                  </div>
                  <div className="progress-group mb-5">
                    <div className="progress-group-header">
                      <CIcon
                        className="progress-group-icon"
                        name="cil-user-female"
                      />
                      <span className="title">Female</span>
                      <span className="ml-auto font-weight-bold">37%</span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="warning"
                        value="37"
                      />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon
                        className="progress-group-icon"
                        name="cil-globe-alt"
                      />
                      <span className="title">Organic Search</span>
                      <span className="ml-auto font-weight-bold">
                        191,235 <span className="text-muted small">(56%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="56"
                      />
                    </div>
                  </div>

                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon
                        name="cib-facebook"
                        className="progress-group-icon"
                      />
                      <span className="title">Facebook</span>
                      <span className="ml-auto font-weight-bold">
                        51,223 <span className="text-muted small">(15%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="15"
                      />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon
                        name="cib-twitter"
                        className="progress-group-icon"
                      />
                      <span className="title">Twitter</span>
                      <span className="ml-auto font-weight-bold">
                        37,564 <span className="text-muted small">(11%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="11"
                      />
                    </div>
                  </div>
                  <div className="progress-group">
                    <div className="progress-group-header">
                      <CIcon
                        name="cib-linkedin"
                        className="progress-group-icon"
                      />
                      <span className="title">LinkedIn</span>
                      <span className="ml-auto font-weight-bold">
                        27,319 <span className="text-muted small">(8%)</span>
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress
                        className="progress-xs"
                        color="success"
                        value="8"
                      />
                    </div>
                  </div>
                </CCol>
              </CRow>

              <br />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CCardGroup className="mb-4">
        <CWidgetProgressIcon
          header="87.500"
          text="Visitors"
          color="gradient-info"
          inverse
        >
          <CIcon name="cil-people" height="36" />
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="385"
          text="New Clients"
          color="gradient-success"
          inverse
        >
          <CIcon name="cil-userFollow" height="36" />
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="1238"
          text="Products sold"
          color="gradient-warning"
          inverse
        >
          <CIcon name="cil-basket" height="36" />
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="28%"
          text="Returning Visitors"
          color="gradient-primary"
          inverse
        >
          <CIcon name="cil-chartPie" height="36" />
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="5:34:11"
          text="Avg. Time"
          color="gradient-danger"
          inverse
        >
          <CIcon name="cil-speedometer" height="36" />
        </CWidgetProgressIcon>
      </CCardGroup> */}
    </>
  );
};

export default Dashboard;
