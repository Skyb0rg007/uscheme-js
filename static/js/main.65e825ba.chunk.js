(this["webpackJsonpuscheme-js"]=this["webpackJsonpuscheme-js"]||[]).push([[0],{36:function(e,t,o){e.exports=o(59)},59:function(e,t,o){"use strict";o.r(t);var n=o(0),a=o.n(n),r=o(11),s=o.n(r),i=o(14),l=o(65),c=o(66),u=o(62),p=o(63),m=o(64),h=o(15),d=o(16),f=o(22),g=o(19),y=o(9),v=o.n(y),b=(o(46),o(28)),E=o(2),S=o.n(E),C=(S.a.node,S.a.object,S.a.string,S.a.bool,{lineHeight:"21px"}),w=function(e){Object(f.a)(o,e);var t=Object(g.a)(o);function o(){return Object(h.a)(this,o),t.apply(this,arguments)}return Object(d.a)(o,[{key:"render",value:function(){var e=this.props,t=e.content,o=e.style,n=e.className,r={message:v()(o,C)};return this.props.dangerMode?a.a.createElement("div",Object.assign({className:n,style:r.message},Object(b.a)(t))):a.a.createElement("div",{className:n,style:r.message},t)}}]),o}(n.Component),j=o(7);var P=function(e){if(e){var t=e.selectionStart,o=e.selectionEnd;setTimeout((function(){return e.setSelectionRange(t,o)}),10)}},N=function(e,t){var o,n=t.history,a=t.historyPosition,r=t.previousHistoryPosition,s=t.terminalInput,i=(o=n,Array.from(o).filter((function(e){return void 0!==e}))).reverse(),l=a,c=r,u=s.current;if(i.length>0)switch(e){case"up":var p=i[0],m=i[i.length-1],h=i[l+1];return null===l?(u.value=p,P(u),{historyPosition:0,previousHistoryPosition:null}):l+1===i.length?(u.value=m,P(u),{historyPosition:i.length-1,previousHistoryPosition:1===i.length?null:i.length-2}):(u.value=h,P(u),{historyPosition:l+1,previousHistoryPosition:l});case"down":var d=i[0],f=i[l-1];return null!==l&&i[l]?l-1===-1?(u.value=null===c||0===l&&1===c?"":d,P(u),{historyPosition:null,previousHistoryPosition:null}):(u.value=f,P(u),{historyPosition:l-1,previousHistoryPosition:l}):(u.value="",P(u),{historyPosition:null,previousHistoryPosition:null})}},O=o(29),k=o(30),x=o.n(k),H={minHeight:"300px",maxWidth:"100%",maxHeight:"100%",borderRadius:"5px",overflow:"auto",cursor:"text",backgroundColor:"#212121",backgroundSize:"cover"},T={padding:"20px",height:"100%",fontSize:"15px",color:"#FFFFFF",fontFamily:"monospace"},I={display:"inline-flex",width:"100%"},R={paddingTop:"3px",color:"#EE9C34"},F={border:"0",padding:"0 0 0 7px",margin:"0",flexGrow:"100",width:"100%",height:"22px",background:"transparent",fontSize:"15px",color:"#F0BF81",fontFamily:"monospace",outline:"none"},M={style:S.a.object,contentStyle:S.a.object,inputAreaStyle:S.a.object,promptLabelStyle:S.a.object,inputStyle:S.a.object},L={className:S.a.string,contentClassName:S.a.string,inputAreaClassName:S.a.string,promptLabelClassName:S.a.string,inputClassName:S.a.string},A={autoFocus:S.a.bool,dangerMode:S.a.bool,disabled:S.a.bool,disableOnProcess:S.a.bool,ignoreCommandCase:S.a.bool,noDefaults:S.a.bool,noEchoBack:S.a.bool,noHistory:S.a.bool,noAutoScroll:S.a.bool,noNewlineParsing:S.a.bool},B={welcomeMessage:S.a.oneOfType([S.a.bool,S.a.arrayOf(S.a.string),S.a.string]),promptLabel:S.a.node,errorText:S.a.string},_={runCommand:S.a.func.isRequired},D={messageStyle:S.a.object,messageClassName:S.a.string},z=(Object(j.a)(Object(j.a)(Object(j.a)(Object(j.a)(Object(j.a)(Object(j.a)({},M),L),A),B),_),D),function(e){Object(f.a)(o,e);var t=Object(g.a)(o);function o(e){var n;return Object(h.a)(this,o),(n=t.call(this,e)).focusTerminal=function(){"Range"===window.getSelection().type||n.terminalInput.current.focus()},n.scrollToBottom=function(){var e=n.terminalRoot.current;setTimeout((function(){e.scrollTop=e.scrollHeight}),1)},n.showWelcomeMessage=function(){var e=n.props.welcomeMessage;n.pushToStdout(e)},n.pushToStdout=function(e,t){var o=n.state.stdout;o.push({message:e,isEcho:(null===t||void 0===t?void 0:t.isEcho)||!1}),(null===t||void 0===t?void 0:t.rawInput)&&n.pushToHistory(t.rawInput),n.setState({stdout:o})},n.pushToHistory=function(e){var t=n.state.history;t.push(e),n.setState({history:t,historyPosition:null})},n.getStdout=function(){return(n.props.noNewlineParsing?n.state.stdout:function(e){for(var t=[],o=0;o<e.length;o++){var n,a=e[o],r=a.message,s=a.isEcho,i=x()(r),l=!s&&/\\n/g.test(i)?i.split(/\\n/g):[i],c=Object(O.a)(l);try{for(c.s();!(n=c.n()).done;){var u=n.value;t.push({message:u,isEcho:a.isEcho})}}catch(p){c.e(p)}finally{c.f()}}return t}(n.state.stdout)).map((function(e,t){return a.a.createElement(w,{key:t,content:e.message,dangerMode:n.props.dangerMode,className:e.isEcho?void 0:n.props.messageClassName,style:e.isEcho?void 0:n.props.messageStyle})}))},n.clearStdout=function(){n.setState({stdout:[]})},n.clearInput=function(){n.setState({historyPosition:null}),n.terminalInput.current.value=""},n.processCommand=function(){n.setState({processing:!0},(function(){var e=n.terminalInput.current.value;if(n.props.noHistory||n.pushToHistory(e),!n.props.noEchoBack){var t=a.a.createElement("span",null,n.props.promptLabel||"$"," ",e);n.pushToStdout(t,{isEcho:!0})}if(e){var o=n.props.runCommand(e);o&&n.pushToStdout(o)}n.setState({processing:!1},(function(){n.clearInput(),n.props.noAutoScroll||n.scrollToBottom()}))}))},n.scrollHistory=function(e){var t=n.state,o=t.history,a=t.historyPosition,r=t.previousHistoryPosition,s=N(e,{history:o,historyPosition:a,previousHistoryPosition:r,terminalInput:n.terminalInput});s&&n.setState(s)},n.handleInput=function(e){switch(e.key){case"Enter":n.processCommand();break;case"ArrowUp":n.scrollHistory("up");break;case"ArrowDown":n.scrollHistory("down");break;default:e.ctrlKey&&76===e.keyCode&&(n.clearStdout(),e.preventDefault())}},n.state={stdout:[],history:[],historyPosition:null,previousHistoryPosition:null,processing:!1},n.terminalRoot=a.a.createRef(),n.terminalInput=a.a.createRef(),n}return Object(d.a)(o,[{key:"componentDidMount",value:function(){this.props.welcomeMessage&&this.showWelcomeMessage(),this.props.autoFocus&&this.focusTerminal()}},{key:"render",value:function(){var e={container:v()(this.props.style,H),content:v()(this.props.contentStyle,T),inputArea:v()(this.props.inputAreaStyle,I),promptLabel:v()(this.props.promptLabelStyle,R),input:v()(this.props.inputStyle,F)};return a.a.createElement("div",{ref:this.terminalRoot,name:"react-console-emulator",className:this.props.className,style:e.container,onClick:this.focusTerminal},a.a.createElement("div",{name:"react-console-emulator__content",className:this.props.contentClassName,style:e.content},this.getStdout(),a.a.createElement("div",{name:"react-console-emulator__inputArea",className:this.props.inputAreaClassName,style:e.inputArea},a.a.createElement("span",{name:"react-console-emulator__promptLabel",className:this.props.promptLabelClassName,style:e.promptLabel},this.props.promptLabel||"$"),a.a.createElement("input",{ref:this.terminalInput,name:"react-console-emulator__input",className:this.props.inputClassName,style:e.input,onKeyDown:this.handleInput,type:"text",autoComplete:"off",disabled:this.props.disabled||this.props.disableOnProcess&&this.state.processing}))))}}]),o}(n.Component)),U=a.a.createContext({eval:function(e){return console.log('Unable to eval("'.concat(e,'"): Interpreter context not initialized'))},reset:function(e){return console.log('Unable to reset("'.concat(e,'"): Interpreter context not initialized'))},name:"<unnamed>"}),W=a.a.forwardRef((function(e,t){var o=a.a.useContext(U),n="Welcome to ".concat(o.name,"! Use Ctrl+L to clear the terminal.");return a.a.createElement(z,{welcomeMessage:n,promptLabel:">",autoFocus:!0,noDefaults:!0,runCommand:o.eval,noNewlineParsing:!0,ref:t})})),K=o(31);o(49),o(50),o(51),o(52),o(53);o(54);var J=function(e){var t=e.valRef,o=a.a.useState(";; Enter code here!"),n=Object(i.a)(o,2),r=n[0],s=n[1];a.a.useEffect((function(){t.current=r}),[t,r]);var l=a.a.useState(null),c=Object(i.a)(l,2),u=c[0],p=c[1];a.a.useEffect((function(){u&&u.addKeyMap({"Ctrl-/":function(e){return e.toggleComment()}})}),[u]);return a.a.createElement(K.Controlled,{value:r,onBeforeChange:function(e,t,o){s(o)},options:{mode:"scheme",theme:"gruvbox-dark",smartIndent:!0,lineNumbers:!0,matchBrackets:!0,autoCloseBrackets:"()[]{}"},editorDidMount:function(e){return p(e)}})},$=function(){var e=a.a.useState(window.uscheme.make_interp),t=Object(i.a)(e,2),o=t[0],n=t[1],r=a.a.useRef(),s=a.a.useRef(""),h={eval:function(e){o(e).split("\n").forEach((function(e){return r.current.pushToStdout(e)}))},reset:function(e){var t=window.uscheme.make_interp();n((function(){return t})),t(e).split("\n").forEach((function(e){return r.current.pushToStdout(e)}))},name:"uscheme"};return a.a.createElement(a.a.Fragment,null,a.a.createElement(l.a,{bg:"light",expand:"lg"},a.a.createElement(l.a.Brand,null,"Comp 105"),a.a.createElement(c.a,null,a.a.createElement(c.a.Link,{href:"#",onSelect:function(){h.reset(s.current)}},"Run"))),a.a.createElement(u.a,null,a.a.createElement(U.Provider,{value:h},a.a.createElement(p.a,null,a.a.createElement(m.a,null,a.a.createElement(J,{valRef:s})),a.a.createElement(m.a,null,a.a.createElement(W,{ref:r}))))))};o(58);s.a.render(a.a.createElement(a.a.StrictMode,null,a.a.createElement($,null)),document.getElementById("root"))}},[[36,1,2]]]);
//# sourceMappingURL=main.65e825ba.chunk.js.map