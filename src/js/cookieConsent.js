
window.addEventListener("DOMContentLoaded", () => {



   class CookieConsent {         //creating class
      constructor({ popup, btnConfirm, btnCancel, activeClass = '' } = {}) {
         this.popup = document.querySelector(popup);     //the showing window
         this.btnConfirm = document.querySelector(btnConfirm);       //creating btn for confirmation
         this.btnCancel = document.querySelector(btnCancel);         //creating btn for canceling
         this.activeClass = activeClass;
         this.consentPropertyType = 'site_consent';
      }
      getItem(key) {       // we get and decript cookies from website

         const cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((acc, [key, value]) => ({ ...acc, [key.trim()]: value }), {});
         return cookies[key];

      }
      setItem(key, value) {      //we push cookies to the website
         document.cookie = `${key}=${value};expires=Sun, 22 Jul 2550 07:23:22 GMT`;       //pushing cookies
      }
      hasConsented() {     //follows up user consent
         if (this.getItem(this.consentPropertyType) === 'true') { //cheking if there is cookies that user accept
            return true;
         } else {
            return false;
         }
      }
      changeStatus(prop) {       //we check if user accept, we adding our scripts
         this.setItem(this.consentPropertyType, prop);
         if (this.hasConsented()) {
            //Subscribe
            myScripts();
         }
      }



      bindTriggers() {              //Adding scripts for our buttons to acc or rej cookies
         this.btnConfirm.addEventListener('click', () => {
            this.changeStatus(true);
            this.popup.classList.remove(this.activeClass);
         });

         this.btnCancel.addEventListener('click', () => {
            this.changeStatus(false);
            this.popup.classList.remove(this.activeClass);
         });
      }

      init() {    //command that will check if user acceppt cookies or not if not > initiate our message with cookies
         try {
            if (this.hasConsented()) {
               myScripts();
            } else {
               this.popup.classList.add(this.activeClass);
            }

            this.bindTriggers();       //activate method for btns
         } catch (e) {
            console.error('Передані не всі данні');         //if eroor
         }
      }
   }

   new CookieConsent({           //new example of our class
      activeClass: 'popup_active',
      popup: '.popup',
      btnConfirm: '[data-confirm]',
      btnCancel: '[data-cancel]'
   }).init();

   function myScripts() {
      console.log('Loading...');       //Our scripts if user accpet cookies
   }

});
