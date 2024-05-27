var selectedKanjiUnits = "";
var selectedLanguage = "cat";
var wordData;

function loadWords() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       wordData = JSON.parse(xhttp.response);
	       hideLoader();
	       loadCards();
	    }
	};
	xhttp.open("GET", wordUrl(), true);
	xhttp.send();
}

function wordUrl() {
	var kunitQuery = "";
	if (selectedKanjiUnits != "") {
		kunitQuery = "&kunits=" + selectedKanjiUnits;
	}
	return "api/words/?lang=" + selectedLanguage + kunitQuery;
}

function showMenu() {

}

function hideMenu() {

}

function showLoader() {

}

function hideLoader() {

}

function loadCards() {

}

function documentReady() {
	showLoader();
	loadWords();
}
