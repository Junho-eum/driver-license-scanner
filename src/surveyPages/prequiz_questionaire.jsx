const prequiz_questionaire = {

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
      ]

}

export default prequiz_questionaire;