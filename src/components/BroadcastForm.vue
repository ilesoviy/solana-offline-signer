<script>
import Button from './reusable/Button.vue';
import FormInput from './reusable/FormInput.vue';
import FormTextarea from './reusable/FormTextarea.vue';
import QrcodeVue from 'qrcode.vue';

import * as web3 from '@solana/web3.js';

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
		proc() {
			try {
				const rawTx = Buffer.from(this.signedTx, 'base64');

				const rawTransaction = web3.Transaction.from(rawTx);

				let msg = rawTransaction.compileMessage();

				this.destinationAddress = msg.accountKeys[2].toBase58();

				const msg2 = rawTransaction.serializeMessage();
				this.amount = msg2.readInt32LE(174);
			} catch (e) {
				this.destinationAddress = '';
				this.amount = '';
				console.log(e);
			}
		},
		setSignedTx(event) {
			this.signedTx = event.target.value;
			this.proc();
		},
		async broadcast() {
			// Add web3
			const connection = new web3.Connection(this.URLtoBroadcast);

			// Send Transaction
			try {
				const txhash = await connection.sendRawTransaction(Buffer.from(this.signedTx, 'base64'));

				console.log(txhash);

				this.IsBroadcasted = true;
				this.broadcastAction = txhash;
			} catch (e) {
				console.log(e);
			}
		}
	},
	mounted() {
		this.proc();
	}
};
</script>

<template>
	<div class="w-full">
		<div class="leading-loose p-7 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left">
			<FormTextarea label="Signed Transaction" textareaIdentifier="Signed Transaction" :value="signedTx"
				@input="event => setSignedTx(event)" />
			<FormInput label="Destination Address" inputIdentifier="Destination Address" :val="destinationAddress"
				placeholder="Unknown" readonly />
			<FormInput label="Amount (Lamports)" inputIdentifier="" :val="amount" placeholder="Type the amount" readonly />
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
