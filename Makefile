build:
	rm -rf dist
	./node_modules/.bin/webpack --output-filename=dist/react-input-suggest.js
	./node_modules/.bin/webpack --output-filename=dist/react-input-suggest.min.js --optimize-minimize
	# copy css file
	cp react-input-suggest.css ./dist/react-input-suggest.css
	# minify css file
	node_modules/.bin/cleancss -o ./dist/react-input-suggest.min.css react-input-suggest.css

	rm -rf lib
	./node_modules/.bin/babel src --out-dir lib --presets es2015,react

run-example:
	node ./example/server.js
