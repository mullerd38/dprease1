// LICENCE -----------------------------------------------------------------------------

// Copyright 2024 - Maude Tagand & Dominique Muller

// New study with the goal to compare two measures of beliefs
// Study 3

// Initialize jsPsych -----------------------------------------------------------------
var jsPsych = initJsPsych({
});

// Define randomVariable to determine condition
//let randomVariable = Math.random(); // Generates a random number between 0 and 1
//let condition = randomVariable < 0.5 ? "two-step" : "single-step"; // Define condition

let randomVariable = Math.random(); // Generates a random number between 0 and 1
let condition = randomVariable < 0.5 ? "control" : "theoretical-reasoning"; // Define condition

// Browser exclusion ------------------------------------------------------------------
var browser_check = {
  type: jsPsychBrowserCheck,
  inclusion_function: (data) => {
    return data.browser === 'firefox'|| data.browser === 'chrome' && data.mobile === false
  },
  exclusion_message: (data) => {
    if(data.mobile){
      return "p>You must use a desktop/laptop computer to participate in this experiment.</p>";
    } else if (data.browser !== 'firefox' && data.browser !== 'chrome'){
      return "<p>You must use Chrome or Firefox to complete this experiment.</p>"+
             "<p>If you would like to take part in our study, please copy and paste the experiment link into one of the compatible browsers.</p>";
    }
  }
}

// Create Timeline --------------------------------------------------------------------------
var timeline = [];

// Welcome
var welcome = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<h1 class ='custom-title'>Welcome</h1>" +
    "<p class='instructions'>TEST2 Thank you for taking part in this survey. <b> Please note that you can only participate from a computer. </b> </p>" +
    "<p class='instructions'>We are going to ask you to imagine you are a medical researcher who wants to test the effectiveness of a fictitious medicine against a fictitious disease. " +
    "Your task will be to give your opinion on the effectiveness of this fictitious medicine .</p>" +
    "<p class='instructions'>If you have any question related to this research, please " +
    "send a message on Prolific. </p>" +

    "<p class = 'continue-instructions'>Click <strong>Continue</strong> to start the study. </p>",
  choices: ['Continue']
};

var consent = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
  "<h1 class ='custom-title'> Informed consent </h1>" +
    "<p class='instructions'>By clicking below to start the study, you recognize that:</p>" +
      "<ul class='instructions'>" +
        "<li>You know you can stop your participation at any time, without having to justify yourself. " +
        "However, keep in mind that you have to complete the whole study in order to be paid. </li>" +
        "<li>You know you can contact our team for any questions or dissatisfaction related to your " +
        "participation in the research via Prolific. </li>" +
        "<li>You know the data collected will be strictly confidential and it will be impossible for " +
        "any unauthorized third party to identify you. </li>" +
        "<li>Please note that there will be one or several questions to check that you read instructions carefully. " +
        "If you do not answer this or these (very simple) questions correctly, you might not be paid. " +
        "<li>You must be over 18 to participate. " +
      "</ul>" +
    "<p class='instructions'>By clicking on the \"I confirm\" button, you give your free and informed consent to participate " +
    "in this research.</p>",
  choices: ['I confirm']
};

var consigne = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
  "<p class= 'instructions_questionnary bold'>Please read these instructions very carefully. </p>" +
  "<p class= 'instructions_questionnary'>The recently discovered Vonne syndrome causes eczema and yellowing of the skin. "+
  "To address this, researchers have developed a drug. " +
  "Your role will be to determine whether this medicine is effective or not. </p>" +
  "<p class= 'instructions_questionnary'>To do so, you will see patients suffering from the disease one by one. " +
  "For each patient you can choose to administer the medicine or the placebo in order to observe whether the patient recovers from the crisis or not. " +
  "A placebo is a pill that resembles the medicine, but does not contain any substance affecting health. " + 
  "Medicines are typically compared to this type of pill to assess their effectiveness. </p>" + 
  "<p class= 'instructions_questionnary'>You will test a certain number of patients to determine the effectiveness of the medicine. </p>",
  choices: ['I have read carefully and I can start the study']
};

