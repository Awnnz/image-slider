import "./style.css";
import img1 from "./images/slide-img1.jpg";
import img2 from "./images/slide-img2.jpg";
import img3 from "./images/slide-img3.jpg";
import img4 from "./images/slide-img4.jpg";
import img5 from "./images/slide-img5.jpg";

function createSlider(
  ImageArr,
  {
    currentSlideIndex = 0,
    duration = 750,
    easing = "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
  } = {},
) {
  const slider = document.createElement("div");
  slider.className = "slider";
  slider.innerHTML = `
    <div class="slides-wrapper"></div> 
    <div class="slide-indicators"></div> 
    <button type="button" class="prev-button"></button> 
    <button type="button" class="next-button"></button>
    `;

  const [wrapper, indicators, prevBtn, nextBtn] = slider.children;

  ImageArr.forEach((image, index) => {
    const imageSlide = document.createElement("div");
    imageSlide.classList.add("slide");
    const indicatorBtn = document.createElement("button");
    if (index === 0) {
      imageSlide.classList.add("current-slide");
      indicatorBtn.classList.add("focused");
    }

    indicatorBtn.addEventListener("click", function () {
      const selecteddSlideIndex = Array.prototype.indexOf.call(
        this.parentElement.children,
        this,
      );
      jumpToAnimation(selecteddSlideIndex);
      setCurrentSlide();
      changeIndicatorFocus();
    });

    const img = new Image();
    img.src = image;

    wrapper.appendChild(imageSlide);
    imageSlide.appendChild(img);
    indicators.appendChild(indicatorBtn);
  });

  const slidesArr = [...wrapper.children];

  function setCurrentSlide() {
    slidesArr.forEach((slide, index) => {
      if (index === currentSlideIndex) slide.classList.add("current-slide");
      else slide.classList.remove("current-slide");
    });
  }

  function jumpToAnimation(slideIndex) {
    const prevSlideIndex = currentSlideIndex;
    currentSlideIndex = slideIndex;
    if (prevSlideIndex === currentSlideIndex) return;
    const slideDirection =
      prevSlideIndex < currentSlideIndex ? "next" : "previous";
    const pos = slideDirection === "next" ? "100%" : "-100%";

    if (slideDirection === "next") {
      wrapper.children[prevSlideIndex].animate(
        [{ transform: "translateX(0)" }, { transform: `translateX(${pos})` }],
        {
          duration,
          easing,
          fill: "forwards",
        },
      );

      wrapper.children[currentSlideIndex].animate(
        [
          { transform: `translateX(${parseInt(pos, 10) * -1}%)` },
          { transform: `translateX(0)` },
        ],
        {
          duration,
          easing,
          fill: "forwards",
        },
      );
    } else {
      wrapper.children[prevSlideIndex].animate(
        [
          { transform: "translateX(0)" },
          { transform: `translateX(${parseInt(pos, 10)}%)` },
        ],
        {
          duration,
          easing,
          fill: "forwards",
        },
      );

      wrapper.children[currentSlideIndex].animate(
        [
          { transform: `translateX(${parseInt(pos, 10) * -1}%)` },
          { transform: `translateX(0)` },
        ],
        {
          duration,
          easing,
          fill: "forwards",
        },
      );
    }
  }

  function changeIndex(button) {
    if (button === "next") {
      if (currentSlideIndex < slidesArr.length - 1) currentSlideIndex += 1;
      else currentSlideIndex = 0;
    } else if (button === "prev") {
      if (currentSlideIndex <= slidesArr.length - 1 && currentSlideIndex > 0)
        currentSlideIndex -= 1;
      else currentSlideIndex = slidesArr.length - 1;
    }
  }

  function changeIndicatorFocus() {
    // const indicatorBtns = document.querySelector('.slide-indicators');
    const indicatorBtnsArr = [
      ...document.querySelector(".slide-indicators").children,
    ];
    indicatorBtnsArr.forEach((button, index) => {
      if (index === currentSlideIndex) button.classList.add("focused");
      else button.classList.remove("focused");
    });
  }

  function slideAnimation(button) {
    const pos = button === "next" ? "100%" : "-100%";
    let nextSlideIndex;
    let prevSlideIndex;

    if (button === "next") {
      if (currentSlideIndex === ImageArr.length - 1) nextSlideIndex = 0;
      else nextSlideIndex = currentSlideIndex + 1;
      wrapper.children[currentSlideIndex].animate(
        [{ transform: "translateX(0)" }, { transform: `translateX(${pos})` }],
        {
          duration,
          easing,
          fill: "forwards",
        },
      );

      wrapper.children[nextSlideIndex].animate(
        [
          { transform: `translateX(${parseInt(pos, 10) * -1}%)` },
          { transform: `translateX(0)` },
        ],
        {
          duration,
          easing,
          fill: "forwards",
        },
      );
    } else {
      if (currentSlideIndex === 0) prevSlideIndex = ImageArr.length - 1;
      else prevSlideIndex = currentSlideIndex - 1;
      wrapper.children[currentSlideIndex].animate(
        [
          { transform: "translateX(0)" },
          { transform: `translateX(${parseInt(pos, 10)}%)` },
        ],
        {
          duration,
          easing,
          fill: "forwards",
        },
      );

      wrapper.children[prevSlideIndex].animate(
        [
          { transform: `translateX(${parseInt(pos, 10) * -1}%)` },
          { transform: `translateX(0)` },
        ],
        {
          duration,
          easing,
          fill: "forwards",
        },
      );
    }
  }

  nextBtn.addEventListener("click", () => {
    slideAnimation("next");
    changeIndex("next");
    setCurrentSlide(slidesArr);
    changeIndicatorFocus();
  });

  prevBtn.addEventListener("click", () => {
    slideAnimation("prev");
    changeIndex("prev");
    setCurrentSlide(slidesArr);
    changeIndicatorFocus();
  });

  return slider;
}

document.body.appendChild(createSlider([img1, img2, img3, img4, img5]));
