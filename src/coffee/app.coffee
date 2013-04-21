require.config
  baseUrl: "js/modules"
  #paths: 
    #'jquery': 'https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min'
        
define (require) ->
  main: () ->
    
    # Google analytics
    _gaq = [
      ["_setAccount", "UA-31648732-1"], 
      ["_setDomainName", "rikurouvila.fi"], 
      ["_trackPageview"]
    ]

    (->
      ga = document.createElement("script")
      ga.type = "text/javascript"
      ga.async = true
      ga.src = ((if "https:" is document.location.protocol then "https://ssl" else "http://www")) + ".google-analytics.com/ga.js"
      s = document.getElementsByTagName("script")[0]
      s.parentNode.insertBefore ga, s
    )()