class ContainersManagement {
  constructor(guide, steps) {
    this.guide = guide;

    this.answers = [];
    this.isFinal = false;
    this.currentStep = 0;
    this.steps = steps;
    this.countryChoice = "";

    this.introContainer = document.querySelector(".travel-help-intro");
    this.stepContainer = document.querySelector(".travel-help-step");
    this.progressBar = document.querySelector(".travel-help-step-progress");
    this.bannerCarousel = document.querySelector(".banner-carousel");

    this.finalStepContainer = document.querySelector(".final-step");

    this.infoSheetContainer = document.querySelector(".travel-info-sheet");
    this.buttonContainer = document.querySelector(".step-choice-grid");
  }

  startSteps() {
    this.introContainer.style.display = "none";
    this.stepContainer.style.display = "flex";
    this.progressBar.style.display = "flex";

    this.guide.stepsManager.displayStep();
  }

  handlePreviousButtonClick() {
    if (this.finalStepContainer.style.display === "flex") {
      this.finalStepContainer.style.display = "none";
      this.stepContainer.style.display = "flex";
      this.guide.stepsManager.displayStep(this.currentStep);
      this.isFinal = false;
      this.guide.nextButtonEffects();
    } else if (this.currentStep > 0) {
      this.currentStep--;
      this.guide.stepsManager.displayStep(this.currentStep);
    } else if (this.currentStep === 0) {
      this.bannerCarousel.src =
        "https://b2ccdn.coraltravel.lt/content/Travel%20in%20January.jpg";
      this.introContainer.style.display = "flex";
      this.stepContainer.style.display = "none";
      this.progressBar.style.display = "none";
      this.answers = [];
    }
  }

  handleNextButtonClick() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.guide.stepsManager.displayStep(this.currentStep);
    } else if (this.currentStep === this.steps.length - 1) {
      this.guide.stepsManager.catchAnswer();
      this.guide.stepsManager.updateProgress((this.isFinal = true));
      this.guide.nextButtonEffects();
      this.stepContainer.style.display = "none";
      this.finalStepContainer.style.display = "flex";
    }
  }

  updateLayoutGrid() {
    this.buttonContainer.classList.add("grid");
    this.stepContainer.classList.add("grid");
    this.infoSheetContainer.style.display = "grid";
  }

  updateLayoutGridTwoCol() {
    this.buttonContainer.classList.add("grid-two-columns");
    this.stepContainer.classList.add("grid-two-columns");
    this.infoSheetContainer.style.display = "none";
  }

  updateLayoutNoCol() {
    this.infoSheetContainer.style.display = "none";
  }

  handleChoiceButtonClickGrid(choice, button) {
    if (button.classList.contains("selected")) {
      button.classList.remove("selected");
    } else {
      document
        .querySelectorAll(".choice-button")
        .forEach((btn) => btn.classList.remove("selected"));
      button.classList.add("selected");
      this.guide.infoSheetManager.displayInfoSheet(choice);
      this.countryChoice = choice;
    }
  }

  handleChoiceButtonClickGridTwoCol(choice, button) {
    if (button.classList.contains("selected")) {
      button.classList.remove("selected");
    } else {
      document
        .querySelectorAll(".choice-button")
        .forEach((btn) => btn.classList.remove("selected"));

      button.classList.add("selected");
      this.answers[this.currentStep] = choice;
    }
  }

  getCurrentStep() {
    return this.currentStep;
  }

  getIsFinal() {
    return this.isFinal;
  }
}
