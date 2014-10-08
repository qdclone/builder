var fs = require('fs'),
    path = require('path');

var fis = module.exports = require('fis');
var name = 'ppfe';
fis.require.prefixes = [ name, 'fis' ];
fis.cli.name = name;
//fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

var defaultConfig = require('./configs/default.js');
fis.config.merge(defaultConfig);

var defaultSetting = require('./configs/setting.js');
fis.config.merge(defaultSetting);

//alias
Object.defineProperty(global, name, {
    enumerable : true,
    writable : false,
    value : fis
});

function rootPath(){
    var root = path.resolve('.'), i = 0, num = 3;
    for (; i < num; i++) {
        if (fs.existsSync(root + '/package.json')) {
            break;
        }else {
            root = path.dirname(root);
        }
    }

    if (i == num) {
        root = '.';
    }

    return root;
}

// 设置自动刷新页面工具端口号
function livereloadAutoPort(cb){
    var portNext = 8140;
    function getPort (cb) {
        var net = require('net');
        var port = portNext;
        portNext += 1;
        
        var server = net.createServer();
        server.listen(port, function (err) {
            server.once('close', function () {
                cb(port);
            });
            server.close();
        });
        server.on('error', function (err) {
            getPort(cb);
        });
    }
    getPort(function(port){
        fis.config.set('livereload.port', port);
        cb();
    });
}

fis.run = function(argv){
    livereloadAutoPort(function(){
        fis.runLoad(argv);
    });
}

// 入口功能
fis.runLoad = function(argv){
    // 根据 package.json 文件位置定位root目录
    var root = rootPath();
    var info = fis.util.readJSON(root + '/package.json');

    var mode = argv[2];
    // 默认走dev
    if (argv.length < 3) {
        mode = 'dev';
    }
    
    var shortcut = info['fisShortcut'] || {};
    if (shortcut[mode]) {
        var newArgv = argv.slice(0,2);
        newArgv = newArgv.concat(shortcut[mode]);
        argv = newArgv;
        fis.mode = mode;
        if (root != '.') {
            argv.push('--root');
            argv.push(root);
        }
        console.log('\n开启 ' + mode + ' 模式：' + ' ' + argv.join(' '))
    }


    var rootResolve = path.resolve(root).split(path.sep),
        nowResolve = path.resolve('.').split(path.sep);
    if (rootResolve.length < nowResolve.length) {
        var includes = [];
        includes.push(nowResolve[rootResolve.length] + '/');

        var includeConf = info['fisInclude'];
        if (includeConf) {
            includes = includes.concat(includeConf.split('|'));
        }
        var includeReg = new RegExp('^\/('+includes.join('|')+'|([^/]*$))', 'i');
        fis.config.set('project.include', includeReg);
    }

    fis.cli.run(argv);
};