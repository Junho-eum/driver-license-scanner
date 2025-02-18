const ai_usage_page = {
  name: "ai-usage_page",
  elements: [
    {
      type: "html",
      name: "consent_text",
      html: `<html><h1 class="text-uppercase" style="font-size:30px;">
                Online Identity Proofing Experience
                </h1><br><p class="lead"><p>
                Online identity proofing is used to verify a person's identity for various online activities, such as purchasing age-restricted products or accessing certain services. 
                <br><br>
                This study aims to explore your experiences with online identity proofing and understand your perceptions, concerns, and preferences regarding digital identity verification methods.
                <br><br>
                Please answer the following questions based on your personal experiences and opinions.
            </p></html>`,
    },
    {
      type: "checkbox",
      name: "q-digital-id-used",
      title:
        "Which, if any, of the following digital ID applications have you used for online identity proofing? Please check all that apply.",
      autoGenerate: false,
      isRequired: true,
      choices: [
        "ID.me",
        "Yoti",
        "EasyID",
        "Ondato",
        "Junio",
        "Trustmatic",
        "iDentify",
        "Onfido",
        "Veriff",
        "SEON",
        "I have used a digital ID application for identity proofing, but I do not remember which one.",
        "I have not used a digital ID application for identity proofing.",
      ],
      colCount: 2,
      showOtherItem: true,
    },

    {
      type: "checkbox",
      name: "q-digital-id-context",
      title:
        "In which of the following contexts have you used a digital ID application for identity proofing? Please check all that apply.",
      autoGenerate: false,
      isRequired: true,
      choices: [
        "Verifying identity for online banking or financial services",
        "Logging into a government website (e.g., IRS, DMV, Social Security)",
        "Age verification for online purchases (e.g., alcohol, tobacco, restricted content)",
        "Boarding a flight with TSA PreCheck or airport security",
        "Verifying identity for online job applications or background checks",
        "Accessing healthcare or eHealth services",
        "Verifying identity for rental agreements or real estate transactions",
        "Verifying identity at a traffic stop by law enforcement",
        "Registering for or accessing an online service that requires identity verification",
        "No particular task, I just wanted to test the digital ID application",
      ],
      colCount: 2,
      showOtherItem: true,
      choicesOrder: "random",
    },
    {
      type: "radiogroup",
      name: "q-digital-id-reuse",
      title:
        "Would you be willing to use a digital ID application again for identity proofing?",
      isRequired: true,
      choices: [
        { value: "yes", text: "Yes" },
        { value: "no", text: "No" },
      ],
    },
    {
      type: "comment",
      name: "q-digital-id-reuse-reason",
      title:
        "Why would you (or would you not) be willing to use a digital ID application again for identity proofing?",
      isRequired: false,
      placeHolder: "Please describe your reasoning here...",
    },
    {
      type: "html",
      name: "exam_next_button",
    },
  ],
};
  
  export default ai_usage_page;