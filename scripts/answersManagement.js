class AnswersManagement {
  static RED_COLOR = "#E4080A";

  constructor(guide) {
    this.guide = guide;

    this.initializeDOMElements();
  }

  initializeDOMElements() {
    this.textContent = document.querySelector(".final-step-text-content");
    this.destinationTag = document.getElementById("destinationTag");
    this.seasonTag = document.getElementById("seasonTag");
    this.dateTag = document.getElementById("dateTag");
    this.nextBtn = document.querySelector(".button-direction-next");
    this.searchButton = document.querySelector(".final-step-button-view");

    this.searchButton.addEventListener("click", (event) => this.handleSearchButtonClick(event));
  }

  isEmpty() {
    if (
      this.guide.containersManagement.getCountryChoice() === "" ||
      this.guide.containersManagement.getNightChoice() === "" ||
      this.guide.containersManagement.getSeasonChoice() === ""
    ) {
        return true;
    } else{
        return false;
    }
  }

  callFunction(){
    console.log(this.isEmpty());
    if(this.isEmpty()){
      this.markEmpty();
    }
    
  }

  markEmpty() {
    const fields = [
      {
        choice: this.guide.containersManagement.getCountryChoice(),
        tag: this.destinationTag,
      },
      {
        choice: this.guide.containersManagement.getNightChoice(),
        tag: this.dateTag,
      },
      {
        choice: this.guide.containersManagement.getSeasonChoice(),
        tag: this.seasonTag,
      },
    ];

    fields.forEach((field) => {
      if (field.choice === "") {
        this.applyEmptyStyle(field.tag);
      }
    });

    this.changeTextContent();
  }

  applyEmptyStyle(tag) {
    tag.style.color = AnswersManagement.RED_COLOR;
    tag.style.textDecoration = "underline";
  }

  changeTextContent() {
    this.textContent.innerHTML = `Raudonai pažymėti laukeliai negali būti tušti.<br> Grįžkite atgal ir atsakykite į būtinus klausimus.`;
    this.textContent.style.color = AnswersManagement.RED_COLOR;

    this.applyStylesForButtons();
  }

  applyStylesForButtons() { 
    this.nextBtn.style.backgroundColor = AnswersManagement.RED_COLOR;
    this.searchButton.style.backgroundColor = AnswersManagement.RED_COLOR;
  }

  handleSearchButtonClick(event) {
    event.preventDefault();

    this.searchButton.classList.add("shake");

    setTimeout(() => {
        this.searchButton.classList.remove("shake");
    }, 500);
  }
}
