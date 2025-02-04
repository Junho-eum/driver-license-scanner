const consent_page = {

  name: "consent_page",
  elements: [
      {
        type: "html",
        name: "consent_text",
        html: '<html><h1 class="text-uppercase" style="font-size:30px;">This is an example of a consent form embedded as HTML; Participant Informed Consent Form</h1><br>' 
              + '<p class="lead">The following information is provided to inform you about the research project and your participation in it. Your participation in this research study is voluntary. You are free to withdraw from this study at any time prior to submitting the survey. We encourage you to ask the researchers any questions about this study during this process.</p><p>You are being asked to participate in a research study investigating the connection between privacy and exam proctoring software. This page will give you key information to help you decide whether or not you want to participate.</p>'
              + '<br aria-hidden="true"><p>The goal of this research is to measure how users react to privacy risks when taking an online proctored exam.</p>'
              + '<br aria-hidden="true"><h2 style="font-size:25px;"> 1. Who Is Eligible to Participate?</h2>'
              + '<br aria-hidden="true"><p>This study requires the use of a <i>Chrome</i> or <i>Firefox</i> browser on a desktop or laptop computer. You may not participate on a mobile device or tablet, or using a Safari browser. You must be at least 18 years old or older and reside in the US to participate in this study.</p>'
              + '<br aria-hidden="true"><h2 style="font-size:25px;">2. Description of Procedures to Be Followed and Approximate Time Duration Involved for the Participants</h2>'
              + '<br aria-hidden="true"><p>You will be asked to install our exam proctoring tool (a web browser extension) onto your device. Afterward, you will be asked to read a short article and perform a reading comprehension test. This should take approximately 5 minutes and no more than 10 minutes. Finally, you will be asked to complete a survey about your experience using the exam proctoring software, which will take no more than 15 minutes.</p>'
              + '<br aria-hidden="true"><h2 style="font-size:25px;">3. Expected Costs</h2><br aria-hidden="true"><p>There are no costs for your participation.</p>'
              + '<br aria-hidden="true"><h2 style="font-size:25px;">4. Description of the Discomforts, Inconveniences, and/or Risks That Can Be Reasonably Expected as a Result of Participation</h2>'
              + '<br aria-hidden="true"><ul style="list-style-type:disc; margin-left: 5%;"><li>You may feel discomfort experiencing the surveillance measures intended to ensure academic integrity during the test.</li><li>You may experience discomfort when performing the reading comprehension test.</li><li>There is also a risk of loss of confidentiality. We will ensure that your research record is not linked to any personal information, and we will also remove any inadvertent personal information you may include in a long form response. Please do not provide sensitive information in the free text responses, such as full names or passwords.</li></ul>'
              + '<br aria-hidden="true"><h2 style="font-size:25px;">5. Anticipated Benefits From This Study</h2><br aria-hidden="true"><p>You will not receive any direct benefit from this study other than compensation.</p>'
              + '<br aria-hidden="true"><h2 style="font-size:25px;">6. Compensation for Participation</h2><br aria-hidden="true"><p>If you complete the final survey you will be rewarded with $5 dollars. If you complete the survey and answer all reading comprehension questions correctly, you will receive a $25 dollar bonus for a total of $30 dollars.</p>'
              + '<br aria-hidden="true"><h2 style="font-size:25px;">7. Circumstances Under Which the Principal Investigator May Withdraw You From the Study</h5><br aria-hidden="true"><p>You may be withdrawn from the survey if you do not provide relevant information related to your experience using our exam proctoring tool and your experience taking the reading comprehension quiz. Your data will be removed from analysis and you will not be eligible for any reward.</p>'
              + '<br aria-hidden="true"><h2 style="font-size:25px;">8. What Happens if You Choose to Withdraw From the Study</h2><br aria-hidden="true"><p>You may withdraw from the study at any point prior to the final submission. Upon withdrawal your partially completed survey data will be removed and will not be used in the study. If you wish to <b>withdraw</b> from the main study, you need to click the <b>&ldquo;Opt-Out&rdquo;</b> button which will provide instructions for removing the web browser extension. Once removed, you may abandon the survey.</p>'
              + '<br aria-hidden="true"><h2 style="font-size:25px;">9. Contact Information</h2><br aria-hidden="true"><p>This research is being conducted by Dr. Adam J. Aviv in the Computer Science Department at The George Washington University. You may contact Dr. Aviv with any questions or concerns by email <a href="mailto:aaviv@gwu.edu">aaviv@gwu.edu</a> or by phone <a href="tel:+12029946569">202-994-6569</a>. You may also contact the GWU Office of Human Research at <a href="tel:+12029942715">202‐994‐2715</a> or <a href="mailto:ohrirb@gwu.edu">ohrirb@gwu.edu</a> if you have questions or comments regarding your rights as a participant in the research. This research has been reviewed according to the GWU&rsquo;s procedures governing your participation in this research. IRB Approval NCR213523.</p>'
              + '<br aria-hidden="true"><h2 style="font-size:25px;">10. Confidentiality</h2><br aria-hidden="true"><p>All efforts will be made to keep the personal information in your research record private. We will not directly link any personal identifying information with your survey response. However, complete confidentiality cannot be promised. Your information may be shared with the GWU Institutional Review Board. We may use unattributed quotes and aggregate data in research reports in journals or at scientific meetings, but the people who participated in this study will not be named or identified.</p>'
              + '<br aria-hidden="true"><h2 style="font-size:25px;">11. Use of Data in Future Studies</h2><br aria-hidden="true"><p>We will create a publicly available dataset that does not contain identifiable information from you based on the survey responses. This dataset can be used by the research team or shared with other researchers without additional informed consent. This dataset will consist of the answers provided in this survey.</p></html>',
      },
      {
        type: "html",
        name: "consent",
        html:
          `
          <h1 class="text-uppercase" style="font-size:30px;">This is an example of a consent form embedded as PDF;Participant Informed Consent Form</h1>
          <p>Please carefully study the following information. We explain the contents of the study and how we respect your privacy.
          Please feel free to save the PDF to your computer for your personal reference.</p><br>
          <object data="/consent_form.pdf" type="application/pdf" width="100%" height="100%" style="min-height: 1024px;">
            <p>Alternative text - include a link <a href="/consent_form.pdf">to the PDF!</a></p>
          </object>        `
      },
      {
        type: "matrixdropdown",
        name: "informedConsent",
        title: "Please respond to the following statements.",
        hideNumber: true,
        isRequired: true,
        requiredErrorText: "Please answer the following questions.",
        validators: [
          {
            type: "expression",
            text: "Not all requirements for participation are fulfilled.",
            expression:
              "{informedConsent.age.confirmation} = true and {informedConsent.read.confirmation} = true and {informedConsent.participation.confirmation} = true",
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
    ]

};

export default consent_page;