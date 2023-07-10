import "./style.css";
import img1 from './images/slide-img1.jpg';
import img2 from './images/slide-img2.jpg';
import img3 from './images/slide-img3.jpg';
import img4 from './images/slide-img4.jpg';
import img5 from './images/slide-img5.jpg';

function createSlider (ImageArr) {
    const slider = document.createElement('div');

    slider.innerHTML = 

    `<div class="slides-wrapper">
    <div class="slide active" style="background: yellow;"></div>
    <div class="slide" style="background: brown;"></div>
    <div class="slide" style="background: purple;"></div>
    <div class="slide" style="background: orange;"></div>
    <div class="slide" style="background: red;"></div>
  </div>
  <div class="slide-indicators">
    <button type="button" class="active"></button>
    <button type="button"></button>
    <button type="button"></button>
    <button type="button"></button>
    <button type="button"></button>
  </div>
  <button type="button" class="prev-button"></button>
  <button type="button" class="next-button"></button>`


    // const [wrapper, indicators, prevBtn, nextBtn] = slider.children;

    // ImageArr.forEach(image => {
    //     const imageSlide = document.createElement('div');
    //     imageSlide.classList.add('slide');
    //     const indicatorBtn = document.createElement('button');
    //     const img = new Image();
    //     img.src = image;

    //     wrapper.appendChild(imageSlide);
    //     imageSlide.appendChild(img);
    //     indicators.appendChild(indicatorBtn);
    // });


    return slider;
};

document.body.appendChild(createSlider([img1, img2, img3, img4, img5]))


