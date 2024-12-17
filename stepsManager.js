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

    /*
        Debug
    */
    console.log(this.guide.containersManagement.answers.join(" "));
    console.log("Current Step:", this.guide.containersManagement.currentStep);
    console.log(
      "Answers length: ",
      this.guide.containersManagement.answers.length
    );
    console.log("Country choice: " + this.guide.containersManagement.countryChoice);

    this.setLayout(
      stepData
    );

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

  setLayout(stepData) {
    this.guide.containersManagement.buttonContainer.classList.remove("grid", "grid-two-columns");
    this.guide.containersManagement.stepContainer.classList.remove("grid", "grid-two-columns");

    if (stepData.layout === "grid") {
      this.guide.containersManagement.updateLayoutGrid();
    } else if (stepData.layout === "grid-two-col") {
      this.guide.containersManagement.updateLayoutGridTwoCol();
    } else {
      this.guide.containersManagement.updateLayoutNoCol();
    }
  }

  updateBanner(imgSrc) {
    this.guide.containersManagement.bannerCarousel.parentElement.classList.add("fade-out");
    this.guide.containersManagement.bannerCarousel.src = imgSrc;
    this.guide.containersManagement.bannerCarousel.parentElement.classList.remove("fade-out");
  }

  createChoiceButton(choice, stepData) {
    const button = document.createElement("button");
    button.classList.add("choice-button");
    button.classList.remove("grid", "grid-two-columns");
    button.textContent = choice;

    if (stepData.layout === "grid") {
      button.classList.add("grid");
    } else if (stepData.layout === "grid-two-col") {
      button.classList.add("grid-two-columns");
    }

    button.addEventListener("click", () =>
      this.handleChoiceButtonClick(choice, stepData, button)
    );
    // check on coral - only then remove
    // button.addEventListener("touchstart", (event) => {
    //   event.preventDefault();
    //   this.handleChoiceButtonClick(choice, stepData, button);
    // });

    this.guide.containersManagement.buttonContainer.appendChild(button);
  }

  // refactor
  // fix countryChoice saving country to grid-two-col answer field
  handleChoiceButtonClick(choice, stepData, button) {
    if(stepData.layout === "grid"){
      this.guide.containersManagement.handleChoiceButtonClickGrid(choice, button);
    }else if(stepData.layout === "grid-two-col"){
      this.guide.containersManagement.handleChoiceButtonClickGridTwoCol(choice, button);
    }
    // if (stepData.layout === "grid" || stepData.layout === "grid-two-col") {
    //   if (button.classList.contains("selected")) {
    //     button.classList.remove("selected");
    //   } else {
    //     document
    //       .querySelectorAll(".choice-button")
    //       .forEach((btn) => btn.classList.remove("selected"));
    //     button.classList.add("selected");
    //     this.guide.infoSheetManager.displayInfoSheet(choice);
    //     this.countryChoice = choice;
    //   }
    //} 
    else {
      this.guide.containersManagement.answers[this.guide.containersManagement.currentStep] = choice;
      this.guide.containersManagement.currentStep++;
      this.displayStep(this.guide.containersManagement.currentStep);
    }
  }

  updateProgress(isFinal) {
    const barFiller = document.querySelector(".bar-filler");
    var percentage =
      ((this.guide.containersManagement.currentStep + 1) /
        (this.guide.containersManagement.steps.length + 1)) *
      100;
    if (isFinal) {
      percentage = 100;
    }
    barFiller.style.width = `${percentage}%`;
  }

  catchAnswer() {
    var dateChoices = this.guide.containersManagement.steps[1].choices;
    var selectedDates = this.guide.containersManagement.answers.filter(
      (answer) => dateChoices.includes(answer)
    );
    var lastDate = selectedDates[selectedDates.length - 1];
    this.guide.dateAnswer.textContent = lastDate || "";

    var destinationChoices = this.guide.containersManagement.steps[2].choices;
    var selectedDestinations = this.guide.containersManagement.answers.filter(
      (answer) => destinationChoices.includes(answer)
    );
    var lastDestination = selectedDestinations[selectedDestinations.length - 1];
    this.guide.destinationAnswer.textContent = lastDestination || "";

    var travelersChoices = this.guide.containersManagement.steps[3].choices;
    var selectedTravelers = this.guide.containersManagement.answers.filter(
      (answer) => travelersChoices.includes(answer)
    );
    var lastTraveler = selectedTravelers[selectedTravelers.length - 1];
    this.guide.travelersAnswer.textContent = lastTraveler || "";

    var detailsChoices = this.guide.containersManagement.steps[4].choices;
    var selectedDetails = this.guide.containersManagement.answers.filter(
      (answer) => detailsChoices.includes(answer)
    );
    var lastDetail = selectedDetails[selectedDetails.length - 1];
    this.guide.detailsAnswer.textContent = lastDetail || "";
  }
}
