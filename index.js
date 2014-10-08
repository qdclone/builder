
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
	if (typeof paths != 'array') {
		paths = [paths];
	}
	this.paths = paths;
};


Builder.prototype.run = function() {
	//fisOptions = {paths: []};
	fisOptions.paths = this.paths || [];
	fis.run(fisOptions);
};

fis.project.getSource = function() {
	var root = fis.project.getProjectPath(),
		source = {},
		project_exclude = new RegExp(
			'^' + fis.util.escapeReg(root + '/') +
			'(?:output\\b|fis-[^\\/]+$)',
			'i'),
		include = fis.config.get('project.include'),
		exclude = fis.config.get('project.exclude'),
		rootSrc = root;
	
	//console.log('root' + ': ' + root);
	fis.util.find(root, null, project_exclude).forEach(function(file) {
		file = fis.file(file);
		file.root = root;
		if (file.release && fis.util.filter(file.subpath, include, exclude)) {
			source[file.subpath] = file;
		}
	});

	var paths = fisOptions.paths;
	for (var i = 0; i < paths.length; i++) {
		root = paths[i];
		//console.log('' + root);
		fis.project.setProjectRoot(path.dirname(root));
		fis.util.find(root, null, project_exclude).forEach(function(file) {
			file = fis.file(file);
			file.root = root;
			if (file.release && fis.util.filter(file.subpath, include, exclude)) {
				source[file.subpath] = file;
			}
		});
	}
	console.log(source);

	fis.project.setProjectRoot(rootSrc);
	return source;
};
