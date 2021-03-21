import React from "react";
import { useHistory } from "react-router-dom";
import "./Service.css";

const Service = (props) => {
  const { title, strId, imgUrl } = props.service;

  const history = useHistory();
  const handleOnClick = (id) => {
    const url = `/${id}`;
    history.push(url);
  };
  return (
    <div className="col-md-3">
      <div onClick={() => handleOnClick(strId)} className="single-service">
        <img src={imgUrl} alt="" />
        <h4>{title}</h4>
      </div>
    </div>
  );
};

export default Service;
