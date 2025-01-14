class GuideEffects {
  constructor(guide) {
    this.guide = guide;

    this.initializeDOMElements();
  }

  initializeDOMElements() {
    this.introContainer = document.querySelector(".travel-help-intro");
    this.introContent = document.querySelector(".travel-help-intro-content");
    this.stepContainer = document.querySelector(".travel-help-step");
    this.progressBar = document.querySelector(".travel-help-step-progress");
    this.bannerCarousel = document.querySelector(".banner-carousel");
    this.finalStepContainer = document.querySelector(".final-step");
    this.infoSheetContainer = document.querySelector(".travel-info-sheet");
    this.buttonContainer = document.querySelector(".step-choice-grid");
    this.searchResultButton = document.querySelector(".final-step-button-view");
  }

  applyStartEffects() {
    this.introContainer.style.height = "0";

    this.stepContainer.style.height = "0";
    this.stepContainer.style.opacity = "0";

    this.progressBar.style.height = "0";
    this.progressBar.style.opacity = "0";

    this.stepContainer.style.display = "flex";
    this.progressBar.style.display = "flex";

    this.introContent.style.transform = "translateY(-100%)";

    setTimeout(() => {
      this.introContainer.style.display = "none";

      this.stepContainer.style.opacity = "1";
      this.progressBar.style.opacity = "1";

      this.stepContainer.style.height = "80%";
      this.progressBar.style.height = "66px";
    }, 700);

    setTimeout(() => {
      this.introContainer.style.height = "100%";
      this.introContent.style.transform = "translateY(0)";
    }, 800);
  }

  applyBannerCarouselEffects() {
    // this.bannerCarousel.classList.add("fade-out");

    // setTimeout(() => {
    //   this.bannerCarousel.style.opacity = "1";
    //   this.bannerCarousel.classList.remove("fade-out")
    // }, 1000)

    const images = document.querySelectorAll(
      ".travel-help-banner-carousel img"
    );
    let currentIndex = Array.from(images).findIndex((img) =>
      img.classList.contains("slide-in")
    );

    images[currentIndex].classList.add("slide-out");
    images[currentIndex].classList.remove("slide-in");

    setTimeout(() => {
      images[currentIndex].classList.add("hidden");
      images[currentIndex].classList.remove("slide-out");

      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].classList.remove("hidden");
      images[currentIndex].classList.add("slide-in");
    }, 0);
  }
}
