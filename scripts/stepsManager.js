class StepManager {
  constructor(guide, travelGuide) {
    this.guide = guide;
    this.travelGuide = travelGuide;

    this.currentStepData = null;

    this.initializeDOMElements();
  }

  initializeDOMElements(){
    this.headingContainer = document.querySelector(".travel-help-step h2");
    this.questionContainer = document.querySelector(".travel-help-step h3");
    this.destinationAnswer = document.getElementById("destination");
    this.travelersAnswer = document.getElementById("traveler");
    this.dateAnswer = document.getElementById("date");
    this.budgetAnswer = document.getElementById("budget");
    this.seasonAnswer = document.getElementById("season");
    this.hotelAnswer = document.getElementById("hotel");
    this.hotelConceptAnswer = document.getElementById("hotelConcept");
  }

  displayStep(stepIndex = 0) {
    const steps = this.guide.containersManagement.steps;
    const stepData = steps[stepIndex];

    this.currentStepData = stepData;

    this.debug();

    this.setLayout(stepData);

    this.headingContainer.textContent = stepData.heading;
    this.questionContainer.textContent = stepData.question;
    this.guide.containersManagement.buttonContainer.innerHTML = "";

    stepData.choices.forEach((choice) =>
      this.createChoiceButton(choice, stepData)
    );

    this.updateProgress();
    this.guide.nextButtonState();
  }

  debug(){
    console.log(this.guide.containersManagement.answers.join(" "));
    console.log("Current Step:", this.guide.containersManagement.currentStep);
    console.log(
      "Answers length: ",
      this.guide.containersManagement.answers.length
    );
    console.log(
      "Country choice: " + this.guide.containersManagement.countryChoice
    );
    console.log("Hotel concept choice: " + this.guide.containersManagement.hotelConceptChoice);
  }

  setLayout(stepData) {
    this.guide.containersManagement.buttonContainer.classList.remove("grid", "grid-two-columns");
    this.guide.containersManagement.stepContainer.classList.remove("grid", "grid-two-columns");

    this.executeLayoutSpecificChoice(
      stepData.layout,
      () => this.guide.containersManagement.updateLayoutGrid(),
      () => this.guide.containersManagement.updateLayoutGridTwoCol(),
      () => this.guide.containersManagement.updateLayoutNoCol()
    );
  }

  createChoiceButton(choice, stepData) {
    const button = document.createElement("button");
    button.classList.add("choice-button");

    this.applyButtonLayout(button, stepData.layout);

    button.textContent = choice;
    button.setAttribute("data-choice", choice);

    button.addEventListener("click", () =>
      this.handleChoiceButtonClick(choice, stepData, button)
    );

    this.guide.containersManagement.buttonContainer.appendChild(button);
  }

  applyButtonLayout(button, layout){
    button.classList.remove("grid", "grid-two-columns");

    if (layout === "grid") {
      button.classList.add("grid");
    } else if (layout === "grid-two-col") {
      button.classList.add("grid-two-columns");
    }
  }

  handleChoiceButtonClick(choice, stepData, button) {
    this.executeLayoutSpecificChoice(
      stepData.layout,
      () => this.guide.containersManagement.handleChoiceButtonClickGrid(choice, button),
      () => this.guide.containersManagement.handleChoiceButtonClickGridTwoCol(choice, button),
      () => this.guide.containersManagement.handleChoiceButtonClickNoCol(choice, button)
    );
  }

  updateProgress(isFinal) {
    const barFiller = document.querySelector(".bar-filler");
    let currentStep = this.guide.containersManagement.getCurrentStep();
    const totalSteps = this.guide.containersManagement.steps.length + 1;
    
    let percentage = ((currentStep + 1) / (totalSteps)) * 100;
    if (isFinal) { percentage = 100; }

    barFiller.style.width = `${percentage}%`;
  }

  executeLayoutSpecificChoice(layout, gridMethod, gridTwoColMethod, noColMethod) {
    if (layout === "grid") {
      gridMethod();
    } else if (layout === "grid-two-col") {
      gridTwoColMethod();
    } else {
      noColMethod();
    }
  }

  catchAnswer() {
    this.destinationAnswer.textContent =
      this.guide.containersManagement.countryChoice;
    this.budgetAnswer.textContent = 
      this.guide.containersManagement.answers[4];
    this.seasonAnswer.textContent = 
      this.guide.containersManagement.answers[0];
    this.dateAnswer.textContent =
      this.guide.containersManagement.answers[1];
    this.travelersAnswer.textContent =
      this.guide.containersManagement.answers[3];
    this.hotelAnswer.textContent =
      this.guide.containersManagement.answers[5];
    this.hotelConceptAnswer.textContent = 
      this.guide.containersManagement.hotelConceptChoice;
  }

  getLayout(){
    return this.currentStepData ? this.currentStepData.layout : null;
  }
}
