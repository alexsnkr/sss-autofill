<template>
	<div class="pb-4 border-b border-gray-400 mb-4">
		<div class="mb-2 text-lg font-bold text-primary-500">Supreme</div>

		<div class="flex items-center">
			<v-checkbox v-if="settings.supreme" v-model="settings.supreme.processPayment" label="Process Payment" />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				settings: {
					supreme: {
						processPayment: false
					}
				}
			}
		},

		mounted() {
			chrome.storage.local.get({'settings' : {}}, (results) => {
				this.settings = Object.assign(this.settings, results.settings);
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