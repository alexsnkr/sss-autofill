let settings;

window.onload = function () {
	chrome.storage.local.get({ profiles: [], selectedProfile: null, enabled: false, settings: {} }, (results) => {
		profile = results.profiles.find(profile => profile.id === results.selectedProfile);
		settings = results.settings;

		if (settings.enabled) {
			if (profile) {
				let fields = {
					'number': profile.cardNumber,
					'name': profile.cardholderName,
					'expiry': `${profile.expiryMonth}/${profile.expiryYear}`,
					'verification_value': profile.cvv,
				}

				Object.keys(fields).forEach(id => {
					fillField(id, fields[id]);
				});

				chrome.runtime.sendMessage({action: 'completeCheckout'});
			}
		}
	});
}

function fillField(id, value) {
	let element = document.getElementById(id);
	if (element) {
		element.focus();
		if (settings.simulateTyping && !select) {
			simulateTyping(element, value, 0);
		} else {
			element.value = value;
			element.dispatchEvent(new Event('change'));
		}
		element.blur();
	}
}

function simulateTyping(element, value, i) {
	if (i < value.length) {
		element.value += value.charAt(i);
		element.dispatchEvent(new Event('change'));
		setTimeout(() => {
			i++;
			simulateTyping(element, value, i);
		}, 10);
	}
}