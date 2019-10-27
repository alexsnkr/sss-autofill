<template>
	<div>
		<label for="state" class="control-label">State</label>
		<div class="select">
			<select id="state" :value="value" @input="$emit('input', $event.target.value)" :disabled="disabled">
				<option value="">N/A</option>
				<option :value="key" v-for="(state, key) in states" :key="key" >{{ state }}</option>
			</select>
			<div class="dropdown">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
			</div>
		</div>
	</div>
</template>

<script>
export default {

	props: {
		value: String,
		disabled: Boolean
	},

	data() {
		return {
			states: {
				"AL": "Alabama",
				"AK": "Alaska",
				"AS": "American Samoa",
				"AZ": "Arizona",
				"AR": "Arkansas",
				"CA": "California",
				"CO": "Colorado",
				"CT": "Connecticut",
				"DE": "Delaware",
				"DC": "District Of Columbia",
				"FM": "Federated States Of Micronesia",
				"FL": "Florida",
				"GA": "Georgia",
				"GU": "Guam",
				"HI": "Hawaii",
				"ID": "Idaho",
				"IL": "Illinois",
				"IN": "Indiana",
				"IA": "Iowa",
				"KS": "Kansas",
				"KY": "Kentucky",
				"LA": "Louisiana",
				"ME": "Maine",
				"MH": "Marshall Islands",
				"MD": "Maryland",
				"MA": "Massachusetts",
				"MI": "Michigan",
				"MN": "Minnesota",
				"MS": "Mississippi",
				"MO": "Missouri",
				"MT": "Montana",
				"NE": "Nebraska",
				"NV": "Nevada",
				"NH": "New Hampshire",
				"NJ": "New Jersey",
				"NM": "New Mexico",
				"NY": "New York",
				"NC": "North Carolina",
				"ND": "North Dakota",
				"MP": "Northern Mariana Islands",
				"OH": "Ohio",
				"OK": "Oklahoma",
				"OR": "Oregon",
				"PW": "Palau",
				"PA": "Pennsylvania",
				"PR": "Puerto Rico",
				"RI": "Rhode Island",
				"SC": "South Carolina",
				"SD": "South Dakota",
				"TN": "Tennessee",
				"TX": "Texas",
				"UT": "Utah",
				"VT": "Vermont",
				"VI": "Virgin Islands",
				"VA": "Virginia",
				"WA": "Washington",
				"WV": "West Virginia",
				"WI": "Wisconsin",
				"WY": "Wyoming"
			}
		}
	}

}
</script>