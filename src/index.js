import "./style.css";
import img1 from './images/slide-img1.jpg';
import img2 from './images/slide-img2.jpg';
import img3 from './images/slide-img3.jpg';
import img4 from './images/slide-img4.jpg';
import img5 from './images/slide-img5.jpg';

function createSlider (ImageArr, 
    {
    currentSlideIndex = 0, 
    duration = 750, 
    easing = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)',
    slideShowInterval = 4000
   } = {}
   ) {
    const slider = document.createElement('div');
    slider.className = 'slider';
    slider.innerHTML = `
    <div class="slides-wrapper"></div> 
    <div class="slide-indicators"></div> 
    <button type="button" class="prev-button"></button> 
    <button type="button" class="next-button"></button>
    `;

    const [wrapper, indicators, prevBtn, nextBtn] = slider.children;
    

    ImageArr.forEach((image, index) => {
        const imageSlide = document.createElement('div');
        imageSlide.classList.add('slide');
        const indicatorBtn = document.createElement('button');
            if (index === 0) {
            imageSlide.classList.add('current-slide');
            indicatorBtn.focus();
        }
        const img = new Image();
        img.src = image;

        wrapper.appendChild(imageSlide);
        imageSlide.appendChild(img);
        indicators.appendChild(indicatorBtn);
    });

    const slidesArr = [...wrapper.children];
    const indicatorButtonsArr = [...indicators.children];
    
    function setCurrentSlide() {
        slidesArr.forEach((slide, index) => {
            if (index === currentSlideIndex) slide.classList.add('current-slide'); 
            else slide.classList.remove('current-slide');
        })
    };

    function changeIndex(button) {
        
        if (button === 'next') {
            if (currentSlideIndex < slidesArr.length-1) currentSlideIndex += 1;
            else currentSlideIndex = 0;
        } else if (button === 'prev') {
            if (currentSlideIndex <= slidesArr.length-1 && currentSlideIndex > 0) currentSlideIndex -= 1; 
                else currentSlideIndex = slidesArr.length-1;         
        }   
    }

    function changeIndicatorFocus() {
        document.querySelector('.slide-indicators').children[currentSlideIndex].focus();
    };


    nextBtn.addEventListener('click', () => {
        // wrapper.children[currentSlideIndex].animate(
        //     [{ transform: "translateX(0)" }, { transform: "translateX(100%)" }],
        //     {
        //       duration,
        //       easing,
        //       fill: 'forwards',
        //     }
        //   );
        changeIndex('next');
        setCurrentSlide(slidesArr);
        changeIndicatorFocus();



    });

    prevBtn.addEventListener('click', () => {
        changeIndex('prev');
        setCurrentSlide(slidesArr);
        changeIndicatorFocus();
    });


    return slider;
};

document.body.appendChild(createSlider([img1, img2, img3, img4, img5]))






