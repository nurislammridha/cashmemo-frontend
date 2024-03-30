import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ClientDelete, GetClientList, falseClientDeleted } from "../_redux/SellAction";
import { useHistory } from "react-router-dom";
import { jsPDF } from "jspdf";
import DownloadPdf from "src/modules/pdf/DownloadPdf";
const SellList = () => {
  let x = false
  const ref = React.createRef();
  const history = useHistory();
  const ClientArrList = useSelector(
    (state) => state.clientInfo.clientList
  );
  const clientDeleted = useSelector(
    (state) => state.clientInfo.clientDeleted
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetClientList());
  }, []);
  useEffect(() => {
    if (clientDeleted) {
      dispatch(GetClientList());
      dispatch(falseClientDeleted());
    }
  }, [clientDeleted]);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this Client?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(ClientDelete(id)),
        },
        {
          label: "No",
        },
      ],
    });
  };
  const handleDownLoad = () => {
    var doc = new jsPDF("p", "px", [1000, 1000], "a2", false, false, 2, 1.0);
    doc.html(document.querySelector("#con"), {
      callback: function (pdf) {

        pdf.deletePage(2)
        pdf.deletePage(3)
        pdf.deletePage(4)
        pdf.deletePage(5)
        pdf.deletePage(6)
        pdf.deletePage(2)
        pdf.deletePage(3)
        pdf.deletePage(2)
        pdf.deletePage(2)
        pdf.deletePage(2)
        // pdf.deletePage(8)
        // pdf.deletePage(9)
        // pdf.deletePage(10)
        // pdf.deletePage(11)
        // pdf.deletePage(12)
        // pdf.deletePage(13)
        // pdf.deletePage(14)
        pdf.save("invoice-" + "rgrrgr" + ".pdf");
        // setLoader(false);
      },
    });
  }
  console.log('ClientArrList', ClientArrList)
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Sell List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/Sell-add")}
        >
          Add Sell
        </a>
      </div>
      <div className="mt-3">
        {ClientArrList != null && ClientArrList.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {ClientArrList.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>
                    <a
                      className="btn btn-primary btn-sm mr-2"
                      onClick={() => handleDownLoad(item._id)}
                    >
                      <i className="fa fa-file-pdf-o"></i>
                    </a>
                    <a
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      <i className="fa fa-trash"></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div id="con">
        <DownloadPdf ref={ref} />
      </div>
    </>
  );
};

export default SellList;
