//images
//import { extension } from "../assets/images/extension.png";
const surveyJson = {
  completedHtml: "<div class=\"container mb-4\"><div class=\"bg-light p-5\"><h4>Thank you for participating in this survey!</h4><hr class=\"my-4\"><p class=\"lead\">Please click the button below to complete the study and return to Prolific.</p></div></div><surveyjs-feedback-form></surveyjs-feedback-form>",
  completedHtmlOnCondition: [
    {
      expression: "{has_withdrawn} = true",
      html: "<div class=\"container mb-4\"><div class=\"bg-light p-5\"><h4>You have successfully withdrawn from this survey. Thank you for participating!</h4><hr class=\"my-4\"><p class=\"lead\">We will not use your answers. Please return the task in Prolific so that others may take the survey. You may close this browser window now.</p></div></div><surveyjs-feedback-form withdrawn=\"true\"></surveyjs-feedback-form>"
    }
  ],
  pages: [
    {
      name: "consent_page",
      elements: [
        {
          type: "html",
          name: "consent_text",
          html: '<html><h4 class="text-uppercase">Participant Informed Consent Form</h4><p class="lead">The following information is provided to inform you about the research project and your participation in it. Your participation in this research study is voluntary. You are free to withdraw from this study at any time prior to submitting the survey. We encourage you to ask the researchers any questions about this study during this process.</p><p>You are being asked to participate in a research study investigating the connection between privacy and exam proctoring software. This page will give you key information to help you decide whether or not you want to participate. </p><p>The goal of this research is to measure how users react to privacy risks when taking an online proctored exam.</p> <h5>2. Who Is Eligible to Participate?</h5><p>This study requires the use of a <i>Chrome</i> or <i>Firefox</i> browser on a desktop or laptop computer. You may not participate on a mobile device or tablet, or using a Safari browser.</p><p>You must be at least 18 years old or older and reside in the US to participate in this study.</p><h5>3. Description of Procedures to Be Followed and Approximate Time Duration Involved for the Participants</h5><p>You will be asked to install our exam proctoring tool (a web browser extension) onto your device. Afterward, you will be asked to read a short article and perform a reading comprehension test. This should take approximately 5 minutes and no more than 10 minutes. Finally, you will be asked to complete a survey about your experience using the exam proctoring software, which will take no more than 15 minutes.</p><h5>4. Expected Costs</h5><p>There are no costs for your participation.</p> <h5>5. Description of the Discomforts, Inconveniences, and/or Risks That Can Be Reasonably Expected as a Result of Participation</h5><p>You may feel discomfort experiencing the surveillance measures intended to ensure academic integrity during the test.</p><p>You may experience discomfort when performing the reading comprehension test.</p><p>There is also a risk of loss of confidentiality. We will ensure that your research record is not linked to any personal information, and we will also remove any inadvertent personal information you may include in a long form response. Please do not provide sensitive information in the free text responses, such as full names or passwords.</p><h5>6. Anticipated Benefits From This Study</h5><p>You will not receive any direct benefit from this study other than compensation.</p><h5>7. Compensation for Participation</h5><p>If you complete the final survey you will be rewarded with $5 dollars. If you complete the survey and answer all reading comprehension questions correctly, you will receive a $25 dollar bonus for a total of $30 dollars. </p><h5>8. Circumstances Under Which the Principal Investigator May Withdraw You From the Study</h5><p>You may be withdrawn from the survey if you do not provide relevant information related to your experience using our exam proctoring tool and your experience taking the reading comprehension quiz. Your data will be removed from analysis and you will not be eligible for any reward.</p><h5>9. What Happens if You Choose to Withdraw From the Study</h5><p>You may withdraw from the study at any point prior to the final submission. Upon withdrawal your partially completed survey data will be removed and will not be used in the study.</p><p>If you wish to withdraw from the main study, you need to click the &ldquo;Opt-Out&rdquo; button which will provide instructions for removing the web browser extension. Once removed, you may abandon the survey.</p><h5>10. Contact Information</h5><p>This research is being conducted by Dr. Adam J. Aviv in the Computer Science Department at The George Washington University. You may contact Dr. Aviv with any questions or concerns by email <a href="mailto:aaviv@gwu.edu">aaviv@gwu.edu</a> or by phone <a href="tel:+12029946569">202-994-6569</a>.</p><p>You may also contact the GWU Office of Human Research at <a href="tel:+12029942715">202‐994‐2715</a> or <a href="mailto:ohrirb@gwu.edu">ohrirb@gwu.edu</a> if you have questions or comments regarding your rights as a participant in the research.</p><p>This research has been reviewed according to the GWU&rsquo;s procedures governing your participation in this research. IRB Approval NCR213523.</p><h5>11. Confidentiality</h5><p>All efforts will be made to keep the personal information in your research record private. We will not directly link any personal identifying information with your survey response. However, complete confidentiality cannot be promised. Your information may be shared with the GWU Institutional Review Board.</p><p>We may use unattributed quotes and aggregate data in research reports in journals or at scientific meetings, but the people who participated in this study will not be named or identified.</p><h5>12. Use of Data in Future Studies</h5><p>We will create a publicly available dataset that does not contain identifiable information from you based on the survey responses. This dataset can be used by the research team or shared with other researchers without additional informed consent. This dataset will consist of the answers provided in this survey.</p></html>',
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
        {
          type: "html",
          name: "exam_next_button",
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
        {
          type: "html",
          name: "exam_next_button",
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
        {
          type: "html",
          name: "exam_next_button",
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
        {
          type: "html",
          name: "exam_next_button",
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
          name: "confirm-exam",
        },
        {
          type: "html",
          name: "exam_next_button",
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
        {
          type: "html",
          name: "exam_next_button",
        },
      ],
    },
    {
      name: "confirm_camera_page",
      elements: [
        {
          type: "html",
          name: "confirm_camera",
          html: "<div><camera-start></camera-start></div>",
        },
        {
          type: "html",
          name: "exam_next_button",
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
  showNavigationButtons: false,
  clearInvisibleValues: "onHidden",
  renderAs: "standard",
};

export default surveyJson;
