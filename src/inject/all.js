window.onload = function () {
	chrome.storage.local.get({ profiles: [], selectedProfile: null, enabled: false, settings: {} }, (results) => {
		profile = results.profiles.find(profile => profile.id === results.selectedProfile);
		settings = results.settings;

		if (settings.enabled) {
			if (profile) {
				fill('email', profile.email);
				fill('name', `${profile.firstName} ${profile.lastName}`);

				fill('fullName', `${profile.firstName} ${profile.lastName}`);

				fill('first-name', profile.firstName);
				fill('firstname', profile.firstName);
				fill('firstName', profile.firstName);

				fill('last-name', profile.lastName);
				fill('lastname', profile.lastName);
				fill('lastName', profile.lastName);

				fill('tel', profile.phoneNumber);

				fill('address-line1', `${profile.address}, ${profile.address2}`);
				fill('address-level2', profile.city);
				fill('city', profile.city);
				fill('state', profile.state);
				fill('address-level1', profile.state);

				fill('postal-code', profile.zipcode);
				fill('zipcode', profile.zipcode);
				fill('postcode', profile.zipcode);
				fill('post-code', profile.zipcode);
			}
		}
	});
}

function fill(name, value) {
	fillByAutocomplete(name, value);
	fillByName(name, value);
	fillById(name, value);
}

function fillByName(name, value) {
	let element = document.getElementsByName(name)[0];
	if (element) {
		autofill(element, value);
	}
}

function fillById(name, value) {
	let element = document.getElementById(name);
	if (element) {
		autofill(element, value);
	}
}

function fillByAutocomplete(name, value) {
	let elements = document.querySelectorAll(`[autocomplete=${name}]`);

	elements.forEach(function (element) {
		autofill(element, value);
	});
}

function autofill(element, value) {
	let event = document.createEvent("HTMLEvents");
	event.initEvent('change', true, false);
	element.focus();
	element.value = value;
	element.dispatchEvent(event);
	element.blur();
}