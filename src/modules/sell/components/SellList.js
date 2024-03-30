import React, { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useHistory } from "react-router-dom";
import { GetSellList, SellDelete, falseSellDeleted } from "../_redux/SellAction";
import moment from 'moment'
const SellList = () => {
  const [modalShow, setModalShow] = useState(false);
  const ref = createRef();
  const history = useHistory();
  const SellArrList = useSelector(
    (state) => state.sellInfo.sellList
  );
  const sellDeleted = useSelector(
    (state) => state.sellInfo.sellDeleted
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetSellList());
  }, []);
  useEffect(() => {
    if (sellDeleted) {
      dispatch(falseSellDeleted());
    }
  }, [sellDeleted]);
  const handleDelete = (id) => {
    confirmAlert({
      title: "Confirm To Delete",
      message: `Are you sure to delete this Client?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(SellDelete(id)),
        },
        {
          label: "No",
        },
      ],
    });
  };

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
        {SellArrList != null && SellArrList.length > 0 && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>SL</th>
                <th>Name</th>
                <th>Sell At</th>
                <th>Total Pay</th>
                <th>Current Due</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {SellArrList.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.clientInfo?.name}</td>
                  <td>{moment(item?.sellingDate).format('lll')}</td>
                  <td>{item.pay}</td>
                  <td>{item.currentDue}</td>
                  <td>
                    <a
                      className="btn btn-success btn-sm mr-2"
                      onClick={() => history.push({
                        pathname: '/download',
                        state: { data: item }
                      })}
                    >
                      <i className="fa fa-eye"></i>
                    </a>
                    {/* <a
                      className="btn btn-primary btn-sm mr-2"
                      onClick={() => handleDownLoad(item._id)}
                    >
                      <i className="fa fa-file-pdf-o"></i>
                    </a> */}
                    {/* <a
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(item._id)}
                    >
                      <i className="fa fa-trash"></i>
                    </a> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

    </>
  );
};

export default SellList;