var consigne_thinking = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
  "<p class= 'instructions_questionnary bold'>Please read these instructions very carefully. </p>" +
  "<p class= 'instructions_questionnary'>The recently discovered Vonne syndrome causes eczema and yellowing of the skin. "+
  "Researchers speculate that these symptoms result from a deficiency in zyntrophen, an enzyme involved in regulating skin hydration. "+
  "To address this, they have developed a drug based on fractase—a molecule that could stimulate the body’s production of zyntrophen and help restore the skin’s equilibrium. "+
  "Your role will be to determine whether this medicine is effective or not. </p>" +
  "<p class= 'instructions_questionnary'>To do so, you will see patients suffering from the disease one by one. " +
  "For each patient you can choose to administer the medicine or the placebo in order to observe whether the patient recovers from the crisis or not. " +
  "A placebo is a pill that resembles the medicine, but does not contain any substance affecting health. " + 
  "Medicines are typically compared to this type of pill to assess their effectiveness. </p>" + 
  "<p class= 'instructions_questionnary'>You will test a certain number of patients to determine the effectiveness of the medicine. </p>",
  choices: ['I have read carefully and I can start the study']
};

var stim = [
  {pilule: "medicine", correct_button: 0, diagnostic: "recovered", image: "jspsych/img/healthypeople.jpg", med_score: 1, pla_score: 0, pro: "medicine"},
  {pilule: "medicine", correct_button: 0, diagnostic: "recovered", image: "jspsych/img/healthypeople.jpg", med_score: 1, pla_score: 0, pro: "medicine"},
  {pilule: "medicine", correct_button: 0, diagnostic: "recovered", image: "jspsych/img/healthypeople.jpg", med_score: 1, pla_score: 0, pro: "medicine"},
  {pilule: "medicine", correct_button: 0, diagnostic: "not recovered", image: "jspsych/img/sickpeople.jpg", med_score: -1, pla_score: 0, pro: "placebo"},
  {pilule: "placebo", correct_button: 1, diagnostic: "recovered", image: "jspsych/img/healthypeople.jpg", med_score: 0, pla_score: 1, pro: "placebo"},
  {pilule: "placebo", correct_button: 1, diagnostic: "recovered", image: "jspsych/img/healthypeople.jpg", med_score: 0, pla_score: 1, pro: "placebo"},
  {pilule: "placebo", correct_button: 1, diagnostic: "recovered", image: "jspsych/img/healthypeople.jpg", med_score: 0, pla_score: 1, pro: "placebo"},
  {pilule: "placebo", correct_button: 1, diagnostic: "not recovered", image: "jspsych/img/sickpeople.jpg", med_score: 0, pla_score: -1, pro: "medicine"}
]

//medicine_high means the "medicine better" button will be above
var button_randomization = jsPsych.randomization.sampleWithoutReplacement(["medicine_high", "medicine_low"], 1)[0]

var medicine = stim.filter(function(s){return s.pilule === "medicine"; }); // keep only medicine trials
var placebo = stim.filter(function(s){return s.pilule === "placebo"; });

var medicine_randomization = jsPsych.randomization.repeat(medicine, 6); // each is repeated 6 times, which gives 4*6 = 24
var placebo_randomization = jsPsych.randomization.repeat(placebo, 6);

// In conjunction, this gives MR = 18, MNR = 6 (p = ,75) and PR = 18, PNR = 6 (p = ,75)

var order_randomization = jsPsych.randomization.sampleWithoutReplacement(["medicine_first", "placebo_first"], 1)[0]
var stim_randomization = [];

for (var i = 0; i < 24; i++) { // 24 times med and pla (or pla and med), so 48 trials in total
  if (order_randomization == "medicine_first"){
    stim_randomization.push(medicine_randomization.pop(), placebo_randomization.pop());
  } else if (order_randomization == "placebo_first"){
    stim_randomization.push(placebo_randomization.pop(), medicine_randomization.pop());
  }
}
console.log(medicine);
console.log(placebo);
console.log(medicine_randomization);
console.log(placebo_randomization);
console.log(order_randomization);
console.log(stim_randomization);

var pilule_given = {
  type : jsPsychImageButtonResponse,
  stimulus: "jspsych/img/sickpeople.jpg",
  stimulus_width: 250,
  choices: [
    `<div class='choice-container'><img style='width: 100px;' src='jspsych/img/pilule.png'><div class='choice-text'>Medicine</div></div>`,
    `<div class='choice-container'><img style='width: 100px;' src='jspsych/img/pilule.png'><div class='choice-text'>Placebo</div></div>`
    ],
  prompt: function() {
  return `<p class='instructions'>You give the ${jsPsych.timelineVariable('pilule')} to the patient.</p>`
  }
}

