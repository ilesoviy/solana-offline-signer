"use strict";(self["webpackChunkSolana_Offline_Signer"]=self["webpackChunkSolana_Offline_Signer"]||[]).push([[673],{7673:function(e,t,n){n.r(t),n.d(t,{default:function(){return z}});var s=n(6252);const o={class:"container mx-auto"};function a(e,t,n,a,r,l){const i=(0,s.up)("CreateTransaction");return(0,s.wg)(),(0,s.iD)("div",o,[(0,s.Wm)(i)])}var r=n(3577);const l={class:"w-full"},i={class:"leading-loose p-7 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"},d={class:"text-white flex justify-end mr-2"},c=(0,s._)("label",{class:"block mb-2 text-lg text-primary-dark dark:text-primary-light"},"Mnemonic",-1),u={class:"flex justify-center my-4"},g={key:0,class:"text-white"},h=(0,s._)("div",{style:{"border-bottom":"1px dotted gray"}},null,-1),m=(0,s._)("div",{class:"text-white text-lg mt-2"},[(0,s._)("h1",null,"Signed Transaction:")],-1),y={style:{"word-break":"break-all"}},p={class:"flex justify-center"};function k(e,t,n,o,a,k){const v=(0,s.up)("FormInput"),f=(0,s.up)("Button"),b=(0,s.up)("qrcode-vue");return(0,s.wg)(),(0,s.iD)("div",l,[(0,s._)("div",i,[(0,s.Wm)(v,{label:"Recent Blockhash",inputIdentifier:"Recent Blockhash",val:e.recentBlockhash,placeholder:"Unknown",onInput:t[0]||(t[0]=e=>k.setRecentBlockhash(e))},null,8,["val"]),(0,s.Wm)(v,{label:"Destination Address",inputIdentifier:"Destination Address",val:e.destinationAddress,placeholder:"Unknown",onInput:t[1]||(t[1]=e=>k.setDestinationAddress(e))},null,8,["val"]),(0,s.Wm)(v,{label:"Amount (Lamports)",inputIdentifier:"",val:e.amount,placeholder:"Type the amount",onInput:t[2]||(t[2]=e=>k.setAmount(e))},null,8,["val"]),(0,s._)("div",d,(0,r.zw)(e.amount/10**9)+" SOL ",1),(0,s._)("div",null,[c,(0,s._)("input",{class:"text-white border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm",type:"file",onChange:t[3]||(t[3]=(...e)=>k.onFileChange&&k.onFileChange(...e)),ref:"file"},null,544)]),(0,s.Wm)(v,{label:"Source Address",inputIdentifier:"Source Address",val:null!=e.sourceAddress?e.sourceAddress.publicKey:"",placeholder:"Type the Source Address"},null,8,["val"]),(0,s.Wm)(v,{label:"URL to broadcast",inputIdentifier:"URL to broadcast",val:e.URLtoBroadcast},null,8,["val"]),(0,s._)("div",u,[(0,s.Wm)(f,{title:"Create Transaction",class:"px-4 py-2.5 text-white tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg duration-500",type:"button","aria-label":"Get Recent Blockhash",onClick:k.createTransaction},null,8,["onClick"])]),1==e.IsCreated?((0,s.wg)(),(0,s.iD)("div",g,[h,m,(0,s._)("div",y,(0,r.zw)(e.signedTx),1),(0,s._)("div",p,[(0,s.Wm)(b,{value:e.signedTx,size:"256"},null,8,["value"])])])):(0,s.kq)("",!0)])])}var v=n(5098),f=n(2040),b=n(7929),A=n(9232),x=n(780),S=n.n(x),I=n(2153),w=n(7191),T=n(2678),B=n(5108),C={components:{Button:v.Z,FormInput:f.Z,QrcodeVue:b.Z},data:()=>({recentBlockhash:void 0==localStorage.getItem("RecentBlockhash")?"":localStorage.getItem("RecentBlockhash"),destinationAddress:void 0==localStorage.getItem("DestinationAddress")?"":localStorage.getItem("DestinationAddress"),amount:void 0==localStorage.getItem("Amount")?"":localStorage.getItem("Amount"),mnemonic:"",sourceAddress:null,URLtoBroadcast:void 0==localStorage.getItem("EndPointUrl")?"":localStorage.getItem("EndPointUrl"),IsCreated:!1,signedTx:""}),methods:{setRecentBlockhash(e){this.recentBlockhash=e.target.value,localStorage.setItem("RecentBlockhash",this.recentBlockhash)},setDestinationAddress(e){this.destinationAddress=e.target.value,localStorage.setItem("DestinationAddress",this.destinationAddress)},setAmount(e){this.amount=e.target.value,localStorage.setItem("Amount",this.amount)},async getSourceAddressFromMnemonic(){try{const e=I.Z1(this.mnemonic,""),t="m/44'/501'/0'/0'",n=A.RG.fromSeed((0,T.derivePath)(t,e.toString("hex")).key);this.sourceAddress=n}catch(e){B.log(e)}},async createTransaction(){try{const e=A.RG.generate();let t=(new A.YW).add(A.yc.transfer({fromPubkey:this.sourceAddress.publicKey,toPubkey:new A.nh(this.destinationAddress),lamports:this.amount}));t.recentBlockhash=this.recentBlockhash,t.feePayer=e.publicKey;let n=t.serializeMessage();B.log("fromPubkey",w.decode(this.sourceAddress.publicKey.toBase58())),B.log("toPubkey",w.decode(new A.nh(this.destinationAddress).toBase58())),B.log("fromPubkey",this.sourceAddress.publicKey),B.log("toPubkey",new A.nh(this.destinationAddress)),B.log("lamports",this.amount),B.log("realDataNeedToSign",n);let s=S().sign.detached(n,e.secretKey),o=S().sign.detached(n,this.sourceAddress.secretKey),a=S().sign.detached.verify(n,s,e.publicKey.toBytes());B.log(`verify feePayer signature: ${a}`);let r=A.YW.populate(A.v0.from(n),[w.encode(s),w.encode(o)]);B.log("realDataNeedToSign",n),B.log("recoverTx",r),B.log("recoverTx",r.serializeMessage()),B.log("recoverTx",r.serialize()),B.log("recoverTx",r.serialize().toString("base64")),this.IsCreated=!0,this.signedTx=r.serialize().toString("base64"),localStorage.setItem("SignedTx",this.signedTx)}catch(e){B.log(e)}},onFileChange(e){const t=e.target.files[0];if(t){const e=new FileReader;e.onload=()=>{this.mnemonic=e.result,this.getSourceAddressFromMnemonic()},e.readAsText(t)}}}},R=n(3744);const _=(0,R.Z)(C,[["render",k]]);var D=_,P={name:"Create Signed Transaction Offline",components:{CreateTransaction:D}};const W=(0,R.Z)(P,[["render",a]]);var z=W}}]);
//# sourceMappingURL=673.8c1bc288.js.map