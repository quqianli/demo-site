var N=Object.defineProperty;var g=Object.getOwnPropertySymbols;var w=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var y=(l,e,a)=>e in l?N(l,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):l[e]=a,I=(l,e)=>{for(var a in e||(e={}))w.call(e,a)&&y(l,a,e[a]);if(g)for(var a of g(e))C.call(e,a)&&y(l,a,e[a]);return l};import{u as R,h as S,B as q,N as P,i as c,a1 as D,$ as L,a2 as M,a3 as O,P as T,a0 as U,o as u,b as d,w as s,d as o,e as p,p as $,t as h,n as j,C as z,F as A,q as G,v as H,g as J}from"./vendor.2e053485.js";/* empty css                     */import{r as K,c as Q}from"./index.69c61fd6.js";const ee={setup(l){const{t:e}=R(),a=S(),i=q(),t=P({name:"",roleId:""}),n=c(()=>a.state.user.userInfo),m=c(()=>n.value.createdBy==="system"),v=c(()=>({roleId:{required:!0,message:e("form.roleRequired"),trigger:"blur"}}));D(n,()=>{k()},{immediate:!0});function k(){t.name=n.value.name,t.roleId=n.value.roleId}function B(){i.value.validate(f=>{!f||Q(I({},t)).then(()=>{J.success(e("tips.success"))})})}return(f,_)=>{const b=L,E=M,V=O,x=T,F=U;return u(),d(F,{ref_key:"formRef",ref:i,model:o(t),rules:o(v),"label-width":"80px","label-position":"left"},{default:s(()=>[p(b,{label:o(e)("form.username")},{default:s(()=>[$("label",null,h(o(t).name),1)]),_:1},8,["label"]),p(b,{label:o(e)("form.group"),prop:o(m)?"":"roleId"},{default:s(()=>[p(V,{modelValue:o(t).roleId,"onUpdate:modelValue":_[0]||(_[0]=r=>o(t).roleId=r),disabled:o(m),placeholder:o(e)("form.choose"),style:{"margin-right":"10px"}},{default:s(()=>[(u(!0),j(A,null,z(o(K),r=>(u(),d(E,{key:r.name,label:r.label,value:r.name},null,8,["label","value"]))),128))]),_:1},8,["modelValue","disabled","placeholder"]),o(m)?H("",!0):(u(),d(x,{key:0,type:"primary",onClick:B},{default:s(()=>[G(h(o(e)("action.apply")),1)]),_:1}))]),_:1},8,["label","prop"])]),_:1},8,["model","rules"])}}};export{ee as default};
