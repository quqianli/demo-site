var te=Object.defineProperty;var C=Object.getOwnPropertySymbols;var ae=Object.prototype.hasOwnProperty,re=Object.prototype.propertyIsEnumerable;var R=(s,d,o)=>d in s?te(s,d,{enumerable:!0,configurable:!0,writable:!0,value:o}):s[d]=o,q=(s,d)=>{for(var o in d||(d={}))ae.call(d,o)&&R(s,o,d[o]);if(C)for(var o of C(d))re.call(d,o)&&R(s,o,d[o]);return s};import{N as B,B as S,i as T,a7 as ne,ah as se,a8 as ie,o as h,n as U,p as $,e as t,w as i,d as e,q as c,t as f,F as x,C as de,aa as me,V as ue,_ as pe,$ as ce,P as fe,a0 as be,a3 as _e,b as ge,a2 as he}from"./vendor.2e053485.js";/* empty css                  *//* empty css                  *//* empty css                 */import{b,d as Ve}from"./index.69c61fd6.js";/* empty css                     */import{a as ve}from"./app-role.fb9f4799.js";import{l as Ee}from"./app-dept.aecbb982.js";import{u as Ie}from"./use-table-handlers.62dd0db8.js";const we=s=>b({url:"app/user/listPage",method:"post",data:s}),ye=s=>b({url:"app/user/save",method:"post",data:s}),ke=s=>{const{id:d}=s;return delete s.id,b({url:`app/user/update/${d}`,method:"post",data:s})},Ce=s=>b({url:"app/user/delete",method:"post",data:s}),Re={class:"main-body"},qe={class:"toolbar"},Fe={setup(s){const d=B({name:""}),o=B({id:"",name:"",deptId:"",email:"",mobile:"",roleIds:[],status:!0}),{t:l,tableRef:D,dialogVisible:_,isEdit:g,formLoading:O,formRef:V,doSearch:W,doAdd:N,doEdit:F,doSubmit:P,doRemove:H,doClose:v}=Ie(o),E=S([]),I=S([]),M=T(()=>[{type:"selection"},{prop:"id",label:l("thead.ID"),minWidth:50},{prop:"name",label:l("thead.username"),minWidth:120},{prop:"deptName",label:l("thead.dept"),minWidth:120,showOverflowTooltip:!0},{prop:"roleNames",label:l("thead.role"),minWidth:100,showOverflowTooltip:!0},{prop:"email",label:l("thead.email"),minWidth:120,showOverflowTooltip:!0},{prop:"mobile",label:l("thead.mobile"),minWidth:100},{prop:"status",label:l("thead.status"),minWidth:70,formatter:a=>a.status?l("status.on"):l("status.off")}]),w=(a,r,u)=>{!o.email&&!o.mobile&&u(new Error(l("form.emailOrMobile"))),(!o.mobile||!o.email)&&V.value.clearValidate(a.field==="email"?"mobile":"email"),u()},A=T(()=>({name:[{required:!0,message:l("form.usernameHolder"),trigger:["change","blur"]}],deptId:[{required:!0,message:l("form.deptRequired"),trigger:["change","blur"]}],email:[{type:"email",message:l("form.emailError"),trigger:["change","blur"]},{validator:w,message:l("form.emailOrMobile"),trigger:["change","blur"]}],mobile:[{pattern:/^1[3-9]\d{9}$/,message:l("form.mobileError"),trigger:["change","blur"]},{validator:w,message:l("form.emailOrMobile"),trigger:["change","blur"]}],roleIds:[{required:!0,message:l("form.roleIdsRequired"),trigger:["change","blur"]}]}));function y(){z(),G()}function L(a){y(),N(a)}function j(a){y(),F(a),o.roleIds=a.roleIds.split(",").map(r=>+r),o.status=!!a.status}function z(){Ee().then(a=>{E.value=a.data})}function G(){ve().then(a=>{I.value=a.data})}function J(a,r){H(Ce,a,r)}function K(){P({save:ye,update:ke,getParams:Q},a=>{g.value||ue.alert(`${l("tips.success")}${l("form.username")}: ${a.data.name},${l("form.password")}: ${a.data.password}`,l("tips.title"),{confirmButtonText:l("action.confirm")})})}function Q(){const a=q({},o);return g.value||delete a.id,a.roleIds=o.roleIds.join(","),a}return(a,r)=>{const u=pe,m=ce,p=fe,k=be,X=Ve,Y=ne,Z=he,ee=_e,le=se,oe=ie;return h(),U(x,null,[$("div",Re,[$("div",qe,[t(k,{inline:!0,model:e(d)},{default:i(()=>[t(m,null,{default:i(()=>[t(u,{modelValue:e(d).name,"onUpdate:modelValue":r[0]||(r[0]=n=>e(d).name=n),placeholder:e(l)("thead.username")},null,8,["modelValue","placeholder"])]),_:1}),t(m,null,{default:i(()=>[t(p,{icon:"search",type:"primary",onClick:e(W)},{default:i(()=>[c(f(e(l)("action.search")),1)]),_:1},8,["onClick"])]),_:1}),t(m,null,{default:i(()=>[t(p,{icon:"plus",type:"primary",onClick:L},{default:i(()=>[c(f(e(l)("action.add")),1)]),_:1})]),_:1})]),_:1},8,["model"])]),t(X,{ref_key:"tableRef",ref:D,"get-page":e(we),filters:e(d),columns:e(M),onHandleEdit:j,onHandleDelete:J},null,8,["get-page","filters","columns"])]),t(oe,{title:e(g)?e(l)("action.edit"):e(l)("action.add"),modelValue:e(_),"onUpdate:modelValue":r[7]||(r[7]=n=>me(_)?_.value=n:null),draggable:"",width:"50%","close-on-click-modal":!1,onClose:e(v)},{footer:i(()=>[t(p,{onClick:e(v)},{default:i(()=>[c(f(e(l)("action.cancel")),1)]),_:1},8,["onClick"]),t(p,{type:"primary",onClick:K,loading:e(O)},{default:i(()=>[c(f(e(l)("action.submit")),1)]),_:1},8,["loading"])]),default:i(()=>[t(k,{ref_key:"formRef",ref:V,model:e(o),"label-width":"80px",rules:e(A),"label-position":"right"},{default:i(()=>[t(m,{label:e(l)("form.username"),prop:"name"},{default:i(()=>[t(u,{modelValue:e(o).name,"onUpdate:modelValue":r[1]||(r[1]=n=>e(o).name=n)},null,8,["modelValue"])]),_:1},8,["label"]),t(m,{label:e(l)("form.dept"),prop:"deptId"},{default:i(()=>[t(Y,{modelValue:e(o).deptId,"onUpdate:modelValue":r[2]||(r[2]=n=>e(o).deptId=n),props:{label:"name",value:"id",checkStrictly:!0,emitPath:!1},options:E.value,clearable:"",filterable:"",class:"w100p"},null,8,["modelValue","options"])]),_:1},8,["label"]),t(m,{label:e(l)("form.email"),prop:"email"},{default:i(()=>[t(u,{modelValue:e(o).email,"onUpdate:modelValue":r[3]||(r[3]=n=>e(o).email=n)},null,8,["modelValue"])]),_:1},8,["label"]),t(m,{label:e(l)("form.mobile"),prop:"mobile"},{default:i(()=>[t(u,{modelValue:e(o).mobile,"onUpdate:modelValue":r[4]||(r[4]=n=>e(o).mobile=n)},null,8,["modelValue"])]),_:1},8,["label"]),t(m,{label:e(l)("form.role"),prop:"roleIds"},{default:i(()=>[t(ee,{modelValue:e(o).roleIds,"onUpdate:modelValue":r[5]||(r[5]=n=>e(o).roleIds=n),multiple:"",placeholder:e(l)("form.choose"),style:{width:"100%"}},{default:i(()=>[(h(!0),U(x,null,de(I.value,n=>(h(),ge(Z,{key:n.id,label:n.name,value:n.id},null,8,["label","value"]))),128))]),_:1},8,["modelValue","placeholder"])]),_:1},8,["label"]),t(m,{label:e(l)("status.on")},{default:i(()=>[t(le,{modelValue:e(o).status,"onUpdate:modelValue":r[6]||(r[6]=n=>e(o).status=n)},null,8,["modelValue"])]),_:1},8,["label"])]),_:1},8,["model","rules"])]),_:1},8,["title","modelValue","onClose"])],64)}}};export{Fe as default};
