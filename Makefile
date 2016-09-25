compile:
	grunt less && grunt cssmin
	browserify js/src/app.js -o js/bundle.js
