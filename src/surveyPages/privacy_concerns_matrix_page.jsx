const privacy_concerns_matrix_page = {
  name: "privacy_concerns_matrix_page",
  elements: [
    {
      type: "custom-matrix",
      name: "q-privacy-concerns",
      repeatAfterNumberOfItems: 4,
      title:
        "Please think about your experience with online identity proofing. To what extent do you agree or disagree with the following statements?",
      columns: [
        {
          value: 1,
          text: "1 - Strongly disagree",
        },
        {
          value: 2,
          text: "2",
        },
        {
          value: 3,
          text: "3",
        },
        {
          value: 4,
          text: "4",
        },
        {
          value: 5,
          text: "5 - Strongly agree",
        },
      ],
      rows: [
        {
          value: "bothered_personal_info",
          text: "It usually bothers me when identity proofing apps ask for personal information.",
        },
        {
          value: "hesitate_provide_info",
          text: "When identity proofing apps ask me for personal information, I sometimes think twice before providing it.",
        },
        {
          value: "bothers_many_apps",
          text: "It bothers me to give personal information to so many identity proofing apps.",
        },
        {
          value: "concerned_too_much_data",
          text: "I'm concerned that identity proofing apps are collecting too much personal information about me.",
        },
        {
          value: "consumer_control_right",
          text: "User online privacy is really a matter of consumers' right to exercise control and autonomy over decisions about how their information is collected, used, and shared.",
        },
        {
          value: "user_control_privacy",
          text: "User control of personal information lies at the heart of user privacy.",
        },
        {
          value: "privacy_invaded_control_loss",
          text: "I believe that online privacy is invaded when control is lost or unwillingly reduced as a result of an identity proofing process.",
        },
        {
          value: "company_disclosure",
          text: "Companies seeking information online should disclose the way the data is collected, processed, and used.",
        },
        {
          value: "clear_privacy_policy",
          text: "A good user online identity proofing privacy policy should have a clear and conspicuous disclosure.",
        },
        {
          value: "awareness_personal_info_use",
          text: "It is very important to me that I am aware and knowledgeable about how my personal information will be used.",
        },
        {
          type: "radiogroup",
          name: "q-digital-id-influence",
          title:
            "Which factor most influences your decision to use a digital ID for identity proofing?",
          isRequired: true,
          choices: [
            { value: "privacy_concern", text: "Personal privacy concern" },
            { value: "ease_of_use", text: "Ease of use" },
            { value: "familiarity", text: "Familiarity with the method" },
            { value: "security", text: "Security of personal information" },
            { value: "accuracy", text: "Accuracy of the verification method" },
            { value: "trust", text: "Trust in the verification provider" },
          ],
          colCount: 2,
        },
      ],
      alternateRows: true,
      isAllRowRequired: true,
      rowsOrder: "random",
    },
    {
      type: "html",
      name: "exam_next_button",
    },
  ],
};

export default privacy_concerns_matrix_page;
