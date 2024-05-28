var selectedKanjiUnits = "";
var selectedLanguage = "cat";
var wordData;
var wordPointer = 0;

function loadWords() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       wordData = JSON.parse(xhttp.response);
	       hideLoader();
	       loadCard(document);
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

function loadCard(object) {
	object.querySelectorAll('div[class="kanji"]')[0].innerHTML = wordData.words[wordPointer].word;
	object.querySelectorAll('div[class="reading"]')[0].innerHTML = wordData.words[wordPointer].reading;
	object.querySelectorAll('div[class="meaning"]')[0].innerHTML = wordData.words[wordPointer].meaning;
}

function flipCard(object) {
	if (object.classList.contains("flipped")) {
		object.classList.remove("flipped");
	} else {
		object.classList.add("flipped");
	}
}

function nextCard() {
	fakeCard("dismissed");
	wordPointer = wordPointer + 1;
	loadCard(document.querySelectorAll('div[class="flip-card"]')[0]);
}

function previousCard() {
	var fake = fakeCard("presented");
	wordPointer = wordPointer - 1;
	loadCard(fake);
}

function fakeCard(className) {
	var mainContainer = document.getElementById("main-body");
	var oldCard = mainContainer.firstElementChild;

	var callback = (className == "presented") ? destroyFakeAndLoad : destroyFake; 

	var fakeCard = document.createElement("div");
	fakeCard.innerHTML = oldCard.innerHTML;
	fakeCard.className = oldCard.className + " fake " + className;
	fakeCard.addEventListener("oanimationend", callback, false);
	fakeCard.addEventListener("webkitAnimationEnd", callback, false);
	fakeCard.addEventListener("animationend", callback, false);

	mainContainer.appendChild(fakeCard);

	return fakeCard
}

function destroyFake(element) {
	element.currentTarget.remove();
}

function destroyFakeAndLoad(element) {
	loadCard(document.querySelectorAll('div[class="flip-card"]')[0]);
	element.currentTarget.remove();
}

function documentReady() {
	showLoader();
	loadWords();
}
