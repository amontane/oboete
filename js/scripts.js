var selectedKanjiUnits = "16,17,18,19,20";
var selectedLanguage = "cat";
var wordData;
var wordPointer = 0;

function loadWords() {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	       wordData = JSON.parse(xhttp.response);
	       updateButtons();
	       hideLoader();
	       loadCard(document.querySelectorAll('div.flip-card')[0]);
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

function updateButtons() {
	var prevVisibility = (wordPointer <= 0) ? "hidden" : "visible";
	var nextVisibility = (wordPointer >= wordData.words.length) ? "hidden" : "visible";
	document.getElementById("prev-btn").style.visibility = prevVisibility;
	document.getElementById("next-btn").style.visibility = nextVisibility;
}

function loadCard(object) { 
	flipCardIfNeeded(object);

	object.querySelectorAll('div.kanji')[0].innerHTML = wordData.words[wordPointer].word;
	object.querySelectorAll('div.reading')[0].innerHTML = wordData.words[wordPointer].reading;
	object.querySelectorAll('div.meaning')[0].innerHTML = wordData.words[wordPointer].meaning;
}

function flipCardIfNeeded(object) {
	if (object.classList.contains('flipped')) {
		var innerCard = object.firstElementChild;
		innerCard.classList.add("notransition");
		flipCard(object);
		innerCard.offsetHeight;
		innerCard.classList.remove("notransition");
	}	
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
	updateButtons();
	loadCard(document.querySelectorAll('div.flip-card')[0]);
}

function previousCard() {
	var fake = fakeCard("presented");
	wordPointer = wordPointer - 1;
	updateButtons();
	loadCard(fake);
}

function fakeCard(className) {
	var container = document.getElementById("card-container");
	var oldCard = container.firstElementChild;

	var callback = (className == "presented") ? destroyFakeAndLoad : destroyFake; 

	var fakeCard = document.createElement("div");
	fakeCard.innerHTML = oldCard.innerHTML;
	fakeCard.className = oldCard.className + " fake " + className;
	fakeCard.addEventListener("oanimationend", callback, false);
	fakeCard.addEventListener("webkitAnimationEnd", callback, false);
	fakeCard.addEventListener("animationend", callback, false);

	container.appendChild(fakeCard);

	return fakeCard
}

function destroyFake(element) {
	element.currentTarget.remove();
}

function destroyFakeAndLoad(element) {
	loadCard(document.querySelectorAll('div.flip-card')[0]);
	element.currentTarget.remove();
}

function documentReady() {
	showLoader();
	loadWords();
}
