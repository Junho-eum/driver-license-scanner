
import gwusec_logo from "../assets/gw_monogram_wht_rev.png";
// survey info
import { Survey } from "survey-react-ui";
import { useState} from "react";

export default function TopBar() {

  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const handleCloseSurvey = () => setIsSurveyOpen(false);
  const handleWithdrawSurvey = () => {
    alert("Withdrawing from Survey"); // Placeholder for now
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
          <div className="modal">
            <div className="modal-header">
              <h5 className="modal-title" id="withdrawDialogBackdropLabel">
                Withdraw from the Survey
              </h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={handleCloseSurvey}
              >
                {/* Add close icon */}
              </button>
            </div>
            <div className="modal-body">
              Do you really want to withdraw from the survey?
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                onClick={handleCloseSurvey}
              >
                No, take me back
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleWithdrawSurvey}
              >
                Yes, I want to withdraw
              </button>
            </div>
          </div>
        )}
        <button className="opt-out" onClick={() => setIsSurveyOpen(true)}>Opt-Out</button>

      </div>
    </nav>
  );
}
