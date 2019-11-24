window.onload = function () {
	chrome.storage.local.get({ profiles: [], selectedProfile: null, enabled: false, settings: {} }, (results) => {
		profile = results.profiles.find(profile => profile.id === results.selectedProfile);
		settings = results.settings;

		if (settings.enabled) {
			if (profile) {
				let fields = {
					'cardnumber': profile.cardNumber,
					'exp-date': `${profile.expiryMonth} / ${profile.expiryYear.slice(-2)}`,
					'cvc': profile.cvv,
					'postal': profile.zipcode
				}

				Object.keys(fields).forEach(id => {
					fillField(id, fields[id]);
				});
			}
		}
	});
};

function fillField(name, value) {	
	let element = document.getElementsByName(name)[0];	
	if (element) {
		element.focus();
		element.value = value;
		element.dispatchEvent(new Event('change'));
		element.blur();
	}
}