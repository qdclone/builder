{
    "name": "index demo",
    "description": "one header",
    "meta": {
        "viewport" : "width=device-width"
    },
    "createTime": 1412314935646,
    "layout" : "simple:layout.ejs",
    "body" : [
        {
            "name": "header",
            "version": "0.0.1",
            "import": "ssite-mange:header/index.html",
            "style": "background-color: red;",
            "data": {"bgColor": "#fff", "fontColor": "#000"}
        },
        {
            "name": "text-field",
            "version": "0.0.1",
            "import": "ssite-mange:/text-field/index.html",
            "style": "background-color: red;",
            "data": {"bgColor": "#fff", "fontColor": "#000", "content": "全部内容"}
        },
        {
            "name": "box",
            "children": [
                {
                    "name": "header",
                    "boxFlex": 1
                }
            ]
        }
    ]
}