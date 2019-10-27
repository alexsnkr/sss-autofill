<template>
	<div class="flex flex-col h-full">
		<v-header />
		<div class="flex-1 p-4 overflow-auto">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>

import './assets/scss/app.scss';

export default {
	data () {
		return {}
	}
}
</script>