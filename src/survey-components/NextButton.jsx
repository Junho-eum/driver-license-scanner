import * as SurveyCore from 'survey-core';

export function ExamNextButton(Survey) {
  const componentName = "examnextbutton";
  const activateCamera = {
    // Unique name for the widget
    name: "examnextbutton",

    // Check if the widget applies to the current question
    isFit: (question) => question.name === componentName,
    htmlTemplate:
      "<div style='height: 39px'>" +
      "<button type='button' id='request_camera_permission' class='bg-gw-primary-blue rounded px-8 py-4 mb-5 shadow-lg text-2xl font-extrabold text-white'> Confirm Camera Permissions </button>" +
      "&nbsp;&nbsp;" +
      "</div>",
  };
  SurveyCore.CustomWidgetCollection.Instance.addCustomWidget(
    activateCamera,
    "myCustomWidget"
  );
}
