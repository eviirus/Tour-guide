<<<<<<< HEAD
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
        this.attachNextButtonListener();
        this.attachPrevButtonListener();
      };
      startBtn.addEventListener('click', handleStart);
      startBtn.addEventListener('touchstart', (event) => {
        event.preventDefault();
        handleStart();
      });
    }

    attachPrevButtonListener() {
        const prevBtn = document.querySelector('.button-direction-prev');
        if (prevBtn) {
          //prevBtn.replaceWith(prevBtn.cloneNode(true));
          //const newPrevBtn = document.querySelector('.button-direction-prev');
          prevBtn.addEventListener('click', () => {
            prevBtn.classList.add('btn-clicked');
            setTimeout(() => {
              prevBtn.classList.remove('btn-clicked');
            }, 100);
;
            if (this.finalStepContainer.style.display === 'flex') {
              this.answers.pop();
              this.finalStepContainer.style.display = 'none';
              this.stepContainer.style.display = 'flex';
              this.stepsManager.displayStep(this.currentStep);
            } else if (this.currentStep > 0) {
                this.currentStep--;
                this.stepsManager.displayStep(this.currentStep);
                this.answers.pop();
            } else if (this.currentStep === 0) {
              this.bannerCarousel.src = 'https://b2ccdn.coraltravel.lt/content/Travel%20in%20January.jpg';
              this.introContainer.style.display = 'flex';
              this.stepContainer.style.display = 'none';
              this.progressBar.style.display = 'none';
              this.answers = [];
            }
          });
        }
    }

    attachNextButtonListener() {
        var isFinal = false;
        const nextBtn = document.querySelector('.button-direction-next');
        if (nextBtn) {
          //nextBtn.replaceWith(nextBtn.cloneNode(true));
          //const newNextBtn = document.querySelector('.button-direction-next');
          nextBtn.addEventListener('click', () => {
            nextBtn.classList.add('btn-clicked');
            setTimeout(() => {
              nextBtn.classList.remove('btn-clicked');
            }, 100);
            if (this.currentStep < this.steps.length - 1) {
                this.currentStep++;
                this.stepsManager.displayStep(this.currentStep);
            } else if (this.currentStep === this.steps.length - 1) {
              this.stepsManager.catchAnswer();
              this.stepsManager.updateProgress(isFinal = true);
              this.nextButtonEffects(true);
              this.stepContainer.style.display = 'none';
              this.finalStepContainer.style.display = 'flex';
            }
          });
        }
    }

    nextButtonEffects(isFinal) {
        const nextBtn = document.querySelector('.button-direction-next');
        if (this.currentStep % 2 === 0) {
          nextBtn.style.backgroundColor = '#0093d0';
        } else {
          nextBtn.style.backgroundColor = '#e84f0e';
        }
        if (isFinal) {
          nextBtn.innerHTML = `
            Paieška
            <svg class="arrow-icon-next" width="21" height="21" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6L8 11L13 6" stroke="#fff" stroke-linejoin="round"></path>
            </svg>
          `;
          if ((this.currentStep + 1) % 2 === 0) {
            nextBtn.style.backgroundColor = '#0093d0';
          } else {
            nextBtn.style.backgroundColor = '#e84f0e';
          }
          //nextBtn.addEventListener('click', throwSearchResult);
        } else {
          nextBtn.innerHTML = `
            Toliau
            <svg class="arrow-icon-next" width="21" height="21" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6L8 11L13 6" stroke="#fff" stroke-linejoin="round"></path>
            </svg>
          `;
          //nextBtn.removeEventListener('click', throwSearchResult);
        }
      }
  }
=======
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
>>>>>>> 620af92a668dd50f4adb8696cb7258668d8217b0
  