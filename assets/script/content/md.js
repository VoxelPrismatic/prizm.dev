function loadPage() {
    textPage("md");
    find("content").appendChild(tag({
        "tag": "div",
        "class": "sect",
        "id": "markdown_interpreter",
        "<2>": {
            "tag": "h1",
            "#": "#] Try it out for yourself!",
            "id": "Tryitoutforyourself",
            "onclick": "linkMe(this)"
        },
        "<3>": {
            "tag": "div",
            "#": mark("any `key :^: val` things will take longer to properly display")
        },
        "<1>": {
            "tag": "div",
            "style": "text-align: center",
            "<1>": {
                "tag": "textarea",
                "placeholder": "Type anything in here! See the output below",
                "onkeyup": "interpret(this)"
            }
        }, 
        "<2>": {
            "tag": "div",
            "id": "markdown_output"
        }
    }));
}

function interpret(elem) {
    find('markdown_output').innerHTML = mark_page(elem.value);
    if(elem.value.includes(":^:")) {
        delayResizeDicts();
    }
    if(find("markdown_output").innerHTML.includes("<table>")) {
        styleTables();
    }
}
