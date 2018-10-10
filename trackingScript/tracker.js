(function(){
    var queryParams = window.location.href.split("?")[1];
    // This will allow cross domain GET request
    // More ways :- https://github.com/hueitan/javascript-sdk-design#request
    (new Image()).src = "http://www.our-domain.com/?"+queryParams;
})();
