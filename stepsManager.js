class StepManager {
    constructor(guide) {
      this.guide = guide;
    }
  
    displayStep(stepIndex = 0) {
      const { steps, stepContainer, bannerCarousel } = this.guide;
      const stepData = steps[stepIndex];
      const headingContainer = document.querySelector('.travel-help-step h2');
      const questionContainer = document.querySelector('.travel-help-step h3');
      const buttonContainer = document.querySelector('.step-choice-grid');
      const infoSheetContainer = document.querySelector('.travel-info-sheet');

      console.log(this.guide.answers.join(' '));
      console.log("Current Step:", this.guide.currentStep);
      console.log("Answers length: ", this.guide.answers.length);

      this.setLayout(stepData, stepContainer, buttonContainer, infoSheetContainer);

      headingContainer.textContent = stepData.heading;
      questionContainer.textContent = stepData.question;
      buttonContainer.innerHTML = '';
      this.updateBanner(stepData.img, bannerCarousel);

      stepData.choices.forEach(choice => this.createChoiceButton(choice, stepData, buttonContainer));

      this.updateProgress();
      this.guide.nextButtonEffects();
    }
  
    setLayout(stepData, stepContainer, buttonContainer, infoSheetContainer) {
        console.log('Layout:', stepData.layout);
        buttonContainer.classList.remove('grid', 'grid-two-columns');
        stepContainer.classList.remove('grid', 'grid-two-columns');
  
        if (stepData.layout === 'grid') {
            buttonContainer.classList.add('grid');
            stepContainer.classList.add('grid');
            infoSheetContainer.style.display = 'grid';
        } else if (stepData.layout === 'grid-two-col') {
            buttonContainer.classList.add('grid-two-columns');
            stepContainer.classList.add('grid-two-columns');
            infoSheetContainer.style.display = 'none';
        } else {
            infoSheetContainer.style.display = 'none';
        }
    }
  
    updateBanner(imgSrc, bannerCarousel) {
      bannerCarousel.parentElement.classList.add('fade-out');
      bannerCarousel.src = imgSrc;
      bannerCarousel.parentElement.classList.remove('fade-out');
    }
  
    createChoiceButton(choice, stepData, buttonContainer) {
      const button = document.createElement('button');
      button.classList.add('choice-button');
      button.classList.remove('grid', 'grid-two-columns');
      button.textContent = choice;

      if (stepData.layout === 'grid') {
          button.classList.add('grid');
      } else if (stepData.layout === 'grid-two-col') {
          button.classList.add('grid-two-columns');
      }
  
      button.addEventListener('click', () => this.handleChoiceButtonClick(choice, stepData, button));
      button.addEventListener('touchstart', (event) => {
        event.preventDefault();
        this.handleChoiceButtonClick(choice, stepData, button);
      });
  
      buttonContainer.appendChild(button);
    }
  
    handleChoiceButtonClick(choice, stepData, button) {
      const { guide } = this;
  
      if (stepData.layout === 'grid' || stepData.layout === 'grid-two-col') {
        guide.countryChoice = [];
        if (button.classList.contains('selected')) {
          button.classList.remove('selected');
        } else {
          document.querySelectorAll('.choice-button').forEach(btn => btn.classList.remove('selected'));
          button.classList.add('selected');
          guide.infoSheetManager.displayInfoSheet(choice);
          guide.countryChoice.push(choice);
        }
      } else {
        guide.answers.push(choice);
        guide.currentStep++;
        this.displayStep(guide.currentStep);
      }
    }

    updateProgress(isFinal) {
      const { guide } = this;
      const barFiller = document.querySelector('.bar-filler');
      var percentage = ((guide.currentStep + 1) / (guide.steps.length + 1)) * 100;
      if (isFinal) {
        percentage = 100;
      }
      barFiller.style.width = `${percentage}%`;
    }

    catchAnswer() {
        const { guide } = this;
        var dateChoices = guide.steps[1].choices;
        var selectedDates = guide.answers.filter(answer => dateChoices.includes(answer));
        var lastDate = selectedDates[selectedDates.length - 1];
        guide.dateAnswer.textContent = lastDate || '';
        var destinationChoices = guide.steps[2].choices;
        var selectedDestinations = guide.answers.filter(answer => destinationChoices.includes(answer));
        var lastDestination = selectedDestinations[selectedDestinations.length - 1];
        guide.destinationAnswer.textContent = lastDestination || '';
        var travelersChoices = guide.steps[3].choices;
        var selectedTravelers = guide.answers.filter(answer => travelersChoices.includes(answer));
        var lastTraveler = selectedTravelers[selectedTravelers.length - 1];
        guide.travelersAnswer.textContent = lastTraveler || '';
        var detailsChoices = guide.steps[4].choices;
        var selectedDetails = guide.answers.filter(answer => detailsChoices.includes(answer));
        var lastDetail = selectedDetails[selectedDetails.length - 1];
        guide.detailsAnswer.textContent = lastDetail || '';
      }
  }
  