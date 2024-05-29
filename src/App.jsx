// css
import "./App.css";
import "survey-core/defaultV2.min.css";
import gwusec_logo from "./assets/images/gwusec.svg";

// Topbar
import TopBar from "./web-components/TopBar";
import VolumeBar from "./web-components/VolumeBar";

// Cookies
import { useState } from "react";
import Cookies from "js-cookie";

import { useLocation } from 'react-router-dom';

export default function App() {


  var location = useLocation();
  location = (location.search).split("=");
  //console.log(location[1]);


  const [fetchData, setFetchData] = useState("");


  // for disabling button
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getRequest = async () => {
    try {
      const response = await fetch("/postsurvey");
      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }
      const json = await response.json();
      setFetchData(json.treatment);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  getRequest();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // prolific id in url
    const submittedProlificID = e.target.elements.prolificID.value;

    if (submittedProlificID != ""){
      setIsSubmitting(true);

      try {
        // set cookie
        Cookies.set("prolificID", submittedProlificID);
        Cookies.set("treatment", fetchData);
  
        // Redirect to the survey
        window.location.href = "/survey";
      } catch (error) {
        console.error("Error setting cookie:", error);
        // Handle any errors setting the cookie
      }

    }
    else {
      alert("Requires Prolific ID.")
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <TopBar />
      <div>
        <div className="px-4 py-5 my-5 text-center">
          <img
            className="mx-auto mb-4"
            src={gwusec_logo}
            alt=""
            width="72"
            height="57"
          ></img>
          <h1 className="display-5 fw-bold">Welcome to our Survey</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              When you are ready please click the button below to start.
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="id"
              >
                Prolific ID
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="id"
                name="prolificID"
                value={location[1]}
                readOnly
              />
            </div>
            <br />
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <button
                type="submit"
                className="bg-gw-primary-blue rounded px-8 py-4 mb-5 shadow-lg text-2xl font-extrabold text-white"
                disabled={isSubmitting}
              >
                Start Survey
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
