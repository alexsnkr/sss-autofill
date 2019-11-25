let settings;

window.onload = function () {
	chrome.storage.local.get({ profiles: [], selectedProfile: null, enabled: false, settings: {} }, (results) => {		
		profile = results.profiles.find(profile => profile.id === results.selectedProfile);
		settings = results.settings;

		if (settings.enabled) {
			if (profile) {
				if (currentStep() == 'contact_information') {
					let fields = {
						'[name="checkout[email_or_phone]"]': profile.email,
						'[name="checkout[email]"]': profile.email,
						'#checkout_email': profile.email,
						'#checkout_email_or_phone': profile.email,
						'#checkout_shipping_address_first_name': profile.firstName,
						'#checkout_shipping_address_last_name': profile.lastName,
						'#checkout_shipping_address_address1': profile.address,
						'#checkout_shipping_address_address2': profile.address2,
						'#checkout_shipping_address_city': profile.city,
						'#checkout_shipping_address_zip': profile.zipcode,
						'#checkout_shipping_address_phone': profile.phoneNumber,
						'#checkout_billing_address_first_name': profile.firstName,
						'#checkout_billing_address_last_name': profile.lastName,
						'#checkout_billing_address_address1': profile.address,
						'#checkout_billing_address_address2': profile.address2,
						'#checkout_billing_address_city': profile.city,
						'#checkout_billing_address_zip': profile.zipcode,
						'#checkout_billing_address_phone': profile.phoneNumber
					}

					Object.keys(fields).forEach(id => {
						fillField(id, fields[id]);
					});

					fillField('#checkout_shipping_address_country', profile.country, true);
					fillField('#checkout_shipping_address_province', profile.state, true);

					fillField('#checkout_billing_address_country', profile.country, true);
					fillField('#checkout_billing_address_province', profile.state, true);

					console.log(hasCaptcha());
					

					if (settings.shopify.processCheckoutSteps) {
						if (!hasCaptcha()) {
							continueToNextStep();
						}
					}
				} else if (currentStep() == 'shipping_method') {
					if (settings.shopify.processCheckoutSteps) {
						continueToNextStep();
					}
				}
			}
		}
	});
}

chrome.extension.onMessage.addListener((request, sender, sendResponse) => {	
	if (request.action === 'completeCheckout' && settings.shopify.completeCheckout) {
		let completeCheckout = setTimeout(() => {
			continueToNextStep();
			clearTimeout(completeCheckout);
		}, 1000)
	}
});

const currentStep = () => {
	let element = document.querySelector('[data-step]');
	return element.dataset.step;
}

function fillField(id, value, select = false) {
	let element = document.querySelector(id);
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

function hasCaptcha() {
	return document.getElementById('g-recaptcha');
}

function continueToNextStep() {
	let continueButton = document.querySelector('.step__footer__continue-btn');
	continueButton.click();
};