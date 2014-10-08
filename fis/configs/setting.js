
var jadeData = function(file){
    var datafile = file.dirname + '/' + file.filename + '.jdata';
    var fs = require('fs'), data = {};
    if (fs.existsSync(datafile)) {
        var content = fs.readFileSync(datafile, "utf8");
        data = (new Function('return '+content+';'))();
    }
    return data;
};

module.exports = {
    settings : {
        parser : {
            'coffee-script' : {
                //不用coffee-script包装作用域
                bare : true
            },
            jade: {
                pretty : true,
                //basedir : fis.project.getProjectPath()
                data : jadeData
            },
            'jade-inline' : {
                isInlineRuntime : true,
                data : jadeData
            }
        },
        postprocessor : {
            jswrapper : {
                type : 'amd'
            },
            region: {
                "remove-region": []
            }
        },
        spriter : {
            csssprites : {
                //csssprite处理时图片之间的边距，默认是3px
                margin : 20
            }
        },
        optimzier : {
            'png-compressor' : {
                //如果要兼容低版本ie显示透明png图片，请使用pngquant作为图片压缩器，
                //否则png图片透明部分在ie下会显示灰色背景
                'type' : 'pngquant'
            },
            //config fis-optimizer-uglify-js detail
            'uglify-js' : {
                output : {
                    max_line_len : 500
                }
            },
            //config fis-optimizer-clean-css detail
            'clean-css' : {
                keepBreaks : true
            }
        },
        postpackager : {
            simple: {
                autoCombine : true
            }
        }
    }
};
