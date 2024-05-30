import * as SurveyCore from "survey-core";

export function CameraConfirmationButton(Survey) {
  const componentName = "confirm_camera";
  const activateCamera = {
    // Unique name for the widget
    name: "confirm_camera",

    // Check if the widget applies to the current question
    isFit: (question) => question.name === componentName,
    htmlTemplate:
      "<div>" +
      "<button type='button' id='confirm_camera' class='bg-gw-primary-blue rounded px-8 py-4 mb-5 shadow-lg text-2xl font-extrabold text-white'> Confirm Camera Permissions </button>" +
      "&nbsp;&nbsp;" +
      "</div>",

    afterRender: () => {
      const buttonCustom = document.getElementById("confirm_camera");
      buttonCustom.addEventListener("click", function () {
        // Implement your button's logic here
        if (document.getElementById("GWSECExtensionID")) {
          return console.log("true");
        } else {
          return console.log("false");
        }
      });
    },
  };
  SurveyCore.CustomWidgetCollection.Instance.addCustomWidget(
    activateCamera,
    "myCustomWidget"
  );
}