// Trial to choose which pill to give
var pilule_choice = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    return `<img style='width: 250px;' src='jspsych/img/sickpeople.jpg'></img>
            <p class='instructions'>The patient is sick. Which pill do you want to give?</p>`;
  },
  choices: [
    `<div class='choice-container'><img style='width: 100px;' src='jspsych/img/pilule.png'><div class='choice-text'>Medicine</div></div>`,
    `<div class='choice-container'><img style='width: 100px;' src='jspsych/img/pilule.png'><div class='choice-text'>Placebo</div></div>`
  ],
  data: {
    diagnostic: jsPsych.timelineVariable('diagnostic'),
  },
  on_finish: function(data) {
    data.chosen_pilule = data.response == 0 ? "medicine" : "placebo";
  }
};

// Feedback about the chosen pill
var feedback = {
  type: jsPsychHtmlButtonResponse,
  stimulus: function() {
    var last_response = jsPsych.data.getLastTrialData().values()[0];
    var chosen_pilule = last_response.response == 0 ? "medicine" : "placebo";
    return `<img style='width: 250px;' src="${jsPsych.timelineVariable('image')}"></img>
            <p class='instructions'>You gave the <strong>${chosen_pilule}</strong>. The patient has <strong>${jsPsych.timelineVariable('diagnostic')}</strong>.</p>`;
  },
  choices: ['Continue']
};

var fastResponses = 0;  // Counter for quick responses
var maxFastResponses = 3;  // Number of warnings before a stronger message

var procedure_testing = {
  timeline: [pilule_choice, feedback],
  timeline_variables: stim_randomization,
  data: {
    expected_pilule: jsPsych.timelineVariable('pilule'), // in passive paradigm
    diagnostic: jsPsych.timelineVariable('diagnostic'),
    med_score: jsPsych.timelineVariable('med_score'),
    pla_score: jsPsych.timelineVariable('pla_score')
  },
  on_finish: function(data) {
    let reactionTime = data.rt;  // Get response time in milliseconds
    let attentionThreshold = 450;  // Define threshold (e.g., 500ms)

    console.log("Reaction time:", reactionTime);

    if (reactionTime < attentionThreshold) {
      fastResponses++;  // Increment counter for fast responses

      if (fastResponses >= maxFastResponses) {
        alert("You have responded too quickly multiple times. Please slow down and pay more attention to what happens to the patients.");
      } else {
        alert("You are going too quickly. Please take a little more time.");
      }
    }
  }
};


//question croyances
var question = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      prompt: "<p>On the basis of the information you have gathered, you think that:</p>",
      options: function() { 
        if (button_randomization == "medicine_high") {
          return [
            "Patients are more likely to recover after receiving the medicine",
            "Patients are equally likely to recover after receiving the medicine or the placebo",
            "Patients are more likely to recover after receiving the placebo"
          ];
        } else if (button_randomization == "medicine_low") {
          return [
            "Patients are more likely to recover after receiving the placebo",
            "Patients are equally likely to recover after receiving the medicine or the placebo",
            "Patients are more likely to recover after receiving the medicine"
          ];
        } else {
          return "<p>Erreur : réponse inattendue.</p>";
        }
      },
    required: true // This makes the question required
  }
]
}

var slider = {
  type: jsPsychHtmlSliderResponse,
  slider_start: condition === "two-step" ? 1 : 0,  // Use condition
  require_movement: true,
  min: condition === "two-step" ? 1 : 0, 
  max: 100,
  step: 1,
  labels: function() {
    // Ensure labels match the actual min value set by condition
    if (condition === "two-step") {
      return [
        '1<br>Very small extent', 
        '50<br>Some extent',
        '100<br>Very large extent'
      ];
    } else {
      return [
        '0<br>Definitely not', 
        '50<br>Quite effective',
        '100<br>Definitely yes'
      ];
    }
  },

  stimulus: function() {
    var response = jsPsych.data.get().last().values()[0].response.Q0;
    var questionText = "";
    if (response == "Patients are more likely to recover after receiving the medicine") {
      questionText = "<p class='instructions'>You just said patients are better off to receive the medicine than the placebo.<br>" +
      "To be more specific, to what extent do you think patients are more likely to get better with the medicine (instead of the placebo)?</p>";
    } else if (response == "Patients are more likely to recover after receiving the placebo") {
      questionText = "<p class='instructions'>You just said patients are better off to receive the placebo than the medicine.<br>" +
      "To be more specific, to what extent do you think patients are more likely to get better with the placebo (instead of the medicine)?</p>";
    } else {
      questionText = "Erreur : réponse inattendue." + response;
    }
    //slider mesure Matute
    if (typeof response === 'undefined') questionText = "To what extent do you think that the medicine has been effective in healing the patients you have seen? <br>";

    // Only return the question text here
    return `
        <p style="margin-bottom: 1px;">${questionText}</p>
        <p style="font-size: 16px;">Your current answer: <strong><span id="answer-display">1</span></strong></p>`;
  },
  slider_width: 350 , // Keep this as is to control slider size

  on_load: function() {
    let slider = document.getElementById("jspsych-html-slider-response-response");
    let display = document.getElementById("answer-display");
  
    // Hide the answer display initially
    display.style.visibility = "hidden"; 
  
    // Function to update display
    function updateDisplay() {
      display.innerText = slider.value;  // ✅ Correctly update displayed value
      display.style.visibility = "visible"; // ✅ Make it appear after interaction
    }
  
    // ✅ Trigger on both "input" (move) and "click" (first selection)
    slider.addEventListener("input", updateDisplay);
    slider.addEventListener("click", updateDisplay);
  }
};

