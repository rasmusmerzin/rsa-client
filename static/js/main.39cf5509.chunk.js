(this["webpackJsonpreact-rsa-client"]=this["webpackJsonpreact-rsa-client"]||[]).push([[0],{107:function(e,t){},109:function(e,t){},142:function(e,t){},143:function(e,t){},201:function(e,t,a){},202:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(98),s=a.n(c),i=a(18),o=a(19),l=a(21),u=a(20),p=a(17),m=a(22),d=a(30),f=a.n(d),h=(a(201),function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:50;return e.length<=t?e:e.substr(0,t-3)+"..."}),g=function(e){return e.select(),e.setSelectionRange(0,99999),document.execCommand("copy")},v=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).lenRSAOptions=[.5,1,2,3,4].map((function(e){return 1024*e})),a.genPrv=r.a.createRef(),a.genPub=r.a.createRef(),a.impPrv=r.a.createRef(),a.state={lenRSA:1024,impBuffer:"",rsa:null},a.generateNewIdentity=a.generateNewIdentity.bind(Object(p.a)(a)),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"generateNewIdentity",value:function(){var e=this;this.props.setLoading("Generating ".concat(this.state.lenRSA,"-bit RSA keypair")),this.setState({rsa:null}),setTimeout((function(){return e.setState((function(t){return t.rsa=new f.a({b:e.state.lenRSA}),e.props.setLoading(),t}))}),500)}},{key:"componentDidMount",value:function(){this.generateNewIdentity()}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h1",null,"Keypair"),r.a.createElement("div",{className:"split compact"},r.a.createElement("textarea",{className:"ro",value:this.state.rsa?this.state.rsa.exportKey("pkcs8-private"):"",placeholder:"Private key",readOnly:!0,ref:this.genPrv,onClick:function(){return g(e.genPrv.current)}}),r.a.createElement("textarea",{className:"ro",value:this.state.rsa?this.state.rsa.exportKey("pkcs8-public"):"",placeholder:"Public key",readOnly:!0,ref:this.genPub,onClick:function(){return g(e.genPub.current)}})),r.a.createElement("div",{className:"sep"},r.a.createElement("div",{className:"sep2 inline"},r.a.createElement("button",{onClick:function(){e.props.setDialogue("Are you sure?","Previous pair will be overwritten. You may need to save it before generating a new keypair.",["overwrite","cancel"],(function(t){return"overwrite"===t&&e.generateNewIdentity()}))}},"Generate"),r.a.createElement("div",{className:"sep3 inline"},this.lenRSAOptions.map((function(t,a){return r.a.createElement("button",{key:a,className:e.state.lenRSA===t?"selected":"",onClick:function(){return e.setState({lenRSA:t})}},t)})))),r.a.createElement("button",{onClick:function(){e.setState({impBuffer:""}),e.props.setDialogue("Import keypair",r.a.createElement("textarea",{ref:e.impPrv,placeholder:"Private key",onChange:function(){return e.setState({impBuffer:e.impPrv.current.value})}}),["import","cancel"],(function(t){if("import"===t)try{var a=new f.a(e.state.impBuffer);a.exportKey("pkcs8-private"),e.setState({rsa:a,impBuffer:""})}catch(n){return String(n)}}))}},"Import")))}}]),t}(r.a.Component),b=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).encMsg=r.a.createRef(),a.encPub=r.a.createRef(),a.encRes=r.a.createRef(),a.state={result:"",processInfo:""},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h1",null,"Encryption"),r.a.createElement("div",{className:"split two-to-one compact"},r.a.createElement("textarea",{ref:this.encMsg,className:"top-left",placeholder:"Message",onChange:function(){return e.setState({result:""})}}),r.a.createElement("textarea",{ref:this.encPub,className:"bottom-left",placeholder:"Recipient's public key",onChange:function(){return e.setState({result:""})}}),r.a.createElement("textarea",{className:"ro right",value:this.state.result,placeholder:"Encrypted message",readOnly:!0,ref:this.encRes,onClick:function(){return g(e.encRes.current)}})),r.a.createElement("div",{className:"sep2"},r.a.createElement("button",{onClick:function(){e.props.setLoading("Encrypting..."),e.setState({processInfo:"encrypting..."}),setTimeout((function(){try{var t=(a=e.encMsg.current.value,n=e.encPub.current.value,new f.a(n).encrypt(a,"base64"));e.setState({result:t,processInfo:""})}catch(r){e.setState({processInfo:String(r)})}var a,n;e.props.setLoading()}))}},"Encrypt"),r.a.createElement("i",null,h(this.state.processInfo))))}}]),t}(r.a.Component),E=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).decMsg=r.a.createRef(),a.decPub=r.a.createRef(),a.decRes=r.a.createRef(),a.state={result:"",processInfo:""},a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("h1",null,"Decryption"),r.a.createElement("div",{className:"split two-to-one compact"},r.a.createElement("textarea",{className:"top-left",ref:this.decMsg,placeholder:"Encrypted message",onChange:function(){return e.setState({result:""})}}),r.a.createElement("textarea",{className:"bottom-left",ref:this.decPub,placeholder:"Private key",onChange:function(){return e.setState({result:""})}}),r.a.createElement("textarea",{className:"ro right",value:this.state.result,placeholder:"Original message",readOnly:!0,ref:this.decRes,onClick:function(){return g(e.decRes.current)}})),r.a.createElement("div",{className:"sep2"},r.a.createElement("button",{onClick:function(){e.props.setLoading("Decrypting..."),e.setState({processInfo:"decrypting..."}),setTimeout((function(){try{var t=(a=e.decMsg.current.value,n=e.decPub.current.value,new f.a(n).decrypt(a,"utf-8"));e.setState({result:t,processInfo:""})}catch(r){e.setState({processInfo:String(r)})}var a,n;e.props.setLoading()}))}},"Decrypt"),r.a.createElement("i",null,h(this.state.processInfo))))}}]),t}(r.a.Component),y=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"dialogue"},r.a.createElement("h2",null,this.props.title),r.a.createElement("p",null,this.props.desc),r.a.createElement("i",null,this.props.remark),r.a.createElement("div",{className:"sep-rev text-align-right"},(this.props.options||["ok"]).map((function(t,a){return r.a.createElement("button",{key:a,onClick:function(){return e.props.onClick(t)}},t)}))))}}]),t}(r.a.Component),k=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(u.a)(t).call(this,e))).state={},a.setDialogue=a.setDialogue.bind(Object(p.a)(a)),a.setLoading=a.setLoading.bind(Object(p.a)(a)),a}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;document.addEventListener("keyup",(function(t){return"Escape"===t.key&&e.setState({dialogue:void 0})}))}},{key:"setDialogue",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"?",a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"...",n=arguments.length>2?arguments[2]:void 0,c=arguments.length>3&&void 0!==arguments[3]?arguments[3]:function(){};this.setState({dialogue:r.a.createElement(y,{title:t,desc:a,options:n,onClick:function(t){c(t)||e.setState({dialogue:void 0})}})})}},{key:"setLoading",value:function(e){this.setState({loading:e})}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:"text-align-right"},r.a.createElement("button",{onClick:function(){var e=document.body.className.split(" ").filter((function(e){return 0!==e.length})),t=e.indexOf("dark-theme");-1===t?e.push("dark-theme"):e.splice(t,1),document.body.className=e.join(" ")}},"Dark-Theme")),r.a.createElement(v,{setDialogue:this.setDialogue,setLoading:this.setLoading}),r.a.createElement(b,{setLoading:this.setLoading}),r.a.createElement(E,{setLoading:this.setLoading}),r.a.createElement("div",{className:"quote"},r.a.createElement("a",{href:"http://github.com/rasmusmerzin/rsa-client"},"source")),this.state.dialogue&&r.a.createElement("div",{id:"popup"},this.state.dialogue),this.state.loading&&r.a.createElement("div",{id:"loading"},r.a.createElement("div",{className:"message"},this.state.loading),r.a.createElement("div",{className:"spinner"},"( )")))}}]),t}(r.a.Component);s.a.render(r.a.createElement(k,null),document.getElementById("app"))},99:function(e,t,a){e.exports=a(202)}},[[99,1,2]]]);
//# sourceMappingURL=main.39cf5509.chunk.js.map