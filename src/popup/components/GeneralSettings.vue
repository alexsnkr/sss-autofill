<template>
	<div class="pb-4 border-b border-gray-400 mb-4">
		<div class="mb-2 text-lg font-bold text-primary-500">General</div>

		<div class="flex items-center">
			<v-checkbox v-model="settings.enabled" label="Enabled" class="mr-3" />
			<v-checkbox v-model="settings.simulateTyping" label="Similate typing" />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				settings: {
					enabled: false,
					simulateTyping: false
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