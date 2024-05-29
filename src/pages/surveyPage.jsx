// survey info
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import surveyJson from "../survey";
import {useRef, useState } from "react";

// cookie
import Cookies from "js-cookie";

// other components
import TopBar from "../web-components/TopBar";
//import Webcam from "react-webcam";
//import CameraBox from "../web-components/CameraBox";

// custom widgets
import { CameraConfirmationButton } from "../survey-components/ConfirmCamera";
import { ExamConfirmationButton } from "../survey-components/ExamConfirmationButton";
import { ExamNextButton } from "../survey-components/NextButton";

// good resource: https://github.com/mongodb-developer/mern-stack-example/

const storageItemKey = "survey-data";
function saveSurveyData(survey) {
  const data = survey.data;
  data.pageNo = survey.currentPageNo;
  window.localStorage.setItem(storageItemKey, JSON.stringify(data));
}


async function SendToServer(surveyData, prolific, T, WD){

  await fetch("/postsurvey", { 
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prolificID: prolific,
      surveyData: surveyData,
      treatment: T,
      withdrawn: WD,
    }),
  });
}

const OptOutButton = ({ surveyRef, handleWithdrawSurvey }) => {
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const handleCloseSurvey = () => setIsSurveyOpen(!isSurveyOpen);

  return (
    <nav >
      <div className="topnav"> 
        <div className="topnav-right">
          {isSurveyOpen && (
            <div  className="bg-dark p-4">
              <div>
                <h5
                  className="card-title text-black text-xl font-bold h4 my-2"
                  id="withdrawDialogBackdropLabel"
                >
                  Withdraw from the Survey
                </h5>
              </div>
              <div 
                className="text-black h4 my-2">
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
                  onClick={() => {
                    handleCloseSurvey();
                    handleWithdrawSurvey(); // Call the callback function passed as a prop
                  }}
                >
                  Yes, I want to withdraw
                </button>
              </div>
            </div>
          )}
          <button style={{  marginTop: '1%'}} className="opt-out" onClick={handleCloseSurvey}>
            Opt-Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default function SurveyPage() {
  const survey = new Model(surveyJson);
  survey.onValueChanged.add(saveSurveyData);
  survey.onCurrentPageChanged.add(saveSurveyData);

  // custom widgets
  ExamConfirmationButton(survey);
  CameraConfirmationButton(survey);
  ExamNextButton(survey);

  // Restore survey results
  const prevData = window.localStorage.getItem(storageItemKey) || null;
  if (prevData) {
    const data = JSON.parse(prevData);
    survey.data = data;
    if (data.pageNo) {
      survey.currentPageNo = data.pageNo;
    }
  }

  const handleWithdrawSurvey = () => {
    const cDataProlific = Cookies.get("prolificID");
      const cDataTreatment = Cookies.get("treatment");
      const updatedData = survey.data;
      const WD = "true";
      
      SendToServer(updatedData, cDataProlific, cDataTreatment, WD);
    survey.doComplete();
  };

  //AJA: moved this to a direct call back function -- also maybe we save results only on next?
  survey.onValueChanged.add( async (survey, { name, question, value }) => {
      const cDataProlific = Cookies.get("prolificID");
      const cDataTreatment = Cookies.get("treatment");
      const updatedData = survey.data;
      const WD = "false";
      
      SendToServer(updatedData, cDataProlific, cDataTreatment, WD);
      
    });


    const surveyRef = useRef(survey);
  // <CameraBox />
  // <div className="ml-56">
  //</div>
  return (
    <>
      <div>
        <TopBar />
        <div className="static">
          <OptOutButton surveyRef={surveyRef} handleWithdrawSurvey={handleWithdrawSurvey} />
        </div>
      </div>
      <Survey model={survey} ref={surveyRef} />
    </>
  );
}