import * as SurveyCore from "survey-core";
import Cookies from "js-cookie";
import './NextButton.css'


export function ExamNextButton(Survey) {
  const componentName = "exam_next_button";
  const button_name = {
    // Unique name for the widget
    name: "exam_next_button",

    // Check if the widget applies to the current question
    isFit: (question) => question.name === componentName,
    htmlTemplate:` 
      <div style='height: 39px'>
        <div class="tooltip" style='float:right;'>
          <button type='button' id='exam_next_button' disabled class= 'rounded px-8 py-4 mb-5 shadow-lg text-2xl font-extrabold focus:outline-none focus:ring focus:ring-red-500'></button>
          <span id='tooltip' class="tooltiptext">Please answer all required questions (*) before clicking next.</span>
        </div>
        &nbsp;&nbsp; 
      </div>`,

    afterRender: () => {
      const buttonCustom = document.getElementById("exam_next_button");
      const tooltip = document.getElementById("tooltip");


      // Set up a new observer to handle changes to our button
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          // Check the modified attributeName is "disabled"
          if (mutation.attributeName === "disabled") {
            if(buttonCustom.disabled) {
              buttonCustom.classList.remove("bg-gw-primary-blue");
              buttonCustom.classList.remove("text-white");
            } else {
              buttonCustom.classList.add("bg-gw-primary-blue");
              buttonCustom.classList.add("text-white");

            }
          }
        });
      });

      // Configure to only listen to attribute changes
      var config = { attributes: true };
      // Start observing buttonCustom
      observer.observe(buttonCustom, config);

      // Check, if there is any question that is required to be answered but is not
      let isAllAnswered = true;
      for (var i = 0; i < Survey.currentPage.questions.length; i++) {
        let q = Survey.currentPage.questions[i];
        if(!q.validate(false)) {
          isAllAnswered = false;
          break;
        }
      }
      buttonCustom.disabled = !isAllAnswered;
      tooltip.hidden = isAllAnswered;

      // Register event listeners to react to changes on questions being answered:
        Survey.onValueChanged.add((sender, options) => {
          for (var i = 0; i < Survey.currentPage.questions.length; i++) {
            let q = Survey.currentPage.questions[i];
            if (!q.validate(false)) {
              buttonCustom.disabled = true;
              tooltip.hidden = false;
              break;
            } else {
              buttonCustom.disabled = false;
              tooltip.hidden = true;
            }
          }
        });

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
    button_name,
    "myCustomWidget"
  );
}