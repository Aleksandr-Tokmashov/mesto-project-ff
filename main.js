(()=>{"use strict";function e(e,t,n){t.deleteOnServerFunc(n.cardId).then((function(t){e.target.closest(".places__item").remove()})).catch((function(e){console.log(e)}))}function t(e){e.target.classList.toggle("card__like-button_is-active")}function n(e){e.classList.add("popup_is-opened","popup_is-animated"),document.addEventListener("keydown",o)}function r(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)}function o(e){"Escape"===e.key&&r(document.querySelector(".popup_is-opened"))}function c(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function a(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){c(e,n,t)})),u(r,t)}function i(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?l(t,n):u(t,n)}var u=function(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)},l=function(e,t){e.disabled=!1,e.classList.remove(t.inactiveButtonClass)},s={baseUrl:"https://nomoreparties.co/v1/wff-cohort-17",headers:{authorization:"ebda8151-d672-43e0-ab30-c2b206b24b49","Content-Type":"application/json"}};function d(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}var p=fetch("".concat(s.baseUrl,"/users/me"),{headers:s.headers}).then(d),f=fetch("".concat(s.baseUrl,"/cards"),{headers:s.headers}).then(d),_=function(e){return fetch("".concat(s.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:s.headers}).then(d)},m=function(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:s.headers}).then(d)},y=function(e){return fetch("".concat(s.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:s.headers}).then(d)};function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}document.querySelector("#card-template").content;var h=document.querySelector(".popup_type_edit"),S=document.querySelector(".popup_type_new-card"),b=document.querySelector(".popup_type_new-avatar"),k=document.querySelector(".profile__edit-button"),q=document.querySelector(".profile__add-button"),g=document.querySelector(".places__list"),C=document.querySelector(".popup_type_image"),L=document.querySelector(".popup__input_type_name"),E=document.querySelector(".popup__input_type_description"),I=document.querySelector(".profile__title"),A=document.querySelector(".profile__description"),x=S.querySelector(".popup__input_type_card-name"),F=S.querySelector(".popup__input_type_url"),N=b.querySelector(".popup__input_type_url"),O=C.querySelector(".popup__image"),U=C.querySelector(".popup__caption"),w=document.querySelector(".profile__image"),M={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},T=function(e,n,r){(e.target.classList.contains("card__like-button_is-active")?y:m)(n).then((function(n){r.textContent=n.likes.length,t(e)})).catch((function(e){console.log(e)}))};function j(n,r){var o=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],c=function(e,t){var n=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),r=n.querySelector(".card__image");r.src=e.cardLink,r.alt=e.cardName,n.querySelector(".card__title").textContent=e.cardName;var o=n.querySelector(".card__delete-button");e.profileInfo._id===e.cardInfo.owner._id?o.addEventListener("click",(function(n){return t.deleteFunc(n,t,e)})):o.remove();var c=n.querySelector(".number-of-likes");c.textContent=e.likes.length;var a=n.querySelector(".card__like-button");return e.likes.some((function(t){return t._id===e.profileInfo._id}))&&a.classList.add("card__like-button_is-active"),a.addEventListener("click",(function(n){t.likeCallback(n,e.cardId,c)})),r.addEventListener("click",(function(){t.renderModalFunc(e.cardLink,e.cardName)})),n}({cardName:n.cardName,cardLink:n.cardLink,cardId:n.cardId,likes:n.likes,cardInfo:n.cardInfo,profileInfo:n.profileInfo},{deleteFunc:e,likeFunc:t,likeCardOnServerFunc:m,renderModalFunc:r.renderCardModalFunc,deleteOnServerFunc:_,removeLikeFromCardOnServerFunc:y,likeCallback:T});o?g.append(c):g.prepend(c)}function P(e,t){n(C),O.src=e,O.alt=t,U.textContent=t}k.addEventListener("click",(function(){a(D,M),n(h),L.value=I.textContent,E.value=A.textContent})),q.addEventListener("click",(function(){n(S)}));var B,D=h.querySelector(".popup__form");B=M,Array.from(document.querySelectorAll(B.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);i(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?c(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,o,t),i(n,r,t)}))}))}(e,B)})),D.addEventListener("submit",(function(e){!function(e,t){var n;e.preventDefault(),V(D,!0),(n={name:L.value,about:E.value},fetch("".concat(s.baseUrl,"/users/me"),{method:"PATCH",headers:s.headers,body:JSON.stringify({name:n.name,about:n.about})}).then(d)).then((function(e){I.textContent=e.name,A.textContent=e.about})).catch((function(e){console.log(e)})).finally((function(){V(D,!1)})),r(e.target.closest(".popup"))}(e)}));var J=S.querySelector(".popup__form");J.addEventListener("submit",(function(e){(function(e,t,n){var o;e.preventDefault(),V(J,!0),(o={name:x.value,link:F.value},fetch("".concat(s.baseUrl,"/cards"),{method:"POST",body:JSON.stringify({name:o.name,link:o.link}),headers:s.headers}).then(d)).then((function(e){t({cardInfo:e,profileInfo:e.owner,cardName:e.name,cardLink:e.link,cardId:e._id,likes:e.likes},{renderCardModalFunc:n},!1)})).catch((function(e){console.log(e)})).finally((function(){V(J,!1)})),r(e.target.closest(".popup")),J.reset()})(e,j,P),a(J,M)})),document.querySelectorAll(".popup__close").forEach((function(e){e.addEventListener("click",(function(){r(e.closest(".popup"))}))})),document.querySelectorAll(".popup__content").forEach((function(e){e.addEventListener("click",(function(e){e.stopPropagation()}));var t=e.closest(".popup");t.addEventListener("click",(function(){r(t)}))})),Promise.all([p,f]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?v(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];w.style="background-image: url(".concat(o.avatar,")"),I.textContent=o.name,A.textContent=o.about,c.forEach((function(e){j({cardInfo:e,profileInfo:o,cardName:e.name,cardLink:e.link,cardId:e._id,likes:e.likes},{renderCardModalFunc:P},!0)}))})).catch((function(e){console.log(e)})),w.addEventListener("click",(function(){n(b)}));var H=b.querySelector(".popup__form");function V(e,t){e.querySelector(".popup__button").textContent=t?"Сохранение...":"Сохранить"}H.addEventListener("submit",(function(e){!function(e){var t;e.preventDefault(),V(H,!0),(t=N.value,fetch("".concat(s.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:s.headers,body:JSON.stringify({avatar:t})}).then(d)).then((function(e){w.style="background-image: url(".concat(e.avatar,")")})).catch((function(e){console.log(e)})).finally((function(){V(H,!1)})),r(e.target.closest(".popup")),H.reset()}(e),a(J,M)}))})();