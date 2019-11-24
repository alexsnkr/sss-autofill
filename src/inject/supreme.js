let settings;

window.onload = function () {
	chrome.storage.local.get({ profiles: [], selectedProfile: null, enabled: false, settings: {} }, (results) => {
		profile = results.profiles.find(profile => profile.id === results.selectedProfile);
		settings = results.settings;

		if (settings.enabled) {
			if (profile) {

				let fields = {
					'order_billing_name': `${profile.firstName} ${profile.lastName}`,
					'order_email': profile.email,
					'order_tel': profile.phoneNumber,
					'bo': profile.address,
					'oba3': profile.address2,
					'order_billing_address_3': profile.address3,
					'order_billing_city': profile.city,
					'order_billing_zip': profile.zipcode,
					'cnb': profile.cardNumber,
					'rnsnckrn': profile.cardNumber,
					'vval': profile.cvv,
					'orcer': profile.cvv,
				}

				Object.keys(fields).forEach(id => {
					fillField(id, fields[id]);
				});

				fillField('order_billing_country', getCountryCode(profile.country), true);
				fillField('order_billing_state', profile.state, true);
				fillField('credit_card_type', profile.cardType, true);
				fillField('credit_card_month', profile.expiryMonth, true);
				fillField('credit_card_year', profile.expiryYear, true);
				document.getElementsByClassName('icheckbox_minimal')[1].click();
				document.querySelector('.terms .icheckbox_minimal').classList.add('checked');

				if(settings.supreme.processPayment) {
					document.querySelector('.button, .checkout').click();
				}
			}
		}
	});
}

function fillField(id, value, select = false) {
	let element = document.getElementById(id);
	if (element) {
		element.focus();
		if (settings.simulateTyping && !select) {
			simulateTyping(element, value, 0);
		}else{
			element.value = value;
			element.dispatchEvent(new Event('change'));
		}
		element.blur();
	}
}

function simulateTyping(element, value, i) {
	if(i < value.length){
		element.value += value.charAt(i);
		element.dispatchEvent(new Event('change'));
		setTimeout(() => {
			i++;
			simulateTyping(element, value, i);
		}, 10);
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