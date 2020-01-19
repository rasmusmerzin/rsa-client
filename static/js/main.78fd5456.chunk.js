(this["webpackJsonpreact-rsa-client"]=this["webpackJsonpreact-rsa-client"]||[]).push([[0],{106:function(e,t){},108:function(e,t){},142:function(e,t){},143:function(e,t){},201:function(e,t,a){},202:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(97),s=a.n(c),i=a(17),l=a(18),o=a(20),u=a(19),p=a(29),m=a(21),f=a(30),d=a.n(f),h=(a(201),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50;return e.length<=t?e:e.substr(0,t-3)+"..."}),v=function(e){return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")},g=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).lenRSAOptions=[512,1024,2048,4096],a.genPrv=r.a.createRef(),a.genPub=r.a.createRef(),a.impPrv=r.a.createRef(),a.state={lenRSA:1024,impBuffer:"",rsa:null},a.generateNewIdentity=a.generateNewIdentity.bind(Object(p.a)(a)),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"generateNewIdentity",value:function(){var e=this;this.setState({rsa:null}),setTimeout((function(){return e.setState({rsa:new d.a({b:e.state.lenRSA})})}),500)}},{key:"componentDidMount",value:function(){this.generateNewIdentity()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h1",null,"Generate"),null===this.state.rsa&&r.a.createElement("div",{id:"generating"},r.a.createElement("div",null,"Generating ",this.state.lenRSA,"-bit RSA keypair ",r.a.createElement("span",null,"( )"))),r.a.createElement("div",{className:"split compact"+(null===this.state.rsa?" hidden":"")},r.a.createElement("textarea",{className:"ro",value:this.state.rsa?this.state.rsa.exportKey("pkcs8-private"):"",placeholder:"Private key",readOnly:!0,ref:this.genPrv,onClick:function(){return v(e.genPrv.current)}}),r.a.createElement("textarea",{className:"ro",value:this.state.rsa?this.state.rsa.exportKey("pkcs8-public"):"",placeholder:"Public key",readOnly:!0,ref:this.genPub,onClick:function(){return v(e.genPub.current)}})),r.a.createElement("div",{className:"sep"},r.a.createElement("div",{className:"sep2 inline"},r.a.createElement("button",{onClick:function(){e.props.setDialogue("Are you sure?","Previous pair will be overwritten. You may need to save it before generating a new keypair.",["overwrite","cancel"],(function(t){return"overwrite"===t&&e.generateNewIdentity()}))},disabled:null===this.state.rsa},"Generate Keypair"),r.a.createElement("div",{className:"sep3 inline"},this.lenRSAOptions.map((function(t,a){return r.a.createElement("button",{key:a,disabled:null===e.state.rsa,className:e.state.lenRSA===t?"selected":"",onClick:function(){return e.setState({lenRSA:t})}},t)})))),r.a.createElement("button",{disabled:null===this.state.rsa,onClick:function(){e.setState({impBuffer:""}),e.props.setDialogue("Import keypair",r.a.createElement("textarea",{ref:e.impPrv,placeholder:"Private key",onChange:function(){return e.setState({impBuffer:e.impPrv.current.value})}}),["import","cancel"],(function(t){if("import"===t)try{var a=new d.a(e.state.impBuffer);a.exportKey("pkcs8-private"),e.setState({rsa:a,impBuffer:""})}catch(n){return String(n)}}))}},"Import")))}}]),t}(r.a.Component),b=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).encMsg=r.a.createRef(),a.encPub=r.a.createRef(),a.encRes=r.a.createRef(),a.state={result:"",processInfo:""},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h1",null,"Encryption"),r.a.createElement("div",{className:"split two-to-one compact"},r.a.createElement("textarea",{ref:this.encMsg,className:"top-left",placeholder:"Message",onChange:function(){return e.setState({result:""})}}),r.a.createElement("textarea",{ref:this.encPub,className:"bottom-left",placeholder:"Recipient's public key",onChange:function(){return e.setState({result:""})}}),r.a.createElement("textarea",{className:"ro right",value:this.state.result,placeholder:"Encrypted message",readOnly:!0,ref:this.encRes,onClick:function(){return v(e.encRes.current)}})),r.a.createElement("div",{className:"sep2"},r.a.createElement("button",{onClick:function(){e.setState({processInfo:"encrypting..."});try{var t=(a=e.encMsg.current.value,n=e.encPub.current.value,new d.a(n).encrypt(a,"base64"));e.setState({result:t,processInfo:""})}catch(r){e.setState({processInfo:String(r)})}var a,n}},"Encrypt"),r.a.createElement("i",null,h(this.state.processInfo))))}}]),t}(r.a.Component),E=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).decMsg=r.a.createRef(),a.decPub=r.a.createRef(),a.decRes=r.a.createRef(),a.state={result:"",processInfo:""},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h1",null,"Decryption"),r.a.createElement("div",{className:"split two-to-one compact"},r.a.createElement("textarea",{className:"top-left",ref:this.decMsg,placeholder:"Encrypted message",onChange:function(){return e.setState({result:""})}}),r.a.createElement("textarea",{className:"bottom-left",ref:this.decPub,placeholder:"Private key",onChange:function(){return e.setState({result:""})}}),r.a.createElement("textarea",{className:"ro right",value:this.state.result,placeholder:"Original message",readOnly:!0,ref:this.decRes,onClick:function(){return v(e.decRes.current)}})),r.a.createElement("div",{className:"sep2"},r.a.createElement("button",{onClick:function(){e.setState({processInfo:"decrypting..."});try{var t=(a=e.decMsg.current.value,n=e.decPub.current.value,new d.a(n).decrypt(a,"utf-8"));e.setState({result:t,processInfo:""})}catch(r){e.setState({processInfo:String(r)})}var a,n}},"Decrypt"),r.a.createElement("i",null,h(this.state.processInfo))))}}]),t}(r.a.Component),y=function(e){function t(){return Object(i.a)(this,t),Object(o.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"dialogue"},r.a.createElement("h2",null,this.props.title),r.a.createElement("p",null,this.props.desc),r.a.createElement("i",null,this.props.remark),r.a.createElement("div",{className:"sep-rev text-align-right"},(this.props.options||["ok"]).map((function(t,a){return r.a.createElement("button",{key:a,onClick:function(){return e.props.onClick(t)}},t)}))))}}]),t}(r.a.Component),k=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(o.a)(this,Object(u.a)(t).call(this,e))).state={},a.setDialogue=a.setDialogue.bind(Object(p.a)(a)),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;document.addEventListener("keyup",(function(t){return"Escape"===t.key&&e.setState({dialogue:void 0})}))}},{key:"setDialogue",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"?",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"...",n=arguments.length>2?arguments[2]:void 0,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){};this.setState({dialogue:r.a.createElement(y,{title:t,desc:a,options:n,onClick:function(t){c(t)||e.setState({dialogue:void 0})}})})}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"text-align-right"},r.a.createElement("button",{onClick:function(){var e=document.body.className.split(" ").filter((function(e){return 0!==e.length})),t=e.indexOf("dark-theme");-1===t?e.push("dark-theme"):e.splice(t,1),document.body.className=e.join(" ")}},"Dark-Theme")),r.a.createElement(g,{setDialogue:this.setDialogue}),r.a.createElement(b,null),r.a.createElement(E,null),this.state.dialogue&&r.a.createElement("div",{id:"popup"},this.state.dialogue))}}]),t}(r.a.Component);s.a.render(r.a.createElement(k,null),document.getElementById("app"))},98:function(e,t,a){e.exports=a(202)}},[[98,1,2]]]);
//# sourceMappingURL=main.78fd5456.chunk.js.map