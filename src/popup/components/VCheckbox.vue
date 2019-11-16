<template>
  	<div class="flex cursor-pointer" @click="$emit('change', !value)">
		<div :class="{ 'bg-primary-500 border-primary-500': value }" class="w-5 h-5 rounded border border-gray-500 inline-flex justify-center items-center bg-white">
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" focusable="false" width="1em" height="1em" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 512 512"><path fill="none" stroke="#FFFFFF" stroke-linecap="square" stroke-miterlimit="10" stroke-width="44" d="M416 128L192 384l-96-96"/></svg>
		</div>
		<div class="ml-1 font-medium select-none">{{ label }}</div>
	  </div>
</template>

<script>
	export default {
		model: {
			event: 'change',
		},
		props: {
			value: {
				type: Boolean,
				required: true,
			},

			label: {
				type: String,
				required: true
			}
		},
	};
</script>