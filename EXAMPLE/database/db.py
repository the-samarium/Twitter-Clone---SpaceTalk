import sqlite3

import pandas as pd

conn = sqlite3.connect(r"C:\Studies\COLLEGE\SQLite\Chinook_Sqlite.sqlite")
cur = conn.cursor()
res = cur.execute("""
    SELECT * FROM Customer
    WHERE Email LIKE "%@gmail.com"
    ORDER BY FirstName ASC
    """)
# Fetch all rows and print each one
rows = res.fetchall()

# print as formated table using pandas
df = pd.DataFrame(rows, columns=[d[0] for d in cur.description])
print(df)
