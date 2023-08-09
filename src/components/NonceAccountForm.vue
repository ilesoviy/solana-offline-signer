<script>
import Button from './reusable/Button.vue';
import FormInput from './reusable/FormInput.vue';
import QrcodeVue from 'qrcode.vue';

import * as web3 from '@solana/web3.js';

import * as bip39 from 'bip39';
import * as bs58 from "bs58";
import { derivePath } from 'ed25519-hd-key';

export default {
	components: {
		Button,
		FormInput,
		QrcodeVue,
	},
	data: () => {
		return {
			URLtoBroadcast: localStorage.getItem('EndPointUrl') == undefined ? '' : localStorage.getItem('EndPointUrl'),
			IsRequested: false,
			nonceAccount: null,
			destinationAddress: localStorage.getItem('DestinationAddress') == undefined ? '' : localStorage.getItem('DestinationAddress'),
			amount: localStorage.getItem('Amount') == undefined ? '' : localStorage.getItem('Amount'),
			mnemonic: '',
			sourceAddress: null,
			IsCreated: false,
			signedTx: '',
			nonceAccountPublicKey: '',
			nonceAccountAuthSecretKey: '',
		}
	},
	methods: {
		setNonceAccount(event) {
			this.nonceAccountPublicKey = event.target.value;
		},
		setDestinationAddress(event) {
			this.destinationAddress = event.target.value;

			localStorage.setItem('DestinationAddress', this.destinationAddress);
		},
		setAmount(event) {
			this.amount = event.target.value;

			localStorage.setItem('Amount', this.amount);
		},
		async getSourceAddressFromMnemonic() {
			// Add web3
			try {
				const seed = bip39.mnemonicToSeedSync(this.mnemonic, "");
				const path = `m/44'/501'/0'/0'`;
				const keypair = web3.Keypair.fromSeed(derivePath(path, seed.toString("hex")).key);

				this.sourceAddress = keypair;
			} catch (e) {
				console.log(e);
			}
		},
		async createNonceAccount() {
			// Add web3
			try {
				const connection = new web3.Connection(this.URLtoBroadcast);

				const feePayer = this.sourceAddress;

				const nonceAccountAuth = this.sourceAddress;

				this.nonceAccount = web3.Keypair.generate();
				console.log(`nonce account: ${this.nonceAccount.publicKey.toBase58()}`);

				let tx = new web3.Transaction().add(
					// create nonce account
					web3.SystemProgram.createAccount({
						fromPubkey: feePayer.publicKey,
						newAccountPubkey: this.nonceAccount.publicKey,
						lamports: await connection.getMinimumBalanceForRentExemption(
							web3.NONCE_ACCOUNT_LENGTH
						),
						space: web3.NONCE_ACCOUNT_LENGTH,
						programId: web3.SystemProgram.programId,
					}),
					// init nonce account
					web3.SystemProgram.nonceInitialize({
						noncePubkey: this.nonceAccount.publicKey, // nonce account pubkey
						authorizedPubkey: nonceAccountAuth.publicKey, // nonce account authority (for advance and close)
					})
				);

				console.log(
					`txhash: ${await connection.sendTransaction(tx, [feePayer, this.nonceAccount])}`
				);

				// Save Info
				this.IsRequested = true;

				this.nonceAccountPublicKey = this.nonceAccount.publicKey.toBase58();
				this.nonceAccountAuthSecretKey = bs58.encode(nonceAccountAuth.secretKey);
			} catch (e) {
				console.log(e);
			}
		},
		async createTransaction() {
			// Add web3
			try {
				const feePayer = this.sourceAddress;

				console.log(this.nonceAccountAuthSecretKey);

				const nonceAccountAuth = web3.Keypair.fromSecretKey(
					bs58.decode(
						this.nonceAccountAuthSecretKey
					)
				);

				const connection = new web3.Connection(this.URLtoBroadcast);

				console.log(this.nonceAccountPublicKey);
				const nonceAccountPubkey = new web3.PublicKey(
					this.nonceAccountPublicKey
				);
				console.log(nonceAccountPubkey);
				let nonceAccountInfo = await connection.getAccountInfo(nonceAccountPubkey);
				console.log(nonceAccountInfo);
				if (nonceAccountInfo != null) {
					let nonceAccount = web3.NonceAccount.fromAccountData(nonceAccountInfo.data);

					let tx = new web3.Transaction().add(
						// nonce advance must be the first insturction
						web3.SystemProgram.nonceAdvance({
							noncePubkey: nonceAccountPubkey,
							authorizedPubkey: nonceAccountAuth.publicKey,
						}),
						// after that, you do what you really want to do, here we append a transfer instruction as an example.
						web3.SystemProgram.transfer({
							fromPubkey: feePayer.publicKey,
							toPubkey: nonceAccountAuth.publicKey,
							lamports: this.amount,
						})
					);
					// assign `nonce` as recentBlockhash
					tx.recentBlockhash = nonceAccount.nonce;
					tx.feePayer = feePayer.publicKey;
					tx.sign(
						feePayer,
						nonceAccountAuth
					); /* fee payer + nonce account authority + ... */

					// Convert to base64 code
					this.IsCreated = true;
					this.signedTx = tx.serialize().toString('base64');

					localStorage.setItem('SignedTx', this.signedTx);
				}
			} catch (e) {
				console.log(e);
			}
		},
		onFileChange(event) {
			const file = event.target.files[0];
			if (file) {
				const reader = new FileReader()
				reader.onload = () => {
					this.mnemonic = reader.result;

					this.getSourceAddressFromMnemonic();
				}
				reader.readAsText(file)
			}
		}
	},
};
</script>

<template>
	<div class="w-full">
		<div class="leading-loose p-7 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left">
			<div>
				<label class="block mb-2 text-lg text-primary-dark dark:text-primary-light">Mnemonic</label>
				<input
					class="text-white border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm"
					type="file" @change="onFileChange" ref="file">
			</div>
			<FormInput label="Source Address" inputIdentifier="Source Address"
				:val="sourceAddress != null ? sourceAddress.publicKey : ''" placeholder="Type the Source Address" />

			<FormInput label="URL to broadcast" inputIdentifier="URL to broadcast" :val="URLtoBroadcast" readonly />

			<div class="flex justify-center my-4">
				<Button title="Create Nonce Account"
					class="px-4 py-2.5 text-white tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg duration-500"
					type="button" aria-label="Create Nonce Account" @click="createNonceAccount" />
			</div>

			<div class="text-white">
				<div v-if="IsRequested == true">
					<FormInput label="Nonce Account" inputIdentifier="Nonce Account" :val="nonceAccountPublicKey"
						placeholder="Type the Nonce Account" @input="event => setNonceAccount(event)" />

					<FormInput label="Destination Address" inputIdentifier="Destination Address" :val="destinationAddress"
						placeholder="Unknown" @input="event => setDestinationAddress(event)" />
					<FormInput label="Amount (Lamports)" inputIdentifier="" :val="amount" placeholder="Type the amount"
						@input="event => setAmount(event)" />
					<div class="text-white flex justify-end mr-2">
						{{ amount / (10 ** 9) }} SOL
					</div>

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
				<div v-else>
					Nonce Account: None
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
