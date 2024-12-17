import { infoSheet } from './infoSheet.js';
import { steps } from './steps.js';

document.addEventListener('DOMContentLoaded', () => {
  const guide = new TravelGuide(steps, infoSheet);

  guide.stepsManager = new StepManager(guide);
  guide.infoSheetManager = new InfoSheetManager(guide);
  guide.containersManagement = new ContainersManagement(guide, steps);

  guide.initialize();
});
