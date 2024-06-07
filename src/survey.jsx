import consent_page from './surveyPages/consent_page.jsx';
import SA6_page from './surveyPages/SA6_page.jsx';
import prequiz_questionaire from './surveyPages/prequiz_questionaire.jsx';
import pre_test_yes from './surveyPages/pre_test_yes.jsx';
import install_extension_page from './surveyPages/install_extension_page.jsx';
import survey_instructions_page from './surveyPages/survey_instructions_page.jsx';
import confirm_camera_page from './surveyPages/confirm_camera_page.jsx';



const surveyJson = {
  completedHtmlOnCondition: [
    {
      expression: "{has_withdrawn} = true",
      html: "<div class=\"container mb-4\"><div class=\"bg-light p-5\"><h4>You have successfully withdrawn from this survey. Thank you for participating!</h4><hr class=\"my-4\"><p class=\"lead\">We will not use your answers. Please return the task in Prolific so that others may take the survey. You may close this browser window now.</p></div></div><surveyjs-feedback-form withdrawn=\"true\"></surveyjs-feedback-form>"
    }
  ],
  pages: [consent_page, SA6_page, prequiz_questionaire, pre_test_yes, install_extension_page, survey_instructions_page, confirm_camera_page],
  sendResultOnPageNext: true,
  showPrevButton: false,
  progressBarType: "pages",
  showQuestionNumbers: "off",
  widthMode: "responsive",
  showNavigationButtons: false,
  clearInvisibleValues: "onHidden",
  renderAs: "standard",
};

export default surveyJson;
