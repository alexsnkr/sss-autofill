chrome.extension.sendMessage({}, function (response) {
	chrome.storage.local.get({ 'profiles': [], 'selectedProfile': null, 'enabled': false }, (results) => {
		if (results.enabled) {
			let profile = results.profiles.find(profile => profile.id === results.selectedProfile);

			if (profile) {
				autofill('checkout_email_or_phone', profile.email);
				autofill('checkout[email_or_phone]', profile.email, true);
				autofill('checkout_shipping_address_first_name', profile.firstName);
				autofill('checkout_shipping_address_last_name', profile.lastName);
				autofill('checkout_shipping_address_address1', profile.address);
				autofill('checkout_shipping_address_address2', profile.address2);
				autofill('checkout_shipping_address_city', profile.city);
				autofill('checkout_shipping_address_country', profile.country);
				autofill('checkout_shipping_address_province', profile.state);
				autofill('checkout_shipping_address_zip', profile.zipcode);
			}
		}
	});
});

function autofill(id, value, byName=false) {
	let element = document[(byName) ? 'getElementsByName' : 'getElementById'](id);
	if (byName) element = element[0];
	
	if (element) {
		let event = document.createEvent("HTMLEvents");
		event.initEvent('change', true, false);
		element.focus();
		element.value = value;
		element.dispatchEvent(event);
		element.blur();
	}
}