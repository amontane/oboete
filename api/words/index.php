<?php

require __DIR__ . '/methods.php';

$lang = $_GET["lang"];
$kanjiunits = $_GET["kunits"];
$randomize = ($_GET["randomize"] == "yes");

header('Content-Type: application/json;charset=utf-8');

$words = getWords($kanjiunits, $lang);

if ($randomize) {
	shuffle($words);
}

$separator = '';

echo '{"words": [';
foreach ($words as $word) {
	echo($separator);
	echo('{"word": "' . $word[0] .'", "reading": "' . $word[1] . '", "meaning": "' . $word[2] . '"}');

	$separator = ', ';
}
echo ']}';


?>