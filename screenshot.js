(function () {

  function mix(dest, src) {
    for (var n in src) {
      dest[ n ] = src[ n ];
    }
    return dest;
  }

  function screenshot(el, opts) {
    if (!el) return console.warn('"el" is required!');
    if (typeof el === 'string') el = document.querySelector(el);
    var imageWidth = el.offsetWidth;
    var imageHeight = el.offsetHeight;
    var config = {
      allowTaint: false,
      foreignObjectRendering: false,
      width: imageWidth,
      height: imageHeight,
      logging: true,
      useCORS: true
    };
    return html2canvas(el, mix(config, opts || {})).then(function (canvas) {
      console.log('[screenshot] done!');
      var isIE = typeof window.ScriptEngineMajorVersion !== 'undefined';
      var doc = top.document;
      var wrap = doc.createElement('div');
      wrap.style.cssText = 'position:fixed;z-index:9999;top:0;left:0;width:100%;height:100%;overflow:auto;background-color:rgba(0,0,0,.7);text-align:center;';
      doc.body.appendChild(wrap);
      wrap.appendChild(canvas);
      wrap.onclick = function () {
        doc.body.removeChild(wrap);
      };
      return canvas;
    });
  }

  window.screenshot = screenshot;
})();