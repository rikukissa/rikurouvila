(function() {
  require.config({
    baseUrl: "js/modules",
    paths: {
      'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min'
    }
  });

  define(function(require) {
    return {
      main: function() {}
    };
  });

}).call(this);
