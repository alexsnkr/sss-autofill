chrome.extension.sendMessage({}, function (response) {
	chrome.storage.local.get({ 'profiles': [], 'selectedProfile': null, 'enabled': false}, (results) => {		
		if (results.enabled) {
			let profile = results.profiles.find(profile => profile.id === results.selectedProfile);

			if (profile) {
				autofill('cardnumber', profile.cardNumber);
				autofill('exp-date', `${profile.expiryMonth} / ${profile.expiryYear.slice(-2)}`);
				autofill('cvc', profile.cvv);
				autofill('postal', profile.zipcode);
			}
		}
	});
});

function autofill(name, value) {
	let element = document.getElementsByName(name)[0];
	if (element) {
		let event = document.createEvent("HTMLEvents");
		event.initEvent('change', true, false);
		element.focus();
		element.value = value;
		element.dispatchEvent(event);
		element.blur();
	}
}