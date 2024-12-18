class TravelGuide {
  static NEXT_BUTTON_FINAL_STEP = `
    Paieška
    <svg class="arrow-icon-next" width="21" height="21" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6L8 11L13 6" stroke="#fff" stroke-linejoin="round"></path>
    </svg>
  `;

  static NEXT_BUTTON_DEFAULT_STEP = `
    Toliau
    <svg class="arrow-icon-next" width="21" height="21" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 6L8 11L13 6" stroke="#fff" stroke-linejoin="round"></path>
    </svg>
  `;

  static BLUE_COLOR = "#0093d9";
  static ORANGE_COLOR = "#e84f03";

  constructor(infoSheet) {
    this.infoSheet = infoSheet;

    this.initializeDOMElements();
  }

  initializeDOMElements(){
    this.destinationAnswer = document.getElementById("destination");
    this.travelersAnswer = document.getElementById("traveler");
    this.dateAnswer = document.getElementById("date");
    this.detailsAnswer = document.getElementById("details");
    this.nextBtn = document.querySelector(".button-direction-next");
    this.prevBtn = document.querySelector(".button-direction-prev");
  }

  initialize() {
    this.attachStartButtonListener();
  }

  attachStartButtonListener() {
    const startBtn = document.getElementById("start-button");
    const handleStart = () => {
      this.containersManagement.startSteps();
      this.attachNextButtonListener();
      this.attachPrevButtonListener();
    };
    startBtn.addEventListener("click", handleStart);
  }

  attachPrevButtonListener() {
    this.attachButtonListener(this.prevBtn, () => {
      this.containersManagement.handlePreviousButtonClick();
    });
  }

  attachNextButtonListener() {
    this.attachButtonListener(this.nextBtn, () => {
      this.containersManagement.handleNextButtonClick();
    });
  }

  attachButtonListener(button, handler) {
    if (!button._handlerRef) {
      button._handlerRef = handler;
      button.addEventListener("click", (event) => {
        this.applyButtonClickEffect(button);
        handler(event);
      });
    }
  }

  applyButtonClickEffect(button) {
    button.classList.add("btn-clicked");
    setTimeout(() => {
      button.classList.remove("btn-clicked");
    }, 100);
  }

  nextButtonState(isFinal, currentStep) {
    const color = currentStep % 2 === 0 ? TravelGuide.BLUE_COLOR : TravelGuide.ORANGE_COLOR;
    this.nextBtn.style.backgroundColor = color;

    if (isFinal) {
      this.nextBtn.innerHTML = TravelGuide.NEXT_BUTTON_FINAL_STEP;
    } else {
      this.nextBtn.innerHTML = TravelGuide.NEXT_BUTTON_DEFAULT_STEP;
    }
  }

  nextButtonEffects() {
    const currentStep = this.containersManagement.getCurrentStep();
    const isFinal = this.containersManagement.getIsFinal();

    this.nextButtonState(isFinal, currentStep);

    if (isFinal) {
      //nextBtn.addEventListener('click', throwSearchResult);
    } else {
      //nextBtn.removeEventListener('click', throwSearchResult);
    }
  }
}
