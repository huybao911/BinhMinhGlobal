(this["webpackJsonptest-app"]=this["webpackJsonptest-app"]||[]).push([[28],{263:function(e,t,n){},563:function(e,t,n){"use strict";n.r(t);var i=n(15),o=n(18),l=n(0),a=n.n(l),c=n(283),r=n(244),x=n(23),s=n(98),h=n(560),p=n(568),d=n(259),j=n(243),f=n(557),g=n(299),b=n(555),m=n(251),u=n(300),O=n(82),y=n(237),S=n(45),N=(n(263),n(264)),C=n.n(N),w=n(100),T=n.n(w),H=n(269),z=n.n(H),D=n(267),v=n.n(D),P=n(268),A=n.n(P);var L=function(e,t){var n=Object(l.useState)(1),i=Object(o.a)(n,2),a=i[0],c=i[1],r=Math.ceil(e.length/t);return{next:function(){c((function(e){return Math.min(e+1,r)}))},prev:function(){c((function(e){return Math.max(e-1,1)}))},jump:function(e){var t=Math.max(1,e);c((function(e){return Math.min(t,r)}))},currentData:function(){var n=(a-1)*t,i=n+t;return e.slice(n,i)},currentPage:a,maxPage:r}},k=n(2),W=Object(c.a)(h.a)((function(e){e.theme;return{width:240,borderRadius:"20px",fontSize:"13px",height:"42px",marginRight:"16px",backgroundColor:"white",marginTop:"4px","& fieldset":{borderWidth:"1px !important",borderColor:"#rgba(0, 0, 0, 0.87)"}}})),M=Object(c.a)(h.a)((function(e){e.theme;return{width:340,borderRadius:"0px",fontSize:"13px",height:"42px",backgroundColor:"white",marginTop:"4px","& fieldset":{borderWidth:"1px !important",borderColor:"#rgba(0, 0, 0, 0.87)"}}})),I=Object(c.a)(p.a)((function(){return{boxShadow:"none",width:"100%",backgroundColor:"white",fontWeight:"bold"}})),B=Object(r.a)((function(e){return{root:{"& .Mui-selected":{backgroundColor:"#0066BF",color:"white"}}}}));t.default=function(){var e=Object(x.b)(),t=B(),n=a.a.useState(JSON.parse(localStorage.getItem("productList"))||[]),l=Object(o.a)(n,2),c=l[0],r=l[1],h=c.flatMap((function(e){return e})),p=a.a.useState(""),N=Object(o.a)(p,2),w=N[0],H=N[1],D=a.a.useState([]),P=Object(o.a)(D,2),R=P[0],G=P[1],F=a.a.useState([]),_=Object(o.a)(F,2),V=_[0],E=_[1],q=Object(x.c)((function(e){return e.user}));a.a.useEffect((function(){e(Object(s.c)())}),[e]),a.a.useEffect((function(){e(Object(s.d)())}),[e]),a.a.useEffect((function(){G((function(){var e;return null===q||void 0===q||null===(e=q.products)||void 0===e?void 0:e.filter((function(e){return e.nameProduct}))}))}),[q]),a.a.useEffect((function(){E((function(){var e;return null===q||void 0===q||null===(e=q.typeproducts)||void 0===e?void 0:e.filter((function(e){return e.nameTypeProduct}))}))}),[q]);var J=function(e,t,n,o,l,a){var x=localStorage.getItem("productList"),s=e.map((function(e){return e.nameProduct}));if(x&&!h.some((function(e){return e.nameProduct.includes(s)}))){var p=JSON.parse(x);p.push({id:t,nameProduct:n,nameTypeProduct:a,image:o,price:l,quantity:1,total:1*l}),localStorage.setItem("productList",JSON.stringify(p)),r([].concat(Object(i.a)(c),[{id:t,nameProduct:n,nameTypeProduct:a,image:o,price:l,quantity:1,total:1*l}]))}else if(x){var d=h.find((function(e){return e.id===t}));d&&(d.quantity=parseFloat(h.filter((function(e){return e.id==t})).map((function(e){return e.quantity+1})).toString()),d.total=parseFloat(h.filter((function(e){return e.id==t})).map((function(e){return e.quantity*e.price})).toString())),localStorage.setItem("productList",JSON.stringify(h))}else localStorage.setItem("productList",JSON.stringify([{id:t,nameProduct:n,nameTypeProduct:a,image:o,price:l,quantity:1,total:1*l}])),r([].concat(Object(i.a)(c),[{id:t,nameProduct:n,nameTypeProduct:a,image:o,price:l,quantity:1,total:1*l}]))},K=function(e){var t=e.target.value;if(""!==t){var n,i=null===q||void 0===q||null===(n=q.products)||void 0===n?void 0:n.filter((function(e){return e.nameProduct.toLowerCase().startsWith(t.toLowerCase())}));G(i)}else G((function(){var e;return null===q||void 0===q||null===(e=q.products)||void 0===e?void 0:e.filter((function(e){return e.nameProduct}))}));H(t)},Q=a.a.useState(1),U=Object(o.a)(Q,2),X=U[0],Y=U[1],Z=Math.ceil(R.length/12),$=L(R,12),ee=function(e,t){Y(t),$.jump(t)};a.a.useEffect((function(){document.title="Trang Ch\u1ee7"}),[]);var te=function(){var e=a.a.useState(window.innerWidth),t=Object(o.a)(e,2),n=t[0],i=t[1];return a.a.useEffect((function(){var e=function(){return i(window.innerWidth)};return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),{width:n}}(),ne=te.width<=1024&&te.width>420,ie=te.width<=420,oe=a.a.useState(!1),le=Object(o.a)(oe,2),ae=le[0],ce=le[1],re=function(){ce(!ae)},xe=a.a.useState(!1),se=Object(o.a)(xe,2),he=se[0],pe=se[1],de=function(){pe(!he)},je=he?Object(k.jsx)(d.a,{className:"nav-products  ".concat(he&&"active"),children:V.map((function(e){return Object(k.jsx)("li",{children:Object(k.jsx)(S.b,{style:{textDecoration:"none"},to:"/loaiSP1/".concat(e._id),children:Object(k.jsxs)(d.a,{sx:{color:"white",fontWeight:400,fontSize:13,fontFamily:"Roboto",display:"flex",flexDirection:"row",margin:"15px 0"},children:[Object(k.jsx)(d.a,{sx:{width:"9px",height:"9px",borderRadius:"50%",border:"1px solid white",margin:"3px 5px 0 0"}}),e.nameTypeProduct]})})})}))}):Object(k.jsx)(d.a,{sx:{height:0,transition:"all 0.5s ease-in-out"}}),fe=he?Object(k.jsx)(A.a,{onClick:de,style:{color:"white",margin:"-2px 19px 0 0"}}):Object(k.jsx)(v.a,{onClick:de,style:{color:"white",margin:"-2px 19px 0 0"}}),ge=ae?Object(k.jsx)(d.a,{sx:{height:0,transition:"all 0.5s ease-in-out"}}):Object(k.jsxs)(d.a,{className:"nav-elements  ".concat(ae&&"active"),children:[Object(k.jsx)(j.a,{style:{height:1}}),Object(k.jsxs)("ul",{style:{marginLeft:"-20px"},children:[Object(k.jsx)("li",{children:Object(k.jsx)(S.b,{style:{textDecoration:"none",fontWeight:"bold",color:"white"},to:"/",children:"TRANG CH\u1ee6"})}),Object(k.jsxs)("li",{style:{margin:"23px 0"},children:[Object(k.jsxs)(d.a,{display:"flex",flexDirection:"row",children:[Object(k.jsx)(S.b,{style:{textDecoration:"none",fontWeight:"bold",color:"white"},to:"/LoaiSP",children:"S\u1ea2N PH\u1ea8M"}),Object(k.jsx)(d.a,{flexGrow:1}),fe]}),je]}),Object(k.jsx)("li",{children:Object(k.jsx)(S.b,{style:{textDecoration:"none",fontWeight:"bold",color:"white"},to:"/tintuc",children:"TIN T\u1ee8C"})})]})]});return ne?Object(k.jsx)(d.a,{children:Object(k.jsxs)(d.a,{children:[Object(k.jsxs)(d.a,{children:[Object(k.jsxs)(d.a,{sx:{backgroundImage:"url(/backgroundHeader.jpg)",height:"234px",display:"flex",flexDirection:"column",justifyContent:"center"},children:[Object(k.jsx)(S.b,{style:{textDecoration:"none",margin:"10px auto"},to:"/",children:Object(k.jsx)("img",{src:"/logoBM.png",style:{height:"90px",width:"90px"}})}),Object(k.jsx)(d.a,{sx:{fontSize:"30px",fontWeight:"bold",color:"red",textAlign:"center"},children:"B\xccNH MINH GLOBAL"}),Object(k.jsx)(d.a,{sx:{fontSize:"19px",fontWeight:"bold",color:"#0066BF",textAlign:"center"},children:" NH\xc0 CUNG C\u1ea4P S\u1ed0 1 V\u1ec0 B\u1ed2N N\u01af\u1edaC V\xc0 N\u0102NG L\u01af\u1ee2NG M\u1eb6T TR\u1edcI"})]}),Object(k.jsxs)(d.a,{sx:{backgroundColor:"#0066BF",maxHeight:"600px",display:"flex",flexDirection:"column"},children:[Object(k.jsxs)(d.a,{display:"flex",flexDirection:"row",sx:{margin:"15px 20px"},children:[Object(k.jsx)(z.a,{onClick:re,style:{color:"white"}}),Object(k.jsx)(d.a,{flexGrow:1}),Object(k.jsx)(d.a,{component:S.b,to:"/order",children:Object(k.jsxs)(f.a,{color:"error",badgeContent:h.length,children:[Object(k.jsx)(T.a,{style:{color:"white"}})," "]})})]}),ge,Object(k.jsx)(d.a,{display:"flex",justifyContent:"center",children:Object(k.jsx)(M,{value:w,onChange:K,placeholder:"T\xecm ki\u1ebfm s\u1ea3n ph\u1ea9m...",startAdornment:Object(k.jsx)(g.a,{position:"start",style:{paddingLeft:1.3},children:Object(k.jsx)(C.a,{style:{width:"16px"},sx:{color:"rgba(0, 0, 0, 0.87)"}})})})})]}),Object(k.jsx)(d.a,{sx:{fontSize:"25px",fontWeight:"bold",margin:"30px 0 30px 15px",display:"flex",justifyContent:"left"},children:"S\u1ea2N PH\u1ea8M"}),Object(k.jsxs)(d.a,{display:"flex",flexDirection:"column",sx:{margin:"0 15px 0 40px"},children:[Object(k.jsx)(d.a,{sx:{display:"flex",justifyContent:"right"},children:Object(k.jsx)(b.a,{count:Z,page:X,variant:"outlined",shape:"circular",onChange:ee,className:t.root})}),Object(k.jsx)(m.a,{container:!0,children:$.currentData().map((function(e){return Object(k.jsxs)(m.a,{xs:6,style:{margin:"20px 0",maxWidth:"410px"},children:[Object(k.jsx)(d.a,{className:"photo",children:Object(k.jsx)("img",{className:"imgHover",style:{transition:"0.5s all ease-in-out",width:"358px",height:"328px"},src:e.image})}),Object(k.jsx)(d.a,{sx:{fontSize:"16px",fontWeight:"bold",fontFamily:"Roboto",textAlign:"center",maxWidth:"358px"},children:e.nameProduct}),Object(k.jsxs)(d.a,{sx:{fontSize:"14px",fontWeight:"bold",color:"red",marginTop:"15px",textAlign:"center"},children:[new Intl.NumberFormat("de-DE").format(e.price)," VN\u0110"]}),Object(k.jsxs)(d.a,{display:"flex",flexDirection:"row",sx:{marginTop:"10px",alignItems:"center",justifyContent:"center",maxWidth:"358px"},children:[Object(k.jsx)(S.b,{style:{textDecoration:"none"},to:"/chitietloaiSP/".concat(e._id),children:Object(k.jsx)(y.a,{style:{color:"white",backgroundColor:"black",marginRight:"5px",height:"39px",padding:"0px 18px"},children:"Chi Ti\u1ebft"})}),Object(k.jsx)(y.a,{onClick:function(){return J(R.filter((function(t){return t._id===e._id})),e._id,e.nameProduct,e.image,e.price,e.typeProduct.nameTypeProduct)},style:{color:"black",backgroundColor:"white",border:"1px solid black",borderRadius:"5px",height:"39px"},children:"Mua H\xe0ng"})]})]},e._id)}))}),Object(k.jsx)(d.a,{sx:{display:"flex",justifyContent:"right",marginBottom:"30px"},children:Object(k.jsx)(b.a,{count:Z,page:X,variant:"outlined",shape:"circular",onChange:ee,className:t.root})})]})]}),Object(k.jsx)(d.a,{className:"footer",children:Object(k.jsxs)(d.a,{sx:{display:"flex",flexDirection:"column",margin:"0 10px"},children:[Object(k.jsx)(d.a,{sx:{fontSize:"16px",fontWeight:"bold",color:"white",margin:"20px 0"},children:"TH\xd4NG TIN LI\xcaN H\u1ec6"}),Object(k.jsx)(j.a,{style:{height:1,backgroundColor:"white"}}),Object(k.jsx)(d.a,{style:{fontWeight:"bold",fontSize:"14px",float:"left",letterSpacing:.5,marginTop:"20px"},children:"H\u1ec7 Th\u1ed1ng Chi Nh\xe1nh B\xecnh Minh Solar"}),Object(k.jsx)(d.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"10px 0px",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 1: 369C T\xe2n Th\u1edbi Hi\u1ec7p 21, P. T\xe2n Th\u1edbi Hi\u1ec7p, Q.12, Tp. H\u1ed3 Ch\xed Minh"}),Object(k.jsx)(d.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 2: 196 Nguy\u1ec5n Tri Ph\u01b0\u01a1ng, Th\xe0nh ph\u1ed1 Bi\xean H\xf2a, \u0110\u1ed3ng Nai"}),Object(k.jsx)(d.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"10px 0px",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 3: M\u1ef9 Ph\u01b0\u1edbc T\xe2n V\u1ea1n, TP. Th\u1ee7 D\u1ea7u M\u1ed9t, B\xecnh D\u01b0\u01a1ng"}),Object(k.jsx)(d.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 4: KCN \u0110\u1ee9c H\xf2a \u2013 Long An"}),Object(k.jsx)(d.a,{sx:{fontSize:"16px",fontWeight:"bold",color:"white",margin:"20px 0"},children:"\u0110\u01af\u1edcNG D\u1eaaN NHANH"}),Object(k.jsx)(j.a,{style:{height:1,backgroundColor:"white"}}),Object(k.jsx)(d.a,{component:S.b,to:"/",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5,textDecoration:"none",color:"white"},children:"TRANG CH\u1ee6"}),Object(k.jsx)(d.a,{component:S.b,to:"/LoaiSP",style:{fontSize:"14px",float:"left",textAlign:"left",letterSpacing:.5,textDecoration:"none",color:"white"},children:"S\u1ea2N PH\u1ea8M"}),Object(k.jsx)(d.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5},children:"TIN T\u1ee8C"}),Object(k.jsx)("img",{src:"/BoCongThuong.png",style:{width:"200px",height:"76px"}}),Object(k.jsx)(d.a,{sx:{fontSize:"16px",fontWeight:"bold",color:"white",margin:"20px 0"},children:"CH\xcdNH S\xc1CH"}),Object(k.jsx)(j.a,{style:{height:1,backgroundColor:"white"}}),Object(k.jsx)(d.a,{component:S.b,to:"/chinh-sach-thanh-toan",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch thanh to\xe1n"}),Object(k.jsx)(d.a,{component:S.b,to:"/chinh-sach-giao-hang",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch giao h\xe0ng"}),Object(k.jsx)(d.a,{component:S.b,to:"/chinh-sach-bao-hanh",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch b\u1ea3o h\xe0nh"}),Object(k.jsx)(d.a,{component:S.b,to:"/chinh-sach-bao-mat-thong-tin",style:{fontSize:"14px",float:"left",margin:"0 0 20px -2px",textAlign:"left",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch b\u1ea3o m\u1eadt th\xf4ng tin"})]})}),Object(k.jsx)("a",{href:"tel:0799177960",className:"hotlinemp all",rel:"nofollow",children:Object(k.jsxs)("div",{className:"mypage-alo-phone",style:{left:"0px"},children:[Object(k.jsx)("div",{className:"animated infinite zoomIn mypage-alo-ph-circle"}),Object(k.jsx)("div",{className:"animated infinite pulse mypage-alo-ph-circle-fill"}),Object(k.jsx)("div",{className:"animated infinite tada mypage-alo-ph-img-circle",style:{backgroundColor:"red"}}),Object(k.jsx)("span",{children:"0799177960"})]})})]})}):ie?Object(k.jsx)(d.a,{children:Object(k.jsxs)(d.a,{children:[Object(k.jsxs)(d.a,{children:[Object(k.jsxs)(d.a,{sx:{backgroundImage:"url(/backgroundHeader.jpg)",height:"234px",display:"flex",flexDirection:"column",justifyContent:"center"},children:[Object(k.jsx)(S.b,{style:{textDecoration:"none",margin:"10px auto"},to:"/",children:Object(k.jsx)("img",{src:"/logoBM.png",style:{height:"90px",width:"90px"}})}),Object(k.jsx)(d.a,{sx:{fontSize:"30px",fontWeight:"bold",color:"red",textAlign:"center"},children:"B\xccNH MINH GLOBAL"}),Object(k.jsx)(d.a,{sx:{fontSize:"19px",fontWeight:"bold",color:"#0066BF",textAlign:"center"},children:" NH\xc0 CUNG C\u1ea4P S\u1ed0 1 V\u1ec0 B\u1ed2N N\u01af\u1edaC V\xc0 N\u0102NG L\u01af\u1ee2NG M\u1eb6T TR\u1edcI"})]}),Object(k.jsxs)(d.a,{sx:{backgroundColor:"#0066BF",maxHeight:"600px",display:"flex",flexDirection:"column"},children:[Object(k.jsxs)(d.a,{display:"flex",flexDirection:"row",sx:{margin:"15px 20px"},children:[Object(k.jsx)(z.a,{onClick:re,style:{color:"white"}}),Object(k.jsx)(d.a,{flexGrow:1}),Object(k.jsx)(d.a,{component:S.b,to:"/order",children:Object(k.jsxs)(f.a,{color:"error",badgeContent:h.length,children:[Object(k.jsx)(T.a,{style:{color:"white"}})," "]})})]}),ge,Object(k.jsx)(d.a,{display:"flex",justifyContent:"center",children:Object(k.jsx)(M,{value:w,onChange:K,placeholder:"T\xecm ki\u1ebfm s\u1ea3n ph\u1ea9m...",startAdornment:Object(k.jsx)(g.a,{position:"start",style:{paddingLeft:1.3},children:Object(k.jsx)(C.a,{style:{width:"16px"},sx:{color:"rgba(0, 0, 0, 0.87)"}})})})})]}),Object(k.jsx)(d.a,{sx:{fontSize:"25px",fontWeight:"bold",margin:"30px 0 30px 0px",display:"flex",justifyContent:"left"},children:"S\u1ea2N PH\u1ea8M"}),Object(k.jsxs)(d.a,{display:"flex",flexDirection:"column",sx:{margin:"0 15px"},children:[Object(k.jsx)(d.a,{sx:{display:"flex",justifyContent:"right"},children:Object(k.jsx)(b.a,{count:Z,page:X,variant:"outlined",shape:"circular",onChange:ee,className:t.root})}),$.currentData().map((function(e){return Object(k.jsxs)(d.a,{display:"flex",flexDirection:"column",sx:{margin:"30px auto"},children:[Object(k.jsx)(d.a,{className:"photo",children:Object(k.jsx)("img",{className:"imgHover",style:{width:"357px",height:"327px"},src:e.image})}),Object(k.jsx)(d.a,{sx:{fontSize:"16px",fontWeight:"bold",fontFamily:"Roboto",maxWidth:"352px",textAlign:"center"},children:e.nameProduct}),Object(k.jsxs)(d.a,{sx:{fontSize:"14px",fontWeight:"bold",color:"red",marginTop:"15px",textAlign:"center"},children:[new Intl.NumberFormat("de-DE").format(e.price)," VN\u0110"]}),Object(k.jsxs)(d.a,{display:"flex",flexDirection:"row",sx:{marginTop:"10px",alignItems:"center",justifyContent:"center"},children:[Object(k.jsx)(S.b,{style:{textDecoration:"none"},to:"/chitietloaiSP/".concat(e._id),children:Object(k.jsx)(y.a,{style:{color:"white",backgroundColor:"black",marginRight:"5px",height:"39px",padding:"0px 18px"},children:"Chi Ti\u1ebft"})}),Object(k.jsx)(y.a,{onClick:function(){return J(R.filter((function(t){return t._id===e._id})),e._id,e.nameProduct,e.image,e.price,e.typeProduct.nameTypeProduct)},style:{color:"black",backgroundColor:"white",border:"1px solid black",height:"39px"},children:"Mua H\xe0ng"})]})]},e._id)})),Object(k.jsx)(d.a,{sx:{display:"flex",justifyContent:"right",marginBottom:"30px"},children:Object(k.jsx)(b.a,{count:Z,page:X,variant:"outlined",shape:"circular",onChange:ee,className:t.root})})]})]}),Object(k.jsx)(d.a,{className:"footer",children:Object(k.jsxs)(d.a,{sx:{display:"flex",flexDirection:"column",margin:"0 10px"},children:[Object(k.jsx)(d.a,{sx:{fontSize:"16px",fontWeight:"bold",color:"white",margin:"20px 0"},children:"TH\xd4NG TIN LI\xcaN H\u1ec6"}),Object(k.jsx)(j.a,{style:{height:1,backgroundColor:"white"}}),Object(k.jsx)(d.a,{style:{fontWeight:"bold",fontSize:"14px",float:"left",letterSpacing:.5,marginTop:"20px"},children:"H\u1ec7 Th\u1ed1ng Chi Nh\xe1nh B\xecnh Minh Solar"}),Object(k.jsx)(d.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"10px 0px",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 1: 369C T\xe2n Th\u1edbi Hi\u1ec7p 21, P. T\xe2n Th\u1edbi Hi\u1ec7p, Q.12, Tp. H\u1ed3 Ch\xed Minh"}),Object(k.jsx)(d.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 2: 196 Nguy\u1ec5n Tri Ph\u01b0\u01a1ng, Th\xe0nh ph\u1ed1 Bi\xean H\xf2a, \u0110\u1ed3ng Nai"}),Object(k.jsx)(d.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"10px 0px",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 3: M\u1ef9 Ph\u01b0\u1edbc T\xe2n V\u1ea1n, TP. Th\u1ee7 D\u1ea7u M\u1ed9t, B\xecnh D\u01b0\u01a1ng"}),Object(k.jsx)(d.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 4: KCN \u0110\u1ee9c H\xf2a \u2013 Long An"}),Object(k.jsx)(d.a,{sx:{fontSize:"16px",fontWeight:"bold",color:"white",margin:"20px 0"},children:"\u0110\u01af\u1edcNG D\u1eaaN NHANH"}),Object(k.jsx)(j.a,{style:{height:1,backgroundColor:"white"}}),Object(k.jsx)(d.a,{component:S.b,to:"/",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5,textDecoration:"none",color:"white"},children:"TRANG CH\u1ee6"}),Object(k.jsx)(d.a,{component:S.b,to:"/LoaiSP",style:{fontSize:"14px",float:"left",textAlign:"left",letterSpacing:.5,textDecoration:"none",color:"white"},children:"S\u1ea2N PH\u1ea8M"}),Object(k.jsx)(d.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5},children:"TIN T\u1ee8C"}),Object(k.jsx)("img",{src:"/BoCongThuong.png",style:{width:"200px",height:"76px"}}),Object(k.jsx)(d.a,{sx:{fontSize:"16px",fontWeight:"bold",color:"white",margin:"20px 0"},children:"CH\xcdNH S\xc1CH"}),Object(k.jsx)(j.a,{style:{height:1,backgroundColor:"white"}}),Object(k.jsx)(d.a,{component:S.b,to:"/chinh-sach-thanh-toan",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch thanh to\xe1n"}),Object(k.jsx)(d.a,{component:S.b,to:"/chinh-sach-giao-hang",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch giao h\xe0ng"}),Object(k.jsx)(d.a,{component:S.b,to:"/chinh-sach-bao-hanh",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch b\u1ea3o h\xe0nh"}),Object(k.jsx)(d.a,{component:S.b,to:"/chinh-sach-bao-mat-thong-tin",style:{fontSize:"14px",float:"left",margin:"0 0 20px -2px",textAlign:"left",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch b\u1ea3o m\u1eadt th\xf4ng tin"})]})}),Object(k.jsx)("a",{href:"tel:0799177960",className:"hotlinemp all",rel:"nofollow",children:Object(k.jsxs)("div",{className:"mypage-alo-phone",style:{left:"0px"},children:[Object(k.jsx)("div",{className:"animated infinite zoomIn mypage-alo-ph-circle"}),Object(k.jsx)("div",{className:"animated infinite pulse mypage-alo-ph-circle-fill"}),Object(k.jsx)("div",{className:"animated infinite tada mypage-alo-ph-img-circle",style:{backgroundColor:"red"}}),Object(k.jsx)("span",{children:"0799177960"})]})})]})}):Object(k.jsx)(d.a,{children:Object(k.jsxs)(d.a,{children:[Object(k.jsxs)(d.a,{children:[Object(k.jsx)(I,{style:{boxShadow:"none",overflowX:"hidden",backgroundImage:"url(/backgroundHeader.jpg)",height:"110px"},children:Object(k.jsxs)(u.a,{children:[Object(k.jsx)(S.b,{style:{textDecoration:"none",marginTop:"10px"},to:"/",children:Object(k.jsx)("img",{src:"/logoBM.png",style:{height:"90px",width:"90px"}})}),Object(k.jsxs)(d.a,{textAlign:"center",display:"flex",flexDirection:"column",flexGrow:1,children:[Object(k.jsx)(O.a,{style:{color:"#dd3333",fontWeight:700,fontStyle:"normal",fontSize:"30px"},children:"B\xccNH MINH GLOBAL"}),Object(k.jsx)(O.a,{style:{color:"#0066bf",fontSize:"19px",fontWeight:700,fontStyle:"normal"},children:"NH\xc0 CUNG C\u1ea4P S\u1ed0 1 V\u1ec0 B\u1ed2N N\u01af\u1edaC V\xc0 N\u0102NG L\u01af\u1ee2NG M\u1eb6T TR\u1edcI"})]}),Object(k.jsxs)(d.a,{display:"flex",flexDirection:"row",children:[Object(k.jsx)(d.a,{component:"img",src:"/call.gif",style:{width:"58px",height:"45px",paddingRight:"15px"}}),Object(k.jsxs)(d.a,{display:"flex",flexDirection:"column",children:[Object(k.jsx)(O.a,{style:{fontSize:"14px",color:"black",fontWeight:"bold"},children:"Hotline:"}),Object(k.jsx)(O.a,{style:{fontSize:"16px",color:"#ff0000",fontWeight:"bold"},children:"0362.526.678"})]})]})]})}),Object(k.jsx)(I,{style:{backgroundColor:"#0066bf",marginTop:"110px",height:"50px"},children:Object(k.jsxs)(d.a,{display:"flex",flexDirection:"row",sx:{padding:"0px 170px"},children:[Object(k.jsx)(d.a,{flexGrow:1,children:Object(k.jsxs)("ul",{id:"nav",children:[Object(k.jsx)("li",{children:Object(k.jsx)(S.b,{style:{padding:"0 24px"},to:"/",children:"TRANG CH\u1ee6"})}),Object(k.jsxs)("li",{children:[Object(k.jsx)(S.b,{style:{backgroundColor:"white",color:"#0066bf",padding:"0 24px"},to:"/loaiSP",children:"S\u1ea2N PH\u1ea8M"}),Object(k.jsx)(d.a,{className:"subnav",children:V.map((function(e){return Object(k.jsx)("li",{children:Object(k.jsx)(S.b,{to:"/loaiSP2/".concat(e._id),children:Object(k.jsx)(d.a,{className:"boxA",sx:{color:"#333333",fontWeight:400,fontSize:14,fontFamily:"Roboto"},children:e.nameTypeProduct})})})}))})]}),Object(k.jsx)("li",{children:Object(k.jsx)(S.b,{to:"/tintuc",style:{padding:"0 24px"},children:"TIN T\u1ee8C"})})]})}),Object(k.jsx)(d.a,{children:Object(k.jsx)(W,{value:w,onChange:K,placeholder:"T\xecm ki\u1ebfm s\u1ea3n ph\u1ea9m...",startAdornment:Object(k.jsx)(g.a,{position:"start",style:{paddingLeft:1.3},children:Object(k.jsx)(C.a,{style:{width:"16px"},sx:{color:"rgba(0, 0, 0, 0.87)"}})})})}),Object(k.jsx)(d.a,{component:S.b,to:"/order",sx:{padding:"12px 0px",marginLeft:"20px",color:"white"},children:Object(k.jsxs)(f.a,{color:"error",badgeContent:c.length,children:[Object(k.jsx)(T.a,{})," "]})})]})})]}),Object(k.jsxs)(d.a,{display:"flex",flexDirection:"column",sx:{textAlign:"center",marginTop:"60px",margin:"auto",maxWidth:"1500px"},children:[Object(k.jsx)(d.a,{sx:{fontSize:"25px",fontWeight:"bold",margin:"100px 0 50px 175px",display:"flex",justifyContent:"left"},children:"S\u1ea2N PH\u1ea8M"}),Object(k.jsx)(d.a,{sx:{display:"flex",justifyContent:"right"},children:Object(k.jsx)(b.a,{count:Z,page:X,variant:"outlined",shape:"circular",onChange:ee,className:t.root})}),Object(k.jsx)(d.a,{display:"flex",children:Object(k.jsx)(m.a,{container:!0,style:{margin:"0px 100px 0px 160px"},children:$.currentData().map((function(e){return Object(k.jsxs)(m.a,{xs:3,style:{margin:"20px 0px",maxWidth:"300px"},children:[Object(k.jsx)(d.a,{className:"photo",children:Object(k.jsx)("img",{className:"imgHover",style:{transition:"0.5s all ease-in-out",width:"270px",height:"240px"},src:e.image})}),Object(k.jsx)(d.a,{sx:{fontSize:"16px",fontWeight:"bold",fontFamily:"Roboto",width:"292px"},children:e.nameProduct}),Object(k.jsxs)(d.a,{sx:{fontSize:"14px",fontWeight:"bold",color:"red",marginTop:"15px"},children:[new Intl.NumberFormat("de-DE").format(e.price)," VN\u0110"]}),Object(k.jsxs)(d.a,{display:"flex",flexDirection:"row",sx:{marginTop:"10px",alignItems:"center",justifyContent:"center"},children:[Object(k.jsx)(S.b,{to:"/chitietloaiSP/".concat(e._id),children:Object(k.jsx)(y.a,{style:{color:"white",backgroundColor:"black",marginRight:"5px",height:"39px",padding:"0px 18px"},children:"Chi Ti\u1ebft"})}),Object(k.jsx)(y.a,{onClick:function(){return J(R.filter((function(t){return t._id===e._id})),e._id,e.nameProduct,e.image,e.price,e.typeProduct.nameTypeProduct)},style:{color:"black",backgroundColor:"white",border:"1px solid black",borderRadius:"5px",height:"39px"},children:"Mua H\xe0ng"})]})]},e._id)}))})}),Object(k.jsx)(d.a,{sx:{display:"flex",justifyContent:"right",marginTop:"30px"},children:Object(k.jsx)(b.a,{count:Z,page:X,variant:"outlined",shape:"circular",onChange:ee,className:t.root})})]}),Object(k.jsx)(d.a,{sx:{marginTop:"100px"},className:"footer",display:"flex",alignItems:"center",justifyContent:"center",children:Object(k.jsxs)(d.a,{display:"flex",flexDirection:"row",sx:{padding:"30px 160px 0px 160px"},children:[Object(k.jsxs)(d.a,{display:"flex",flexDirection:"column",children:[Object(k.jsx)(d.a,{sx:{fontSize:"16px",fontFamily:"Roboto",fontWeight:"bold",color:"white",float:"left"},children:"TH\xd4NG TIN LI\xcaN H\u1ec6"}),Object(k.jsx)(j.a,{style:{border:"1px solid white",marginTop:"20px",width:"370px",float:"left"}}),Object(k.jsxs)(d.a,{display:"flex",flexDirection:"column",sx:{marginTop:"20px",fontFamily:"Roboto",float:"left"},children:[Object(k.jsx)(d.a,{style:{fontWeight:"bold",fontSize:"14px",float:"left",letterSpacing:.5},children:"H\u1ec7 Th\u1ed1ng Chi Nh\xe1nh B\xecnh Minh Solar"}),Object(k.jsx)(d.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"10px 0px",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 1: 369C T\xe2n Th\u1edbi Hi\u1ec7p 21, P. T\xe2n Th\u1edbi Hi\u1ec7p, Q.12, Tp. H\u1ed3 Ch\xed Minh"}),Object(k.jsx)(d.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 2: 196 Nguy\u1ec5n Tri Ph\u01b0\u01a1ng, Th\xe0nh ph\u1ed1 Bi\xean H\xf2a, \u0110\u1ed3ng Nai"}),Object(k.jsx)(d.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"10px 0px",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 3: M\u1ef9 Ph\u01b0\u1edbc T\xe2n V\u1ea1n, TP. Th\u1ee7 D\u1ea7u M\u1ed9t, B\xecnh D\u01b0\u01a1ng"}),Object(k.jsx)(d.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,lineHeight:1.8},children:"Chi Nh\xe1nh 4: KCN \u0110\u1ee9c H\xf2a \u2013 Long An"})]})]}),Object(k.jsxs)(d.a,{display:"flex",flexDirection:"column",sx:{padding:"0px 240px"},children:[Object(k.jsx)(d.a,{sx:{fontSize:"16px",fontFamily:"Roboto",fontWeight:"bold",color:"white",float:"left"},children:"\u0110\u01af\u1edcNG D\u1eaaN NHANH"}),Object(k.jsx)(j.a,{style:{border:"1px solid white",marginTop:"20px",width:"370px",float:"left"}}),Object(k.jsxs)(d.a,{sx:{fontFamily:"Roboto",float:"left",display:"flex",flexDirection:"column"},children:[Object(k.jsx)(d.a,{component:S.b,to:"/",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5,textDecoration:"none",color:"white"},children:"TRANG CH\u1ee6"}),Object(k.jsx)(d.a,{component:S.b,to:"/LoaiSP",style:{fontSize:"14px",float:"left",textAlign:"left",letterSpacing:.5,textDecoration:"none",color:"white"},children:"S\u1ea2N PH\u1ea8M"}),Object(k.jsx)(d.a,{style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5},children:"TIN T\u1ee8C"}),Object(k.jsx)("img",{src:"/BoCongThuong.png",style:{marginTop:"50px",width:"200px",height:"76px"}})]})]}),Object(k.jsxs)(d.a,{display:"flex",flexDirection:"column",children:[Object(k.jsx)(d.a,{sx:{fontSize:"16px",fontFamily:"Roboto",fontWeight:"bold",color:"white",float:"left"},children:"CH\xcdNH S\xc1CH"}),Object(k.jsx)(j.a,{style:{border:"1px solid white",marginTop:"20px",width:"370px",float:"left"}}),Object(k.jsxs)(d.a,{sx:{fontFamily:"Roboto",float:"left",display:"flex",flexDirection:"column"},children:[Object(k.jsx)(d.a,{component:S.b,to:"/chinh-sach-thanh-toan",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch thanh to\xe1n"}),Object(k.jsx)(d.a,{component:S.b,to:"/chinh-sach-giao-hang",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch giao h\xe0ng"}),Object(k.jsx)(d.a,{component:S.b,to:"/chinh-sach-bao-hanh",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",margin:"20px 0px",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch b\u1ea3o h\xe0nh"}),Object(k.jsx)(d.a,{component:S.b,to:"/chinh-sach-bao-mat-thong-tin",style:{fontSize:"14px",float:"left",marginLeft:"-2px",textAlign:"left",letterSpacing:.5,textDecoration:"none",color:"white"},children:"Ch\xednh s\xe1ch b\u1ea3o m\u1eadt th\xf4ng tin"})]})]}),Object(k.jsx)("a",{href:"tel:0799177960",className:"hotlinemp all",rel:"nofollow",children:Object(k.jsxs)("div",{className:"mypage-alo-phone",style:{left:"0px"},children:[Object(k.jsx)("div",{className:"animated infinite zoomIn mypage-alo-ph-circle"}),Object(k.jsx)("div",{className:"animated infinite pulse mypage-alo-ph-circle-fill"}),Object(k.jsx)("div",{className:"animated infinite tada mypage-alo-ph-img-circle",style:{backgroundColor:"red"}}),Object(k.jsx)("span",{children:"0799177960"})]})})]})})]})})}}}]);
//# sourceMappingURL=28.1ccc0933.chunk.js.map