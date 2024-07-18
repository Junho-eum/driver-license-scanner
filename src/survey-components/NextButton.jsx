import * as SurveyCore from "survey-core";

export function ExamNextButton(Survey) {
  const componentName = "exam_next_button";
  const activateCamera = {
    // Unique name for the widget
    name: "exam_next_button",

    // Check if the widget applies to the current question
    isFit: (question) => question.name === componentName,
    htmlTemplate:
      "<div style='height: 39px'>" +
      "<button type='button' id='exam_next_button' style='float:right'class='bg-gw-primary-blue rounded px-8 py-4 mb-5 shadow-lg text-2xl font-extrabold text-white'></button>" +
      "&nbsp;&nbsp;" +
      "</div>",

    afterRender: () => {
      const buttonCustom = document.getElementById("exam_next_button");
      {
        Survey.isLastPage
          ? (buttonCustom.innerText = "Complete")
          : (buttonCustom.innerText = "Next");
      }

      buttonCustom.addEventListener("click", function () {
        {

          const localCheck = window.localStorage.getItem("expire-time");
          const cookieCheck = Cookies.get('treatment');

          if(localCheck == null){

            alert("Error with localstorage corrupted. Please return to prolific and reclick the survey link");
            localStorage.clear();
            window.location.reload();
            window.location.href = "/";

          }
          else if(cookieCheck == null){

            alert("Error with cookie corrupted. Please return to prolific and reclick the survey link");
            localStorage.clear();
            window.location.reload();
            window.location.href = "/";

          }
          else{

            if(Survey.isLastPage){

              localStorage.setItem("finished", "true");
              Survey.doComplete();
              document.getElementById('top-bar').scrollIntoView(); 


            }
            else{

              Survey.nextPage();
              document.getElementById('top-bar').scrollIntoView(); 

            }
          }

        }
      });
    },
  };
  SurveyCore.CustomWidgetCollection.Instance.addCustomWidget(
    activateCamera,
    "myCustomWidget"
  );
}