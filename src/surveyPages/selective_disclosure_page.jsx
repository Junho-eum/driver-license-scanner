const selective_disclosure_page = {
  name: "selective_disclosure_page",
  elements: [
    {
      type: "html",
      name: "consent_text",
      html: `<html><h1 class="text-uppercase" style="font-size:30px;">
                Selective Disclosure in Digital Identity Proofing
                </h1><br><p class="lead"><p>
                Selective data disclosure allows users to share only the necessary personal information for identity proofing. 
                <br><br>
                This study aims to explore your perceptions and willingness to share specific identity attributes in different identity proofing scenarios. 
                <br><br>
                Please answer the following questions based on your personal experiences and opinions.
            </p></html>`,
    },
    {
      type: "checkbox",
      name: "q-info-willing-to-share",
      title:
        "Which of the following information would you be willing to share from your digital identity for identity proofing when purchasing age-restricted goods online (e.g., alcohol)? (Select all that apply)",
      autoGenerate: false,
      isRequired: true,
      choices: [
        "Full name",
        "Photo",
        "Date of birth",
        "Address",
        "ID number",
        "Issuance state",
        "Issuance date",
        "Expiration date",
        "Sex",
        "Height",
        "Weight",
        "Hair color",
        "Eye color",
        "None of the above",
      ],
      colCount: 2,
      showOtherItem: true,
    },
    {
      type: "radiogroup",
      name: "q-level-of-info-sharing",
      title:
        "Would you be willing to share different levels of personal information depending on the purpose of identity proofing?",
      isRequired: true,
      choices: [
        {
          value: "yes",
          text: "Yes, I would be willing to share more information for certain purposes.",
        },
        {
          value: "no",
          text: "No, I would prefer to share the same amount of information in all cases.",
        },
        { value: "not_sure", text: "Not sure." },
      ],
    },
    {
      type: "rating",
      name: "q-influence-of-selective-disclosure",
      title:
        "If the selective data disclosure feature is integrated into digital ID, how strongly would it influence your decision to use digital ID?",
      isRequired: true,
      rateValues: [
        { value: 1, text: "1 - Not influential at all" },
        { value: 2, text: "2" },
        { value: 3, text: "3 - Neutral" },
        { value: 4, text: "4" },
        { value: 5, text: "5 - Very influential" },
      ],
    },
    {
      type: "html",
      name: "exam_next_button",
    },
  ],
};

export default selective_disclosure_page;
