"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2966],{52966:function(e,t,r){r.r(t),r.d(t,{SortList:function(){return C},default:function(){return S}});var a=r(57437),s=r(33392),l=r(2265),i=r(2403),n=r(97870),d=r(31806),o=r(91865);function c(e){let{from:t,to:r,earned:s,apr:c,liquidity:x,multiplier:m,children:g}=e,[u,h]=(0,l.useState)(!1);return(0,a.jsxs)("div",{className:"relative mb-3 overflow-hidden rounded-lg bg-white shadow-card transition-all last:mb-0 hover:shadow-large dark:bg-light-dark",children:[(0,a.jsxs)("div",{className:"relative grid h-auto cursor-pointer grid-cols-2 items-center gap-3 py-4 sm:h-20 sm:grid-cols-3 sm:gap-6 sm:py-0 lg:grid-cols-5",onClick:()=>h(!u),children:[(0,a.jsx)("div",{className:"col-span-2 px-4 sm:col-auto sm:px-8 xl:px-4",children:(0,a.jsx)(d.Z,{from:t,to:r})}),(0,a.jsxs)("div",{className:"px-4 text-xs font-medium uppercase tracking-wider text-black dark:text-white sm:px-8 sm:text-sm",children:[(0,a.jsx)("span",{className:"mb-1 block font-medium text-gray-600 dark:text-gray-400 sm:hidden",children:"Earned"}),s]}),(0,a.jsxs)("div",{className:"px-4 text-xs font-medium uppercase tracking-wider text-black dark:text-white sm:px-8 sm:text-sm",children:[(0,a.jsx)("span",{className:"mb-1 block font-medium text-gray-600 dark:text-gray-400 sm:hidden",children:"APR"}),c,(0,a.jsx)("span",{className:"hidden font-normal text-gray-600 dark:text-gray-400 sm:block",children:"Annualized"})]}),(0,a.jsx)("div",{className:"hidden px-4 text-xs font-medium uppercase tracking-wider text-black dark:text-white sm:px-8 sm:text-sm lg:block",children:x}),(0,a.jsx)("div",{className:"hidden px-4 text-xs font-medium uppercase tracking-wider text-black dark:text-white sm:px-8 sm:text-sm lg:block",children:m})]}),(0,a.jsx)(i.M,{initial:!1,children:u&&(0,a.jsx)(n.E.div,{initial:"collapsed",animate:"open",exit:"collapsed",variants:{open:{opacity:1,height:"auto"},collapsed:{opacity:0,height:0}},transition:{duration:.4,ease:"easeInOut"},children:(0,a.jsxs)("div",{className:"border-t border-dashed border-gray-200 px-4 py-4 dark:border-gray-700 sm:px-8 sm:py-6",children:[(0,a.jsxs)("div",{className:"mb-6 flex items-center justify-center rounded-lg bg-gray-100 p-3 text-center text-xs font-medium uppercase tracking-wider text-gray-900 dark:bg-gray-900 dark:text-white sm:h-13 sm:text-sm",children:["get ",t,"/",r," lp tokens for staking"]}),(0,a.jsx)("div",{className:"mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden",children:(0,a.jsxs)("div",{className:"flex flex-col gap-3 sm:gap-4",children:[(0,a.jsx)(o.Z,{label:"Liquidity:",value:x,className:"text-xs sm:text-sm"}),(0,a.jsx)(o.Z,{label:"Multiplier:",value:m,className:"text-xs sm:text-sm"})]})}),g]})},"content")})]})}var x=r(9740);let m=[{id:1,from:"BTC",to:"ETH",earned:"0",apr:"29.72%",liquidity:"$232,941,720",multiplier:"40x"},{id:2,from:"USDT",to:"BNB",earned:"0",apr:"25.20%",liquidity:"$132,941,720",multiplier:"10x"},{id:3,from:"USDC",to:"DOGE",earned:"0",apr:"33.73%",liquidity:"$332,941,720",multiplier:"22x"},{id:4,from:"BTC",to:"ADA",earned:"0",apr:"10.73%",liquidity:"$232,941,720",multiplier:"20x"},{id:5,from:"BNB",to:"USDC",earned:"0",apr:"20.73%",liquidity:"$132,941,720",multiplier:"34x"},{id:6,from:"ETH",to:"ADA",earned:"0",apr:"20.73%",liquidity:"$132,941,720",multiplier:"34x"}];var g=r(54440),u=r.n(g),h=r(16856),p=r(63930),f=r(44734),y=r(89581),b=r(95051),j=r(85221),k=r(34546),w=r(20534);function v(){return(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"h-6 w-6",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"})})}let N=[{id:1,name:"Hot"},{id:2,name:"APR"},{id:3,name:"Earned"},{id:4,name:"Total staked"},{id:5,name:"Latest"}];function C(e){let{sortData:t,className:r}=e,{layout:s}=(0,k.$)(),[i,n]=(0,l.useState)(t[0]);return(0,a.jsx)("div",{className:"relative w-full lg:w-auto",children:(0,a.jsxs)(f.R,{value:i,onChange:n,children:[s===w.O.RETRO?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(f.R.Button,{className:"hidden h-11 w-full items-center justify-between rounded-lg pr-2 text-sm text-gray-900 dark:text-white lg:flex xl:flex 3xl:hidden",children:(0,a.jsx)(v,{})}),(0,a.jsxs)(f.R.Button,{className:u()("flex h-11 w-full items-center justify-between gap-1 rounded-lg bg-gray-100 px-3 text-sm text-gray-900 dark:bg-gray-800 dark:text-white lg:hidden lg:w-40 xl:hidden xl:w-48 3xl:flex",r),children:[i.name," ",(0,a.jsx)(b._,{})]})]}):(0,a.jsxs)(f.R.Button,{className:u()("flex h-11 w-full items-center justify-between gap-1 rounded-lg bg-gray-100 px-3 text-sm text-gray-900 dark:bg-gray-800 dark:text-white md:w-36 lg:w-40 xl:w-48",r),children:[i.name,(0,a.jsx)(b._,{})]}),(0,a.jsx)(h.u,{as:l.Fragment,enter:"ease-out duration-200",enterFrom:"opacity-0 translate-y-2",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 -translate-y-0",leaveTo:"opacity-0 translate-y-2",children:(0,a.jsx)(f.R.Options,{className:"absolute z-20 mt-2 w-full min-w-[150px] origin-top-right rounded-lg bg-white p-3 px-1.5 shadow-large shadow-gray-400/10 ltr:right-0 rtl:left-0 dark:bg-[rgba(0,0,0,0.5)] dark:shadow-gray-900 dark:backdrop-blur",children:t.map(e=>(0,a.jsx)(f.R.Option,{value:e,children:t=>{let{selected:r}=t;return(0,a.jsx)("div",{className:"block cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-900 transition dark:text-white  ".concat(r?"my-1 bg-gray-100 dark:bg-gray-700":"hover:bg-gray-50 dark:hover:bg-gray-700"),children:e.name})}},e.id))})})]})})}function E(){return(0,a.jsx)("form",{className:"relative flex w-full rounded-full lg:w-auto lg:basis-72 xl:w-48",noValidate:!0,role:"search",children:(0,a.jsxs)("label",{className:"flex w-full items-center",children:[(0,a.jsx)("input",{className:"h-11 w-full appearance-none rounded-lg border-2 border-gray-200 bg-transparent py-1 text-sm tracking-tighter text-gray-900 outline-none transition-all placeholder:text-gray-600 focus:border-gray-900 ltr:pl-10 ltr:pr-5 rtl:pr-10 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500",placeholder:"Search farms",autoComplete:"off"}),(0,a.jsx)("span",{className:"pointer-events-none absolute flex h-full w-8 cursor-pointer items-center justify-center text-gray-600 hover:text-gray-900 ltr:left-0 ltr:pl-2 rtl:right-0 rtl:pr-2 dark:text-gray-500 sm:ltr:pl-3 sm:rtl:pr-3",children:(0,a.jsx)(j.W,{className:"h-4 w-4"})})]})})}function R(){let[e,t]=(0,l.useState)(!1);return(0,a.jsxs)(y.r,{checked:e,onChange:t,className:"flex items-center gap-2 text-gray-400 sm:gap-3",children:[(0,a.jsx)("div",{className:u()(e?"bg-brand dark:bg-white":"bg-gray-200 dark:bg-gray-500","relative inline-flex h-[22px] w-10 items-center rounded-full transition-colors duration-300"),children:(0,a.jsx)("span",{className:u()(e?"bg-white ltr:translate-x-5 rtl:-translate-x-5 dark:bg-light-dark":"bg-white ltr:translate-x-0.5 rtl:-translate-x-0.5 dark:bg-light-dark","inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200")})}),(0,a.jsx)("span",{className:"inline-flex text-xs font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:text-sm",children:"Stacked only"})]})}function O(){let[e,t]=(0,l.useState)("live");return(0,a.jsxs)(p.E,{value:e,onChange:t,className:"flex items-center sm:gap-3",children:[(0,a.jsx)(p.E.Option,{value:"live",children:e=>{let{checked:t}=e;return(0,a.jsxs)("span",{className:"relative flex h-11 w-20 cursor-pointer items-center justify-center rounded-lg text-center text-xs font-medium tracking-wider sm:w-24 sm:text-sm ".concat(t?"text-white":"text-brand dark:text-white/50"),children:[t&&(0,a.jsx)(n.E.span,{className:"absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-brand shadow-large",layoutId:"statusIndicator"}),(0,a.jsx)("span",{className:"relative",children:"LIVE"})]})}}),(0,a.jsx)(p.E.Option,{value:"finished",children:e=>{let{checked:t}=e;return(0,a.jsxs)("span",{className:"relative flex h-11 w-20 cursor-pointer items-center justify-center rounded-lg text-center text-xs font-medium tracking-wider sm:w-24 sm:text-sm ".concat(t?"text-white":"text-brand dark:text-white/50"),children:[t&&(0,a.jsx)(n.E.span,{className:"absolute bottom-0 left-0 right-0 h-full w-full rounded-lg bg-brand shadow-large",layoutId:"statusIndicator"}),(0,a.jsx)("span",{className:"relative",children:"FINISHED"})]})}})]})}function S(){let{layout:e}=(0,k.$)();return(0,a.jsxs)("div",{className:"mx-auto w-full",children:[(0,a.jsxs)("div",{className:u()("mb-6 flex flex-col justify-between gap-4",e===w.O.RETRO?"lg:flex-row lg:items-center lg:gap-6":"md:flex-row md:items-center md:gap-6"),children:[(0,a.jsxs)("div",{className:"flex items-center justify-between gap-4",children:[(0,a.jsx)(O,{}),(0,a.jsx)("div",{className:u()(e===w.O.RETRO?"lg:hidden":"md:hidden"),children:(0,a.jsx)(R,{})})]}),(0,a.jsxs)("div",{className:"flex items-center justify-between gap-4 lg:gap-8",children:[(0,a.jsx)("div",{className:u()("hidden shrink-0 ",e===w.O.RETRO?"lg:block":"md:block"),children:(0,a.jsx)(R,{})}),(0,a.jsx)(E,{}),(0,a.jsx)(C,{sortData:N})]})]}),(0,a.jsxs)("div",{className:"mb-3 hidden grid-cols-3 gap-6 rounded-lg bg-white shadow-card dark:bg-light-dark sm:grid lg:grid-cols-5",children:[(0,a.jsx)("span",{className:"px-6 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300",children:"Pool"}),(0,a.jsx)("span",{className:"px-6 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300",children:"Earned"}),(0,a.jsx)("span",{className:"px-6 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300",children:"APR"}),(0,a.jsx)("span",{className:"hidden px-6 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300 lg:block",children:"Liquidity"}),(0,a.jsx)("span",{className:"hidden px-4 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300 lg:block",children:"Multiplier"})]}),m.map(e=>(0,a.jsxs)(c,{from:e.from,to:e.to,earned:e.earned,apr:e.apr,liquidity:e.liquidity,multiplier:e.multiplier,children:[(0,a.jsxs)("div",{className:"mb-4 grid grid-cols-2 gap-4 sm:mb-6 sm:gap-6",children:[(0,a.jsx)("input",{type:"number",placeholder:"0.0",className:"spin-button-hidden h-11 appearance-none rounded-lg border-solid border-gray-200 bg-body px-4 text-sm tracking-tighter text-gray-900 placeholder:text-gray-600 focus:border-gray-900 focus:shadow-none focus:outline-none focus:ring-0 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-600 sm:h-13"}),(0,a.jsx)("input",{type:"number",placeholder:"0.0",className:"spin-button-hidden h-11 appearance-none rounded-lg border-solid border-gray-200 bg-body px-4 text-sm tracking-tighter text-gray-900 placeholder:text-gray-600 focus:border-gray-900 focus:shadow-none focus:outline-none focus:ring-0 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-600 sm:h-13"})]}),(0,a.jsx)(x.Z,{href:"#",children:(0,a.jsx)(s.Z,{shape:"rounded",fullWidth:!0,size:"large",children:"APPROVE"})})]},e.id))]})}},85221:function(e,t,r){r.d(t,{W:function(){return s}});var a=r(57437);let s=e=>(0,a.jsx)("svg",{width:"16",height:"16",viewBox:"0 0 18 18",fill:"none",xmlns:"http://www.w3.org/2000/svg",...e,children:(0,a.jsx)("path",{fillRule:"evenodd",clipRule:"evenodd",d:"M11.3851 12.4457C8.73488 14.5684 4.85544 14.4013 2.39866 11.9445C-0.237379 9.3085 -0.237379 5.03464 2.39866 2.3986C5.0347 -0.23744 9.30856 -0.23744 11.9446 2.3986C14.4014 4.85538 14.5685 8.73481 12.4458 11.3851L17.6014 16.5407C17.8943 16.8336 17.8943 17.3085 17.6014 17.6014C17.3085 17.8943 16.8337 17.8943 16.5408 17.6014L11.3851 12.4457ZM3.45932 10.8839C1.40907 8.83363 1.40907 5.50951 3.45932 3.45926C5.50957 1.40901 8.83369 1.40901 10.8839 3.45926C12.9327 5.50801 12.9342 8.82875 10.8885 10.8794C10.8869 10.8809 10.8854 10.8823 10.8839 10.8839C10.8824 10.8854 10.8809 10.8869 10.8794 10.8884C8.82882 12.9341 5.50807 12.9326 3.45932 10.8839Z",fill:"currentColor"})})},31806:function(e,t,r){r.d(t,{Z:function(){return m}});var a=r(57437),s=r(21550),l=r(28483),i=r(66051),n=r(73934),d=r(68502),o=r(48357),c=r(46433);let x={BTC:(0,a.jsx)(s.p,{}),ETH:(0,a.jsx)(l.k,{}),USDT:(0,a.jsx)(i.Z,{}),BNB:(0,a.jsx)(n.m,{}),USDC:(0,a.jsx)(d.V,{}),ADA:(0,a.jsx)(o.P,{}),DOGE:(0,a.jsx)(c.S,{})};function m(e){let{from:t,to:r}=e;return(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsxs)("div",{className:"flex items-center",children:[(0,a.jsx)("div",{className:"relative",children:x[t]}),(0,a.jsx)("div",{className:"ltr:-ml-1.5 rtl:-mr-1.5",children:x[r]})]}),(0,a.jsxs)("div",{className:"whitespace-nowrap text-sm font-medium uppercase text-black ltr:ml-3 rtl:mr-3 dark:text-white",children:[t,"-",r]})]})}},9740:function(e,t,r){var a=r(57437),s=r(24033),l=r(54440),i=r.n(l),n=r(71992);t.Z=e=>{let{href:t,className:r,activeClassName:l="active",...d}=e,o=(0,s.usePathname)(),c="object"==typeof t?t.pathname:t;return(0,a.jsx)(n.Z,{href:t,className:i()(r,{[l]:o===c}),...d})}},71992:function(e,t,r){var a=r(57437),s=r(61396),l=r.n(s);t.Z=e=>{let{...t}=e;return(0,a.jsx)(l(),{...t})}},91865:function(e,t,r){r.d(t,{Z:function(){return i}});var a=r(57437),s=r(54440),l=r.n(s);function i(e){let{label:t,value:r,className:s}=e;return(0,a.jsxs)("div",{className:l()("flex items-center justify-between dark:text-gray-300",s),children:[(0,a.jsx)("span",{className:"font-medium",children:t}),(0,a.jsx)("span",{children:r||"_ _"})]})}},20534:function(e,t,r){var a,s;r.d(t,{O:function(){return a}}),(s=a||(a={})).MODERN="modern",s.MINIMAL="minimal",s.RETRO="retro",s.CLASSIC="classic"},34546:function(e,t,r){r.d(t,{$:function(){return d}});var a=r(77665),s=r(23890),l=r(20534);let i=(0,a.cn)(localStorage.getItem("SUMO-layout")),n=(0,a.cn)(e=>e(i),(e,t,r)=>{t(i,r),localStorage.setItem("SUMO-layout",r)});function d(){let[e,t]=(0,s.KO)(n);return{layout:null===e?l.O.MODERN:e,setLayout:t}}}}]);