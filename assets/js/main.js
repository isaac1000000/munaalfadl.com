const mobileMenuButton = document.querySelector('#mobile-menu-button');
const mobileMenuCloseButton = document.querySelector('#mobile-menu-close-button');
const mobileNavBox = document.querySelector('#mobile-nav-box');
const mobileFocusCover = document.querySelector('#mobile-focus-cover');
const header = document.querySelector('header');

mobileMenuButton.addEventListener('click', (evt) => {
	toggleMenu();
})

mobileFocusCover.addEventListener('click', (evt) => {
	toggleMenu();
})

mobileMenuCloseButton.addEventListener('click', (evt) => {
	toggleMenu();
})

function toggleMenu() {
	mobileMenuButton.classList.toggle('open');
	mobileNavBox.classList.toggle('open');
	mobileFocusCover.classList.toggle('open');
	document.body.classList.toggle('open');
	header.classList.toggle('open')
}

// Desktop dropdown functionality
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(dropdown => {
	const dropdownLink = dropdown.querySelector('a');
	
	if (dropdownLink) {
		dropdownLink.addEventListener('click', (evt) => {
			evt.preventDefault();
			evt.stopPropagation();
			
			// Close all other dropdowns
			dropdowns.forEach(otherDropdown => {
				if (otherDropdown !== dropdown) {
					otherDropdown.classList.remove('open');
				}
			});
			
			// Toggle current dropdown
			dropdown.classList.toggle('open');
		});
	}
});

// Close dropdowns when clicking outside
document.addEventListener('click', (evt) => {
	if (!evt.target.closest('.dropdown')) {
		dropdowns.forEach(dropdown => {
			dropdown.classList.remove('open');
		});
	}
});