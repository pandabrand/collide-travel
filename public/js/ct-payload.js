(function(global) {
  attachAndCreate();


  function attachAndCreate() {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://collide-travel.herokuapp.com/cc-city/chicago",
      "method": "GET",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "aff514f9-afd2-ba79-7979-87c6a57116dd"
      }
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
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
    //   let div_doc = document.createElement('div');
    //   let text_doc = document.createTextNode('Hi There.');
    //   div_doc.appendChild(text_doc);
    //   cc_info.appendChild(div_doc);
    // }
  }
})();// hi there
