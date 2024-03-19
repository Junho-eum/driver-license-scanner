import './App.css'
import TopBar from './TopBar'
import 'survey-core/defaultV2.min.css';
import { Survey } from 'survey-react-ui';

import { Model } from 'survey-core';
import surveyJson from './survey';

// custom widgets
import { CameraConfirmationButton } from "./survey-components/ConfirmCamera";




function App() {
  const survey = new Model(surveyJson);

  // custom widgets
  CameraConfirmationButton(survey);
  
  return (
    <>
    <TopBar />
    <Survey model={survey} />
    </>
  )
}

export default App
