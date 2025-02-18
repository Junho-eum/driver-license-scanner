import consent_page from './surveyPages/consent_page.jsx';
import SA6_page from './surveyPages/SA6_page.jsx';
import example_instructions_page from './surveyPages/example_instructions_page.jsx';
import example_custom_matrix_page from './surveyPages/example_custom_matrix_page.jsx';
import ScannerPage from "./pages/ScannerPage.jsx";
import identity_app_usage_page from "./surveyPages/identity_app_usage_page.jsx";
import privacy_concerns_matrix_page from './surveyPages/privacy_concerns_matrix_page.jsx';
import selective_disclosure_page from './surveyPages/selective_disclosure_page.jsx';
import data_retention_page from './surveyPages/data_retention_page.jsx';
import { data } from 'autoprefixer';

const surveyJson = {
  progressTitle: "Survey Progress",
  progressBarType: "questions",
  completedHtml: "<div class=\"container mb-4\"><div class=\"bg-light p-5\"><h4>Thank you for participating in this survey!</h4><hr class=\"my-4\"><p class=\"lead\">Please click the button below to complete the study and return to Prolific.</p></div></div><surveyjs-feedback-form></surveyjs-feedback-form>",
  completedHtmlOnCondition: [
    {
      expression: "{has_withdrawn} = true",
      html: "<div class=\"container mb-4\"><div class=\"bg-light p-5\"><h4>You have successfully withdrawn from this survey. Thank you for participating!</h4><hr class=\"my-4\"><p class=\"lead\">We will not use your answers. Please return the task in Prolific so that others may take the survey. You may close this browser window now.</p></div></div><surveyjs-feedback-form withdrawn=\"true\"></surveyjs-feedback-form>"
    }
  ],
  // lists all pages in order and SurveyJS renders them in order
  pages: [
    consent_page, 
    // example_instructions_page,
    // identity_app_usage_page,
    // privacy_concerns_matrix_page,
    // selective_disclosure_page,
    // data_retention_page,
    example_custom_matrix_page,
    // example_custom_matrix_page,
    // SA6_page
  ],
  sendResultOnPageNext: true,
  showPrevButton: false,
  showQuestionNumbers: "off",
  widthMode: "responsive",
  showNavigationButtons: false,
  clearInvisibleValues: "onHidden",
  renderAs: "standard",
};

export default surveyJson;
