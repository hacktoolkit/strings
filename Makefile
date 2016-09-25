compile:
	grunt less && grunt cssmin
	browserify public/assets/js/src/app.js -o public/assets/js/bundle.js
	harp compile
	cp -R www/* .
