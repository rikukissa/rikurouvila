define (require) ->
  window.requestAnimFrame = ((callback) ->
      return window.requestAnimationFrame   || 
      window.webkitRequestAnimationFrame    || 
      window.mozRequestAnimationFrame       || 
      window.oRequestAnimationFrame         || 
      window.msRequestAnimationFrame        ||
      (callback) ->
          window.setTimeout callback, 1000 / 60
  )()
  $ = require('jquery')
  sprite  = require 'image!img/star.png'
  ctx     = null
  stars   = []
  height  = 0
  width   = $(window).width() / 10
  running = true

  colors = ['#3e80c2', '#47c5ee', '#ea5425', '#f8da3d']
  offset = 100
  followers = 15

  class Star
    constructor: (@follower = false) ->
      @alive = true
      
      @y = height - 16
      if not @follower
        @x = -16 + Math.random() * width
        @vel =
          x: -1 + Math.random() * 2
          y: -4 + -3 * Math.random()
      else
        @x = -10 + width/followers * stars.length
        @vel =
          x: 0
          y: -3 * Math.random()

    destroy: -> @alive = false

    render: ->
      ctx.drawImage sprite, @x, @y
      @x += @vel.x
      @y += @vel.y
      if @follower
        @vel.y += 1
      else
        @vel.y += 0.3

      @vel.y = -2 if @y > height - 10 and @follower

      @destroy() if @y > ctx.canvas.height

  tick = ->

    ctx.clearRect 0, 0, ctx.canvas.width, ctx.canvas.height
    stars.push new Star if running

    ctx.save()
    ctx.translate offset, 0

    for color, i in colors
      ctx.save()
      ctx.fillStyle = color
      ctx.fillRect Math.ceil(width/colors.length) * i, 0, Math.ceil(width/colors.length), height
      ctx.restore()

    for star, i in stars.slice(0)
      star.render() 
      stars.splice i, 1 if not star.alive

    ctx.restore()
    height += 3

    running = false if height > $(window).height()
    requestAnimFrame tick if stars.length > 0

  launch = ->
    stars = []
    running = true
    stars.push new Star true for i in [0..followers]
    tick()    

  init: ->
    ctx = document.getElementById('cnv').getContext '2d'
    $(window).on('resize', ->
      $(ctx.canvas).attr 
        'width': width + offset
        'height': $(window).height() 
      width = $(window).width() / 10
      launch() if !running

    ).resize()

    launch()


