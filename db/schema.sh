#!/bin/bash
_ENV="./.env"
_SQL_FILE="./db/schema.sql"

_DB_NAME='ecommerce_db'

create_env()
{
  _NAME=$1
  _USER=$2
  _PASS=$3
  echo "DB_NAME=$_NAME" > "$_ENV"
  echo "DB_USER=$_USER" >> "$_ENV"
  echo "DB_PW=$_PASS" >> "$_ENV"
}

echo "Lets setup your .env"
read -p "Username: " _USER
read -sp "Password: " _PASS
echo ""
create_env $_DB_NAME $_USER $_PASS

mysql -u $_USER -p$_PASS < $_SQL_FILE >/dev/null 2>&1

echo "Schema has been created!"
