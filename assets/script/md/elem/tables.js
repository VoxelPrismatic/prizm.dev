function styleTables() {
    for(var table of find(">table")) {
        for(var tbody of table.children) {
            for(var tr of tbody.children) {
                var ti = tr.children;
                var length = Math.floor(ti.length);
                var n = 0;
                for(var td of ti) {
                    td.classList.remove("tr-l");
                    td.classList.remove("tr-r");
                    if(n < ti.length / 2) {
                        td.classList.add("tr-l");
                    } else if(n > length) {
                        td.classList.add("tr-r");
                    }
                    n += 1;
                }
            }
        }
    }
}
