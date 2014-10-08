var fs = require('fs'),
    path = require('path');

var fis = module.exports = require('fis');
var name = 'ssite';
fis.require.prefixes = [ name, 'fis' ];
fis.cli.name = name;
//fis.cli.info = fis.util.readJSON(__dirname + '/package.json');

var defaultConfig = require('./configs/default.js');
fis.config.merge(defaultConfig);

var defaultSetting = require('./configs/setting.js');
fis.config.merge(defaultSetting);

/*
    .option('-d, --dest <names>', 'release output destination', String, 'preview')
    .option('-m, --md5 [level]', 'md5 release option', Number)
    .option('-D, --domains', 'add domain name', Boolean, false)
    .option('-l, --lint', 'with lint', Boolean, false)
    .option('-t, --test', 'with unit testing', Boolean, false)
    .option('-o, --optimize', 'with optimizing', Boolean, false)
    .option('-p, --pack', 'with package', Boolean, true)
    .option('-w, --watch', 'monitor the changes of project')
    .option('-L, --live', 'automatically reload your browser')
    .option('-c, --clean', 'clean compile cache', Boolean, false)
    .option('-r, --root <path>', 'set project root')
    .option('-f, --file <filename>', 'set fis-conf file')
    .option('-u, --unique', 'use unique compile caching', Boolean, false)
    .option('--verbose', 'enable verbose output', Boolean, false)
*/

fis.run = function(opts){
    var argv = ['node', '', 'release'];
    var opts2argv, i, key, value;

    if (!opts.root) {
        opts.root = path.resolve(__dirname + '/root');
    }
    if (!opts.output) {
        opts.output = path.resolve(__dirname + '/output');
    }
    if (!opts.file) {
        opts.file = path.resolve(__dirname + '/configs/null.js');
    }

    opts2argv = ['dest', 'md5', 'root', 'file'];
    for (i = 0; i < opts2argv.length; i++) {
        key = opts2argv[i], value = opts[key];
        if (value) {
            argv.push('--' + key);
            argv.push(value);
        }
    }
    opts2argv = ['domains', 'lint', 'test', 'optimize', 'pack', 'watch', 'live', 'clean', 'unique', 'verbose'];
    for (i = 0; i < opts2argv.length; i++) {
        key = opts2argv[i], value = opts[key];
        if (value) {
            argv.push('--' + key);
        }
    }


    livereloadAutoPort(function(){
        //fis.runLoad(argv);
        fis.cli.run(argv);
    });
}

var fisFileRetCallback = function(){};
fis.getFileRet = function(callback){
    fisFileRetCallback = callback;
};
var postpackager = fis.config.get('modules.postpackager');
postpackager.push(function (ret, conf, settings, opt) {
    //打包后处理
    // if (!opt.pack){
    //     return;
    // }

    fisFileRetCallback(ret, conf, settings, opt);
});
fis.config.set('modules.postpackager', postpackager);



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

// 入口功能
// fis.runLoad = function(argv){
//     // 根据 package.json 文件位置定位root目录
//     var root = rootPath();
//     var info = fis.util.readJSON(root + '/package.json');

//     var mode = argv[2];
//     // 默认走dev
//     if (argv.length < 3) {
//         mode = 'dev';
//     }
    
//     var shortcut = info['fisShortcut'] || {};
//     if (shortcut[mode]) {
//         var newArgv = argv.slice(0,2);
//         newArgv = newArgv.concat(shortcut[mode]);
//         argv = newArgv;
//         fis.mode = mode;
//         if (root != '.') {
//             argv.push('--root');
//             argv.push(root);
//         }
//         console.log('\n开启 ' + mode + ' 模式：' + ' ' + argv.join(' '))
//     }


//     var rootResolve = path.resolve(root).split(path.sep),
//         nowResolve = path.resolve('.').split(path.sep);
//     if (rootResolve.length < nowResolve.length) {
//         var includes = [];
//         includes.push(nowResolve[rootResolve.length] + '/');

//         var includeConf = info['fisInclude'];
//         if (includeConf) {
//             includes = includes.concat(includeConf.split('|'));
//         }
//         var includeReg = new RegExp('^\/('+includes.join('|')+'|([^/]*$))', 'i');
//         fis.config.set('project.include', includeReg);
//     }

//     fis.cli.run(argv);
// };
