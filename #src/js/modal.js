// MODAL WINDOW

const modals = () => {
	function bindModal(triggerSelector, modalSelector, closeSelector) {

		const trigger = document.querySelector(triggerSelector),
			  modal = document.querySelector(modalSelector),
			  close = document.querySelector(closeSelector);

		function openModal() {
			modal.classList.add('modal--show');
			document.body.style.overflow = 'hidden';
			modal.classList.add('animate__animated', 'animate__fadeIn');
			// clearInterval(openTimer);
		}

		function closeModal() {
			modal.classList.remove('modal--show');
			document.body.style.overflow = '';
			modal.classList.remove('animate__animated', 'animate__fadeIn');
		};

		trigger.addEventListener('click', openModal);

		close.addEventListener('click', () => {
			closeModal()
		});

		modal.addEventListener('click', (e) => {
			if (e.target === modal) {
				closeModal()
			}
		});

		document.addEventListener('keydown', (e) => {
			if (e.code === 'Escape' && modal.classList.contains('show')) {
				closeModal()
			}
		} )

		// function showModalByScroll() {
		// 	if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
		// 		if (modal.classList.contains('form__modal')) {
		// 			openModal();
		// 			window.removeEventListener('scroll', showModalByScroll);
		// 		}
		// 	}
		// }

		// window.addEventListener('scroll', showModalByScroll);

		// function openTimer() {
		// 	setTimeout(openModal, 2000);
		// }

		// if (modal.classList.contains('form__modal')) {
		// 	openTimer();
		// }

	}


	bindModal('.call-modal__btn', '.form__modal', '.form-close');
	bindModal('.burger__call-btn', '.form__modal', '.form-close');
	bindModal('.btn-signup', '.form__modal', '.form-close');
	bindModal('.footer__btn1', '.form__modal', '.form-close');

	
	var burgerCallBtn = document.querySelector('.burger__call-btn');

	burgerCallBtn.addEventListener('click', function() {
		closeNav();
	});


};

// ==========