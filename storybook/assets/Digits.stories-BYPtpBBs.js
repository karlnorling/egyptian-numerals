import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{i as t,n,t as r}from"./svg-BgE1DsLb.js";var i,a,o,s;function c(){return(c=e((()=>{t(),n(),i={title:`Egyptian Numerals/Digits`,render:({place:e,size:t})=>{let n=document.createElement(`div`);n.style.cssText=`display:grid;grid-template-columns:repeat(auto-fill,minmax(${Math.max(t,48)+16}px,1fr));gap:12px;align-items:end;width:min(90vw,960px);color:#24292f;font:12px ui-monospace,monospace`;for(let i=0;i<10;i++){let a=document.createElement(`figure`);a.style.cssText=`margin:0;display:grid;justify-items:center;gap:4px`,a.innerHTML=r(i,e,{size:t})+`<figcaption>${i}</figcaption>`,n.append(a)}return n},args:{place:0,size:56},argTypes:{place:{control:{type:`number`,min:-4,max:6,step:1},description:`The power of ten, from 0 (strokes) to 6 (Heh).`},size:{control:{type:`range`,min:24,max:160,step:4}}},parameters:{layout:`padded`,docs:{description:{component:`Every digit from 0 to 9.`}}}},a={},o={args:{place:3},parameters:{docs:{description:{story:`One to nine lotuses: thousands.`}}}},s=[`AllDigits`,`Lotuses`],a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    place: 3
  },
  parameters: {
    docs: {
      description: {
        story: 'One to nine lotuses: thousands.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}}})))()}c();export{a as AllDigits,o as Lotuses,s as __namedExportsOrder,i as default};