import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FalseUpdate, SubmitClient, UpdateClientData } from "../_redux/ClientAction";
import { useHistory, useLocation, useParams } from "react-router-dom/cjs/react-router-dom.min";

const UpdateClient = () => {
  const history = useHistory()
  const { id } = useParams()
  const location = useLocation()
  const { name: n, address: ad, phone: p } = location?.state || {}
  const [name, setName] = useState(n);
  const [address, setAddress] = useState(ad);
  const [phone, setPhone] = useState(p);
  const isUpdatedClient = useSelector((state) => state.clientInfo.isUpdatedClient);
  const isUpdateClient = useSelector((state) => state.clientInfo.isUpdateClient);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(UpdateClientData({ name, address, phone, id }));
  };
  useEffect(() => {
    if (isUpdatedClient) {
      setName("")
      setAddress("")
      setPhone("")
      history.push('/client')
      dispatch(FalseUpdate())
    }
  }, [isUpdatedClient])
  useEffect(() => {
    setName(n)
    setAddress(ad)
    setPhone(p)
  }, [location])
  return (
    <>
      <h4 className="txt-align-center">Update Client</h4><hr />
      <div className="row mt-5">
        <div className="col-sm-8">
          <div>
            <h6 className="mb-3">Client Name</h6>
            <input
              className="form-control"
              value={name}
              placeholder="enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Client Address</h6>
            <input
              className="form-control"
              value={address}
              placeholder="enter address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h6 className="mb-3">Client Phone</h6>
            <input
              className="form-control"
              value={phone}
              placeholder="01XXXXXXXXX"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {isUpdateClient ? (
            <a className="btn btn-success btn-sm mt-3 text-light">
              {" "}
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </a>
          ) : (
            <a
              className="btn btn-success btn-sm mt-3 text-light"
              onClick={() => handleSubmit()}
            >
              UPDATE
            </a>
          )}
        </div>
        <div className="col-sm-2"></div>
      </div>
    </>
  );
};

export default UpdateClient;
