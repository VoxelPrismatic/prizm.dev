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

var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzαβγ∆δεθλµπρΣφΩστχ∠√∫°ᴛ";
chars += "ᵀ¿¡`\ß~!@#$%^&|_…;:wuv₀₁₂₃₄₅₆₇₈₉↑↓ŜáÁàÀâÂäÄéÉèÈêÊëËíÍìÌîÎïÏóÓòÒôÔöÖúÚùÙ";
chars += "ûÛüÜñÑçÇṗ1234567890+-*/^(){}[]'ʳχʟŚ,.␣³√ˣ≠≥≤▫⁺•·⁻ʟẋȳṗ▯▯";

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
    letters[convert[letter]] = grabChar("big/kb/", letter);
    smols[convert[letter]] = grabChar("smol/kb/", letter);
}

typeable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890&><@\\`|:,)(.\"=!][#-$%+^?;'/}{*~_";

for(var letter of chars) {
    if(!typeable.includes(letter)) {
        letters[letter] = grabChar("big/uni/", letter.charCodeAt(0).toString(16).padStart(4, "0"));
        smols[letter] = grabChar("smol/uni/", letter.charCodeAt(0).toString(16).padStart(4, "0"));
    }
}
