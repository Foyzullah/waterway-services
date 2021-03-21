import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserFriends } from "@fortawesome/free-solid-svg-icons";
import fakeData from "../../fakeData/fakeData.json";
import mapImage from "../../img/Map.png";
import "./Destination.css";

const Destination = () => {
  const [loggedInClient, setLoggedInClient] = useContext(UserContext);
  console.log(loggedInClient);
  const [showResult, setShowResult] = useState(false);
  const { id } = useParams();
  let selectedService = fakeData.find((service) => service.strId === id);
  const { title, imgUrl, categories } = selectedService;

  const handleOnSubmit = (e) => {
    setShowResult(true);
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

            {/* Search Resul section  */}
            {showResult && (
              <div>
                <ul className="search-result">
                  <li>
                    <img src={imgUrl} alt="" />
                  </li>
                  <li>{title}</li>
                  <li>
                    <FontAwesomeIcon
                      className="icon-inner"
                      icon={faUserFriends}
                    />
                    {categories.regular.person}
                  </li>
                  <li>{categories.regular.price}</li>
                </ul>
                <ul className="search-result">
                  <li>
                    <img src={imgUrl} alt="" />
                  </li>
                  <li>{title}</li>
                  <li>
                    <FontAwesomeIcon
                      className="icon-inner"
                      icon={faUserFriends}
                    />
                    {categories.family.person}
                  </li>
                  <li>{categories.family.price}</li>
                </ul>
                <ul className="search-result">
                  <li>
                    <img src={imgUrl} alt="" />
                  </li>
                  <li>{title}</li>
                  <li>
                    <FontAwesomeIcon
                      className="icon-inner"
                      icon={faUserFriends}
                    />
                    {categories.friends.person}
                  </li>
                  <li>{categories.friends.price}</li>
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-7">
          <div className="google-mp">
            <img src={mapImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination;
