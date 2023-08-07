<script>
import Button from './reusable/Button.vue';
import FormInput from './reusable/FormInput.vue';
import FormTextarea from './reusable/FormTextarea.vue';
import QrcodeVue from 'qrcode.vue';

export default {
	components: {
		Button,
		FormInput,
		FormTextarea,
		QrcodeVue,
	},
	data: () => {
		return {
			signedTx: localStorage.getItem('SignedTx') == undefined ? '' : localStorage.getItem('SignedTx'),
			destinationAddress: localStorage.getItem('DestinationAddress') == undefined ? '' : localStorage.getItem('DestinationAddress'),
			amount: localStorage.getItem('Amount') == undefined ? '' : localStorage.getItem('Amount'),
			URLtoBroadcast: localStorage.getItem('EndPointUrl') == undefined ? '' : localStorage.getItem('EndPointUrl'),
			IsBroadcasted: false,
			broadcastAction: '',
		}
	},
	methods: {
		setSignedTransaction(event) {
			this.signedTx = event.target.value;

			localStorage.setItem('SignedTx', this.signedTx);
		},
		setDestinationAddress(event) {
			this.destinationAddress = event.target.value;

			localStorage.setItem('DestinationAddress', this.destinationAddress);
		},
		setAmount(event) {
			this.amount = event.target.value;

			localStorage.setItem('Amount', this.amount);
		},
		broadcast() {
			// Add web3

			this.IsBroadcasted = true;
			this.broadcastAction = 'jsonrpc:';
		}
	}
};
</script>

<template>
	<div class="w-full">
		<div class="leading-loose p-7 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left">
			<FormTextarea label="Signed Transaction" textareaIdentifier="Signed Transaction" :value="signedTx"
				@input="event => setSignedTransaction(event)" />
			<FormInput label="Destination Address" inputIdentifier="Destination Address" :val="destinationAddress"
				placeholder="Unknown" @input="event => setDestinationAddress(event)" />
			<FormInput label="Amount (Lamports)" inputIdentifier="" :val="amount" placeholder="Type the amount"
				@input="event => setAmount(event)" />
			<div class="text-white flex justify-end mr-2">
				{{ amount / (10 ** 9) }} SOL
			</div>
			<div class="flex justify-center">
				<qrcode-vue :value="signedTx" size="256"></qrcode-vue>
			</div>
			<FormInput label="URL to broadcast" inputIdentifier="URL to broadcast" :val="URLtoBroadcast" readonly />

			<div class="flex justify-center my-4">
				<Button title="Broadcast"
					class="px-4 py-2.5 text-white tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg duration-500"
					type="button" aria-label="Get Recent Blockhash" @click="broadcast" />
			</div>

			<div style="border-bottom: 1px dotted gray"></div>

			<div class="text-white text-lg mt-2">
				<h1>Recent Broadcasted Transactions:</h1>
			</div>

			<div class="text-white" v-if="IsBroadcasted == true">
				{{ broadcastAction }}
			</div>
			<div class="text-white" v-else>
				No recent broadcasted transactions found.
			</div>
		</div>
	</div>
</template>

<style scoped></style>
