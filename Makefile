build: index.js example.js
	@browserify example.js -d -v -o build.js

test: build
	@open example.html || xdg-open example.html
