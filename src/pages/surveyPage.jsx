// survey info
import { Survey } from "survey-react-ui";
import { Model } from "survey-core";
import surveyJson from "../survey";
import {useRef, useState } from "react";

// cookie
import Cookies from "js-cookie";

// other components
import TopBar from "../web-components/TopBar";

// custom widgets
import { ExamConfirmationButton } from "../survey-components/ExamConfirmationButton";
import { ExamNextButton } from "../survey-components/NextButton";

// good resource: https://github.com/mongodb-developer/mern-stack-example/

const storageItemKey = "survey-data";
const currentDate = Date();
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
      startDate: currentDate,
      withdrawn: WD,
      feedback: "",
    }),
  });
}

const OptOutButton = ({ surveyRef, handleWithdrawSurvey }) => {
  const [isSurveyOpen, setIsSurveyOpen] = useState(false);
  const handleCloseSurvey = () => {
    
    localStorage.setItem("finished","true");
    setIsSurveyOpen(!isSurveyOpen);

  };

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


// this function checks the expire time of the data
function getWithExpiry() {

	const itemStr = localStorage.getItem("expire-time")
	const item = JSON.parse(itemStr);
	const now = new Date();

	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		localStorage.removeItem("survey-data");
    localStorage.removeItem("expire-date");
		window.location.href = window.history.back();
	}
}
function checkStorage(){
  const itemStr = localStorage.getItem("expire-time");
  if ( itemStr == null) {
    window.location.href = window.history.back();
  }
}


export default function SurveyPage() {
  
  // check if we have storage
  checkStorage();
  // check if we're expired
  getWithExpiry();
  
  var survey = new Model(surveyJson);
  survey.onValueChanged.add(saveSurveyData);
  survey.onCurrentPageChanged.add(saveSurveyData);

  // custom widgets
  ExamConfirmationButton(survey);
  ExamNextButton(survey);

  // Restore survey results
  const prevData = window.localStorage.getItem(storageItemKey);
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
    updatedData.pageNo = survey.currentPageNo;
    const WD = "true";
    
    SendToServer(updatedData, cDataProlific, cDataTreatment, WD);
    window.location.href = "/end";
  };

  survey.onCurrentPageChanged.add( async (survey) => {
      const cDataProlific = Cookies.get("prolificID");
      const cDataTreatment = Cookies.get("treatment");
      const updatedData = survey.data;
      updatedData.pageNo = survey.currentPageNo;
      const WD = "false";
      
      SendToServer(updatedData, cDataProlific, cDataTreatment, WD);
      getWithExpiry();
      
    });

    // gotta do it this way to actually send to the survey, yes it's annoying
    survey.onComplete.add (async (survey) => {
        const cDataProlific = Cookies.get("prolificID");
        const cDataTreatment = Cookies.get("treatment");
        const updatedData = survey.data;
        const WD = "false";
      
        SendToServer(updatedData, cDataProlific, cDataTreatment, WD);

        console.log("Survey is on the last page!");
        window.location.href = "/end";
      });

    const surveyRef = useRef(survey);

  return (
    <>
      <div>
        <TopBar />
        <div className="static">
          <OptOutButton surveyRef={surveyRef} handleWithdrawSurvey={handleWithdrawSurvey} />
        </div>
      </div>
      <Survey className="container mx-auto my-auto" model={survey} ref={surveyRef} />
    </>
  );
}