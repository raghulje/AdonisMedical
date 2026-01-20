import{r as i,a as h,A as l,j as t}from"./index-BxtNdXkz.js";import{H as x,F as m}from"./Footer-Dn0xLXoA.js";import"./imageUrl-BzcOWJ-M.js";const d=()=>{const[e,c]=i.useState(null),[a,r]=i.useState(!0),[s,o]=i.useState(null);return i.useEffect(()=>{(async()=>{try{r(!0),o(null);const n=await h.get("/terms-privacy/privacy/content");n.success&&n.data&&c(n.data)}catch(n){o(n.message||"Failed to fetch privacy policy content"),console.error("Error fetching privacy policy:",n)}finally{r(!1)}})()},[]),{content:e,loading:a,error:s}};function y(){const{content:e,loading:c}=d();return i.useEffect(()=>{window.scrollTo(0,0),l.init({duration:800,once:!0,easing:"ease-out-cubic"})},[]),c?t.jsx("div",{className:"min-h-screen flex items-center justify-center",children:t.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-[#7ED957]"})}):t.jsxs("div",{className:"min-h-screen bg-white",children:[t.jsx("div",{className:"pt-20",children:t.jsx(x,{})}),t.jsx("section",{className:"py-16",children:t.jsxs("div",{className:"max-w-4xl mx-auto px-6 lg:px-12",children:[t.jsx("h1",{className:"text-4xl md:text-5xl font-medium text-gray-900 mb-8 text-center","data-aos":"fade-down",children:e?.title||"Privacy Policy"}),e?.subtitle&&t.jsx("p",{className:"text-xl text-gray-600 mb-12 text-center","data-aos":"fade-up","data-aos-delay":"100",children:e.subtitle}),t.jsx("div",{className:"prose prose-lg max-w-none mt-12",children:e?.richTextContent?t.jsx("div",{className:"rich-text-content text-gray-700 leading-relaxed",dangerouslySetInnerHTML:{__html:e.richTextContent},"data-aos":"fade-up",style:{whiteSpace:"pre-wrap",wordWrap:"break-word",marginTop:"2rem"}}):t.jsx("div",{className:"space-y-6 text-gray-700",children:t.jsx("p",{className:"text-base leading-relaxed text-gray-500 italic",children:"Content will be managed through the CMS. Please add content using the admin dashboard."})})}),t.jsx("style",{children:`
            .rich-text-content {
              line-height: 1.8;
              color: #374151;
            }
            .rich-text-content h1,
            .rich-text-content h2,
            .rich-text-content h3,
            .rich-text-content h4,
            .rich-text-content h5,
            .rich-text-content h6 {
              font-weight: bold;
              margin-top: 2.5em;
              margin-bottom: 1.5em;
              color: #1f2937;
              line-height: 1.4;
              page-break-after: avoid;
            }
            .rich-text-content > h1:first-child,
            .rich-text-content > h2:first-child,
            .rich-text-content > h3:first-child,
            .rich-text-content > h4:first-child,
            .rich-text-content > h5:first-child,
            .rich-text-content > h6:first-child {
              margin-top: 1em;
            }
            .rich-text-content h1 { 
              font-size: 2em; 
              font-weight: 700;
            }
            .rich-text-content h2 { 
              font-size: 1.75em; 
              font-weight: 700;
            }
            .rich-text-content h3 { 
              font-size: 1.5em; 
              font-weight: 700;
            }
            .rich-text-content h4 { 
              font-size: 1.25em; 
              font-weight: 700;
            }
            .rich-text-content p {
              margin-bottom: 1.5em;
              margin-top: 0.5em;
              line-height: 1.8;
              color: #374151;
            }
            .rich-text-content p:last-child {
              margin-bottom: 0;
            }
            .rich-text-content strong,
            .rich-text-content b {
              font-weight: 700;
              color: #1f2937;
            }
            .rich-text-content em,
            .rich-text-content i {
              font-style: italic;
            }
            .rich-text-content ul,
            .rich-text-content ol {
              margin-left: 1.5em;
              margin-bottom: 1em;
              padding-left: 1.5em;
            }
            .rich-text-content li {
              margin-bottom: 0.5em;
              line-height: 1.8;
            }
            .rich-text-content br {
              line-height: 1.8;
            }
            .rich-text-content div {
              margin-bottom: 1em;
              line-height: 1.8;
            }
            .rich-text-content * {
              max-width: 100%;
            }
            .rich-text-content [style*="text-align: center"] {
              text-align: center !important;
            }
            .rich-text-content [style*="text-align: right"] {
              text-align: right !important;
            }
            .rich-text-content [style*="text-align: left"] {
              text-align: left !important;
            }
          `})]})}),t.jsx(m,{})]})}export{y as default};
//# sourceMappingURL=page-QIiAnCZa.js.map
