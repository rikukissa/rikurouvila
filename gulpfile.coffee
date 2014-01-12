gulp   = require 'gulp'
gutil  = require 'gulp-util'
jade   = require 'gulp-jade'
stylus = require 'gulp-stylus'
coffee = require 'gulp-coffee'

gulp.task "coffee", ->
  gulp
    .src('src/coffee/*.coffee')
    .pipe(coffee())
    .on('error', gutil.log)
    .pipe(gulp.dest('public/js'))

gulp.task "jade", ->
  gulp
    .src('src/jade/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('public/'))

gulp.task "stylus", ->
  gulp
    .src('src/stylus/*.styl')
    .pipe(stylus(compress: true))
    .on('error', gutil.log)
    .pipe(gulp.dest('public/css'))

gulp.task "server", ->
  nodeStatic = require('node-static')
  staticFiles = new nodeStatic.Server './public'
  require('http').createServer (req, res) ->
    req.addListener 'end', ->
      staticFiles.serve req, res
    req.resume()
  .listen 9001

gulp.task "watch", ->
  gulp.watch "src/coffee/*.coffee", ->
    gulp.run "coffee"

  gulp.watch "src/jade/*.jade", ->
    gulp.run "jade"

  gulp.watch "src/stylus/*.styl", ->
    gulp.run "stylus"

gulp.task "default", ->
  gulp.run "coffee", "jade", "stylus", "watch", "server"
