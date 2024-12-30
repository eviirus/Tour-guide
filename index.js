import { infoSheet } from "./scripts/infoSheet.js";
import { steps } from "./scripts/steps.js";
import { nightManagement } from "./scripts/answersManagement/nightManagement.js";
import { priceManagement } from "./scripts/answersManagement/priceManagement.js";
import { seasonManagement } from "./scripts/answersManagement/seasonManagement.js";
import { travellerManagement } from "./scripts/answersManagement/travellerManagement.js";
import { fetchEncryptedData } from "./scripts/searchResultGenerating.js";

document.addEventListener("DOMContentLoaded", () => {
  const guide = new TravelGuide(steps);

  guide.stepsManager = new StepManager(guide);
  guide.infoSheetManager = new InfoSheetManager(infoSheet);
  guide.containersManagement = new ContainersManagement(guide, steps, fetchEncryptedData);
  guide.valuesGenerating = new ValuesGenerating(guide, nightManagement, priceManagement, seasonManagement, travellerManagement);

  guide.initialize();
});