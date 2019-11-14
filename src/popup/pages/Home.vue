<template>
	<div>
		<div class="mb-4 flex items-center">
			<h2 class="mr-4 text-lg font-bold text-primary-500">Enabled</h2>
			<v-switch v-model="enabled" />
		</div>

		<div v-if="enabled">
			<h1 class="title mb-2">Profiles</h1>
			<div class="flex items-center mb-2">
				<div class="mr-2 flex-1">
					<div class="select">
						<select @change="selectProfile" v-model="selectedProfile" class="h-10" :disabled="!selectedProfile">
							<option :value="null" disabled style="display:none">Add a profile</option>
							<option v-for="profile in profiles" :key="profile.id" :value="profile.id" >{{ profile.profileName }}</option>
						</select>
						<div class="dropdown">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
						</div>
					</div>
				</div>

				<button class="btn btn-primary btn-icon mr-2" @click="addProfile">
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14 w-full h-full" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>
				</button>
				<button class="btn btn-red btn-icon" @click="deleteProfile">
					<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="trash-alt" class="svg-inline--fa fa-trash-alt fa-w-14 w-full h-full" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"></path></svg>
				</button>
			</div>

			<form>
				<div class="w-full mb-3">
					<label for="profile-name" class="control-label">Profile name</label>
					<input type="text" class="form-control" id="profile-name" v-model="profile.profileName" :disabled="!selectedProfile">
				</div>

				<div class="flex flex-wrap -mx-2 mb-3">
					<div class="w-1/2 px-2">
						<label for="first-name" class="control-label">First name</label>
						<input type="text" class="form-control" id="first-name" v-model="profile.firstName" :disabled="!selectedProfile">
					</div>
					<div class="w-1/2 px-2">
						<label for="last-name" class="control-label">Last name</label>
						<input type="text" class="form-control" id="last-name" v-model="profile.lastName" :disabled="!selectedProfile">
					</div>
				</div>

				<div class="w-full mb-3">
					<label for="email" class="control-label">Email</label>
					<input type="text" class="form-control" id="email" v-model="profile.email" :disabled="!selectedProfile">
				</div>

				<div class="w-full mb-3">
					<label for="phoneNumber" class="control-label">Phone number</label>
					<input type="text" class="form-control" id="phoneNumber" v-model="profile.phoneNumber" :disabled="!selectedProfile">
				</div>

				<div class="flex flex-wrap -mx-2 mb-3">
					<div class="w-1/2 px-2">
						<label for="address1" class="control-label">Address 1</label>
						<input type="text" class="form-control" id="address1" v-model="profile.address" :disabled="!selectedProfile">
					</div>

					<div class="w-1/2 px-2">
						<label for="address2" class="control-label">Address 2</label>
						<input type="text" class="form-control" id="address2" v-model="profile.address2" :disabled="!selectedProfile">
					</div>
				</div>

				<div class="flex flex-wrap -mx-2 mb-3">
					<div class="w-1/2 px-2">
						<label for="address3" class="control-label">Address 3</label>
						<input type="text" class="form-control" id="address3" v-model="profile.address3" :disabled="!selectedProfile">
					</div>

					<div class="w-1/2 px-2">
						<label for="city" class="control-label">City</label>
						<input type="text" class="form-control" id="city" v-model="profile.city" :disabled="!selectedProfile">
					</div>
				</div>

				<div class="flex flex-wrap -mx-2 mb-3">
					<div class="w-1/2 px-2">
						<label for="country" class="control-label">Country/region</label>
						<input type="text" class="form-control" id="country" v-model="profile.country" :disabled="!selectedProfile">
					</div>

					<div class="w-1/2 px-2">
						<label for="region" class="control-label">State/province</label>
						<input type="text" class="form-control" id="state" v-model="profile.state" :disabled="!selectedProfile">
					</div>
				</div>

				<div class="w-full mb-3">
					<label for="zipcode" class="control-label">Zipcode/postcode</label>
					<input type="text" class="form-control" id="zipcode" v-model="profile.zipcode" :disabled="!selectedProfile">
				</div>

				<h3 class="mb-2 mt-5 text-primary-500 text-lg font-bold">Card details</h3>

				<div class="w-full mb-3">
					<label for="cardholder-name" class="control-label">Cardholder name</label>
					<input type="text" class="form-control" id="cardholder-name" v-model="profile.cardholderName" :disabled="!selectedProfile">
				</div>

				<div class="w-full mb-3">
					<label for="card-type" class="control-label">Card type</label>
					<div class="select">
						<select v-model="profile.cardType" :disabled="!selectedProfile" id="card-type">
							<option value="visa">Visa</option>
							<option value="american_express">American Express</option>
							<option value="master">Mastercard</option>
							<option value="solo">Solo</option>
							<option value="paypal">PayPal</option>
						</select>
						<div class="dropdown">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
						</div>
					</div>
				</div>

				<div class="w-full mb-3">
					<label for="cardNumber" class="control-label">Card number</label>
					<input type="text" class="form-control" id="cardNumber" v-model="profile.cardNumber" :disabled="!selectedProfile">
				</div>

				<div class="flex flex-wrap -mx-2 mb-3">
					<div class="w-1/3 px-2">
						<label for="expiry-month" class="control-label">Expiry month</label>
						<div class="select">
							<select v-model="profile.expiryMonth" :disabled="!selectedProfile" id="expiry-month">
								<option value="01">01</option>
								<option value="02">02</option>
								<option value="03">03</option>
								<option value="04">04</option>
								<option value="05">05</option>
								<option value="06">06</option>
								<option value="07">07</option>
								<option value="08">08</option>
								<option value="09">09</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
							</select>
							<div class="dropdown">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
							</div>
						</div>
					</div>
					<div class="w-1/3 px-2">
						<label for="expiry-month" class="control-label">Expiry year</label>
						<div class="select">
							<select v-model="profile.expiryYear" :disabled="!selectedProfile" id="expiry-month">
								<option value="2019">2019</option>
								<option value="2020">2020</option>
								<option value="2021">2021</option>
								<option value="2022">2022</option>
								<option value="2023">2023</option>
								<option value="2024">2024</option>
								<option value="2025">2025</option>
								<option value="2026">2026</option>
								<option value="2027">2027</option>
							</select>
							<div class="dropdown">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
							</div>
						</div>
					</div>
					<div class="w-1/3 px-2">
						<label for="cvv" class="control-label">CVV</label>
						<input type="text" class="form-control" id="cvv" v-model="profile.cvv" :disabled="!selectedProfile">
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
	import uuid from 'uuid/v4';

	export default {
		data() {
			return {
				enabled: false,
				profiles: [],
				profile: {},
				selectedProfile: null,

				country: '',
    			region: ''
			}
		},

		mounted() {
			chrome.storage.local.get({'enabled' : false}, (results) => {
				this.enabled = results.enabled
			});

			chrome.storage.local.get({'profiles' : []}, (results) => {
				this.profiles = results.profiles
			});

			chrome.storage.local.get({'selectedProfile': null}, (results) => {
				this.selectedProfile = results.selectedProfile;				
				this.selectProfile();
			});
		},

		methods: {
			addProfile() {
				let newProfile = {
					id: uuid(),
					profileName: 'New profile',
					firstName: 'Test',
					lastName: 'Name',
					email: 'test@test.com',
					phoneNumber: '1234567890',
					address: '1 Street',
					address2: 'Street',
					address3: '',
					city: 'Testing',
					country: 'United States',
					state: 'CA',
					zipcode: '90201',
					cardholderName: '',
					cardType: 'visa',
					cardNumber: '',
					expiryMonth: '',
					expiryYear: '',
					cvv: ''
				}
				this.profiles.push(newProfile);
				this.profile = newProfile;
				this.selectedProfile = newProfile.id;
			},

			selectProfile() {
				let profile = this.profiles.find(profile => profile.id == this.selectedProfile);
				if(profile) this.profile = profile;
			},

			deleteProfile() {
				let index = this.profiles.findIndex(profile => profile.id === this.selectedProfile);				
				if(index != -1) {
					this.profiles.splice(index, 1);
					if(this.profiles.length > 0) {
						this.selectedProfile = this.profiles[0].id;
						this.selectProfile();
					}else{
						this.selectedProfile = null;
						this.profile = {};
					}
				}
			}
		},

		watch: {
			enabled: function (newEnabled, oldEnabled) {
				chrome.storage.local.set({'enabled': newEnabled}, () => {});
			},
			selectedProfile: function (newProfileId, oldProfileId) {
				chrome.storage.local.set({'selectedProfile': newProfileId}, () => {});
			},
			profiles: function (newProfiles, oldProfiles) {
				chrome.storage.local.set({'profiles': this.profiles}, () => {});
			},
			profile: {
				handler: function(val, oldVal) {
					chrome.storage.local.set({'profiles': this.profiles}, () => {});
				},
				deep: true
			}
		}
	}
</script>