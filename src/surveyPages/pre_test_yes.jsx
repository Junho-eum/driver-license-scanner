const pre_test_yes = {

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
      ]

}

export default pre_test_yes;