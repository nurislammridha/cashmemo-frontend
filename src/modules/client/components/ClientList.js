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
  const [search, setSearch] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const isPaidClient = useSelector((state) => state.clientInfo.isPaidClient);
  const isPayClient = useSelector((state) => state.clientInfo.isPayClient);
  const ClientList = useSelector((state) => state.clientInfo.clientList);
  const { clients, pagination } = ClientList || {}
  const { totalPage, nextPage, previousPage, currentPage } = pagination || {}
  const clientDeleted = useSelector(
    (state) => state.clientInfo.clientDeleted
  );
  const dispatch = useDispatch();
  const handlePay = () => {
    dispatch(SubmitPay({ ...modalData, amount }))
  }
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
  const handlePagination = (page) => {
    dispatch(GetClientList(search, page));
  };
  useEffect(() => {
    dispatch(GetClientList());
  }, []);
  useEffect(() => {
    dispatch(GetClientList(search));
  }, [search]);
  useEffect(() => {
    if (clientDeleted) {
      dispatch(GetClientList());
      dispatch(falseClientDeleted());
    }
  }, [clientDeleted]);

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
      <div className="row mb-2">
        <div className="col-sm-2">
          <h4>Client List</h4>
        </div>
        <div className="col-sm-1">Search</div>
        <div className="col-sm-2">
          <input
            className="form-control"
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-sm-5"></div>
        <div className="col-sm-2">
          <a
            className="btn btn-success btn-sm text-light float-end"
            onClick={() => history.push("/Client-add")}
          >
            Add Client
          </a>
        </div>
      </div>
      <hr></hr>
      <div className="mt-5 mb-5">
        {ClientList != null && clients?.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Tel</th>
                <th>Due</th>
                {/* <th>Pay</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((item, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>{item.tel}</td>
                  <td>{item.due} Tk</td>
                  {/* <td>
                    <a
                      className="btn btn-primary btn-sm mr-2"
                      onClick={() => {
                        item?.due > 0 && handleShow()
                        setModalData(item)
                      }}
                    >
                      <i className="fa fa-credit-card"></i>
                    </a>
                  </td> */}
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

      <nav aria-label="Page navigation example mt-5">
        <ul class="pagination">
          {previousPage !== null && (<li
            onClick={() => handlePagination(previousPage)}
            class="page-item cp"><a class="page-link">Previous</a>
          </li>)}
          {(currentPage - 2) > 0 && (<li
            onClick={() => handlePagination(currentPage - 2)}
            class="page-item cp"><a class="page-link">{currentPage - 2}</a>
          </li>)}
          {(currentPage - 1) > 0 && (<li
            onClick={() => handlePagination(currentPage - 1)}
            class="page-item cp"><a class="page-link">{currentPage - 1}</a>
          </li>)}

          {totalPage !== currentPage && (<li
            //  onClick={() => handlePagination(currentPage)}
            class={totalPage !== currentPage ? "page-item cp active" : "page-item cp"}><a class="page-link" href="#">{currentPage}</a>
          </li>)}
          {(currentPage + 1) <= 3 && totalPage > 2 && (<li
            onClick={() => handlePagination(currentPage + 1)}
            class="page-item cp"><a class="page-link">{currentPage + 1}</a>
          </li>)}
          {(currentPage + 2) == 3 && totalPage > 2 && (<li
            onClick={() => handlePagination(currentPage + 1)}
            class="page-item cp"><a class="page-link">{currentPage + 2}</a>
          </li>)}
          {(totalPage - currentPage) > 1 && (<li class="page-item"><a class="page-link">-------</a></li>)}
          <li
            onClick={() => handlePagination(totalPage)}
            class={totalPage === currentPage ? "page-item cp active" : "page-item cp"}><a class="page-link">{totalPage}</a></li>
          {nextPage !== null && (<li
            onClick={() => handlePagination(nextPage)}
            class="page-item cp"><a class="page-link">Next</a>
          </li>)}
        </ul>
      </nav>
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
