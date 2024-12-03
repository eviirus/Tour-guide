class TravelGuide {
    constructor(steps, infoSheet) {
      this.steps = steps;
      this.infoSheet = infoSheet;
      this.currentStep = 0;
      this.answers = [];
      this.countryChoice = [];
      this.isFinal = false;

      this.bannerCarousel = document.querySelector('.banner-carousel');
      this.introContainer = document.querySelector('.travel-help-intro');
      this.stepContainer = document.querySelector('.travel-help-step');
      this.progressBar = document.querySelector('.travel-help-step-progress');
      this.finalStepContainer = document.querySelector('.final-step');
      this.destinationAnswer = document.getElementById('destination');
      this.travelersAnswer = document.getElementById('traveler');
      this.dateAnswer = document.getElementById('date');
      this.detailsAnswer = document.getElementById('details');
    }
  
    initialize() {
      this.attachStartButtonListener();
    }
  
    attachStartButtonListener() {
      const startBtn = document.getElementById('start-button');
      const handleStart = () => {
        this.introContainer.style.display = 'none';
        this.stepContainer.style.display = 'flex';
        this.progressBar.style.display = 'flex';
        this.stepsManager.displayStep();
      };
      startBtn.addEventListener('click', handleStart);
      startBtn.addEventListener('touchstart', (event) => {
        event.preventDefault();
        handleStart();
      });
    }
  }
  