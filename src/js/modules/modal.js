function openModal(modalSelector, modalTimer) {
   const modalWindow = document.querySelector(modalSelector);
   modalWindow.classList.add('show');
   modalWindow.classList.remove('hide');
   document.body.style.overflow = 'hidden';

   if (modalTimer) {
      clearInterval(modalTimer);
   }
}



function closeModal(modalSelector) {
   const modalWindow = document.querySelector(modalSelector);
   modalWindow.classList.add('hide');
   modalWindow.classList.remove('show');
   document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimer) {

   const contactBtn = document.querySelectorAll(triggerSelector),
      modalWindow = document.querySelector(modalSelector);



   contactBtn.forEach(btn => {
      btn.addEventListener('click', () => openModal(modalSelector, modalTimer));
   });


   modalWindow.addEventListener('click', (e) => {
      if (e.target == modalWindow || e.target.getAttribute('data-close') == '') {
         closeModal(modalSelector);
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modalWindow.classList.contains('show')) {
         closeModal(modalSelector);
      }
   });


   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
         openModal(modalSelector, modalTimer);
         window.removeEventListener('scroll', showModalByScroll);
      }
   }

   window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export { openModal };
export { closeModal };