<<<<<<< HEAD
import { infoSheet } from './infoSheet.js';
import { steps } from './steps.js';

document.addEventListener('DOMContentLoaded', () => {
  const guide = new TravelGuide(steps, infoSheet);
  guide.stepsManager = new StepManager(guide);
  guide.infoSheetManager = new InfoSheetManager(guide);

  guide.initialize();
});
=======
import { infoSheet } from './infoSheet.js';
import { steps } from './steps.js';

document.addEventListener('DOMContentLoaded', () => {
  const guide = new TravelGuide(steps, infoSheet);
  guide.stepsManager = new StepManager(guide);
  guide.infoSheetManager = new InfoSheetManager(guide);

  guide.initialize();
});
>>>>>>> 620af92a668dd50f4adb8696cb7258668d8217b0
