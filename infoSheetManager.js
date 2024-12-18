class InfoSheetManager {
  constructor(infoSheet) {
    this.infoSheet = infoSheet;
  }

  displayInfoSheet(choice) {
    const infoChange = document.querySelectorAll(".info-changing");
    const selectedInfo = this.infoSheet.find(
      (item) => item.element === choice
    );

    if (selectedInfo) {
      selectedInfo.content.forEach((content, index) => {
        infoChange[index].textContent = content || " ";
      });
    } else {
      infoChange.forEach((content) => (content.textContent = " "));
    }
  }
}
