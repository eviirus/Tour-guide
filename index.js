import { infoSheet } from "./scripts/infoSheet.js";
import { steps } from "./scripts/steps.js";
import { nightManagement } from "./scripts/answersManagement/nightManagement.js";
import { seasonManagement } from "./scripts/answersManagement/seasonManagement.js";
import { travellerManagement } from "./scripts/answersManagement/travellerManagement.js";
import { hotelCategoryManagement } from "./scripts/answersManagement/hotelCategoryManagement.js";
import { hotelConceptManagement } from "./scripts/answersManagement/hotelConceptManagement.js";
import { fetchEncryptedData } from "./scripts/searchResultGenerating.js";
import { countryDetails } from "./scripts/answersManagement/countryDetails.js";
import ValuesGenerating from "./scripts/valuesGenerating.js";

import TravelGuide from "./scripts/travelGuide.js";
import StepManager from "./scripts/stepsManager.js";
import InfoSheetManager from "./scripts/infoSheetManager.js";
import ContainersManagement from "./scripts/containersManagement.js";
import AnswersManagement from "./scripts/answersManagement.js";
import GuideEffects from "./scripts/guideEffects.js";

document.addEventListener("DOMContentLoaded", () => {
  const guide = new TravelGuide(steps);

  guide.stepsManager = new StepManager(guide, countryDetails, hotelConceptManagement);
  guide.infoSheetManager = new InfoSheetManager(infoSheet);
  guide.containersManagement = new ContainersManagement(guide, steps, fetchEncryptedData);
  guide.valuesGenerating = new ValuesGenerating(guide, nightManagement, seasonManagement, travellerManagement, hotelCategoryManagement, hotelConceptManagement);
  guide.answersManagement = new AnswersManagement(guide);
  guide.guideEffects = new GuideEffects(guide, countryDetails, hotelConceptManagement);

  guide.initialize();
});