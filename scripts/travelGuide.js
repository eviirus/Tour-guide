export default class TravelGuide {
  static NEXT_BUTTON_FINAL_STEP = `
    Pabaiga
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
    if (this.isFinal()) {
      this.nextBtn.removeEventListener("click", this.nextBtn._handlerRef);
      this.nextBtn._handlerRef = null;
      this.nextBtn.classList.add("disabled");
    } else {
      this.attachButtonListener(this.nextBtn, () => {
        this.containersManagement.handleNextButtonClick();
      });
    }
  }

  attachButtonListener(button, handler) {
    if (!button._handlerRef) {
      button._handlerRef = handler;
      button.addEventListener("click", (event) => {
        if (!this.isFinal()) {
          this.applyButtonClickEffect(button);
        }
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

  nextButtonState() {
    const currentStep = this.containersManagement.getCurrentStep();

    const color = currentStep % 2 === 0 ? TravelGuide.BLUE_COLOR : TravelGuide.ORANGE_COLOR;
    this.nextBtn.style.backgroundColor = color;

    if (this.isFinal()) {
      this.nextBtn.innerHTML = TravelGuide.NEXT_BUTTON_FINAL_STEP;
      this.finalButtonStateStyles();
    } else {
      this.nextBtn.innerHTML = TravelGuide.NEXT_BUTTON_DEFAULT_STEP;
    }
  }

  isFinal(){
    return this.containersManagement.getIsFinal();
  }

  finalButtonStateStyles(){
    this.nextBtn.style.paddingRight = "14px"
  }
}
