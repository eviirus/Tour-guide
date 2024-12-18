import { infoSheet } from "./scripts/infoSheet.js";
import { steps } from "./scripts/steps.js";

document.addEventListener("DOMContentLoaded", () => {
  const guide = new TravelGuide(steps);

  guide.stepsManager = new StepManager(guide);
  guide.infoSheetManager = new InfoSheetManager(infoSheet);
  guide.containersManagement = new ContainersManagement(guide, steps);

  guide.initialize();
});
