<?php
$mysql_server="IP";
$mysql_username="username";
$mysql_password="password";
$mysql_database="database";
$con = mysql_connect($mysql_server,$mysql_username,$mysql_password) or die("Failed to connect MySQL");
mysql_select_db($mysql_database,$con);
mysql_query("set names 'GB2312'");

$sql = "select content from table where content like '%https://i.loli.net%'";
$result=mysql_query($sql);
while($row=mysql_fetch_row($result)) {
    $search = '/[\]]{1}[\(]{1}https:[\/]{2}[a-z]+[.]{1}[loli]+[.]{1}[a-z\d]*[\/]*[\s\S]+?[ |\)]{1}/';
    $matches = [];
    preg_match_all($search, $row[0], $matches, PREG_PATTERN_ORDER);

    for($i = 0; $i < count($matches); $i++) {
        for ($j = 0; $j < count($matches[$i]); $j++) {
            $url = substr($matches[$i][$j], 2, strlen($matches[$i][$j]) - 3);
            $save_path = ".".substr($url, strlen("https://i.loli.net"));
            if (!is_dir(dirname($save_path))) {
                mkdir(dirname($save_path), 0777, true);
            }
            echo $url."\tStart\r\n";
            
            ob_start();
            readfile($url);
            $img = ob_get_contents();
            ob_end_clean();
            file_put_contents($save_path, $img);

            echo $save_path."\tDone\r\n";
        }
    }
}
mysql_close($con);

