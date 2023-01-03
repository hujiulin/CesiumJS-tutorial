<?php
$mysql_server="IP";
$mysql_username="username";
$mysql_password="password";
$mysql_database="database";
$db=new mysqli($mysql_server,$mysql_username,$mysql_password,$mysql_database);
if(mysqli_connect_error()){
    echo 'Could not connect to database.';
    exit;
}
$sql = "select content from table where content like '%https://i.loli.net%'"; 
$result=$db->query($sql);
while($row=$result->fetch_row()) {
    print_r($row[0]);
}
mysql_close($con);