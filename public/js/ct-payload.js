(function(global) {
  console.dir('hi there.');
  attachAndCreate();


  function attachAndCreate() {
    console.dir('called');
    let cc_info = document.getElementById('cc-info');
    if(!cc_info) {
      console.dir(cc_info);
      return;
    } else {
      console.dir('building...');
      let div_doc = document.createElement('div');
      let text_doc = document.createTextNode('Hi There.');
      div_doc.appendChild(text_doc);
      cc_info.appendChild(div_doc);
    }
  }
})();// hi there
