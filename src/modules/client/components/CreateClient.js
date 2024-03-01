import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SubmitClient } from "../_redux/ClientAction";

const CreateClient = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const isClient = useSelector((state) => state.clientInfo.isClient);
  const isSuccess = useSelector((state) => state.clientInfo.isSuccess);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(SubmitClient({ name, address, phone }));
  };
  useEffect(() => {
    if (!isClient) {
      setName("")
      setAddress("")
      setPhone("")
    }
  }, [isClient])

  return (
    <>
      <div className="row">
        <div className="col-sm-2"></div>
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
          {isClient ? (
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
              SUBMIT
            </a>
          )}
        </div>
        <div className="col-sm-2"></div>
      </div>
    </>
  );
};

export default CreateClient;
