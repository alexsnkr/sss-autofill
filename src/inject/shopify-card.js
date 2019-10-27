chrome.extension.sendMessage({}, function (response) {
	chrome.storage.local.get({ 'profiles': [], 'selectedProfile': null, 'enabled': false }, (results) => {
		if (results.enabled) {			
			let profile = results.profiles.find(profile => profile.id === results.selectedProfile);

			if (profile) {
				autofill('number', profile.cardNumber);
				autofill('name', profile.cardholderName);
				autofill('expiry', `${profile.expiryMonth}/${profile.expiryYear}`);
				autofill('verification_value', profile.cvv);

			}
		}
	});
});

function autofill(id, value) {
	let element = document.getElementById(id);
	
	if (element) {
		if (element.hasAttribute("data-honeypot-field")) return
		console.log(element);
		let event = document.createEvent("HTMLEvents");
		event.initEvent('change', true, false);

		element.focus();
		element.value = value;
		element.dispatchEvent(event);
		element.blur();
	}
}