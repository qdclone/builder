
var path = require('path');
var fs = require('fs');

var fis = require('./fis');
var fisOptions = {};

module.exports = Builder;

function Builder(options) {
	if (!(this instanceof Builder)) return new Builder(options);
	this.initialize(options);
}

Builder.prototype.initialize = function(options) {
	var paths = options.paths || [];
	if (!Array.isArray(paths)) {
		paths = [paths];
	}
	this.paths = paths;
};


Builder.prototype.run = function(done) {
	//fisOptions = {paths: []};
	fisOptions.paths = this.paths || [];
	fisOptions.clean = 1;
	fisOptions.pack = 1;
	//fisOptions.verbose = 1;
	fis.run(fisOptions);
	
	fis.getFileRet(function(ret) {
		done && done(ret);
	});
};

fis.project.getSource = function() {
	var rootSrc, root = rootSrc = fis.project.getProjectPath(),
		source = {},
		project_exclude = new RegExp(
			'^' + fis.util.escapeReg(root + '/') +
			'(?:output\\b|fis-[^\\/]+$)',
			'i'),
		include = fis.config.get('project.include'),
		exclude = fis.config.get('project.exclude');

	var oldNamespace = fis.config.get('namespace') || '';
	readFile(root);

	var paths = fisOptions.paths, namespace = '';
	for (var i = 0; i < paths.length; i++) {
		root = paths[i];
		namespace = root.substr(path.dirname(root).length + 1);
		//console.log('namespace: ' + namespace + ' root:' + root);

		//fis.config.set('namespace', namespace);
		fis.project.setProjectRoot(path.dirname(root));
		
		readFile(root);
	}

	function readFile(root) {
		fis.util.find(root, null, project_exclude).forEach(function(file) {
			file = fis.file(file);
			file.root = root;
			if (file.release && fis.util.filter(file.subpath, include, exclude)) {
				source[file.subpath] = file;
			}
		});
	}

	//fis.config.set('namespace', oldNamespace);
	fis.project.setProjectRoot(rootSrc);
	return source;
};
