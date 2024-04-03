//images
//import { extension } from "../assets/images/extension.png";

//AJA: We can probably read in HTML from some other page instead of having to embed it into the this giant JSON


const consentHTML = require("./assets/html/consent.html");

const surveyJson =  {
  pages: [
    {
      name: "consent_page",
      elements: [
        {
          type: "html",
          name: "consent_text",
          html: consentHTML,
        },
        {
          type: "matrixdropdown",
          name: "informed_consent",
          title: "Statement by person agreeing to participate in this study",
          hideNumber: true,
          isRequired: true,
          requiredErrorText: "Please answer the following questions.",
          validators: [
            {
              type: "expression",
              text: "Not all requirements for participation are fulfilled.",
              expression:
                "{informed_consent.age.confirmation} = true and {informed_consent.read.confirmation} = true and {informed_consent.participation.confirmation} = true",
            },
          ],
          showHeader: false,
          columns: [
            {
              name: "confirmation",
            },
          ],
          cellType: "boolean",
          rows: [
            {
              value: "age",
              text: "I am 18 years of age, or older",
            },
            {
              value: "read",
              text: "I have read and understand the informed consent",
            },
            {
              value: "participation",
              text: "I consent to participate in the research",
            },
          ],
        },
      ],
    },
    {
      name: "SA-6_page",
      elements: [
        {
          type: "html",
          name: "consent_text",
          html: '<html><h4 class="text-uppercase">Security Assessment</h4><p class="lead"><p>Before taking part in the initial survey, we will ask you questions about your security attitudes and practices. Please rate the following questions based on how much you agree with them.</p></html>',
        },
        {
          type: "radiogroup",
          name: "SA-6.1",
          title:
            "I seek out opportunities to learn about security measures that are relevant to me.",
          autoGenerate: false,
          isRequired: true,
          choices: [
            {
              value: 1,
              text: "Strongly Disagree",
            },
            {
              value: 2,
              text: "Disagree",
            },
            {
              value: 3,
              text: "Neither Agree or Disagree",
            },
            {
              value: 4,
              text: "Agree",
            },
            {
              value: 5,
              text: "Strongly Agree",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "SA-6.2",
          title:
            "I am extremely motivated to take all the steps needed to keep my online data and accounts safe.",
          autoGenerate: false,
          isRequired: true,
          choices: [
            {
              value: 1,
              text: "Strongly Disagree",
            },
            {
              value: 2,
              text: "Disagree",
            },
            {
              value: 3,
              text: "Neither Agree or Disagree",
            },
            {
              value: 4,
              text: "Agree",
            },
            {
              value: 5,
              text: "Strongly Agree",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "SA-6.3",
          title:
            "Generally, I diligently follow a routine about security practices.",
          autoGenerate: false,
          isRequired: true,
          choices: [
            {
              value: 1,
              text: "Strongly Disagree",
            },
            {
              value: 2,
              text: "Disagree",
            },
            {
              value: 3,
              text: "Neither Agree or Disagree",
            },
            {
              value: 4,
              text: "Agree",
            },
            {
              value: 5,
              text: "Strongly Agree",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "SA-6.4",
          title: "I often am interested in articles about security threats.",
          autoGenerate: false,
          isRequired: true,
          choices: [
            {
              value: 1,
              text: "Strongly Disagree",
            },
            {
              value: 2,
              text: "Disagree",
            },
            {
              value: 3,
              text: "Neither Agree or Disagree",
            },
            {
              value: 4,
              text: "Agree",
            },
            {
              value: 5,
              text: "Strongly Agree",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "SA-6.5",
          title:
            "I always pay attention to experts' advice about the steps I need to take to keep my online data and accounts safe.",
          autoGenerate: false,
          isRequired: true,
          choices: [
            {
              value: 1,
              text: "Strongly Disagree",
            },
            {
              value: 2,
              text: "Disagree",
            },
            {
              value: 3,
              text: "Neither Agree or Disagree",
            },
            {
              value: 4,
              text: "Agree",
            },
            {
              value: 5,
              text: "Strongly Agree",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "SA-6.6",
          title:
            "I am extremely knowledgeable about all the steps needed to keep my online data and accounts safe.",
          autoGenerate: false,
          isRequired: true,
          choices: [
            {
              value: 1,
              text: "Strongly Disagree",
            },
            {
              value: 2,
              text: "Disagree",
            },
            {
              value: 3,
              text: "Neither Agree or Disagree",
            },
            {
              value: 4,
              text: "Agree",
            },
            {
              value: 5,
              text: "Strongly Agree",
            },
          ],
        },
      ],
    },
    {
      name: "pre-quiz questionaire",
      elements: [
        {
          type: "html",
          name: "questionaire_text",
          html: '<html><h5 class="text-uppercase">Please read the paragraph below</h5><p class="lead"><p>In this survey, when we use the term “online exam proctoring”, we refer to a number of methods used to monitor individuals taking an exam, or other assignments online, to ensure academic integrity. For example, this would include the use of specialized software during an exam that monitors your computer activity, views/records you through a webcam, performs screen-share, microphone/sound monitoring, room scans, or through the use of automated software that is used to detect academic dishonesty.</p><p>There are a few companies providing these products, such as ProctorU and Respondus, that use dedicated software installed on your computer or via a web browser. Online exam proctoring can also occur via video conferencing applications (such as Zoom, WebEx, or Microsoft Teams).</p></html>',
        },
        {
          type: "radiogroup",
          name: "Q1",
          title:
            "Given the description above, how familiar are you personally with online proctoring technology?",
          autoGenerate: false,
          isRequired: true,
          choices: [
            {
              value: 1,
              text: "No familiarity at all",
            },
            {
              value: 2,
              text: "Slightly familiar",
            },
            {
              value: 3,
              text: "Somewhat familiar",
            },
            {
              value: 4,
              text: "Moderately familiar",
            },
            {
              value: 5,
              text: "Extremely familiar",
            },
          ],
        },
        {
          type: "radiogroup",
          name: "Q2",
          isRequired: true,
          title:
            "Based on the description above, have you taken an online proctored exam or assessment?",
          choices: ["Yes", "No", "Unsure"],
        },
      ],
    },
    {
      name: "pre_test_yes",
      visibleIf: "{Q2} == 'Yes' || {Q2} == 'Unsure' ",
      elements: [
        {
          type: "checkbox",
          name: "Q3",
          title:
            "What exam proctoring software did you use? This can include software that was used to host a proctored exam, such as Zoom or Microsoft Teams.",
          isRequired: true,
          hasOther: true,
          choices: [
            "ProctorU",
            "Respondus",
            "Honorlock",
            "Examity",
            "Video conferencing software (Zoom, Microsoft Teams, etc.)",
            "Unsure",
          ],
        },
        {
          type: "radiogroup",
          name: "Q4",
          isRequired: true,
          title: "How many online proctored exams have you taken?",
          choices: ["1", "2", "3", "4", "5+"],
        },
        {
          type: "radiogroup",
          name: "Q5",
          title:
            "What was the nature of the exam(s) you took using an online proctoring service?",
          isRequired: true,
          hasOther: true,
          choices: [
            "Class assessment (e.g. quiz, test, midterm exam, final exam)",
            "Standardized test (e.g. GRE, GMAT, bar exam)",
          ],
        },
        {
          type: "checkbox",
          name: "Q6",
          title:
            "What security measures were implemented in your previous online exams?",
          hasOther: true,
          isRequired: true,
          choices: [
            "Environment scan",
            "ID scan",
            "Active webcam",
            "Active audio",
            "Live proctor",
            "Tab control",
          ],
        },
        {
          type: "radiogroup",
          name: "Q7",
          title:
            "Have you been accused of cheating by exam proctoring software? The answer to this question doesn’t affect your payment or participation.",
          isRequired: true,
          choices: ["Yes", "No", "Prefer not to answer"],
        },
      ],
    },
    {
      name: "install_extension_page",
      elements: [
        {
          type: "html",
          name: "install_instructions",
          html: '<html><h4 class="text-uppercase">Extension Installation</h4><br><br>In order to begin this survey, you must first install our <a href ="google.com">exam proctoring browser extension.</a> This extension is required to prevent participants from cheating. It will do the following to prevent cheating: <ul> <li>Close all open Chrome tabs/windows except for the survey tab</li> <li>Prevent new Chrome tabs/windows from being opened</li> <li>Monitor the participant\'s webcam during the testing time</li> <li>Monitor the participant\'s audio during the testing time</li> </ul> After installing this extension, please refresh this page and click the Confirm Installation button. The extension can be uninstalled after the survey is complete. Once the extension has been installed, please open the <a href="chrome://extensions/">Google Chrome Extensions window</a> and activate the extension as shown below. <br><em> Please note: activating the extension will immediately close all open Chrome tabs/windows except for the test-taking site.</em> <br><br> &emsp;After the extension has been activated, confirm its installation by clicking the button below.<br><br>',
        },
        {
          type: "html",
          name: "camera",
        },
      ],
    },
    {
      name: "survey_instructions_page",
      elements: [
        {
          type: "html",
          name: "survey_instructions",
          html: '<div><h4>Thank you for your interest in our survey.</h4><p class="lead">Your answers are important to us!</p><hr class="my-4"><p>Please read the following instructions carefully:</p><ul><li>Take your time in reading and answering the questions.</li><li>Answer the questions as accurately as possible.</li><li>It is okay to say that you don’t know an answer.</li><li>Some questions asked for estimations, so it’s okay to guess if you don’t know the exact answer.</li></ul>\n</div>',
        },
      ],
    },
  ],
  sendResultOnPageNext: true,
  showPrevButton: false,
  progressBarType: "pages",
  showProgressBar: "bottom",
  showQuestionNumbers: "off",
  widthMode: "responsive",
  showNavigationButtons: true,
  clearInvisibleValues: "onHidden",
  renderAs: "standard",
};

export default surveyJson;