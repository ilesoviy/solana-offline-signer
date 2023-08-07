<script>
import Button from './reusable/Button.vue';
import FormInput from './reusable/FormInput.vue';
import QrcodeVue from 'qrcode.vue';

export default {
	components: {
		Button,
		FormInput,
		QrcodeVue,
	},
	data: () => {
		return {
			recentBlockhash: localStorage.getItem('RecentBlockhash') == undefined ? '' : localStorage.getItem('RecentBlockhash'),
			destinationAddress: localStorage.getItem('DestinationAddress') == undefined ? '' : localStorage.getItem('DestinationAddress'),
			amount: localStorage.getItem('Amount') == undefined ? '' : localStorage.getItem('Amount'),
			mnemonic: '',
			sourceAddress: '',
			URLtoBroadcast: localStorage.getItem('EndPointUrl') == undefined ? '' : localStorage.getItem('EndPointUrl'),
			IsCreated: false,
			signedTx: '',
		}
	},
	methods: {
		setRecentBlockhash(event) {
			this.recentBlockhash = event.target.value;

			localStorage.setItem('RecentBlockhash', this.recentBlockhash);
		},
		setDestinationAddress(event) {
			this.destinationAddress = event.target.value;

			localStorage.setItem('DestinationAddress', this.destinationAddress);
		},
		setAmount(event) {
			this.amount = event.target.value;

			localStorage.setItem('Amount', this.amount);
		},
		setMnemonic(event) {
			this.mnemonic = event.target.value;

			this.getSourceAddressFromMnemonic();
		},
		setSourceAddress(event) {
			this.sourceAddress = event.target.value;
		},
		getSourceAddressFromMnemonic() {
			// Add web3
			this.sourceAddress = this.mnemonic;
		},
		createTransaction() {
			// Add web3

			this.IsCreated = true;
			this.signedTx = '1asd5f45as1f5ewf1a81sf6daef51a9sf848aw94ef1as61dfa61ef89as1f91e8sf1as5df16asef8sef18';

			localStorage.setItem('SignedTx', this.signedTx);
		}
	}
};
</script>

<template>
	<div class="w-full">
		<div class="leading-loose p-7 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left">
			<FormInput label="Recent Blockhash" inputIdentifier="Recent Blockhash" :val="recentBlockhash"
				placeholder="Unknown" @input="event => setRecentBlockhash(event)" />
			<FormInput label="Destination Address" inputIdentifier="Destination Address" :val="destinationAddress"
				placeholder="Unknown" @input="event => setDestinationAddress(event)" />
			<FormInput label="Amount (Lamports)" inputIdentifier="" :val="amount" placeholder="Type the amount"
				@input="event => setAmount(event)" />
			<div class="text-white flex justify-end mr-2">
				{{ amount / (10 ** 9) }} SOL
			</div>
			<FormInput label="Mnemonic" inputIdentifier="Mnemonic" :val="mnemonic" placeholder="Type the mnemonic"
				@input="event => setMnemonic(event)" />
			<FormInput label="Source Address" inputIdentifier="Source Address" :val="sourceAddress"
				placeholder="Type the mnemonic" />
			<FormInput label="URL to broadcast" inputIdentifier="URL to broadcast" :val="URLtoBroadcast" />

			<div class="flex justify-center my-4">
				<Button title="Create Transaction"
					class="px-4 py-2.5 text-white tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg duration-500"
					type="button" aria-label="Get Recent Blockhash" @click="createTransaction" />
			</div>

			<div class="text-white" v-if="IsCreated == true">
				<div style="border-bottom: 1px dotted gray"></div>
				<div class="text-white text-lg mt-2">
					<h1>Signed Transaction:</h1>
				</div>

				<div style="word-break: break-all;">
					{{ signedTx }}
				</div>
				<div class="flex justify-center">
					<qrcode-vue :value="signedTx" size="256"></qrcode-vue>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
