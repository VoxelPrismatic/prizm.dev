async function loadPage() {
    await textPage("md");
    find("content").appendChild(tag({
        "tag": "div",
        "class": "sect",
        "id": "markdown_interpreter",
        "<0>": {
            "tag": "h1",
            "#": "#] Try it out for yourself!",
            "id": "Tryitoutforyourself",
            "onclick": "linkMe(this)"
        },
        "br0": 1,
        "<1>": {
            "tag": "div",
            "#0": "Note: any ",
            "<0>": {
                "tag": "codeline",
                "#": "key :^: val"
            },
            "#1": " things will take longer to properly display"
        },
        "<2>": {
            "tag": "div",
            "style": "text-align: center",
            "<1>": {
                "tag": "textarea",
                "placeholder": "Type anything in here! See the output below",
                "onkeyup": "interpret(this)",
                "style": "font-family: 'Ubuntu Mono'"
            }
        },
        "<3>": {
            "tag": "div",
            "id": "markdown_output"
        }
    }));
}

function interpret(elem) {
    find('markdown_output').innerHTML = mark_page(elem.value);
    sub_styles();
}
