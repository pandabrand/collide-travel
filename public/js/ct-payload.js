(function(global) {
  attachAndCreate();


  function attachAndCreate() {
    $.ajax({
      type: 'GET',
      url: 'https://collide-travel.herokuapp.com/cc-city/chicago',
      success: function(response) {
        console.dir(response);
        let div_doc = document.createElement('div');
        let text_doc = document.createTextNode('Hi There.');
        div_doc.appendChild(text_doc);
        cc_info.appendChild(div_doc);
      }
    });

    // let cc_info = document.getElementById('cc-info');
    // if(!cc_info) {
    //   return;
    // } else {
    //   let xhr = new XMLHttpRequest();
    //   xhr.open("GET", "https://collide-travel.herokuapp.com/api/cities/chicago", false);
    //   xhr.send();
    //
    //   console.dir(xhr.status);
    //   console.dir(xhr.statusText);
    // }
  }
})();// hi there
