function sliders({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
   let slidersIndex = 1;
   let offset = 0;
   const currentId = document.querySelector(currentCounter),
      totalId = document.querySelector(totalCounter),
      sliderParent = document.querySelector(container),
      sliders = document.querySelectorAll(slide),
      pointPrev = document.querySelector(prevArrow),
      pointNext = document.querySelector(nextArrow),
      slidersWrapper = document.querySelector(wrapper),
      slidersField = document.querySelector(field),
      width = window.getComputedStyle(slidersWrapper).width;

   slidersField.style.width = `${100 * sliders.length}%`;
   slidersField.style.display = 'flex';
   slidersField.style.transition = '0.5s all';
   slidersWrapper.style.overflow = 'hidden';
   sliders.forEach(slide => {
      slide.style.width = width;
   });

   sliderParent.style.position = 'relative';

   const dots = document.createElement('ol');
   let indicators = [];
   dots.classList.add('carousel-dots');
   sliderParent.append(dots);

   for (let i = 0; i < sliders.length; i++) {
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.classList.add('dot');

      if (i == 0) {
         dot.style.opacity = 1;
      }
      dots.append(dot);
      indicators.push(dot);
   }

   function indOpsity() {
      indicators.forEach(item => item.style.opacity = '.5');
      indicators[slidersIndex - 1].style.opacity = 1;
   }

   function currIndChanging() {
      if (slidersIndex < 10) {
         currentId.textContent = `0${slidersIndex}`;
      } else {
         currentId.textContent = slidersIndex;
      }
   }

   function replacing(str) {
      return +str.replace(/\D/g, '');
   }

   if (sliders.length < 10) {
      totalId.textContent = `0${sliders.length}`;
   } else {
      totalId.textContent = sliders.length;
   }

   pointNext.addEventListener('click', () => {
      if (offset == replacing(width) * (sliders.length - 1)) {
         offset = 0;
      } else {
         offset += replacing(width);
      }
      slidersField.style.transform = `translateX(-${offset}px)`;

      if (slidersIndex == sliders.length) {
         slidersIndex = 1;
      } else {
         slidersIndex++;
      }
      currIndChanging();
      indOpsity();
   });

   pointPrev.addEventListener('click', () => {
      if (offset == 0) {
         offset = replacing(width) * (sliders.length - 1);
      } else {
         offset -= replacing(width);
      }
      slidersField.style.transform = `translateX(-${offset}px)`;

      if (slidersIndex == 1) {
         slidersIndex = sliders.length;
      } else {
         slidersIndex--;
      }
      currIndChanging();
      indOpsity();
   });

   indicators.forEach(item => {
      item.addEventListener('click', (e) => {
         const slideTo = e.target.getAttribute('data-slide-to');
         slidersIndex = slideTo;
         offset = replacing(width) * (slideTo - 1);

         slidersField.style.transform = `translateX(-${offset}px)`;
         currIndChanging();
         indOpsity();
      });
   });

}

export default sliders;