cd database
rm -f database.db
sqlite3 database.db < table.sql
sqlite3 database.db < populate.sql
cd ..