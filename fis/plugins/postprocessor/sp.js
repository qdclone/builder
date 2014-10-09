
module.exports = function(content, file, a,b){
    if (file.ext != '.sp') return content;

    var pageInfo = (new Function('return ' + content))();

    //console.log('----------'+file.subpath+'-----' + JSON.stringify(pageInfo));
    var bodyHtml = [], body = pageInfo.body;
    for (var i = 0; i < body.length; i++) {
        bodyHtml.push('');
    }

    pageInfo.bodyHtml = bodyHtml.join('\n');

    return content;
};

function makeComponent() {

}