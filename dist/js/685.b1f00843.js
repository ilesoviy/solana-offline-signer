"use strict";(self["webpackChunkSolana_Offline_Signer"]=self["webpackChunkSolana_Offline_Signer"]||[]).push([[685],{685:function(t,e,a){a.r(e),a.d(e,{default:function(){return Z}});var r=a(6252);const n={class:"container mx-auto"};function o(t,e,a,o,i,s){const d=(0,r.up)("BroadcastForm");return(0,r.wg)(),(0,r.iD)("div",n,[(0,r.Wm)(d)])}var i=a(3577);const s={class:"w-full"},d={class:"leading-loose p-7 bg-secondary-light dark:bg-secondary-dark rounded-xl shadow-xl text-left"},l={class:"text-white flex justify-end mr-2"},c={class:"flex justify-center"},u={class:"flex justify-center my-4"},g=(0,r._)("div",{style:{"border-bottom":"1px dotted gray"}},null,-1),m=(0,r._)("div",{class:"text-white text-lg mt-2"},[(0,r._)("h1",null,"Recent Broadcasted Transactions:")],-1),p={key:0,class:"text-white"},f={key:1,class:"text-white"};function x(t,e,a,n,o,x){const b=(0,r.up)("FormTextarea"),h=(0,r.up)("FormInput"),v=(0,r.up)("qrcode-vue"),y=(0,r.up)("Button");return(0,r.wg)(),(0,r.iD)("div",s,[(0,r._)("div",d,[(0,r.Wm)(b,{label:"Signed Transaction",textareaIdentifier:"Signed Transaction",value:t.signedTx,onInput:e[0]||(e[0]=t=>x.setSignedTx(t))},null,8,["value"]),(0,r.Wm)(h,{label:"Destination Address",inputIdentifier:"Destination Address",val:t.destinationAddress,placeholder:"Unknown",readonly:""},null,8,["val"]),(0,r.Wm)(h,{label:"Amount (Lamports)",inputIdentifier:"",val:t.amount,placeholder:"Type the amount",readonly:""},null,8,["val"]),(0,r._)("div",l,(0,i.zw)(t.amount/10**9)+" SOL ",1),(0,r._)("div",c,[(0,r.Wm)(v,{value:t.signedTx,size:"256"},null,8,["value"])]),(0,r.Wm)(h,{label:"URL to broadcast",inputIdentifier:"URL to broadcast",val:t.URLtoBroadcast,readonly:""},null,8,["val"]),(0,r._)("div",u,[(0,r.Wm)(y,{title:"Broadcast",class:"px-4 py-2.5 text-white tracking-wider bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 rounded-lg duration-500",type:"button","aria-label":"Get Recent Blockhash",onClick:x.broadcast},null,8,["onClick"])]),g,m,1==t.IsBroadcasted?((0,r.wg)(),(0,r.iD)("div",p,(0,i.zw)(t.broadcastAction),1)):((0,r.wg)(),(0,r.iD)("div",f," No recent broadcasted transactions found. "))])])}var b=a(5098),h=a(2040);const v=["for"],y=["id","name","aria-label","placeholder"];function w(t,e,a,n,o,s){return(0,r.wg)(),(0,r.iD)("div",null,[(0,r._)("label",{class:"block text-lg text-primary-dark dark:text-primary-light mb-2",for:a.textareaIdentifier},(0,i.zw)(a.label),9,v),(0,r._)("textarea",(0,r.dG)({class:"w-full px-5 py-2 border border-gray-300 dark:border-primary-dark border-opacity-50 text-primary-dark dark:text-secondary-light bg-ternary-light dark:bg-ternary-dark rounded-md shadow-sm text-md",id:a.textareaIdentifier,name:a.textareaIdentifier,"aria-label":a.textareaIdentifier,placeholder:a.label},t.$attrs,{onInput:e[0]||(e[0]=e=>t.$emit("update:val",e.target.value)),cols:"14",rows:"6"}),null,16,y)])}var I={props:{label:{type:String,default:""},textareaIdentifier:{type:String,default:""},val:{type:[String,Number],default:""}}},k=a(3744);const S=(0,k.Z)(I,[["render",w]]);var T=S,B=a(7929),A=a(9232),_=a(3085)["lW"],D=a(5108),W={components:{Button:b.Z,FormInput:h.Z,FormTextarea:T,QrcodeVue:B.Z},data:()=>({signedTx:void 0==localStorage.getItem("SignedTx")?"":localStorage.getItem("SignedTx"),destinationAddress:void 0==localStorage.getItem("DestinationAddress")?"":localStorage.getItem("DestinationAddress"),amount:void 0==localStorage.getItem("Amount")?"":localStorage.getItem("Amount"),URLtoBroadcast:void 0==localStorage.getItem("EndPointUrl")?"":localStorage.getItem("EndPointUrl"),IsBroadcasted:!1,broadcastAction:""}),methods:{proc(){try{const t=_.from(this.signedTx,"base64"),e=A.YW.from(t);let a=e.compileMessage();this.destinationAddress=a.accountKeys[2].toBase58();const r=e.serializeMessage();this.amount=r.readInt32LE(174)}catch(t){this.destinationAddress="",this.amount="",D.log(t)}},setSignedTx(t){this.signedTx=t.target.value,this.proc()},async broadcast(){const t=new A.ew(this.URLtoBroadcast);try{const e=await t.sendRawTransaction(_.from(this.signedTx,"base64"));D.log(e),this.IsBroadcasted=!0,this.broadcastAction=e}catch(e){D.log(e)}}},mounted(){this.proc()}};const L=(0,k.Z)(W,[["render",x]]);var R=L,U={name:"Broadcast",components:{BroadcastForm:R}};const F=(0,k.Z)(U,[["render",o]]);var Z=F}}]);
//# sourceMappingURL=685.b1f00843.js.map