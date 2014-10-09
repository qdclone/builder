var plugins = {
    define : require('../plugins/postprocessor/define.js'),
    roadmapPath : require('./roadmap.path.js')
};
module.exports = {
    urlPrefix : '',
    releasePrefix : '',
    project : {
        fileType : {
            text : 'handlebars, jade, ejs, jsx, styl, jtpl',
            image: 'psd'
        }
    },
    modules : {
        parser : {
            handlebars : 'handlebars',
            styl       : 'stylus',
            md         : 'marked',
            tmpl : 'utc',

            coffee : 'coffee-script',
            less : 'less',
            scss : 'compass',
            sass : 'compass',

            //.jade后缀的文件使用fis-parser-jade插件编译
            // https://github.com/visionmedia/jade/blob/master/Readme_zh-cn.md
            jade : 'jade',
            jtpl : 'jade-inline',

            psd : 'psd',

            tpl    : 'bdtmpl-chassis'
        },
        lint : {
            js: 'jshint'
        },
        postprocessor : {
            js : ['region', plugins.define, 'jswrapper', 'require-async'],
            html: ['region', 'require-async'],
            css: 'region',
        },
        optimizer : {
            html : 'html-minifier'
        },
        prepackager : [
            // plugins.frameworkConf
        ],
        postpackager : ['autoload', 'simple']
    },
    roadmap : {
        ext : {
            jsx : 'js',
            styl : 'css',
            tpl : 'js',
            less : 'css',
            scss : 'css',
            sass : 'css',
            coffee : 'js',
            jade : 'html',
            md: 'html',
            psd: 'png'
        },
        path : plugins.roadmapPath
    }
};


