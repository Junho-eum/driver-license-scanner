import * as SurveyCore from "survey-core";

export function ExamConfirmationButton(Survey) {
  const componentName = "confirm-exam";
  const checkExtensionID = {
    // Unique name for /the widget
    name: "confirm-exam",

    // Check if the widget applies to the current question
    isFit: (question) => question.name === componentName,
    htmlTemplate:
      "<div>" +
      "<button type='button' id='confirm_buttom' class='bg-gw-primary-blue rounded px-8 py-4 mb-5 shadow-lg text-2xl font-extrabold text-white focus:outline-none focus:ring focus:ring-red-500'> Confirm Installation </button>" +
      "&nbsp;&nbsp;" +
      "</div>",

    // Render the widget after DOM element is created
    afterRender: () => {
      const buttonCustom = document.getElementById("confirm_buttom");
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
    checkExtensionID,
    "myCustomWidget"
  );
}
