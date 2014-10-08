
var path = require('path');
var fs = require('fs');

var fis = require('./fis');
var fisOptions = {};

module.exports = Builder;

function Builder(options) {
	if (!(this instanceof Builder)) return new Builder(options);
	this.initialize(options);
}

Builder.prototype.initialize = function (options){
	var componentPath = options.componentPath || [];
	if (typeof componentPath != 'array') {
		componentPath = [componentPath];
	}
};


Builder.prototype.run = function (){
	fisOptions = {path: []};
	fis.run(fisOptions);
};

fis.project.getSource = function (){
    var root = fis.project.getProjectPath(),
        source = {},
        project_exclude = new RegExp(
            '^' + fis.util.escapeReg(root + '/') +
                '(?:output\\b|fis-[^\\/]+$)',
            'i'),
        include = fis.config.get('project.include'),
        exclude = fis.config.get('project.exclude');
    fis.util.find(root, null, project_exclude).forEach(function(file){
        file = fis.file(file);
        if(file.release && fis.util.filter(file.subpath, include, exclude)){
            source[file.subpath] = file;
        }
    });
    return source;
};
