(this.webpackJsonptraining=this.webpackJsonptraining||[]).push([[3],{301:function(e,t,a){e.exports={btn:"BTN_btn__3oOco"}},302:function(e,t,a){},306:function(e,t,a){e.exports={descriptionBlock:"ProfileInfo_descriptionBlock__23YcP",avaAndStatus:"ProfileInfo_avaAndStatus__2VhLv",avatar:"ProfileInfo_avatar__D3D9M"}},307:function(e,t,a){e.exports={item:"Post_item__1Lq19"}},308:function(e,t,a){e.exports={myPost:"MyPosts_myPost__263G3"}},309:function(e,t,a){"use strict";a.r(t);var n=a(41),l=a(42),c=a(44),r=a(43),o=a(0),i=a.n(o),s=a(9),u=a(14),m=a(103),f=a(11),p=a(31),b=a(306),d=a.n(b),E=a(116),v=a.n(E),h=a(301),j=a.n(h),O=a(115),g=a.n(O),k=function(e){var t=Object(o.useState)(e.status),a=Object(p.a)(t,2),n=a[0],l=a[1],c=Object(o.useState)(!1),r=Object(p.a)(c,2),s=r[0],u=r[1];return Object(o.useEffect)((function(){l(e.status)}),[e.status]),i.a.createElement("div",null,i.a.createElement("div",null,s?i.a.createElement("input",{type:"text",value:null===n?"":n,autoFocus:!0,onChange:function(e){l(e.currentTarget.value)},onBlur:function(){n&&e.updateProfileStatus(n),u(!1)}}):i.a.createElement("span",{onDoubleClick:function(){u(!0)},title:"status"},""===e.status||null===e.status?"---":e.status)))},P=a(302),S=a.n(P),y=function(e){var t=e.contactTitle,a=e.contactValue;return i.a.createElement("div",{style:{paddingLeft:"10px"}},i.a.createElement("span",null,t,":")," ",i.a.createElement("span",null,a||""))},A=function(e){var t=Object(o.useState)(!1),a=Object(p.a)(t,2),n=a[0],l=a[1],c=Object(o.useState)("show contacts"),r=Object(p.a)(c,2),s=r[0],u=r[1];return i.a.createElement("div",null,i.a.createElement("div",null,i.a.createElement("span",null,"Full name: "),e.fullName),i.a.createElement("div",null,i.a.createElement("span",null,"About me:")," ",e.aboutMe?e.aboutMe:"..."),i.a.createElement("div",{className:S.a.jobBlock},e.lookingForAJob?i.a.createElement("div",null,i.a.createElement("span",null,"I`m looking for a job")):i.a.createElement("span",null,"I have job"),e.lookingForAJobDescription&&i.a.createElement("div",null,i.a.createElement("span",null,"My skills : "),e.lookingForAJobDescription)),i.a.createElement("button",{onClick:function(){n&&l(!1),!n&&l(!0),"show contacts"===s&&u("hide contacts"),"hide contacts"===s&&u("show contacts")},className:j.a.btn},s),n&&i.a.createElement("div",{className:S.a.contactsBlock},i.a.createElement("div",{className:S.a.contacts},i.a.createElement("span",null,"Contacts:")," ",Object.keys(e.contacts).map((function(t){return i.a.createElement(y,{key:t,contactTitle:t,contactValue:e.contacts[t]})})))))},N=a(34),_=a(28),D=a(138),C=a(54),I=a(49),x=a.n(I),F=Object(C.a)(15),B=Object(C.a)(30),M=Object(C.a)(50),w=Object(u.b)((function(e){return{profile:e.profile.profile}}))((function(e){var t=e.handleSubmit,a=e.error,n=e.profile;Object(N.a)(e,["handleSubmit","error","profile"]);return i.a.createElement("form",{onSubmit:t},i.a.createElement("div",null,i.a.createElement("span",null,"Full name :"),Object(_.c)(_.a,"fullName","full name",F)),i.a.createElement("div",null,i.a.createElement("span",null,"About me :"),Object(_.c)(_.a,"aboutMe","about me",B)),i.a.createElement("div",{style:{display:"flex",justifyContent:"flex-start"}},i.a.createElement("span",null,"looking for a job :"),Object(_.c)(_.a,"lookingForAJob","",B,"checkbox")),i.a.createElement("div",null,i.a.createElement("span",null,"My professional skills :"),Object(_.c)(_.b,"lookingForAJobDescription","my skills",M)),i.a.createElement("div",{className:S.a.contacts},"Contacts: ",Object.keys(n.contacts).map((function(e){return i.a.createElement("div",{key:e},i.a.createElement("b",null,e," :")," ",Object(_.c)(_.a,"contacts.".concat(e),e,M))}))),i.a.createElement("div",null,a&&i.a.createElement("div",{className:x.a.formSummeryError},a),i.a.createElement("button",null,"save")))})),T=Object(D.a)({form:"editProfile"})(w),J=a(55),L=Object(s.d)(Object(u.b)((function(e){return{profile:e.profile.profile,isFetch:e.profile.isFetching,profileStatusText:e.profile.profileStatusText,isAuth:e.auth.isAuth}}),{updateProfileStatus:m.g,savePhoto:m.e,saveProfileChange:m.f}),f.g)((function(e){var t=Object(o.useState)(!1),a=Object(p.a)(t,2),n=a[0],l=a[1],c=Object(o.useState)("edit"),r=Object(p.a)(c,2),s=r[0],u=r[1];return e.match.params.userID||e.isAuth?i.a.createElement("div",{className:d.a.profileBlock},e.isFetch?i.a.createElement(J.a,null):i.a.createElement("div",{className:"".concat(d.a.descriptionBlock," ").concat(v.a.itemCase)},i.a.createElement("div",{className:d.a.avaAndStatus},i.a.createElement("img",{className:d.a.avatar,src:e.profile.photos.large||g.a,alt:""}),i.a.createElement(k,{status:e.profileStatusText,updateProfileStatus:e.updateProfileStatus})),!e.match.params.userID&&e.isAuth&&i.a.createElement("input",{type:"file",onChange:function(t){t.target.files&&e.savePhoto(t.target.files[0])}}),!e.match.params.userID&&e.isAuth&&i.a.createElement("div",null,i.a.createElement("button",{onClick:function(){!n&&l(!0),n&&l(!1),"edit"===s&&u("cancel"),"cancel"===s&&u("edit")},className:j.a.btn},s)),n?i.a.createElement(T,{onSubmit:function(t){e.saveProfileChange(t).then((function(){l(!1),u("edit")}))},initialValues:e.profile}):i.a.createElement(A,e.profile))):i.a.createElement(f.a,{to:"/login"})})),V=a(307),q=a.n(V),Q=i.a.memo((function(e){return i.a.createElement("div",{className:q.a.posts},i.a.createElement("div",{className:q.a.item},i.a.createElement("img",{src:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQtFl6_bcZtQuriN1f5RQsnNexOj2TlmhkaBw&usqp=CAU",alt:""}),i.a.createElement("span",null,e.comment),i.a.createElement("div",null,i.a.createElement("span",null,"Like's ",e.likeCount))))})),G=a(308),U=a.n(G),R=a(96),Y=Object(C.a)(15),Z=Object(D.a)({form:"post"})((function(e){return i.a.createElement("form",{onSubmit:e.handleSubmit},i.a.createElement("div",null,i.a.createElement(R.a,{component:_.b,name:"post",placeholder:"write...",validate:[Y]})),i.a.createElement("div",null,i.a.createElement("button",{className:j.a.btn},"add post")))})),z=i.a.memo((function(e){var t=e.profilePage.post.map((function(e){return i.a.createElement(Q,{comment:e.comm,likeCount:e.like,key:e.id})}));return i.a.createElement("div",{className:U.a.myPost},i.a.createElement("h3",null," My posts "),i.a.createElement("div",null,i.a.createElement(Z,{onSubmit:function(t){e.addPost(t.post)}})),t)})),H=Object(u.b)((function(e){return{profilePage:e.profile}}),(function(e){return{addPost:function(t){return e(Object(m.a)(t))}}}))(z),K=function(e){Object(c.a)(a,e);var t=Object(r.a)(a);function a(){var e;Object(n.a)(this,a);for(var l=arguments.length,c=new Array(l),r=0;r<l;r++)c[r]=arguments[r];return(e=t.call.apply(t,[this].concat(c))).refreshProfile=function(){var t=e.props.match.params.userID;t||(t=e.props.userID?e.props.userID.toString():""),e.props.getProfile(t),e.props.getProfileStatus(t)},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){this.refreshProfile()}},{key:"componentDidUpdate",value:function(e,t,a){e.isAuth===this.props.isAuth&&e.match.params.userID===this.props.match.params.userID||this.refreshProfile()}},{key:"render",value:function(){return i.a.createElement("div",null,i.a.createElement(L,null),i.a.createElement(H,null))}}]),a}(i.a.Component);t.default=Object(s.d)(Object(u.b)((function(e){return{userID:e.auth.data.id,isAuth:e.auth.isAuth}}),{getProfile:m.d,getProfileStatus:m.c}),f.g)(K)}}]);
//# sourceMappingURL=3.af892040.chunk.js.map