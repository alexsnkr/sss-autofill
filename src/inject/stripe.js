chrome.extension.sendMessage({}, function (response) {
	chrome.storage.local.get({ 'profiles': [], 'selectedProfile': null, 'enabled': false}, (results) => {		
		if (results.enabled) {
			let profile = results.profiles.find(profile => profile.id === results.selectedProfile);

			if (profile) {
				fillByName('cardnumber', profile.cardNumber);
				fillByName('exp-date', `${profile.expiryMonth} / ${profile.expiryYear.slice(-2)}`);
				fillByName('cvc', profile.cvv);
				fillByName('postal', profile.zipcode);
			}
		}
	});
});


function fillByName(name, value) {
	let element = document.getElementsByName(name)[0];
	if (element) {
		autofill(element, value);
	}	
}

function autofill(element, value) {
	let event = document.createEvent("HTMLEvents");
	event.initEvent('change', true, false);
	element.focus();
	element.value = value;
	element.dispatchEvent(event);
	element.blur();
}