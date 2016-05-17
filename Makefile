build:
	rm -rf dist
	./node_modules/.bin/webpack --output-filename=dist/react-input-suggest.js
	./node_modules/.bin/webpack --output-filename=dist/react-input-suggest.min.js --optimize-minimize
	rm -rf lib
	./node_modules/.bin/babel src --out-dir lib

run-example:
	node ./example/server.js
