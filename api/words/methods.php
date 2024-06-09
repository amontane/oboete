<?php

require __DIR__ . '/../credentials.php';

function getWordsExtended($units, $language) {
    $link = new mysqli('localhost', $GLOBALS["OBOETE_mysql_user"], $GLOBALS["OBOETE_mysql_pass"], $GLOBALS["OBOETE_mysql_db"]) or die ('Die');
    mysqli_set_charset($link, "UTF8");

    $query = 'SELECT DISTINCT A.* FROM definition A, kanji_reference B WHERE (' . sqlFilterString($units) . ') AND INSTR(A.word, B.kanji) >= 1';
    $result = mysqli_query($link, $query);

    $table = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_NUM)) {

        $word = $row[0];
        $reading = $row[1];
        $meaning = $row[2];

        if ($language == "es" && isset($row[3])) {
            $meaning = $row[3];
        } else if ($language == "en" && isset($row[4])) {
            $meaning = $row[4];
        }
        
        $table[] = [$word, $reading, $meaning];
    }
    
    return $table;
}

function getWords($units, $language) {
    $link = new mysqli('localhost', $GLOBALS["OBOETE_mysql_user"], $GLOBALS["OBOETE_mysql_pass"], $GLOBALS["OBOETE_mysql_db"]) or die ('Die');
    mysqli_set_charset($link, "UTF8");

    $query = 'SELECT DISTINCT A.* FROM definition A, kanji_word_reference B WHERE (' . sqlFilterString($units) . ') AND A.word = B.word';
    $result = mysqli_query($link, $query);

    $table = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_NUM)) {

        $word = $row[0];
        $reading = $row[1];
        $meaning = $row[2];

        if ($language == "es" && isset($row[3])) {
            $meaning = $row[3];
        } else if ($language == "en" && isset($row[4])) {
            $meaning = $row[4];
        }
        
        $table[] = [$word, $reading, $meaning];
    }
    
    return $table;
}

function sqlFilterString($units) {
    if ($units == '') {
        return "1";
    }

    $unitArray = explode(',', $units);
    $unitString = '';
    $orString = '';
    foreach ($unitArray as $unit) {
        $unitString = $unitString . $orString . "B.unit = " . $unit;
        $orString = " OR ";
    }
    return $unitString;
}

?>