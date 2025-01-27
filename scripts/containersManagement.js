class ContainersManagement {
  constructor(guide, steps, fetchEncryptedData) {
    this.guide = guide;

    this.answers = [];
    this.isFinal = false;
    this.currentStep = 0;
    this.steps = steps;
    this.countryChoice = "";
    this.hotelConceptChoice = "";

    this.fetchEncryptedData = fetchEncryptedData;

    this.initializeDOMElements();
  }

  initializeDOMElements(){
    this.introContainer = document.querySelector(".travel-help-intro");
    this.stepContainer = document.querySelector(".travel-help-step");
    this.progressBar = document.querySelector(".travel-help-step-progress");
    this.finalStepContainer = document.querySelector(".final-step");
    this.infoSheetContainer = document.querySelector(".travel-info-sheet");
    this.buttonContainer = document.querySelector(".step-choice-grid");
    this.searchResultButton = document.querySelector('.final-step-button-view');
  }

  startSteps() {
    this.guide.guideEffects.applyStartEffects();

    this.guide.stepsManager.displayStep();
    this.guide.guideEffects.applyBannerCarouselEffectsForward();
  }

  handlePreviousButtonClick() {
    if (this.finalStepContainer.style.display === "flex") {
      this.navigatePrevFromFinalStep();
    } else if (this.currentStep > 0) {
      this.navigatePrevDefaultStep();
    } else if (this.currentStep === 0) {
      this.navigatePrevToIntro();
    }
  }

  handleNextButtonClick() {
    if(this.guide.stepsManager.getLayout() !== "grid" || this.guide.stepsManager.getLayout() !== "grid-two-columns"){
      this.answers[this.currentStep] = "";
    };

    if (this.currentStep < this.steps.length - 1) {
      this.navigateNextDefaultStep();
    } else if (this.currentStep === this.steps.length - 1) {
      this.navigateNextToFinalStep();
    }
  }

  navigatePrevFromFinalStep() {
    this.finalStepContainer.style.display = "none";
    this.stepContainer.style.display = "flex";
    this.guide.stepsManager.displayStep(this.currentStep);
    this.isFinal = false;
    this.guide.nextButtonState();
    this.guide.guideEffects.applyBannerCarouselEffectsBackward();
  }

  navigatePrevDefaultStep() {
    this.currentStep--;
    this.guide.stepsManager.displayStep(this.currentStep);
    this.guide.guideEffects.applyBannerCarouselEffectsBackward();
  }

  navigatePrevToIntro() {
    this.introContainer.style.display = "flex";
    this.stepContainer.style.display = "none";
    this.progressBar.style.display = "none";
    this.answers = [];
    this.currentStep = 0;
    this.countryChoice = "";
    this.guide.guideEffects.applyBannerCarouselEffectsBackward();
  }

  navigateNextDefaultStep() {
    this.currentStep++;
    this.guide.stepsManager.displayStep(this.currentStep);
    this.guide.guideEffects.applyBannerCarouselEffectsForward();
  }

  async navigateNextToFinalStep() {
    this.guide.stepsManager.catchAnswer();
    this.guide.stepsManager.updateProgress((this.isFinal = true));
    this.guide.nextButtonState();
    this.stepContainer.style.display = "none";
    this.finalStepContainer.style.display = "flex";

    if(!this.guide.answersManagement.checkIfEmpty()){
      this.guide.valuesGenerating.generateResults();
      this.guide.valuesGenerating.getTravellerCount();
  
      const values = this.guide.valuesGenerating.getValues();
      try {
        const link = await this.fetchEncryptedData(this.countryChoice, values);
        this.searchResultButton.href = link;
        console.log(link);
      } catch (error) {
        console.error("Error fetching encrypted data:", error);
      }
    }

    this.guide.guideEffects.applyBannerCarouselEffectsForward();
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
      
      this.hotelConceptChoice = choice;
    }
  }

  handleChoiceButtonClickNoCol(choice) {
    this.answers[this.currentStep] = choice;
    this.currentStep++;
    this.guide.stepsManager.displayStep(this.currentStep);
    this.guide.guideEffects.applyBannerCarouselEffectsForward();
  }

  getCurrentStep() {
    return this.currentStep;
  }

  getIsFinal() {
    return this.isFinal;
  }

  getNightChoice() {
    return this.answers[1];
  }

  getPriceChoice() {
    return this.answers[4];
  }

  getSeasonChoice() {
    return this.answers[0];
  }

  getTravellerChoice() {
    return this.answers[3];
  }

  getCountryChoice(){
    return this.countryChoice;
  }

  getHotelCategoryChoice(){
    return this.answers[5];
  }

  getHotelConceptChoice(){
    return this.hotelConceptChoice;
  }
}