
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
        reg : '**.tmpl',
        isHtmlLike : true,
        isJsonLike : true
    },
    
    {
        reg : /^\/(.*\.(?:tpl|jade|html))$/i,
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
    
    {
        reg : 'map.json',
        release : false
    },
    {
        reg : '**',
        useHash : false,
        useCompile : false/*,
        release: false*/
    }
];
