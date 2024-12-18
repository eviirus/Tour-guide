class StepManager {
  constructor(guide, travelGuide) {
    this.guide = guide;
    this.travelGuide = travelGuide;

    this.headingContainer = document.querySelector(".travel-help-step h2");
    this.questionContainer = document.querySelector(".travel-help-step h3");
  }

  displayStep(stepIndex = 0) {
    const steps = this.guide.containersManagement.steps;
    const stepData = steps[stepIndex];

    this.debug();

    this.setLayout(stepData);

    this.headingContainer.textContent = stepData.heading;
    this.questionContainer.textContent = stepData.question;
    this.guide.containersManagement.buttonContainer.innerHTML = "";
    this.updateBanner(stepData.img);

    stepData.choices.forEach((choice) =>
      this.createChoiceButton(choice, stepData)
    );

    this.updateProgress();
    this.guide.nextButtonEffects();
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

  updateBanner(imgSrc) {
    this.guide.containersManagement.bannerCarousel.parentElement.classList.add("fade-out");
    this.guide.containersManagement.bannerCarousel.src = imgSrc;
    this.guide.containersManagement.bannerCarousel.parentElement.classList.remove("fade-out");
  }

  createChoiceButton(choice, stepData) {
    const button = document.createElement("button");
    button.classList.add("choice-button");

    this.applyButtonLayout(button, stepData.layout);

    button.textContent = choice;

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
      () => this.guide.containersManagement.handleChoiceButtonClickNoCol(choice)
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
    this.guide.dateAnswer.textContent =
      this.guide.containersManagement.answers[1];
    this.guide.destinationAnswer.textContent =
      this.guide.containersManagement.countryChoice;
    this.guide.travelersAnswer.textContent =
      this.guide.containersManagement.answers[3];
    this.guide.detailsAnswer.textContent =
      this.guide.containersManagement.answers[4];
  }
}
