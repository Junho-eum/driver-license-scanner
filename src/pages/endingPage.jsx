import TopBar from "../web-components/TopBar";


export default function EndingPage() {


  return (
    <>
      <div>
        <TopBar />

          <div class="endPageTotal">
            <h4 class="endPageTop">Thank you for participating in this survey!</h4>
            <p class="endPageBottom">Please click the button below to complete the study and return to Prolific.</p>
          </div>

          <surveyjs-feedback-form>
                
          </surveyjs-feedback-form>

      </div>
    </>
  );
}