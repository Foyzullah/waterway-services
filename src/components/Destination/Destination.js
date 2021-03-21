import React, { useState } from "react";
import { useParams } from "react-router-dom";
import fakeData from "../../fakeData/fakeData.json";
import gImage from "../../img/p-1.jpg";
import "./Destination.css";

const Destination = () => {
  const [showResult, setShowResult] = useState(false);
  const { id } = useParams();
  console.log("id=", id);
  let selectedService = fakeData.find((service) => service.strId === id);
  const { title, imgUrl, categories } = selectedService;

  console.log(selectedService);

  const handleOnSubmit = (e) => {
    setShowResult(true);
    console.log("submited");
    e.preventDefault();
  };
  return (
    <div className="destination">
      <div className="row">
        <div className="col-md-5">
          <div className="form-section">
            <form action="" onSubmit={handleOnSubmit}>
              <label htmlFor="pickFrom">Pick From</label>
              <br />
              <input
                type="text"
                name="pickFrom"
                id=""
                placeholder="pick from"
                required
              />
              <br />
              <label htmlFor="pickTo">Pick To</label>
              <br />
              <input
                type="text"
                name="pickTo"
                id=""
                placeholder="pick to"
                required
              />
              <br />
              <label htmlFor="pickDate">Pick Date</label>
              <br />
              <input type="date" name="pickDate" id="" required />
              <br />
              <input type="submit" value="Search" />
            </form>
          </div>
          {/* <div>
          {selectedService && <p>Name: {selectedService.categories}</p>}
        </div> */}
          {showResult && <div>{title}</div>}
        </div>
        <div className="col-md-7">
          <div className="google-mp">
            <img src={gImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
