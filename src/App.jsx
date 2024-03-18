import './App.css'
import TopBar from './TopBar'
import 'survey-core/defaultV2.min.css';
import { Survey } from 'survey-react-ui';

import { Model } from 'survey-core';
import surveyJson from './survey';


function App() {
  const survey = new Model(surveyJson);
  
  return (
    <>
    <TopBar />
    <Survey model={survey} />
    </>
  )
}

export default App
