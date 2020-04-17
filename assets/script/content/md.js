function loadPage() {
    textPage("md");
    find("content").appendChild(tag({
        "tag": "div",
        "class": "sect",
        "id": "markdown_interpreter",
        "<1>": {
            "tag": "div",
            "style": "text-align: center",
            "<1>": {
                "tag": "textarea",
                "placeholder": "Type anything in here! See the output below",
                "onkeyup": "find('markdown_output').innerHTML = mark_page(this.value)"
            }
        }, 
        "<2>": {
            "tag": "div",
            "id": "markdown_output"
        }
    }));
}
