
import gwusec_logo from "../assets/gw_monogram_wht_rev.png";

// survey info
import { useState} from "react";
import { Model } from "survey-core";
const storageItemKey = "survey-data";

// cookie
import Cookies from "js-cookie";

// checks if there's an actual survey in storage
async function checkWithdraw() {
  if (window.localStorage.getItem(storageItemKey) == null){
    alert("No survey detected. Please withdraw once you started the survey.");
  }
  else{
    const cDataProlific = Cookies.get("prolificID");
    const cDataTreatment = Cookies.get("treatment");
    const survey = new Model(JSON.parse(window.localStorage.getItem(storageItemKey)));
    const updatedData = survey.data;
    const WD = "true";

    await fetch("/postsurvey", { 
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prolificID: cDataProlific,
        surveyData: updatedData,
        treatment: cDataTreatment,
        withdrawn: WD,
      }),
    });

    survey.setValue('has_withdrawn', 'true');
    survey.doComplete();
    alert("Successfully withdrawn.");
  }
  
}

export default function TopBar() {

  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const handleCloseSurvey = () => setIsSurveyOpen(!isSurveyOpen);
  const handleWithdrawSurvey = () => {
    checkWithdraw();
    handleCloseSurvey();
  };

  return (
    <nav className="bg-gw-primary-blue text-color-white ">
      <div
        id="top-bar"
        className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
      >
        <div className="grid grid-cols-3 gap-4">
          <div className="place-self-center">
            <img src={gwusec_logo} className="max-h-16 p-2"></img>
          </div>
          <div className="place-self-center">
            <span className="text-2xl font-bold underline text-white">
              Exam Proctoring
            </span>
          </div>

        </div>
        <div>
          <div className="bg-dark p-4">
            <h5 className=" card-title text-white h4">
              <strong>Research Study:</strong>{" "}
              <em>Exam Proctoring Software</em>
            </h5>
            <hr></hr>
            <h4 className="text-white h4">
              <strong>Principle Investigator:</strong> Dr. Adam J. Aviv, The
              George Washington University
            </h4>
          </div>
        </div>

        {isSurveyOpen && (
          <div className="bg-dark p-4">
            <div className="">
              <h5 className="card-title text-white text-xl font-bold h4 my-2" id="withdrawDialogBackdropLabel">
                Withdraw from the Survey
              </h5>
            </div>
            <div className="text-white h4 my-2">
              Do you really want to withdraw from the survey?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="buttonSuccess"
                onClick={handleCloseSurvey}
              >
                No, take me back
              </button>
              <button
                type="button"
                className="buttonDanger"
                onClick={handleWithdrawSurvey}
              >
                Yes, I want to withdraw
              </button>
            </div>
          </div>
        )}
        <button className="opt-out" onClick={handleCloseSurvey}>Opt-Out</button>

      </div>
    </nav>
  );
}
