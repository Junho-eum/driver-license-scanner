const data_retention_page = {
  name: "data_retention_page",
  title: "Data Retention",
  elements: [
    {
      type: "html",
      name: "consent_text",
      html: `<html><h1 class="text-uppercase" style="font-size:30px;">
                Data Retention in Digital Identity Proofing
                </h1><br><p class="lead"><p>
                Data retention policies in identity proofing services determine how long your personal data is stored after verification.  
                <br><br>
                This section explores your perceptions, concerns, and preferences regarding data retention in digital identity proofing.  
                <br><br>
                Please answer the following questions based on your personal experiences and opinions.
            </p></html>`,
    },
    {
      type: "rating",
      name: "q-data-storage-comfort",
      title:
        "Would you be comfortable with identity proofing requesters storing some of your identity data for future verification?",
      isRequired: true,
      rateValues: [
        { value: 1, text: "1 - Very uncomfortable" },
        { value: 2, text: "2 - Slightly uncomfortable" },
        { value: 3, text: "3 - Neutral" },
        { value: 4, text: "4 - Slightly comfortable" },
        { value: 5, text: "5 - Very comfortable" },
      ],
    },
    {
      type: "checkbox",
      name: "q-data-types-stored",
      title:
        "What types of personal information would you allow to be stored by identity proofing requesters? (Select all that apply)",
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
      name: "q-concern-about-data-retention",
      title:
        "How concerned are you about how long identity proofing requesters retain your personal information?",
      isRequired: true,
      choices: [
        { value: "not_concerned", text: "Not concerned at all" },
        { value: "slightly_concerned", text: "Slightly concerned" },
        { value: "somewhat_concerned", text: "Somewhat concerned" },
        { value: "moderately_concerned", text: "Moderately concerned" },
        { value: "extremely_concerned", text: "Extremely concerned" },
      ],
    },
    {
      type: "custom-matrix",
      name: "q-data-retention-attitudes",
      title:
        "To what extent do you agree or disagree with the following statements regarding data retention?",
      isAllRowRequired: true,
      columns: [
        { value: 1, text: "1 - Strongly disagree" },
        { value: 2, text: "2 - Somewhat disagree" },
        { value: 3, text: "3 - Neutral" },
        { value: 4, text: "4 - Somewhat agree" },
        { value: 5, text: "5 - Strongly agree" },
      ],
      rows: [
        {
          value: "clear_retention_policies",
          text: "I am more likely to use an identity proofing app if it clearly states how long my data will be retained.",
        },
        {
          value: "auto_delete_after_verification",
          text: "Identity proofing apps should automatically delete my data after a verification process is completed.",
        },
        {
          value: "user_control_data_storage",
          text: "I prefer using identity proofing apps that allow me to control how long my data is stored.",
        },
        {
          value: "explicit_consent_required",
          text: "Companies should require explicit consent before retaining my data for an extended period.",
        },
        {
          value: "worry_about_long_retention",
          text: "The longer a company retains my personal data, the more I worry about potential misuse.",
        },
      ],
      alternateRows: true,
      rowsOrder: "random",
    },
    {
      type: "radiogroup",
      name: "q-preferred-data-retention-policy",
      title:
        "What is your preferred data retention policy for identity proofing apps?",
      isRequired: true,
      choices: [
        {
          value: "delete_immediately",
          text: "Data should be deleted immediately after verification.",
        },
        {
          value: "delete_24_hours",
          text: "Data should be deleted within 24 hours.",
        },
        {
          value: "delete_one_week",
          text: "Data should be deleted within a week.",
        },
        {
          value: "long_term_secure",
          text: "I don’t mind long-term retention as long as my data is secure.",
        },
      ],
    },
    {
      type: "radiogroup",
      name: "q-customization-influence",
      title:
        "Would the ability to customize how long your personal data is stored influence your willingness to use a digital ID app?",
      isRequired: true,
      choices: [
        { value: "yes", text: "Yes, it would make me more likely to use it." },
        { value: "no", text: "No, it wouldn’t affect my decision." },
        { value: "not_sure", text: "I don’t know." },
      ],
    },
    {
      type: "html",
      name: "exam_next_button",
    },
  ],
};

export default data_retention_page;
