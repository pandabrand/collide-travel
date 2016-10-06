(function(global) {
  attachAndCreate();


  function attachAndCreate() {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.dir(this.responseText);
      }
    });

    xhr.open("GET", "https://collide-travel.herokuapp.com/cc-city/chicago");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
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
