'strict mode';
window.addEventListener('DOMContentLoaded', () => {

   //Tabs

   const tabs = document.querySelectorAll('.tabheader__item'),    // Tabs which we will click on
      tabsContent = document.querySelectorAll('.tabcontent'),     //Content which will be on the page
      tabsParent = document.querySelector('.tabheader__items');   //Parent of all tabs (Event Delegation)

   function hideTabContent() {      //First func that hide all our tabs
      tabsContent.forEach(item => {
         item.classList.add('hide');      //Adding css class .hide
         item.classList.remove('show', 'fade');    //Removing css class .show, .fade
      });
      tabs.forEach(tab => {
         tab.classList.remove('tabheader__item_active');    //Removing tab css class
      });
   }
   function showTabContent(i = 0) {    //Func that show tabs (i by default 0)ES6
      tabsContent[i].classList.add('show', 'fade');      //Adding css class .show, .fade
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active'); //Adding tab css class
   }
   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', event => {    //Adding Event Listener for parent
      const target = event.target;     // For easies use

      if (target && target.classList.contains('tabheader__item')) {     //We check that we click on the text
         tabs.forEach((item, i) => {      //Callback func with item = tab, i = num in order
            if (target == item) {      //If tab that we click compare with item, we call two function
               hideTabContent();    // first one to hide everythingoth
               showTabContent(i);    //Second to show tab with nub that we click
            }
         });
      }
   });

   //Timer

   const deadLine = '2023-06-03', //Our deadline(end of the timer)
      timerBlock = document.querySelector('.timer'),
      timerParrent = document.querySelector('.promotion__timer'),
      timerTitle = timerParrent.querySelector('.title');
   function GetTimeRemaining(endtime) {            //Function that detects difference between deadline and current date
      let days, hours, mins, secs;
      const t = Date.parse(endtime) - Date.parse(new Date());  //Diff between deadline and current date
      if (t <= 0) {     //If date already ended we will have 0 on timer
         timerBlock.classList.add('hiden');     //Hiding timer
         timerTitle.classList.add('hiden');     //hiding title
         timerParrent.innerHTML += '<div class="promotion__end">Акція вже закінчилась</div>';      //Adding block with ending
         // days = 0;
         // hours = 0;
         // mins = 0;
         // secs = 0;
      } else {
         days = Math.floor(t / (1000 * 60 * 60 * 24));      //Turning miliseconds in days
         hours = Math.floor((t / (1000 * 60 * 60) % 24));   //Turning miliseconds in hours
         mins = Math.floor((t / 1000 / 60) % 60);     //Turning miliseconds in minutes
         secs = Math.floor((t / 1000) % 60);    //Turning miliseconds in seconds

      }
      return {       //Return object with that info
         'total': t,
         'days': days,
         'hours': hours,
         'mins': mins,
         'secs': secs
      };
   }

   function getZero(num) {    //Func that will add 0 to our numbers from 0-9 in timer
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }


   function setClock(selector, endtime) {    //Func that create and show our timer on webpage
      const timer = document.querySelector(selector),   //We use seletor, because we can put there diff timers from HTML
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         mins = timer.querySelector('#minutes'),
         secs = timer.querySelector('#seconds'),
         timeInterval = setInterval(updateClock, 1000);     //Create interval to update timer every 1 second (1000ms)

      updateClock();    //We immediately call func, because there is 1s delay, after it will be update

      function updateClock() {      //Func that update our timer every 1 s,and push numbers to HTML
         const t = GetTimeRemaining(endtime);   //Call func into a t

         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         mins.innerHTML = getZero(t.mins);
         secs.innerHTML = getZero(t.secs);

         if (t.total <= 0) {     //When timer got to 0 or -num, we stop timer
            clearInterval(timeInterval);
         }
      }
   }
   setClock('.timer', deadLine);    //Call func that create timer, and put there .timer from HTML, and deadline


   //Modal

   const contactBtn = document.querySelectorAll('[data-modal]'),     //Btns for opening our modal window
      modalWindow = document.querySelector('.modal');    //Our modal window

   function openModal() {         //Creating func for opening window
      modalWindow.classList.add('show');
      modalWindow.classList.remove('hide');
      document.body.style.overflow = 'hidden';     //We can't scroll now, when window is open
      clearInterval(modalTimer);       // If user opened modal by himself we will close timer
   }

   contactBtn.forEach(btn => {
      btn.addEventListener('click', openModal);
   });


   function closeModal() {    //Func for closing window(we will reuse it) 
      modalWindow.classList.add('hide');
      modalWindow.classList.remove('show');
      document.body.style.overflow = '';     //We can scroll now
   }

   modalWindow.addEventListener('click', (e) => {     //We add closing func, when we click out of modal window
      if (e.target == modalWindow || e.target.getAttribute('data-close') == '') {      //Only when we click out of window
         closeModal();     //calling closing func
      }
   });

   document.addEventListener('keydown', (e) => {      //Add func that will close window when we press Esc
      if (e.code === 'Escape' && modalWindow.classList.contains('show')) {       //We checking, that Esc work only if our window opened
         closeModal();
      }
   });
   const modalTimer = setTimeout(openModal, 5000000000);      //We set our timer for opening window(we put the whole func, but not calling it)

   function showModalByScroll() {      //Adding func that open modal when we scroll to the end of the page
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {    //If scrolled part + visible part of page right now >= comapare to full site width
         openModal();      //Call func
         window.removeEventListener('scroll', showModalByScroll);    //Add remove so window doesnt show again if we scroll to the end again
      }
   }

   window.addEventListener('scroll', showModalByScroll);    //Add E listener, so modal window will be shown when we scroll to the end


   // Using classes for cards

   class MenuCard {     //creating new template
      constructor(src, alt, title, descr, price, parentSelector, ...className) {      // Adding all nedeed arguments(...className-rest op.)
         this.src = src;      // Way to our img
         this.alt = alt;      // alt text
         this.title = title;     //title for card
         this.descr = descr;     //descr for card
         this.price = price;
         this.classes = className;    //creating value for our array with classes
         this.transfer = 37;       //usd curr
         this.changeToUAH();     //calling metod for transfering currency
         this.parent = document.querySelector(parentSelector);    //creating new property, where we will push our cards
      }
      changeToUAH() {      //our method for transfering currency
         this.price = this.price * this.transfer;
      }
      render() {     //our method for adding card to the HTML
         const element = document.createElement('div');     //creating element
         if (this.classes.length === 0) {       //Creating if, for case when there is on classes given to rest op ...className, then class menu__item, will be added automaticly
            element.classList.add('menu__item');
         } else {
            this.classes.forEach(className => element.classList.add(className));         //Using forEach for this.classes because it's an array, and adding each class to the div
         }
         element.innerHTML =
            `<img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
               <div class="menu__item-cost">Цена:</div>
               <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;    //creating HTML construction in this element
         this.parent.append(element);     //adding element to the HTML block(parent)
      }
   }

   const getResources = async (url) => {         // responds for posting data from webpage to server
      const result = await fetch(url);


      return await result.json();
   };

   // getResources('http://localhost:3000/menu')         //from server we get array with info
   // .then(data => {            //then we use forEach to sort our obj
   //    data.forEach(({ img, altimg, title, descr, price }) => {       // we use destructurisation for that object
   //       new MenuCard(img, altimg, title, descr, price, '.menu .container').render();      // then we push them to our constructor, and result method, which we created
   //    });
   //    });

   axios.get('http://localhost:3000/menu')
      .then(data => {            //then we use forEach to sort our obj
         data.data.forEach(({ img, altimg, title, descr, price }) => {       // we use destructurisation for that object
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();      // then we push them to our constructor, and result method, which we created
         });
      });
   // Forms

   const forms = document.querySelectorAll('form');      //taking our forms

   const message = {          // msgs for our request
      load: 'img/form/spinner.svg',
      success: 'Thanks, we will connect you',
      failure: 'Something goes wrong'
   };

   forms.forEach(item => {    //adding func to our forms
      bindPostData(item);
   });


   const postData = async (url, data) => {         // responds for posting data from webpage to server
      const result = await fetch(url, {
         method: "POST",
         headers: {
            'Content-type': 'application/json'
         },
         body: data
      });
      return await result.json();
   };


   function bindPostData(form) {     //func for  binding our data requests to forms on website
      form.addEventListener('submit', (e) => {        //event for forms
         e.preventDefault();

         const statusMessage = document.createElement('img');     //creating spinner for user
         statusMessage.src = message.load;         //path to the svg
         statusMessage.classList.add('modal__spinner');     // adding class

         form.insertAdjacentElement('afterend', statusMessage);      //adding to the HTML


         const formData = new FormData(form);      // creating obj FormData as a constructor, form is a window where we write info, formData collect our info from form

         const json = JSON.stringify(Object.fromEntries(formData.entries()));          // than we transform it to array of arrays, that transform to the classic obj, than we transform it to json format

         postData('http://localhost:3000/requests', json)        //sending data via fetch API(way), and than send it in json format to our server
            .then(data => {
               console.log(data);
               showThanksModal(message.success);      //if ok, showing good msg
               statusMessage.remove();    //removing spinner because we sended our request
            }).catch(() => {     //if error
               showThanksModal(message.failure);   //showing bad msg
            }).finally(() => {
               form.reset();        //in both cases reseting our form
            });



      });
   }

   function showThanksModal(message) {        // creating func for showing window after user send his details
      const prevModalDialog = document.querySelector('.modal__dialog');       //taking previous modal

      prevModalDialog.classList.add('hide');       //hiding it
      openModal();      //calling new modal

      const thanksModal = document.createElement('div');          //creating new modal 
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
      <div class="modal__content">
         <div class="modal__close" data-close>×</div>
         <div class="modal__title">${message}</div>
      </div>
      `;                         // adding (×) to close, and message

      document.querySelector('.modal').append(thanksModal);          //adding to HTML
      setTimeout(() => {         //setting timeout for that our thanks will be removed after 4s, and we get back to modal with conact forms
         thanksModal.remove();
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         closeModal();
      }, 4000);
   }
   let slidersIndex = 1;      //adding index for our slides
   let offset = 0;
   const currentId = document.querySelector('#current'),
      totalId = document.querySelector('#total'),
      sliders = document.querySelectorAll('.offer__slide'),
      pointPrev = document.querySelector('.offer__slider-prev'),
      pointNext = document.querySelector('.offer__slider-next'),
      slidersWrapper = document.querySelector('.offer__slider-wrapper'),
      slidersField = document.querySelector('.offer__slider-inner'),
      width = window.getComputedStyle(slidersWrapper).width;

   slidersField.style.width = `${100 * sliders.length}%`;
   slidersField.style.display = 'flex';
   slidersField.style.transition = '0.5s all';
   slidersWrapper.style.overflow = 'hidden';
   sliders.forEach(slide => {
      slide.style.width = width;
   });

   if (sliders.length < 10) {
      totalId.textContent = `0${sliders.length}`;        //if slider less than 10, than adding 0 befoure counting
      currentId.textContent = `0${slidersIndex}`;
   } else {
      totalId.textContent = sliders.length;
      currentId.textContent = slidersIndex;
   }

   console.log(width);
   pointNext.addEventListener('click', () => {
      if (offset == +width.slice(0, width.length - 2) * (sliders.length - 1)) {
         offset = 0;
      } else {
         offset += +width.slice(0, width.length - 2);
      }
      slidersField.style.transform = `translateX(-${offset}px)`;

      if (slidersIndex == sliders.length) {
         slidersIndex = 1;
      } else {
         slidersIndex++;
      }

      if (slidersIndex < 10) {
         currentId.textContent = `0${slidersIndex}`;
      } else {
         currentId.textContent = slidersIndex;
      }
   });

   pointPrev.addEventListener('click', () => {
      if (offset == 0) {
         offset = +width.slice(0, width.length - 2) * (sliders.length - 1);
      } else {
         offset -= width.slice(0, width.length - 2);
      }
      slidersField.style.transform = `translateX(-${offset}px)`;

      if (slidersIndex == 1) {
         slidersIndex = sliders.length;
      } else {
         slidersIndex--;
      }

      if (slidersIndex < 10) {
         currentId.textContent = `0${slidersIndex}`;
      } else {
         currentId.textContent = slidersIndex;
      }

   });


});