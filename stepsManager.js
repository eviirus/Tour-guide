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
  
      // Set Layout
      this.setLayout(stepData, stepContainer, buttonContainer, infoSheetContainer);
  
      // Update Content
      headingContainer.textContent = stepData.heading;
      questionContainer.textContent = stepData.question;
      buttonContainer.innerHTML = '';
      this.updateBanner(stepData.img, bannerCarousel);
  
      // Populate Choices
      stepData.choices.forEach(choice => this.createChoiceButton(choice, stepData, buttonContainer));
  
      // Update Progress
      this.updateProgress();
    }
  
    setLayout(stepData, stepContainer, buttonContainer, infoSheetContainer) {
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
      button.textContent = choice;
  
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
  
    updateProgress() {
      const { guide } = this;
      const barFiller = document.querySelector('.bar-filler');
      const percentage = ((guide.currentStep + 1) / (guide.steps.length + 1)) * 100;
      barFiller.style.width = `${percentage}%`;
    }
  }
  