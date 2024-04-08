import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ClientDelete, FalsePaid, GetClientList, SubmitPay, falseClientDeleted } from "../_redux/ClientAction";
import { useHistory } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const ClientList = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [amount, setAmount] = useState(0);
  const [modalData, setModalData] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isPaidClient = useSelector((state) => state.clientInfo.isPaidClient);
  const isPayClient = useSelector((state) => state.clientInfo.isPayClient);
  const ClientArrList = useSelector((state) => state.clientInfo.clientList);
  const clientDeleted = useSelector(
    (state) => state.clientInfo.clientDeleted
  );
  const dispatch = useDispatch();
  const handlePay = () => {
    dispatch(SubmitPay({ ...modalData, amount }))
  }
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
  useEffect(() => {
    if (isPaidClient) {
      setShow(false)
      setAmount(0)
      dispatch(FalsePaid())
    }
  }, [isPaidClient])

  // console.log('ClientArrList', modalData)
  return (
    <>
      <div className="d-flex justify-content-between">
        <h4>Client List</h4>
        <a
          className="btn btn-success btn-sm text-light"
          onClick={() => history.push("/Client-add")}
        >
          Add Client
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
                <th>Due</th>
                <th>Pay</th>
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
                  <td>{item.due} Tk</td>
                  <td>
                    <a
                      className="btn btn-primary btn-sm mr-2"
                      onClick={() => {
                        item?.due > 0 && handleShow()
                        setModalData(item)
                      }}
                    >
                      <i className="fa fa-credit-card"></i>
                    </a>
                  </td>
                  <td>
                    <a
                      className="btn btn-success btn-sm mr-2"
                      onClick={() => history.push({
                        pathname: `/client-edit/${item._id}`,
                        state: item
                      })}
                    >
                      <i className="fa fa-pencil"></i>
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
      <div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>PAYMENT</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>{modalData.name} ({modalData.phone})</h5>
            <h6>Address: {modalData.address}</h6>
            <h6>Previous Due : {modalData.due}</h6>
            <div className="row mt-5 mb-5">
              <div className="col-sm-2">Amount</div>
              <div className="col-sm-6">
                <input
                  required
                  min={0}
                  max={modalData.due}
                  type="number"
                  className="form-control"
                  value={amount}
                  placeholder="enter amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {isPayClient ? (
              <Button variant="primary">
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>

              </Button>
            ) : (
              <Button variant="primary" onClick={() => handlePay()}>
                PAY
              </Button>
            )}

          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default ClientList;
