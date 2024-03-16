import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { ClientDelete, GetClientList, falseClientDeleted } from "../_redux/SellAction";
import { useHistory } from "react-router-dom";
const SellList = () => {
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
      {/* <div className="mt-3">
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
      </div> */}
    </>
  );
};

export default SellList;
