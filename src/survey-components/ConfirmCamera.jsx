import { Model } from 'survey-core';
import * as SurveyReact from "survey-react";


export function CameraConfirmationButton(Survey) {
    const componentName = "camera";
    const activateCamera = {
      // Unique name for the widget
      name: "camera",
  
      // Check if the widget applies to the current question
      isFit: (question) => question.name === componentName,
      htmlTemplate:
        "<div style='height: 39px'>" +
        "<button type='button' id='request_camera_permission' class='bg-gw-primary-blue rounded px-8 py-4 mb-5 shadow-lg text-2xl font-extrabold text-white'> Confirm Camera Permissions </button>" +
        "&nbsp;&nbsp;" +
        "</div>",
    };
    Model.CustomWidgetCollection.Instance.add(
      activateCamera,
      "myCustomWidget"
    );
  }