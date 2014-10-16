var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	watch = require('gulp-watch');

gulp.task('css', function() {
	gulp.src('public/css/*.css')
		.pipe(livereload())
});
gulp.task('js', function() {
	gulp.src('public/javascripts/**/*.js')
		.pipe(livereload())
});


gulp.task('ejs', function() {
	gulp.src('views/**/*.ejs')
		.pipe(livereload())
});



gulp.task('develop', function() {

	// not a good way but gulp-nodemon sucks xD
	var nodemon = require('nodemon');
	nodemon({
		script: 'develop.js',
		ext: 'js json css ejs'
	});

	nodemon.on('start', function() {
		console.log('App has started');
	}).on('quit', function() {
		console.log('App has quit');
	}).on('restart', function(files) {
		console.log('App restarted due to: ', files);
	});

})

gulp.task('default', ['develop', 'css', 'js', 'ejs']);