var conditional_slider = {
  timeline: [slider],
  conditional_function: function() {
    var response = jsPsych.data.get().last().values()[0].response.Q0;
    if (response == "Patients are equally likely to recover after receiving the medicine or the placebo") {
      return false;
    } else {
      return true;
    }
  }
};

//question certitude
var confidence = {
  type: jsPsychHtmlSliderResponse,
  slider_start: 0,
  require_movement: true,
  labels: ['0<br>Not at all sure', '100<br>Very sure'],
  stimulus: `<p>Please indicate how sure you are of your answer on a scale from 0 (not at all sure) to 100 (very sure).</p>`
}


//Attention check
var attention_check = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: "<p class='instructions_questionnary'>This question is here to check that you read the instructions carefully. On this page, we will ask you only one question, but you will not answer it. Instead, just write the word \u0022baguette\u0022. </p>" +
              "<p class='instructions_questionnary'>What is your favorite color?</p>",
      name: 'attention_check',
      required: true
    }
  ],
  button_label: 'Continue',
}

var likert_scale = [
  "Completely false",
  "Mostly false",
  "Somewhat false",
  "Slightly false",
  "Neither true or false",
  "Slightly true",
  "Somewhat true",
  "Mostly true",
  "Completely true"
];

var BCTI = {
  timeline:[{
  type: jsPsychSurveyLikert,
  preamble:
  "<p class='BCTI'>For each statement below, please choose the appropriate response to indicate the extent to which you think these statements are true. There is no objectively true or false answer, we are interested in your personal opinions.</br>I think that...</p>",
  questions: [
      {prompt: "<strong> A powerful and secretive group, known as the New World Order, are planning to eventually rule the world through an autonomous world government, which would replace sovereign government. </strong>", labels:likert_scale, required: true},
      {prompt: "<strong> SARS (Severe Acute Respiratory Syndrome) was produced under laboratory conditions as a biological weapon. </strong>", labels:likert_scale, required: true},
      {prompt: "<strong> The US government had foreknowledge about the Japanese attack on Pearl Harbour, but allowed the attack to take place so as to be able to enter the Second World War. </strong>", labels:likert_scale, required: true},
      {prompt: "<strong> US agencies intentionally created the AIDS epidemic and administered it to Black and gay men in the 1970s. </strong>", labels:likert_scale, required: true},
      {prompt: "<strong> The assassination of Martin Luther King, Jr., was the result of an organised conspiracy by US government agencies such as the CIA and FBI. </strong>", labels:likert_scale, required: true},
      {prompt: "<strong> The Apollo moon landings never happened and were staged in a Hollywood film studio. </strong>", labels:likert_scale, required: true},
      {prompt: "<strong> Area 51 in Nevada, US, is a secretive military base that contains hidden alien spacecraft and/or alien bodies. </strong>", labels:likert_scale, required: true},
      {prompt: "<strong> The US government allowed the 9/11 attacks to take place so that it would have an excuse to achieve foreign (e.g., wars in Afghanistan and Iraq) and domestic (e.g., attacks on civil liberties) goals that had been determined prior to the attacks. </strong>", labels:likert_scale, required: true},
      {prompt: "<strong> The assassination of John F. Kennedy was not committed by the lone gunman, Lee Harvey Oswald, but was rather a detailed, organised conspiracy to kill the President. </strong>", labels:likert_scale, required: true},
      {prompt: "<strong> In July 1947, the US military recovered the wreckage of an alien craft from Roswell, New Mexico, and covered up the fact. </strong>", labels:likert_scale, required: true},
      {prompt: "<strong> Princess Diana’s death was not an accident, but rather an organised assassination by members of the British royal family who disliked her. </strong>", labels:likert_scale, required: true},
      {prompt: "<strong> The Oklahoma City bombers, Timothy McVeigh and Terry Nichols, did not act alone, but rather received assistance from neo-Nazi groups. </strong>", labels:likert_scale, required: true},
      {prompt: "<strong> The Coca Cola company intentionally changed to an inferior formula with the intent of driving up demand for their classic product, later reintroducing it for their financial gain. </strong>", labels:likert_scale, required: true},
      {prompt: "<strong> Special interest groups are suppressing, or have suppressed in the past, technologies that could provide energy at reduced cost or reduced pollution output. </strong>", labels:likert_scale, required: true},
      {prompt: "<strong> Government agencies in the UK are involved in the distribution of illegal drugs to ethnic minorities. </strong>", labels:likert_scale, required: true},
  ],
  required_error: "Please answer all questions.",
  button_label: 'Continue',
  scale_width: 800,
}],
};

