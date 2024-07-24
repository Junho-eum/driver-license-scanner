const survey_instructions_page = {

  name: "survey_instructions_page",
    elements: [
      {
        type: "html",
        name: "survey_instructions",
        html: '<div><h1 style="font-size:25px;">Thank you for your interest in our survey.</h1><p class="lead">Your answers are important to us!</p>'+
        '<hr class="my-4"><p>Please read the following instructions carefully:</p>'+
        '<br><ul style="list-style-type: circle; margin-left: 35px; padding: 5px;">'+
        '<li>Take your time in reading and answering the questions.</li>'+
        '<li>Answer the questions as accurately as possible.</li>'+
        '<li>It is okay to say that you don’t know an answer.</li>'+
        '<li>Some questions asked for estimations, so it’s okay to guess if you don’t know the exact answer.</li></ul></div>',
      },
      {
        type: "html",
        name: "exam_next_button",
      },
    ]

}

export default survey_instructions_page;