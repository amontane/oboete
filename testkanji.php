<html>
<head>
<style>
	h3 {
		font-size: 22pt;
		text-decoration: underline;
	}

	p {
		font-size: 30pt;
	}
</style>
</head>
<body>


<!-- SELECT DISTINCT A.* FROM definition A, kanji_reference B WHERE (B.unit = 2 OR B.unit = 1) AND INSTR(A.word, B.kanji) >= 1 -->


<?php

require __DIR__ . 'api/credentials.php';

function kanjilist() { 
    $link = new mysqli('localhost', $GLOBALS["OBOETE_mysql_user"], $GLOBALS["OBOETE_mysql_pass"], $GLOBALS["OBOETE_mysql_db"]) or die ('Die, die, motherfucker');
 
    mysqli_set_charset($link, "UTF8");

    $query = "SELECT * FROM kanji_reference";
    $result = mysqli_query($link, $query);
		
	$table = array();
	while ($row = mysqli_fetch_array($result, MYSQLI_NUM)) {
		$unit = $row[1] - 1;
		if (!isset($table[$unit])) {
			$table[$unit] = array();
		}
		$table[$unit][] = $row[0];
	}

	return $table;
}

$list = kanjilist();

for ($i = 0; $i <= count($list); $i++) {
	if (count($list[$i]) == 0) {
		break;
	}
	echo ("<h3>Unitat " . ($i + 1) . "</h3>");
	echo ("<p>");
	foreach ($list[$i] as $kanji) {
		echo $kanji . "&nbsp;";
	}
	echo ("</p>");
}

?>
</body>
</html>