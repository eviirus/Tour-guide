class AnswersManagement {
  static RED_COLOR = "#E4080A";
  static ORANGE_COLOR = "#e84f03";
  static BLACK_COLOR = "#000000";
  static BLUE_COLOR = "#0093d9";

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

  checkIfEmpty() {
    if (this.isEmpty()) {
        this.markEmpty();
        return true;
    } else {
        this.markEmpty();
        return false;
    }
  }

  isEmpty() {
    if (
      this.guide.containersManagement.getCountryChoice() === "" ||
      this.guide.containersManagement.getNightChoice() === "" ||
      this.guide.containersManagement.getSeasonChoice() === ""
    ) {
        console.log("isEmpty returning true");
        return true;
    } else {
        console.log("isEmpty returning false");
        return false;
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
      } else{
        this.applyFilledStyle(field.tag);
      }
    });

    this.changeTextContent();
  }

  applyEmptyStyle(tag) {
    tag.style.color = AnswersManagement.RED_COLOR;
    tag.style.textDecoration = "underline";
  }

  applyFilledStyle(tag){
    tag.style.color = AnswersManagement.ORANGE_COLOR;
    tag.style.textDecoration = "none";
  }

  changeTextContent() {
    if(this.isEmpty()){
        this.textContent.innerHTML = `Raudonai pažymėti laukeliai negali būti tušti.<br> Grįžkite atgal ir atsakykite į būtinus klausimus.`;
        this.textContent.style.color = AnswersManagement.RED_COLOR;
    } else{
        this.textContent.innerHTML = `Peržiūrėkite galimus variantus.<br>Jeigu rezultatų nėra arba jums nepatiko, siūlome susisiekti su mumis - padėsime sukurti kėlionę!`;
        this.textContent.style.color = AnswersManagement.BLACK_COLOR;
    }
    
    this.applyStylesForButtons();
  }

  applyStylesForButtons() { 
    if(this.isEmpty()){
        this.nextBtn.style.backgroundColor = AnswersManagement.RED_COLOR;
        this.searchButton.style.backgroundColor = AnswersManagement.RED_COLOR;
    } else{
        this.nextBtn.style.backgroundColor = AnswersManagement.BLUE_COLOR;
        this.searchButton.style.backgroundColor = AnswersManagement.BLUE_COLOR;
    }
  }

  handleSearchButtonClick(event) {
    if(this.isEmpty()){
        event.preventDefault();

        this.searchButton.classList.add("shake");
    
        setTimeout(() => {
            this.searchButton.classList.remove("shake");
        }, 500);
    }
  }
}
