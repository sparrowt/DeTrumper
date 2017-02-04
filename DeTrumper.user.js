// ==UserScript==
// @name        DeTrumper
// @namespace   https://about.me/tomsparrow
// @description Browse BBC news Trump-free
// @include     *.bbc.co.uk/*
// @version     1.0
// @grant       none
// ==/UserScript==

(function ()
{
  window.setTimeout(deTrumpify, 100);
  window.setTimeout(deTrumpify, 500);
  window.setTimeout(deTrumpify, 1000);
  window.setInterval(deTrumpify, 2000);

  function deTrumpify() {
    console.log("deTrumpifying your page");
    var divs = document.getElementsByTagName('div');
    var lis = document.getElementsByTagName('li'); // handle popular videos side bar list
    var as = document.getElementsByTagName('a'); // handle Top Stories side bar links on an article
    handleElems(divs);
    handleElems(lis);
    handleElems(as);
  }
  
  function handleElems(elems) {
    for (var i = 0, len = elems.length; i < len; ++i) {
      handleElem(elems[i]);
    }
  }
  
  function handleElem(elem) {
    try {
      if (
        classMatches(elem, "top-story__wrapper") ||     // BBC home page
        classMatches(elem, "top-story") ||              // BBC home page
        classMatches(elem, "nw-c-top-stories__.*") ||   // BBC News home page
        classMatches(elem, "most-popular-list-item") || // BBC News top videos side bar
        classMatches(elem, "top-stories-promo-story")   // BBC News top stories side bar
         )
      {
        if (containsText(elem, "Trump")) {
          console.log("Hiding element with text: '" + getContainedText(elem) + "'");
          elem.style.display = 'none';
        }
      }
    } catch (e) {}
  }

  function containsText(element, txt) {
    var contents = getContainedText(element);
    return contents.length > 0 && (contents.indexOf(txt) != -1);
  }
  
  function getContainedText(elem) {
    if (typeof elem.textContent == 'string') {
      return elem.textContent;
    }
    if (typeof elem.innerText == 'string') {
      return elem.innerText;
    }
  }
  
  function classMatches(elem, cls) {
    var p = new RegExp("(^| )" + cls + "( |$)");
    return p.test(elem.className) ? true : false;
  }
})();