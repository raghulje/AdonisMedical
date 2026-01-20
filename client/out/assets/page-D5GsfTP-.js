import{r,a as l,A as h,j as t}from"./index-BxtNdXkz.js";import{H as f,F as m}from"./Footer-Dn0xLXoA.js";import"./imageUrl-BzcOWJ-M.js";const x=()=>{const[e,i]=r.useState(null),[a,s]=r.useState(!0),[c,o]=r.useState(null);return r.useEffect(()=>{(async()=>{try{s(!0),o(null);const n=await l.get("/terms-privacy/terms/content");n.success&&n.data&&i(n.data)}catch(n){o(n.message||"Failed to fetch terms and conditions content"),console.error("Error fetching terms and conditions:",n)}finally{s(!1)}})()},[]),{content:e,loading:a,error:c}};function u(){const{content:e,loading:i}=x();return r.useEffect(()=>{window.scrollTo(0,0),h.init({duration:800,once:!0,easing:"ease-out-cubic"})},[]),i?t.jsx("div",{className:"min-h-screen flex items-center justify-center",children:t.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-[#7ED957]"})}):t.jsxs("div",{className:"min-h-screen bg-white",children:[t.jsx("style",{children:`
        body {
          font-family: 'Montserrat', sans-serif !important;
        }
        * {
          font-family: 'Montserrat', sans-serif !important;
        }
      `}),t.jsx("div",{className:"pt-20",children:t.jsx(f,{})}),t.jsx("section",{className:"py-16",children:t.jsxs("div",{className:"max-w-4xl mx-auto px-6 lg:px-12",children:[t.jsx("h1",{className:"text-4xl md:text-5xl font-medium text-gray-900 mb-8 text-center font-['Montserrat',sans-serif]","data-aos":"fade-down",children:e?.title||"Terms and Conditions"}),e?.subtitle&&t.jsx("p",{className:"text-xl text-gray-600 mb-12 text-center font-['Montserrat',sans-serif]","data-aos":"fade-up","data-aos-delay":"100",children:e.subtitle}),t.jsx("div",{className:"prose prose-lg max-w-none mt-8",children:e?.richTextContent?t.jsx("div",{className:"rich-text-content text-gray-700 leading-relaxed font-['Montserrat',sans-serif]",dangerouslySetInnerHTML:{__html:e.richTextContent},"data-aos":"fade-up",style:{whiteSpace:"pre-wrap",wordWrap:"break-word"}}):t.jsx("div",{className:"space-y-6 text-gray-700 font-['Montserrat',sans-serif]",children:t.jsx("p",{className:"text-base leading-relaxed text-gray-500 italic",children:"Content will be managed through the CMS. Please add content using the admin dashboard."})})}),t.jsx("style",{children:`
            body {
              font-family: 'Montserrat', sans-serif !important;
            }
            .rich-text-content {
              line-height: 1.8;
              color: #374151;
              font-family: 'Montserrat', sans-serif !important;
            }
            .rich-text-content h1,
            .rich-text-content h2,
            .rich-text-content h3,
            .rich-text-content h4,
            .rich-text-content h5,
            .rich-text-content h6 {
              font-weight: bold;
              margin-top: 2em;
              margin-bottom: 1em;
              color: #1f2937;
              line-height: 1.4;
              page-break-after: avoid;
              font-family: 'Montserrat', sans-serif;
            }
            .rich-text-content > h1:first-child,
            .rich-text-content > h2:first-child,
            .rich-text-content > h3:first-child,
            .rich-text-content > h4:first-child,
            .rich-text-content > h5:first-child,
            .rich-text-content > h6:first-child {
              margin-top: 0;
            }
            .rich-text-content h1 { 
              font-size: 2em; 
              font-weight: 700;
              font-family: 'Montserrat', sans-serif;
            }
            .rich-text-content h2 { 
              font-size: 1.75em; 
              font-weight: 700;
              font-family: 'Montserrat', sans-serif;
            }
            .rich-text-content h3 { 
              font-size: 1.5em; 
              font-weight: 700;
              font-family: 'Montserrat', sans-serif;
            }
            .rich-text-content h4 { 
              font-size: 1.25em; 
              font-weight: 700;
              font-family: 'Montserrat', sans-serif;
            }
            .rich-text-content p {
              margin-bottom: 1em;
              line-height: 1.8;
              color: #374151;
              font-family: 'Montserrat', sans-serif;
            }
            .rich-text-content p:last-child {
              margin-bottom: 0;
            }
            .rich-text-content strong,
            .rich-text-content b {
              font-weight: 700;
              color: #1f2937;
              font-family: 'Montserrat', sans-serif;
            }
            .rich-text-content em,
            .rich-text-content i {
              font-style: italic;
              font-family: 'Montserrat', sans-serif;
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
              font-family: 'Montserrat', sans-serif;
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
          `})]})}),t.jsx(m,{})]})}export{u as default};
//# sourceMappingURL=page-D5GsfTP-.js.map
