chrome.extension.sendMessage({}, function (response) {
	chrome.storage.local.get({ 'profiles': [], 'selectedProfile': null, 'enabled': false }, (results) => {
		if (results.enabled) {
			let profile = results.profiles.find(profile => profile.id === results.selectedProfile);

			if (profile) {				
				autofill('order[billing_name]', `${profile.firstName} ${profile.lastName}`);
				autofill('order[email]', profile.email);
				autofill('order[tel]', profile.phoneNumber);
				autofill('order[billing_address]', profile.address);
				autofill('order[billing_address_2]', profile.address2);
				autofill('order[billing_address_3]', profile.address3);
				autofill('order[billing_city]', profile.city);
				// autofill('order[billing_state]', profile.state);
				autofill('order[billing_zip]', profile.zipcode);
				autofill('order[billing_country]', getCountryCode(profile.country));
				autofill('credit_card[type]', profile.cardType);
				autofill('credit_card[cnb]', profile.cardNumber);
				autofill('carn', profile.cardNumber);
				autofill('credit_card[month]', profile.expiryMonth);
				autofill('credit_card[year]', profile.expiryYear);
				autofill('credit_card[ovv]', profile.cvv);
				autofill('credit_card[vvv]', profile.cvv);
				check('order[terms]', 1);
				document.querySelector('.terms .icheckbox_minimal').classList.add('checked')
			}
		}
	});
});

function autofill(name, value) {
	if (!value) return;
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

function check(name, index=0) {
	let element = document.getElementsByName(name)[index];
	if (element) {
		let event = document.createEvent("HTMLEvents");
		event.initEvent('change', true, false);
		element.checked = true;
		element.dispatchEvent(event);
	}
}

function getCountryCode(country) {
	let countries = {
		"united kingdom": "GB",
		"northern ireland": "NB",
		"united states": "USA",
		"canada": "CANADA",
		"austria": "AT",
		"belarus": "BY",
		"belgium": "BE",
		"bulgaria": "BG",
		"croatia": "HR",
		"czech republic": "CZ",
		"denmark": "DK",
		"estonia": "EE",
		"finland": "FI",
		"france": "FR",
		"germany": "DE",
		"greece": "GR",
		"hungary": "HU",
		"iceland": "IS",
		"ireland": "IE",
		"italy": "IT",
		"latvia": "LV",
		"lithuania": "LT",
		"luxembourg": "LU",
		"monaco": "MC",
		"netherlands": "NL",
		"norway": "NO",
		"poland": "PL",
		"portugal": "PT",
		"romania": "RO",
		"russia": "RU",
		"slovakia": "SK",
		"slovenia": "SI",
		"spain": "ES",
		"sweden": "SE",
		"switzerland": "CH",
		"turkey": "TR",
	}

	return countries[country.toLowerCase()];
}