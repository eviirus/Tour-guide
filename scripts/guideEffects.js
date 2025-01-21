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
    }, 500);

    setTimeout(() => {
      this.introContainer.style.height = "100%";
      this.introContent.style.transform = "translateY(0)";
    }, 800);
  }

  applyBannerCarouselEffectsForward() {
    const images = Array.from(document.querySelectorAll(".travel-help-banner-carousel img"));

    let currentIndex = images.findIndex((img) =>
        img.classList.contains("current")
    );

    images[currentIndex].classList.remove("current");
    images[currentIndex].classList.add("prev");

    images[currentIndex + 1].classList.remove("next");
    images[currentIndex + 1].classList.add("current");
  }

  applyBannerCarouselEffectsBackward() {
    const images = Array.from(document.querySelectorAll(".travel-help-banner-carousel img"));

    let currentIndex = images.findIndex((img) =>
        img.classList.contains("current")
    );

    images[currentIndex].classList.remove("current");
    images[currentIndex].classList.add("next");

    images[currentIndex - 1].classList.remove("prev");
    images[currentIndex - 1].classList.add("current");
  }
}
