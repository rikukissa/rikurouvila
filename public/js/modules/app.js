(function() {
  require.config({
    baseUrl: "js/modules"
  });

  define(function(require) {
    return {
      main: function() {
        var _gaq;

        _gaq = [["_setAccount", "UA-31648732-1"], ["_setDomainName", "rikurouvila.fi"], ["_trackPageview"]];
        return (function() {
          var ga, s;

          ga = document.createElement("script");
          ga.type = "text/javascript";
          ga.async = true;
          ga.src = ("https:" === document.location.protocol ? "https://ssl" : "http://www") + ".google-analytics.com/ga.js";
          s = document.getElementsByTagName("script")[0];
          return s.parentNode.insertBefore(ga, s);
        })();
      }
    };
  });

}).call(this);
