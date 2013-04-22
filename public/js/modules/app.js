(function() {
  require.config({
    baseUrl: "js/modules",
    paths: {
      'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min',
      'image': '../vendor/image'
    }
  });

  define(function(require) {
    var $, stripes;

    $ = require('jquery');
    stripes = require('stripes');
    return {
      main: function() {
        var _gaq;

        _gaq = [["_setAccount", "UA-31648732-1"], ["_setDomainName", "rikurouvila.fi"], ["_trackPageview"]];
        (function() {
          var ga, s;

          ga = document.createElement("script");
          ga.type = "text/javascript";
          ga.async = true;
          ga.src = ("https:" === document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
          s = document.getElementsByTagName("script")[0];
          return s.parentNode.insertBefore(ga, s);
        })();
        return stripes.init();
      }
    };
  });

}).call(this);
