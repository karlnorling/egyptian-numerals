import{n as e}from"./rolldown-runtime-sJBDdmOt.js";import{n as t,r as n}from"./svg-BgE1DsLb.js";function r({value:e,title:t,color:r,background:i,...a}){let o=document.createElement(`div`);o.style.color=`#24292f`;try{o.innerHTML=n(e,{...a,...r?{color:r}:{},...i?{background:i}:{},...t?{title:t}:{}})}catch(e){o.setAttribute(`role`,`alert`),o.style.color=`#c92a2a`,o.style.fontFamily=`system-ui, sans-serif`,o.textContent=e.message}return o}var i,a,o,s,c,l,u,d,f,p;function m(){return(m=e((()=>{t(),i={title:`Egyptian Numerals/Number Builder`,render:r,args:{value:`1993`,size:160,gap:16,padding:20,color:``,background:``,title:``},argTypes:{value:{control:`text`,description:`Any decimal number: whole, fractional, negative or very large. Passed as a string so every digit is kept.`},size:{control:{type:`range`,min:24,max:480,step:4},description:`Image height in pixels.`},gap:{control:{type:`range`,min:0,max:80,step:2}},padding:{control:{type:`range`,min:0,max:40,step:1}},color:{control:`text`,description:"A CSS colour, or a gradient: `linear-gradient(to right, red, blue)`, `radial-gradient(…)` or their `repeating-` forms. Empty for currentColor."},background:{control:`text`,description:`A colour or a gradient, as for **color**. Empty for transparent.`},title:{control:`text`,description:`Accessible name. Leave empty to use the number.`}},parameters:{docs:{description:{component:"Type any number in the **value** control and adjust the style. Every control maps to a `toSvg` option."}}}},a={},o={args:{value:`1234567`},parameters:{docs:{description:{story:`One to seven of each sign, from Heh down to strokes.`}}}},s={args:{value:`4622`},parameters:{docs:{description:{story:`The number carved on a column at Karnak.`}}}},c={args:{value:`12.68`},parameters:{docs:{description:{story:`0.68 is written 2/3 + 1/75.`}}}},l={args:{value:`0`},parameters:{docs:{description:{story:`nfr, the sign for a balance of nothing.`}}}},u={args:{value:`1234567`,color:`linear-gradient(to right, #e03131, #f76707, #fab005, #40c057, #228be6, #7048e8, #be4bdb)`}},d={args:{value:`2026.1225`,color:`repeating-linear-gradient(135deg, #e03131 0 3%, #ffffff 3% 6%)`,background:`radial-gradient(#2b8a3e, #0b3d20)`}},f={args:{value:`twelve`},parameters:{docs:{description:{story:`Input that isn't a decimal number shows the error.`}}}},p=[`Playground`,`EverySign`,`Karnak`,`Fractions`,`Zero`,`Rainbow`,`Christmas`,`InvalidInput`],a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    value: '1234567'
  },
  parameters: {
    docs: {
      description: {
        story: 'One to seven of each sign, from Heh down to strokes.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    value: '4622'
  },
  parameters: {
    docs: {
      description: {
        story: 'The number carved on a column at Karnak.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    value: '12.68'
  },
  parameters: {
    docs: {
      description: {
        story: '0.68 is written 2/3 + 1/75.'
      }
    }
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    value: '0'
  },
  parameters: {
    docs: {
      description: {
        story: 'nfr, the sign for a balance of nothing.'
      }
    }
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    value: '1234567',
    color: 'linear-gradient(to right, #e03131, #f76707, #fab005, #40c057, #228be6, #7048e8, #be4bdb)'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    value: '2026.1225',
    color: 'repeating-linear-gradient(135deg, #e03131 0 3%, #ffffff 3% 6%)',
    background: 'radial-gradient(#2b8a3e, #0b3d20)'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    value: 'twelve'
  },
  parameters: {
    docs: {
      description: {
        story: "Input that isn't a decimal number shows the error."
      }
    }
  }
}`,...f.parameters?.docs?.source}}}})))()}m();export{d as Christmas,o as EverySign,c as Fractions,f as InvalidInput,s as Karnak,a as Playground,u as Rainbow,l as Zero,p as __namedExportsOrder,i as default};