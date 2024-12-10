<<<<<<< HEAD
class InfoSheetManager {
    constructor(guide) {
      this.guide = guide;
    }
  
    displayInfoSheet(choice) {
      const infoChange = document.querySelectorAll('.info-changing');
      const selectedInfo = this.guide.infoSheet.find(item => item.element === choice);
  
      if (selectedInfo) {
        selectedInfo.content.forEach((content, index) => {
          infoChange[index].textContent = content || " ";
        });
      } else {
        infoChange.forEach(content => content.textContent = " ");
      }
    }
  }
=======
class InfoSheetManager {
    constructor(guide) {
      this.guide = guide;
    }
  
    displayInfoSheet(choice) {
      const infoChange = document.querySelectorAll('.info-changing');
      const selectedInfo = this.guide.infoSheet.find(item => item.element === choice);
  
      if (selectedInfo) {
        selectedInfo.content.forEach((content, index) => {
          infoChange[index].textContent = content || " ";
        });
      } else {
        infoChange.forEach(content => content.textContent = " ");
      }
    }
  }
>>>>>>> 620af92a668dd50f4adb8696cb7258668d8217b0
  