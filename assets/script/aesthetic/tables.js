function styleTables() {
    for(var table of find(">table")) {
        for(var tbody of table.children) {
            for(var tr of tbody.children) {
                var ti = tr.children;
                var length = ti.length;
                var n = 0;
                for(var td of ti) {
                    td.classList.remove("tr-l");
                    td.classList.remove("tr-r");
                    td.classList.remove("tr-m");
                    if(n < ti.length / 2) {
                        td.classList.add("tr-l");
                    } else if(n > length) {
                        td.classList.add("tr-r");
                    } else {
                        td.classList.add("tr-m");
                    }
                    n += 1;
                }
            }
        }
    }
}
