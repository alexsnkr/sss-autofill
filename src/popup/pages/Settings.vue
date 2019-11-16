<template>
	<div>
		<h1 class="title mb-2">Settings</h1>


		<!-- General settings -->
		<div class="pb-4 border-b border-gray-400 mb-4">
			<div class="mb-2 text-lg font-bold text-primary-500">General</div>

			<div class="flex items-center">
				<v-checkbox v-model="settings.enabled" label="Enabled" class="mr-3" />
				<v-checkbox v-model="settings.simulateTyping" label="Simulate typing" />
			</div>
		</div>

		<!-- Supreme settings -->
		<div class="pb-4 border-b border-gray-400 mb-4">
			<div class="mb-2 text-lg font-bold text-primary-500">Supreme</div>

			<div class="flex items-center">
				<v-checkbox v-model="settings.supreme.processPayment" label="Process Payment" />
			</div>
		</div>

		<!-- Shopify settings -->
		<div class="pb-4 border-b border-gray-400 mb-4">
			<div class="mb-2 text-lg font-bold text-primary-500">Shopify</div>

			<div class="flex items-center">
				<v-checkbox v-model="settings.shopify.processCheckoutSteps" label="Process Checkout Steps" class="mr-3" />
				<v-checkbox v-model="settings.shopify.completeCheckout" label="Complete Checkout" />
			</div>
		</div>

		<!--<stripe-settings />-->
	</div>
</template>

<script>
	export default {
		data() {
			return {
				settings: {
					enabled: false,
					simulateTyping: false,
					supreme: {
						processPayment: false
					},
					shopify: {
						processCheckoutSteps: false,
						completeCheckout: false
					}
				}
			}
		},

		mounted() {
			chrome.storage.local.get({'settings' : this.settings}, (results) => {
				this.settings = results.settings;
			});
		},

		watch: {
			settings: {
				handler: function (newSettings, oldSettings) {
					chrome.storage.local.set({'settings': newSettings}, () => {});
				},
				deep: true
			}
		}
	}
</script>