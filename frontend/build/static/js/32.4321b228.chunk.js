(this["webpackJsonptest-app"]=this["webpackJsonptest-app"]||[]).push([[32],{263:function(t,e,n){},531:function(t,e,n){"use strict";n.r(e);var i=n(18),l=n(0),o=n.n(l),c=n(283),r=n(23),a=n(98),s=n(560),x=n(568),h=n(259),d=n(243),j=n(557),p=n(299),f=n(301),b=n(273),g=n(300),m=n(82),u=n(45),O=(n(263),n(264)),y=n.n(O),S=n(100),N=n.n(S),w=n(275),C=n.n(w),T=n(284),H=n.n(T),D=n(392),z=n.n(D),v=n(393),L=n.n(v),A=n(269),k=n.n(A),W=n(267),I=n.n(W),G=n(268),P=n.n(G),F=n(2),B=Object(c.a)(s.a)((function(t){t.theme;return{width:240,borderRadius:"20px",fontSize:"13px",height:"42px",marginRight:"16px",backgroundColor:"white",marginTop:"4px","& fieldset":{borderWidth:"1px !important",borderColor:"#rgba(0, 0, 0, 0.87)"}}})),R=Object(c.a)(s.a)((function(t){t.theme;return{width:340,borderRadius:"0px",fontSize:"13px",height:"42px",backgroundColor:"white",marginTop:"4px","& fieldset":{borderWidth:"1px !important",borderColor:"#rgba(0, 0, 0, 0.87)"}}})),M=Object(c.a)(x.a)((function(){return{boxShadow:"none",width:"100%",backgroundColor:"white",fontWeight:"bold"}}));e.default=function(){var t=Object(r.b)(),e=o.a.useState(JSON.parse(localStorage.getItem("productList"))||[]),n=Object(i.a)(e,2),l=n[0],c=n[1],s=l.flatMap((function(t){return t})),x=s.map((function(t){return t.total})),O=o.a.useState(""),S=Object(i.a)(O,2),w=S[0],T=S[1],D=function(t){var e=s.find((function(e){return e.id===t}));e.quantity=parseFloat(s.filter((function(e){return e.id==t})).map((function(t){return t.quantity+1})).toString()),e.total=parseFloat(s.filter((function(e){return e.id==t})).map((function(t){return t.quantity*t.price})).toString()),localStorage.setItem("productList",JSON.stringify(s)),c(s)},v=function(t){var e=parseFloat(s.filter((function(e){return e.id==t})).map((function(t){return t.quantity})).toString()),n=s.find((function(e){return e.id===t}));e>1&&(n.quantity=parseFloat(s.filter((function(e){return e.id==t})).map((function(t){return t.quantity-1})).toString())),n.total=parseFloat(s.filter((function(e){return e.id==t})).map((function(t){return t.quantity*t.price})).toString()),localStorage.setItem("productList",JSON.stringify(s)),c(s)},A=o.a.useState([]),W=Object(i.a)(A,2),G=(W[0],W[1]),E=o.a.useState([]),V=Object(i.a)(E,2),q=V[0],J=V[1],_=Object(r.c)((function(t){return t.user})),K=function(t,e){s.splice(e,1),localStorage.setItem("productList",JSON.stringify(s)),c((function(){return s.filter((function(e){return e.id!=t}))}))};o.a.useEffect((function(){t(Object(a.c)())}),[t]),o.a.useEffect((function(){t(Object(a.d)())}),[t]),o.a.useEffect((function(){G((function(){var t;return null===_||void 0===_||null===(t=_.products)||void 0===t?void 0:t.filter((function(t){return t.nameProduct}))}))}),[_]),o.a.useEffect((function(){J((function(){var t;return null===_||void 0===_||null===(t=_.typeproducts)||void 0===t?void 0:t.filter((function(t){return t.nameTypeProduct}))}))}),[_]);var Q=function(t){var e=t.target.value;if(""!==e){var n,i=null===_||void 0===_||null===(n=_.products)||void 0===n?void 0:n.filter((function(t){return t.nameProduct.toLowerCase().startsWith(e.toLowerCase())}));G(i)}else G((function(){var t;return null===_||void 0===_||null===(t=_.products)||void 0===t?void 0:t.filter((function(t){return t.nameProduct}))}));T(e)};o.a.useEffect((function(){document.title="Trang Ch\u1ee7"}),[]);var U=function(){var t=o.a.useState(window.innerWidth),e=Object(i.a)(t,2),n=e[0],l=e[1];return o.a.useEffect((function(){var t=function(){return l(window.innerWidth)};return window.addEventListener("resize",t),function(){return window.removeEventListener("resize",t)}}),[]),{width:n}}(),X=U.width<=1024,Y=(U.width,o.a.useState(!1)),Z=Object(i.a)(Y,2),$=Z[0],tt=Z[1],et=o.a.useState(!1),nt=Object(i.a)(et,2),it=nt[0],lt=nt[1],ot=function(){lt(!it)},ct=it?Object(F.jsx)(h.a,{className:"nav-products  ".concat(it&&"active"),children:q.map((function(t){return Object(F.jsx)("li",{children:Object(F.jsx)(u.b,{style:{textDecoration:"none"},to:"/loaiSP1/".concat(t._id),children:Object(F.jsxs)(h.a,{sx:{color:"white",fontWeight:400,fontSize:13,fontFamily:"Roboto",display:"flex",flexDirection:"row",margin:"15px 0"},children:[Object(F.jsx)(h.a,{sx:{width:"9px",height:"9px",borderRadius:"50%",border:"1px solid white",margin:"3px 5px 0 0"}}),t.nameTypeProduct]})})})}))}):Object(F.jsx)(h.a,{sx:{height:0,transition:"all 0.5s ease-in-out"}}),rt=it?Object(F.jsx)(P.a,{onClick:ot,style:{color:"white",margin:"-2px 19px 0 0"}}):Object(F.jsx)(I.a,{onClick:ot,style:{color:"white",margin:"-2px 19px 0 0"}}),at=$?Object(F.jsx)(h.a,{sx:{height:0,transition:"all 0.5s ease-in-out"}}):Object(F.jsxs)(h.a,{className:"nav-elements  ".concat($&&"active"),children:[Object(F.jsx)(d.a,{style:{height:1}}),Object(F.jsxs)("ul",{style:{marginLeft:"-20px"},children:[Object(F.jsx)("li",{children:Object(F.jsx)(u.b,{style:{textDecoration:"none",fontWeight:"bold",color:"white"},to:"/",children:"TRANG CH\u1ee6"})}),Object(F.jsxs)("li",{style:{margin:"23px 0"},children:[Object(F.jsxs)(h.a,{display:"flex",flexDirection:"row",children:[Object(F.jsx)(u.b,{style:{textDecoration:"none",fontWeight:"bold",color:"white"},to:"/LoaiSP",children:"S\u1ea2N PH\u1ea8M"}),Object(F.jsx)(h.a,{flexGrow:1}),rt]}),ct]}),Object(F.jsx)("li",{children:Object(F.jsx)(u.b,{style:{textDecoration:"none",fontWeight:"bold",color:"white"},to:"/tintuc",children:"TIN T\u1ee8C"})})]})]});return X?Object(F.jsx)(h.a,{children:Object(F.jsxs)(h.a,{children:[Object(F.jsxs)(h.a,{children:[Object(F.jsxs)(h.a,{sx:{backgroundImage:"url(/backgroundHeader.jpg)",height:"234px",display:"flex",flexDirection:"column",justifyContent:"center"},children:[Object(F.jsx)(u.b,{style:{textDecoration:"none",margin:"10px auto"},to:"/",children:Object(F.jsx)("img",{src:"/logoBM.png",style:{height:"90px",width:"90px"}})}),Object(F.jsx)(h.a,{sx:{fontSize:"30px",fontWeight:"bold",color:"red",textAlign:"center"},children:"B\xccNH MINH GLOBAL"}),Object(F.jsx)(h.a,{sx:{fontSize:"19px",fontWeight:"bold",color:"#0066BF",textAlign:"center"},children:" NH\xc0 CUNG C\u1ea4P S\u1ed0 1 V\u1ec0 B\u1ed2N N\u01af\u1edaC V\xc0 N\u0102NG L\u01af\u1ee2NG M\u1eb6T TR\u1edcI"})]}),Object(F.jsxs)(h.a,{sx:{backgroundColor:"#0066BF",maxHeight:"600px",display:"flex",flexDirection:"column"},children:[Object(F.jsxs)(h.a,{display:"flex",flexDirection:"row",sx:{margin:"15px 20px"},children:[Object(F.jsx)(k.a,{onClick:function(){tt(!$)},style:{color:"white"}}),Object(F.jsx)(h.a,{flexGrow:1}),Object(F.jsx)(h.a,{component:u.b,to:"/order",children:Object(F.jsxs)(j.a,{color:"error",badgeContent:s.length,children:[Object(F.jsx)(N.a,{style:{color:"white"}})," "]})})]}),at,Object(F.jsx)(h.a,{display:"flex",justifyContent:"center",children:Object(F.jsx)(R,{value:w,onChange:Q,placeholder:"T\xecm ki\u1ebfm s\u1ea3n ph\u1ea9m...",startAdornment:Object(F.jsx)(p.a,{position:"start",style:{paddingLeft:1.3},children:Object(F.jsx)(y.a,{style:{width:"16px"},sx:{color:"rgba(0, 0, 0, 0.87)"}})})})})]}),Object(F.jsx)(h.a,{sx:{fontSize:"25px",fontWeight:"bold",margin:"30px 15px 0 15px"},children:"GI\u1ece H\xc0NG"}),s&&s.length>0?Object(F.jsxs)(h.a,{display:"flex",flexDirection:"column",sx:{margin:"30px 15px 0 15px"},children:[s.map((function(t,e){return Object(F.jsxs)(h.a,{children:[Object(F.jsxs)(h.a,{display:"flex",flexDirection:"row",sx:{margin:"30px 0"},children:[Object(F.jsx)(h.a,{children:Object(F.jsx)("img",{src:t.image,style:{width:"150px",height:"120px"}})}),Object(F.jsxs)(h.a,{display:"flex",flexDirection:"column",sx:{marginLeft:"15px"},children:[Object(F.jsx)(h.a,{style:{fontSize:"18px",fontWeight:"bold",marginBottom:"10px"},children:t.nameProduct}),Object(F.jsx)(h.a,{children:t.nameTypeProduct}),Object(F.jsx)(h.a,{flexGrow:1}),Object(F.jsxs)(h.a,{display:"flex",flexDirection:"row",children:[Object(F.jsx)(f.a,{style:{color:"black",border:"1px solid black",width:"20px",height:"20px"},onClick:function(){return v(t.id)},children:Object(F.jsx)(z.a,{})}),Object(F.jsx)(h.a,{sx:{padding:"0 10px"},children:t.quantity}),Object(F.jsx)(f.a,{style:{color:"black",border:"1px solid black",width:"20px",height:"20px"},onClick:function(){return D(t.id)},children:Object(F.jsx)(H.a,{})})]})]}),Object(F.jsx)(h.a,{flexGrow:1}),Object(F.jsxs)(h.a,{display:"flex",flexDirection:"column",children:[Object(F.jsx)(b.a,{style:{color:"red",display:"flex",justifyContent:"right"},onClick:function(){return K(t._id,e)},children:Object(F.jsx)(L.a,{style:{width:"20px"}})}),Object(F.jsx)(h.a,{flexGrow:1}),Object(F.jsxs)(h.a,{children:[new Intl.NumberFormat("de-DE").format(t.total)," VN\u0110"]})]})]}),Object(F.jsx)(d.a,{style:{backgroundColor:"rgba(112, 112, 112, 0.3)",height:1}})]})})),Object(F.jsxs)(h.a,{display:"flex",flexDirection:"row",sx:{margin:"20px 15px"},children:[Object(F.jsx)(h.a,{children:"T\u1ea1m t\xednh"}),Object(F.jsx)(h.a,{flexGrow:1}),Object(F.jsxs)(h.a,{sx:{fontWeight:"bold"},children:[new Intl.NumberFormat("de-DE").format(x.reduce((function(t,e){return t+e})))," VN\u0110"]})]}),Object(F.jsx)(h.a,{display:"flex",justifyContent:"center",sx:{margin:"20px 15px"},children:Object(F.jsx)(u.b,{style:{textDecoration:"none"},to:"/cart",children:Object(F.jsx)(b.a,{style:{textTransform:"inherit",color:"white",backgroundColor:"#0066bf",borderRadius:"2px",width:"300px"},children:"Thanh to\xe1n"})})})]}):Object(F.jsxs)(h.a,{children:[Object(F.jsx)(h.a,{sx:{marginTop:"50px",fontSize:"25px",textAlign:"center",fontWeight:"bold",color:"#0066BF"},children:"Hi\u1ec7n t\u1ea1i kh\xf4ng c\xf3 s\u1ea3n ph\u1ea9m trong gi\u1ecf h\xe0ng"}),Object(F.jsx)(h.a,{display:"flex",justifyContent:"center",children:Object(F.jsx)("img",{style:{width:"300px"},src:"/no-product.gif"})})]})]}),Object(F.jsx)(h.a,{className:"footer",children:Object(F.jsxs)(h.a,{sx:{display:"flex",flexDirection:"column",margin:"0 10px"},children:[Object(F.jsx)(h.a,{sx:{fontSize:"16px",fontWeight:"bold",color:"white",margin:"20px 0"},children:"TH\xd4NG TIN LI\xcaN H\u1ec6"}),Object(F.jsx)(d.a,{style:{height:1,backgroundColor:"white"}}),Object(F.jsx)(h.a,{style:{fontWeight:"bold",fontSize:"14px",float:"left",letterSpacing:.5,marginTop:"20px"},children:"H\u1ec7 Th\u1ed1ng Chi Nh\xe1nh B\xecnh Minh Solar"}),Object(F.jsx)(h.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"10px 0px",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 1: 369C T\xe2n Th\u1edbi Hi\u1ec7p 21, P. T\xe2n Th\u1edbi Hi\u1ec7p, Q.12, Tp. H\u1ed3 Ch\xed Minh"}),Object(F.jsx)(h.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 2: 196 Nguy\u1ec5n Tri Ph\u01b0\u01a1ng, Th\xe0nh ph\u1ed1 Bi\xean H\xf2a, \u0110\u1ed3ng Nai"}),Object(F.jsx)(h.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"10px 0px",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 3: M\u1ef9 Ph\u01b0\u1edbc T\xe2n V\u1ea1n, TP. Th\u1ee7 D\u1ea7u M\u1ed9t, B\xecnh D\u01b0\u01a1ng"}),Object(F.jsx)(h.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 4: KCN \u0110\u1ee9c H\xf2a \u2013 Long An"}),Object(F.jsx)(h.a,{sx:{fontSize:"16px",fontWeight:"bold",color:"white",margin:"20px 0"},children:"\u0110\u01af\u1edcNG D\u1eaaN NHANH"}),Object(F.jsx)(d.a,{style:{height:1,backgroundColor:"white"}}),Object(F.jsx)(h.a,{component:u.b,to:"/",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5,textDecoration:"none",color:"white"},children:"TRANG CH\u1ee6"}),Object(F.jsx)(h.a,{component:u.b,to:"/LoaiSP",style:{fontSize:"14px",float:"left",textAlign:"left",letterSpacing:.5,textDecoration:"none",color:"white"},children:"S\u1ea2N PH\u1ea8M"}),Object(F.jsx)(h.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5},children:"TIN T\u1ee8C"}),Object(F.jsx)("img",{src:"/BoCongThuong.png",style:{width:"200px",height:"76px"}}),Object(F.jsx)(h.a,{sx:{fontSize:"16px",fontWeight:"bold",color:"white",margin:"20px 0"},children:"CH\xcdNH S\xc1CH"}),Object(F.jsx)(d.a,{style:{height:1,backgroundColor:"white"}}),Object(F.jsx)(h.a,{component:u.b,to:"/chinh-sach-thanh-toan",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch thanh to\xe1n"}),Object(F.jsx)(h.a,{component:u.b,to:"/chinh-sach-giao-hang",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch giao h\xe0ng"}),Object(F.jsx)(h.a,{component:u.b,to:"/chinh-sach-bao-hanh",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch b\u1ea3o h\xe0nh"}),Object(F.jsx)(h.a,{component:u.b,to:"/chinh-sach-bao-mat-thong-tin",style:{fontSize:"14px",float:"left",margin:"0 0 20px -2px",textAlign:"left",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch b\u1ea3o m\u1eadt th\xf4ng tin"})]})}),Object(F.jsx)("a",{href:"tel:0799177960",className:"hotlinemp all",rel:"nofollow",children:Object(F.jsxs)("div",{className:"mypage-alo-phone",style:{left:"0px"},children:[Object(F.jsx)("div",{className:"animated infinite zoomIn mypage-alo-ph-circle"}),Object(F.jsx)("div",{className:"animated infinite pulse mypage-alo-ph-circle-fill"}),Object(F.jsx)("div",{className:"animated infinite tada mypage-alo-ph-img-circle",style:{backgroundColor:"red"}}),Object(F.jsx)("span",{children:"0799177960"})]})})]})}):Object(F.jsxs)(h.a,{children:[Object(F.jsxs)(h.a,{children:[Object(F.jsxs)(h.a,{children:[Object(F.jsx)(M,{style:{boxShadow:"none",overflowX:"hidden",backgroundImage:"url(/backgroundHeader.jpg)",height:"110px"},children:Object(F.jsxs)(g.a,{children:[Object(F.jsx)(u.b,{style:{textDecoration:"none",marginTop:"10px"},to:"/",children:Object(F.jsx)("img",{src:"/logoBM.png",style:{height:"90px",width:"90px"}})}),Object(F.jsxs)(h.a,{textAlign:"center",display:"flex",flexDirection:"column",flexGrow:1,children:[Object(F.jsx)(m.a,{style:{color:"#dd3333",fontWeight:700,fontStyle:"normal",fontSize:"30px"},children:"B\xccNH MINH GLOBAL"}),Object(F.jsx)(m.a,{style:{color:"#0066bf",fontSize:"19px",fontWeight:700,fontStyle:"normal"},children:"NH\xc0 CUNG C\u1ea4P S\u1ed0 1 V\u1ec0 B\u1ed2N N\u01af\u1edaC V\xc0 N\u0102NG L\u01af\u1ee2NG M\u1eb6T TR\u1edcI"})]}),Object(F.jsxs)(h.a,{display:"flex",flexDirection:"row",children:[Object(F.jsx)(h.a,{component:"img",src:"/call.gif",style:{width:"58px",height:"45px",paddingRight:"15px"}}),Object(F.jsxs)(h.a,{display:"flex",flexDirection:"column",children:[Object(F.jsx)(m.a,{style:{fontSize:"14px",color:"black",fontWeight:"bold"},children:"Hotline:"}),Object(F.jsx)(m.a,{style:{fontSize:"16px",color:"#ff0000",fontWeight:"bold"},children:"0362.526.678"})]})]})]})}),Object(F.jsx)(M,{style:{backgroundColor:"#0066bf",marginTop:"110px",height:"50px"},children:Object(F.jsxs)(h.a,{display:"flex",flexDirection:"row",sx:{padding:"0px 170px"},children:[Object(F.jsx)(h.a,{flexGrow:1,children:Object(F.jsxs)("ul",{id:"nav",children:[Object(F.jsx)("li",{children:Object(F.jsx)(u.b,{style:{padding:"0 24px"},to:"/",children:"TRANG CH\u1ee6"})}),Object(F.jsxs)("li",{children:[Object(F.jsx)(u.b,{to:"/loaiSP",style:{padding:"0 24px"},children:"S\u1ea2N PH\u1ea8M"}),Object(F.jsx)(h.a,{className:"subnav",children:q.map((function(t){return Object(F.jsx)("li",{children:Object(F.jsx)(u.b,{to:"/loaiSP1/".concat(t._id),children:Object(F.jsx)(h.a,{className:"boxA",sx:{color:"#333333",fontWeight:400,fontSize:14,fontFamily:"Roboto"},children:t.nameTypeProduct})})})}))})]}),Object(F.jsx)("li",{children:Object(F.jsx)(u.b,{to:"/tintuc",style:{padding:"0 24px"},children:"TIN T\u1ee8C"})})]})}),Object(F.jsx)(h.a,{children:Object(F.jsx)(B,{value:w,onChange:Q,placeholder:"T\xecm ki\u1ebfm s\u1ea3n ph\u1ea9m...",startAdornment:Object(F.jsx)(p.a,{position:"start",style:{paddingLeft:1.3},children:Object(F.jsx)(y.a,{style:{width:"16px"},sx:{color:"rgba(0, 0, 0, 0.87)"}})})})}),Object(F.jsx)(h.a,{component:u.b,to:"/order",sx:{padding:"12px 0px",marginLeft:"20px",color:"white"},children:Object(F.jsxs)(j.a,{color:"error",badgeContent:s.length,children:[Object(F.jsx)(N.a,{})," "]})})]})})]}),Object(F.jsxs)(h.a,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",sx:{margin:"0 300px"},children:[Object(F.jsx)(h.a,{sx:{fontSize:"25px",fontWeight:"bold",margin:"80px 0 0 -1060px"},children:"GI\u1ece H\xc0NG"}),s&&s.length>0?Object(F.jsxs)("table",{className:"table",children:[Object(F.jsx)("thead",{children:Object(F.jsxs)("tr",{children:[Object(F.jsx)("th",{className:"th",children:"H\xecnh \u1ea3nh"}),Object(F.jsx)("th",{className:"th",children:"S\u1ea3n ph\u1ea9m"}),Object(F.jsx)("th",{className:"th",children:"Gi\xe1"}),Object(F.jsx)("th",{className:"th",children:"S\u1ed1 l\u01b0\u1ee3ng"}),Object(F.jsx)("th",{className:"th",children:"T\u1ea1m t\xednh"}),Object(F.jsx)("th",{className:"th"})]})}),Object(F.jsxs)("tbody",{children:[s.map((function(t,e){return Object(F.jsxs)("tr",{children:[Object(F.jsx)("td",{className:"td",style:{paddingLeft:"20px"},children:Object(F.jsx)("img",{style:{width:100,padding:"20px 0px"},src:t.image})}),Object(F.jsx)("td",{className:"td",style:{textAlign:"center"},children:t.nameProduct}),Object(F.jsxs)("td",{className:"td",style:{textAlign:"center",color:"red",fontWeight:"bold"},children:[new Intl.NumberFormat("de-DE").format(t.price)," VN\u0110"]}),Object(F.jsx)("td",{className:"td",children:Object(F.jsxs)(h.a,{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center",children:[Object(F.jsx)(f.a,{style:{color:"black",border:"1px solid black",width:"20px",height:"20px"},onClick:function(){return v(t.id)},children:Object(F.jsx)(z.a,{})}),Object(F.jsx)(h.a,{sx:{padding:"0 10px"},children:t.quantity}),Object(F.jsx)(f.a,{style:{color:"black",border:"1px solid black",width:"20px",height:"20px"},onClick:function(){return D(t.id)},children:Object(F.jsx)(H.a,{})})]})}),Object(F.jsxs)("td",{className:"td",style:{textAlign:"center",color:"red",fontWeight:"bold"},children:[new Intl.NumberFormat("de-DE").format(t.total)," VN\u0110"]}),Object(F.jsx)("td",{className:"td",children:Object(F.jsx)(b.a,{style:{color:"red"},onClick:function(){return K(t._id,e)},children:Object(F.jsx)(C.a,{style:{width:"20px"}})})})]})})),Object(F.jsx)("tr",{children:Object(F.jsx)("td",{className:"td",colSpan:6,style:{padding:"10px 0",fontWeight:"bold"},children:Object(F.jsxs)(h.a,{display:"flex",flexDirection:"row",sx:{float:"right",marginRight:"10px"},children:[Object(F.jsxs)(h.a,{sx:{margin:"10px 10px 0 0"},children:["T\u1ed5ng: ",new Intl.NumberFormat("de-DE").format(x.reduce((function(t,e){return t+e})))," VN\u0110"]}),Object(F.jsx)(u.b,{to:"/cart",children:Object(F.jsx)(b.a,{style:{textTransform:"inherit",color:"white",backgroundColor:"#0066bf"},children:"Ti\u1ebfn h\xe0nh thanh to\xe1n"})})]})})})]})]}):Object(F.jsxs)(h.a,{children:[Object(F.jsx)(h.a,{sx:{marginTop:"50px",fontSize:"30px",textAlign:"center",fontWeight:"bold",color:"#0066BF"},children:"Hi\u1ec7n t\u1ea1i kh\xf4ng c\xf3 s\u1ea3n ph\u1ea9m trong gi\u1ecf h\xe0ng"}),Object(F.jsx)("img",{src:"/no-product.gif"})]})]})]}),Object(F.jsx)(h.a,{children:Object(F.jsx)(h.a,{sx:{marginTop:"150px"},className:"footer",display:"flex",alignItems:"center",justifyContent:"center",children:Object(F.jsxs)(h.a,{display:"flex",flexDirection:"row",sx:{padding:"30px 160px 0px 160px"},children:[Object(F.jsxs)(h.a,{display:"flex",flexDirection:"column",children:[Object(F.jsx)(h.a,{sx:{fontSize:"16px",fontFamily:"Roboto",fontWeight:"bold",color:"white",float:"left"},children:"TH\xd4NG TIN LI\xcaN H\u1ec6"}),Object(F.jsx)(d.a,{style:{border:"1px solid white",marginTop:"20px",width:"370px",float:"left"}}),Object(F.jsxs)(h.a,{display:"flex",flexDirection:"column",sx:{marginTop:"20px",fontFamily:"Roboto",float:"left"},children:[Object(F.jsx)(h.a,{style:{fontWeight:"bold",fontSize:"14px",float:"left",letterSpacing:.5},children:"H\u1ec7 Th\u1ed1ng Chi Nh\xe1nh B\xecnh Minh Solar"}),Object(F.jsx)(h.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"10px 0px",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 1: 369C T\xe2n Th\u1edbi Hi\u1ec7p 21, P. T\xe2n Th\u1edbi Hi\u1ec7p, Q.12, Tp. H\u1ed3 Ch\xed Minh"}),Object(F.jsx)(h.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 2: 196 Nguy\u1ec5n Tri Ph\u01b0\u01a1ng, Th\xe0nh ph\u1ed1 Bi\xean H\xf2a, \u0110\u1ed3ng Nai"}),Object(F.jsx)(h.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"10px 0px",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 3: M\u1ef9 Ph\u01b0\u1edbc T\xe2n V\u1ea1n, TP. Th\u1ee7 D\u1ea7u M\u1ed9t, B\xecnh D\u01b0\u01a1ng"}),Object(F.jsx)(h.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 4: KCN \u0110\u1ee9c H\xf2a \u2013 Long An"})]})]}),Object(F.jsxs)(h.a,{display:"flex",flexDirection:"column",sx:{padding:"0px 240px"},children:[Object(F.jsx)(h.a,{sx:{fontSize:"16px",fontFamily:"Roboto",fontWeight:"bold",color:"white",float:"left"},children:"\u0110\u01af\u1edcNG D\u1eaaN NHANH"}),Object(F.jsx)(d.a,{style:{border:"1px solid white",marginTop:"20px",width:"370px",float:"left"}}),Object(F.jsxs)(h.a,{sx:{fontFamily:"Roboto",float:"left",display:"flex",flexDirection:"column"},children:[Object(F.jsx)(h.a,{component:u.b,to:"/",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5,textDecoration:"none",color:"white"},children:"TRANG CH\u1ee6"}),Object(F.jsx)(h.a,{component:u.b,to:"/LoaiSP",style:{fontSize:"14px",float:"left",textAlign:"left",letterSpacing:.5,textDecoration:"none",color:"white"},children:"S\u1ea2N PH\u1ea8M"}),Object(F.jsx)(h.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5},children:"TIN T\u1ee8C"}),Object(F.jsx)("img",{src:"/BoCongThuong.png",style:{marginTop:"50px",width:"200px",height:"76px"}})]})]}),Object(F.jsxs)(h.a,{display:"flex",flexDirection:"column",children:[Object(F.jsx)(h.a,{sx:{fontSize:"16px",fontFamily:"Roboto",fontWeight:"bold",color:"white",float:"left"},children:"CH\xcdNH S\xc1CH"}),Object(F.jsx)(d.a,{style:{border:"1px solid white",marginTop:"20px",width:"370px",float:"left"}}),Object(F.jsxs)(h.a,{sx:{fontFamily:"Roboto",float:"left",display:"flex",flexDirection:"column"},children:[Object(F.jsx)(h.a,{component:u.b,to:"/chinh-sach-thanh-toan",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch thanh to\xe1n"}),Object(F.jsx)(h.a,{component:u.b,to:"/chinh-sach-giao-hang",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch giao h\xe0ng"}),Object(F.jsx)(h.a,{component:u.b,to:"/chinh-sach-bao-hanh",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch b\u1ea3o h\xe0nh"}),Object(F.jsx)(h.a,{component:u.b,to:"/chinh-sach-bao-mat-thong-tin",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch b\u1ea3o m\u1eadt th\xf4ng tin"})]})]}),Object(F.jsx)("a",{href:"tel:0799177960",className:"hotlinemp all",rel:"nofollow",children:Object(F.jsxs)("div",{className:"mypage-alo-phone",style:{left:"0px"},children:[Object(F.jsx)("div",{className:"animated infinite zoomIn mypage-alo-ph-circle"}),Object(F.jsx)("div",{className:"animated infinite pulse mypage-alo-ph-circle-fill"}),Object(F.jsx)("div",{className:"animated infinite tada mypage-alo-ph-img-circle",style:{backgroundColor:"red"}}),Object(F.jsx)("span",{children:"0799177960"})]})})]})})})]})}}}]);
//# sourceMappingURL=32.4321b228.chunk.js.map