import{N as T,B as p,i as k,a8 as j,ag as z,o as G,n as J,p as _,e as a,w as t,d as e,q as r,t as u,aa as Q,F as X,g as Y,_ as Z,$ as ee,P as le,a0 as ae}from"./vendor.2e053485.js";/* empty css                  */import{d as te}from"./index.69c61fd6.js";/* empty css                     */import{l as oe,r as ne,s as de,u as se,b as ie}from"./app-role.fb9f4799.js";import{l as re}from"./app-resource.938ec6c7.js";import{u as ue}from"./use-table-handlers.62dd0db8.js";const me={class:"main-body"},ce={class:"toolbar"},pe={class:"dialog-footer"},fe={class:"dialog-footer"},Ce={setup(_e){const f=T({name:""}),s=T({id:"",name:"",remark:""}),{t:l,tableRef:B,dialogVisible:b,isEdit:x,formLoading:w,formRef:D,doSearch:N,doAdd:U,doEdit:W,doRemove:I,doSubmit:S,doClose:y}=ue(s),v=p([]),m=p(!1),V=p([]),g=p(!1),C=p(),F=k(()=>[{type:"selection"},{prop:"id",label:l("thead.ID"),minWidth:50},{prop:"name",label:l("thead.roleName"),minWidth:120},{prop:"remark",label:l("thead.remark"),minWidth:120,showOverflowTooltip:!0},{prop:"createdBy",label:l("thead.createdBy"),minWidth:120},{prop:"createdTime",label:l("thead.createdTime"),minWidth:160},{prop:"lastUpdateBy",label:l("thead.updatedBy"),minWidth:120},{prop:"lastUpdateTime",label:l("thead.updatedTime"),minWidth:160}]),H=k(()=>[{type:"edit"},{label:l("action.bindResource"),onClick:P},{type:"delete"}]),q=k(()=>({name:[{required:!0,message:l("form.nameRequired"),trigger:"blur"}]}));function K(d,o){I(ne,d,o)}function L(){S({save:de,update:se})}function P(d){m.value=!0,$(),V.value=d.resourceIds?d.resourceIds.split(","):[]}function $(){re().then(d=>{v.value=d.data})}function A(){g.value=!0,ie({ids:C.value.getCheckedKeys().toString()}).then(()=>{Y({message:l("tips.success"),type:"success",shoClose:!0}),m.value=!1}).finally(()=>{g.value=!1})}return(d,o)=>{const h=Z,c=ee,i=le,R=ae,M=te,E=j,O=z;return G(),J(X,null,[_("div",me,[_("div",ce,[a(R,{inline:!0,model:e(f)},{default:t(()=>[a(c,null,{default:t(()=>[a(h,{modelValue:e(f).name,"onUpdate:modelValue":o[0]||(o[0]=n=>e(f).name=n),placeholder:e(l)("thead.username")},null,8,["modelValue","placeholder"])]),_:1}),a(c,null,{default:t(()=>[a(i,{icon:"search",type:"primary",onClick:e(N)},{default:t(()=>[r(u(e(l)("action.search")),1)]),_:1},8,["onClick"])]),_:1}),a(c,null,{default:t(()=>[a(i,{icon:"plus",type:"primary",onClick:e(U)},{default:t(()=>[r(u(e(l)("action.add")),1)]),_:1},8,["onClick"])]),_:1})]),_:1},8,["model"])]),a(M,{ref_key:"tableRef",ref:B,"get-page":e(oe),filters:e(f),columns:e(F),operations:e(H),onHandleEdit:e(W),onHandleDelete:K},null,8,["get-page","filters","columns","operations","onHandleEdit"])]),a(E,{title:e(x)?e(l)("action.edit"):e(l)("action.add"),width:"40%",draggable:"",modelValue:e(b),"onUpdate:modelValue":o[3]||(o[3]=n=>Q(b)?b.value=n:null),"close-on-click-modal":!1,onClose:e(y)},{footer:t(()=>[_("div",pe,[a(i,{onClick:e(y)},{default:t(()=>[r(u(e(l)("action.cancel")),1)]),_:1},8,["onClick"]),a(i,{type:"primary",onClick:L,loading:e(w)},{default:t(()=>[r(u(e(l)("action.submit")),1)]),_:1},8,["loading"])])]),default:t(()=>[a(R,{ref_key:"formRef",ref:D,model:e(s),"label-width":"80px",rules:e(q)},{default:t(()=>[a(c,{label:e(l)("thead.roleName"),prop:"name"},{default:t(()=>[a(h,{modelValue:e(s).name,"onUpdate:modelValue":o[1]||(o[1]=n=>e(s).name=n)},null,8,["modelValue"])]),_:1},8,["label"]),a(c,{label:e(l)("thead.remark"),prop:"remark"},{default:t(()=>[a(h,{modelValue:e(s).remark,"onUpdate:modelValue":o[2]||(o[2]=n=>e(s).remark=n),type:"textarea"},null,8,["modelValue"])]),_:1},8,["label"])]),_:1},8,["model","rules"])]),_:1},8,["title","modelValue","onClose"]),a(E,{title:e(l)("action.bindResource"),width:"40%",draggable:"",modelValue:m.value,"onUpdate:modelValue":o[5]||(o[5]=n=>m.value=n),"close-on-click-modal":!1},{footer:t(()=>[_("div",fe,[a(i,{onClick:o[4]||(o[4]=n=>m.value=!1)},{default:t(()=>[r(u(e(l)("action.cancel")),1)]),_:1}),a(i,{type:"primary",onClick:A,loading:g.value},{default:t(()=>[r(u(e(l)("action.submit")),1)]),_:1},8,["loading"])])]),default:t(()=>[a(O,{ref_key:"treeRef",ref:C,data:v.value,"show-checkbox":"","node-key":"id","default-expand-all":"","default-checked-keys":V.value,props:{label:"displayName"}},null,8,["data","default-checked-keys"])]),_:1},8,["title","modelValue"])],64)}}};export{Ce as default};
