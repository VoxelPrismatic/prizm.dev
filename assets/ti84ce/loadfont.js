var letters = {};
var smols = {};

let root = "/prizm.dev/ti84ce/font/";

function grabChar(dir, letter) {
    var st = load(root + dir + letter + ".txt");
    var lt = ""
    for(var line of st) {
        var len = 0;
        for(var ch of line) {
            len += 1;
            lt += ch;
        }
        for(var x = len; x <= 10; x += 1)
            lt += " ";
        lt += "\n";
    }
    return lt;
}
 
let convert = {
    "and": "&",
    "angleclose": ">",
    "angleopen": "<",
    "at": "@",
    "backslash": "\\",
    "backtik": "`",
    "bar": "|",
    "colon": ":",
    "comma": ",",
    "curveclose": ")",
    "curveopen": "(",
    "dot": ".",
    "doubleq": '"',
    "equal": "=",
    "exmark": "!",
    "hardclose": "]",
    "hardopen": "[",
    "hash": "#",
    "minus": "-",
    "money": "$",
    "percent": "%",
    "plus": "+",
    "power": "^",
    "qmark": "?",
    "semicolon": ";",
    "singleq": "'",
    "slash": "/",
    "squiggleclose": "}",
    "squiggleopen": "{",
    "star": "*",
    "tilde": "~",
    "under": "_"
}

for(letter of "ABCDEFGHIJKLMNOPQRSTUVWXYZ") {
    letters[letter.toUpperCase()] = grabChar("big/caps/", letter);
    letters[letter.toLowerCase()] = grabChar("big/smol/", letter);
    smols[letter.toUpperCase()] = grabChar("smol/caps/", letter);
    smols[letter.toLowerCase()] = grabChar("smol/smol/", letter);
}

for(letter of "0123456789") {
    letters[letter] = grabChar("big/num/", letter);
    smols[letter] = grabChar("smol/num/", letter);
}

for(letter of convert.constructor.keys(convert)) {
    letters[convert[letter]] = grabChar("big/sym/", letter);
    smols[convert[letter]] = grabChar("smol/sym/", letter);
}
