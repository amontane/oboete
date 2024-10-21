var _literalMatrix = {};
_literalMatrix["cat"] = {};
_literalMatrix["es"] = {};
_literalMatrix["en"] = {};

_literalMatrix["cat"]["btn-k"] = "Unitat ";
_literalMatrix["cat"]["btn-m"] = "Unitat ";
_literalMatrix["cat"]["prev-btn"] = "Anterior";
_literalMatrix["cat"]["next-btn"] = "Seg&uuml;ent";
_literalMatrix["cat"]["sect-lang"] = "Idioma";
_literalMatrix["cat"]["sect-unit"] = "Basic Kanji Book";
_literalMatrix["cat"]["sect-minna"] = "Minna no nihongo";
_literalMatrix["cat"]["sect-order"] = "Ordre";
_literalMatrix["cat"]["btn-ofix"] = "Fixe";
_literalMatrix["cat"]["btn-orand"] = "Aleatori";

_literalMatrix["es"]["btn-k"] = "Unidad ";
_literalMatrix["es"]["btn-m"] = "Unidad ";
_literalMatrix["es"]["prev-btn"] = "Anterior";
_literalMatrix["es"]["next-btn"] = "Siguiente";
_literalMatrix["es"]["sect-lang"] = "Idioma";
_literalMatrix["es"]["sect-unit"] = "Basic Kanji Book";
_literalMatrix["es"]["sect-minna"] = "Minna no nihongo";
_literalMatrix["es"]["sect-order"] = "Orden";
_literalMatrix["es"]["btn-ofix"] = "Fijo";
_literalMatrix["es"]["btn-orand"] = "Aleatorio";

_literalMatrix["en"]["btn-k"] = "Unit ";
_literalMatrix["en"]["btn-m"] = "Unit ";
_literalMatrix["en"]["prev-btn"] = "Previous";
_literalMatrix["en"]["next-btn"] = "Next";
_literalMatrix["en"]["sect-lang"] = "Language";
_literalMatrix["en"]["sect-unit"] = "Basic Kanji Book";
_literalMatrix["en"]["sect-minna"] = "Minna no nihongo";
_literalMatrix["en"]["sect-order"] = "Order";
_literalMatrix["en"]["btn-ofix"] = "Fixed";
_literalMatrix["en"]["btn-orand"] = "Random";

function localize() {
	autoLocalizeIds([
		"prev-btn", 
		"next-btn", 
		"sect-lang", 
		"sect-unit", 
		"sect-minna", 
		"sect-order", 
		"btn-ofix", 
		"btn-orand"
	]);
	localizeKanjiUnits(1, 23);
	localizeMinnaUnits(1, 20);
}

function autoLocalizeIds(idArray) {
	var literals = _literalMatrix[selectedLanguage];
	idArray.forEach( function(value, i, arr) {
		document.getElementById(value).innerHTML = literals[value];
	});
}

function localizeKanjiUnits(first, last) {
	var literals = _literalMatrix[selectedLanguage];
	for (i = first; i <= last; i++) {
		document.getElementById("btn-k" + i).innerHTML = literals["btn-k"] + i;
	}
}

function localizeMinnaUnits(first, last) {
	var literals = _literalMatrix[selectedLanguage];
	for (i = first; i <= last; i++) {
		document.getElementById("btn-m" + i).innerHTML = literals["btn-m"] + i;
	}
}