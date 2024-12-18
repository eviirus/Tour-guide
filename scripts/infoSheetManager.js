class InfoSheetManager {
  constructor(infoSheet) {
    this.infoSheet = infoSheet;

    // Debugging: Log the infoSheet on initialization
    console.log("Initialized infoSheet:", this.infoSheet);
  }

  displayInfoSheet(choice) {
    const infoChange = document.querySelectorAll(".info-changing");

    // Validate `this.infoSheet`
    if (!Array.isArray(this.infoSheet)) {
      console.error("Error: infoSheet is not an array:", this.infoSheet);
      infoChange.forEach((content) => (content.textContent = " "));
      return;
    }

    // Debugging: Log choice and infoSheet for the find method
    console.log("Choice:", choice);
    console.log("infoSheet before find:", this.infoSheet);

    const selectedInfo = this.infoSheet.find(
      (item) => item.element === choice
    );

    // Debugging: Log the result of the find
    console.log("Selected info:", selectedInfo);

    if (selectedInfo) {
      selectedInfo.content.forEach((content, index) => {
        infoChange[index].textContent = content || " ";
      });
    } else {
      infoChange.forEach((content) => (content.textContent = " "));
    }
  }
}