var instruction_demographic_questionnary = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
    "<p class='instructions_questionnary'>You are nearly at the end of this experiment, please answer this last set of questions about yourself.</p>",
    choices: ['Continue']
};
        
var genre = {
  type: jsPsychSurveyMultiChoice,
  questions: [
    {
      prompt: "<p class='instructions_questionnary'>What gender do you identify as?</p>", 
      options: ["Woman", "Man","Other"],
      name: 'genre',
      required: true,
      horizontal: true
    }
  ],
  required_error: "Please, answer all questions.",
  button_label: 'Continue'
}
          
var age = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: "<p class='instructions_questionnary'>How old are you? (in year, just a number, for instance 32)</p>",
      placeholder: 'XX',
      name: 'age',
      required: true
    }
  ],
  required_error: "Please, answer all questions.",
  button_label: 'Continue'
}

var comment = {
  type: jsPsychSurveyText,
  questions: [
    {
      prompt: "<p class='instructions'>Do you have any comments about the study?</p>",
      name: 'comment',
      rows: 5
    }
  ],
  required_error: "Please, answer all questions.",
  button_label: 'Continue'
}

var waiting_demand = {
  type: jsPsychHtmlButtonResponse,
  stimulus:
  "<p class='instructions'>You have now finished answering all the questions. " +
  "After clicking <strong>continue</strong>, the data will be saved while loading. " +
  "<strong>Please wait until the next page appears to exit.</strong> " +
  "Otherwise, we will have no proof that you have completed the study and won't be able to pay you</p>",
  choices: ['Continue']
}
  

//prolific ----------------------------------------------------------------------------------
var prolific = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p class='instructions'>You have finished the last task. Thanks for participating!</p>"+
  "<p class='instructions'>Please wait a moment, you will automatically be redirected to prolific.</p>",
  trial_duration: 3000,
  choices: "NO_KEYS",
  on_finish: function(){
  window.location.href = "https://app.prolific.com/submissions/complete?cc=C4B65VYL";
  }
}
var prolific_id = jsPsych.data.getURLVariable('PROLIFIC_PID');
var study_id = jsPsych.data.getURLVariable('STUDY_ID');
var session_id = jsPsych.data.getURLVariable('SESSION_ID');

//Save data ---------------------------------------------------------------------------------
const subject_id = jsPsych.randomization.randomID(10);
const filename = `${subject_id}.csv`;
const experiment_id = "XJFjoYakDsxF";
// Your OSF token
// const osfToken = 'VLFG5mbOACd0fk6jkN1IhAwbdrCi8OSm62rzTqPBreN3asR5QCcIeTBz9YkwJy1WL9CkNp';


jsPsych.data.addProperties({
  subject_id: subject_id,
  prolific_id: prolific_id,
  study_id: study_id,
  session_id: session_id,
  stim_randomization: stim_randomization,
  button_randomization: button_randomization,
  condition: condition // Save the condition
})

var save_data = {
  type: jsPsychPipe,
  action: "save",
  experiment_id: experiment_id,
  filename: filename,
  data_string: ()=>jsPsych.data.get().csv()
  //token: osfToken
}

// modifications

timeline.push(
  browser_check,
  welcome,
  consent
);

if (condition ==="control"){
  timeline.push(consigne);
}else {
  timeline.push(consigne_thinking);
}



timeline.push(
  procedure_testing,
  question,
  conditional_slider,
  confidence,
  attention_check,
  BCTI,
  instruction_demographic_questionnary,
  genre,
  age,
  comment,
  waiting_demand,
  save_data,
  prolific
);

// Run the experiment
jsPsych.run(timeline);