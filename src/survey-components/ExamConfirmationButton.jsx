import { default as surveyCore } from "survey-core";

export function ExamConfirmationButton(Survey) {
  const componentName = "custombutton";
  const checkExtensionID = {
    // Unique name for the widget
    name: "custombutton",

    // Check if the widget applies to the current question
    isFit: (question) => question.name === componentName,
    htmlTemplate:
      "<div style='height: 39px'>" +
      "<button type='button' id='confirm_buttom' class='bg-gw-primary-blue rounded px-8 py-4 mb-5 shadow-lg text-2xl font-extrabold text-white'> Confirm Installation </button>" +
      "&nbsp;&nbsp;" +
      "</div>",

    // Render the widget after DOM element is created
    afterRender: (question, el) => {
      const buttonCustom = el.getElementsByTagName("button")[0];
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
  surveyCore.CustomWidgetCollection.Instance.add(
    checkExtensionID,
    "myCustomWidget"
  );
}
