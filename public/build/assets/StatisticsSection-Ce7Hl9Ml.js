import{j as t}from"./app-CWSybFN4.js";import{c as h}from"./compiler-runtime-CQLOYgkF.js";/* empty css            */function j(x){const e=h.c(9),{statistics:s,className:o}=x;let i;e[0]!==s?(i=s===void 0?[]:s,e[0]=s,e[1]=i):i=e[1];const c=i,m=`relative w-full overflow-hidden bg-contain bg-center h-[6vh] flex items-center ${o===void 0?"":o}`;let a;e[2]===Symbol.for("react.memo_cache_sentinel")?(a=[0,1],e[2]=a):a=e[2];let n;e[3]!==c?(n=t.jsx("div",{className:"relative z-10 flex whitespace-nowrap animate-marquee-infinite",children:a.map(f=>t.jsx("div",{className:"flex",children:c.map((d,p)=>t.jsxs("div",{className:"shrink-0 flex items-center",children:[t.jsxs("span",{className:"text-white text-2xl sm:text-3xl font-bold whitespace-nowrap font-sans mx-8 flex items-center gap-2",children:[t.jsx("span",{className:"inline-block tabular-nums",children:parseInt(d.value||"0").toLocaleString()}),t.jsx("span",{className:"font-bold",children:d.label})]}),t.jsx("div",{className:"w-16 sm:w-32 h-px bg-white/30"})]},`stat-${f}-${p}`))},`set-${f}`))}),e[3]=c,e[4]=n):n=e[4];let l;e[5]===Symbol.for("react.memo_cache_sentinel")?(l=t.jsx("style",{children:`
                @keyframes marquee-infinite {
                   0% { transform: translate3d(0, 0, 0); }
                   100% { transform: translate3d(-50%, 0, 0); }
                }
                .animate-marquee-infinite {
                    display: flex;
                    width: max-content;
                    animation: marquee-infinite 120s linear infinite;
                    will-change: transform;
                    backface-visibility: hidden;
                    perspective: 1000;
                }
                .animate-marquee-infinite:hover {
                    animation-play-state: paused;
                }
            `}),e[5]=l):l=e[5];let r;return e[6]!==m||e[7]!==n?(r=t.jsxs("div",{className:m,children:[n,l]}),e[6]=m,e[7]=n,e[8]=r):r=e[8],r}export{j as default};
