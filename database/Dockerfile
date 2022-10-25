FROM postgres

RUN sudo -u postgres psql -c "ALTER ROLE postgres WITH password '${DATABASE_PASSWORD}'"

RUN psql -U postgres -d  task -a -f create_tables.sql
