export default class InfoSheetManager {
  constructor(infoSheet) {
    this.infoSheet = infoSheet;

    this.passportLink = document.querySelector(".passport-info-link");
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
      this.passportLink.href = selectedInfo.link || "#";
    } else {
      infoChange.forEach((content) => (content.textContent = " "));
      this.passportLink.href = "#";
    }
  }
}
