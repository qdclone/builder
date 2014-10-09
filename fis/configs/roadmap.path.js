
module.exports = [
    {
        reg : /\/(.*)\/\_(.*)$/,
        release : false
    },
    {
        reg : /\.inline\.\w+$/i,
        release : false
    },

    {
        //前端模板
        reg : '**.tmpl',
        //当做类js文件处理，可以识别__inline, __uri等资源定位标识
        isJsonLike : true,
        isHtmlLike : true,
        //只是内嵌，不用发布
        release : false
    },
    
    {
        reg : /^\/(.*\.(?:tpl|jade|html|ejs|sp))$/i,
        isHtmlLike : true,
        release : '/$1'
    },
    {
        reg : /^\/(.*)\.(styl|css|less|sass|scss)$/i,
        id : '$1.css',
        useSprite : true,
        release : '/$1.$2'
    },
    {
        reg : /^\/(.*\.js)$/i,
        id : '$1',
        isMod : true,
        release : '/$1'
    },
    
    // {
    //     reg : 'map.json',
    //     release : false
    // },
    {
        reg : '**',
        useHash : false,
        useCompile : false/*,
        release: false*/
    }
];
