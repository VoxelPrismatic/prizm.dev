import os
import datetime
year = datetime.datetime.now().year
print(year - 1, "-->", year)

for dr, dn, fn in os.walk("../.."):
    for f in fn:
        if f.endswith(".html"):
            print(dr + "/" + f)
            st = open(dr + "/" + f).read()
            st = st.replace("© PRIZ ;], " + str(year - 1), "© PRIZ ;], " + str(year))
            open(dr + "/" + f, "w").write(st)
