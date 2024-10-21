var selectedKanjiUnits = localStorage.getItem("kunits") ?? "";
var selectedMinnaUnits = localStorage.getItem("munits") ?? "";
var selectedLanguage = localStorage.getItem("lang") ?? "cat";
var selectedOrder = localStorage.getItem("order") ?? "fix";
var newSelectedLanguage = selectedLanguage;
var newSelectedOrder = selectedOrder;
var wordData;
var wordPointer = 0;
var totalKanjiUnits = 23;
var totalMinnaUnits = 20;

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
	var munitQuery = "";
	var randomizeQuery = "";
	if (selectedKanjiUnits != "") {
		kunitQuery = "&kunits=" + selectedKanjiUnits;
	}
	if (selectedMinnaUnits != "") {
		munitQuery = "&munits=" + selectedMinnaUnits;
	}
	if (selectedOrder == "rand") {
		randomizeQuery = "&randomize=yes";
	}
	return "api/words/?lang=" + selectedLanguage + randomizeQuery + kunitQuery + munitQuery;
}

function toggleMenu() {
	if (document.body.classList.contains("menu-out")) {
		document.body.classList.remove("menu-out");
		menuWasUpdated();
	} else {
		document.body.classList.add("menu-out");
		updateMenu();
	}
}

function updateMenu() {
	checkOrder(selectedOrder);
	checkLang(selectedLanguage);
	var unitArray = selectedKanjiUnits.split(",");
	for (var i = 1; i <= totalKanjiUnits; i++) {
		var button = document.getElementById("btn-k" + i);
		if (unitArray.includes("" + i)) {
			button.classList.add("pressed");
		} else {
			button.classList.remove("pressed");
		}
	}
	
	var unitArray = selectedMinnaUnits.split(",");
	for (var i = 1; i <= totalMinnaUnits; i++) {
		var button = document.getElementById("btn-m" + i);
		if (unitArray.includes("" + i)) {
			button.classList.add("pressed");
		} else {
			button.classList.remove("pressed");
		}
	}
}

function menuWasUpdated() {
	var newSelectedKanjiUnits = "";
	var newSelectedMinnaUnits = "";
	var separator = "";
	for (var i = 1; i <= totalKanjiUnits; i++) {
		if (document.getElementById("btn-k" + i).classList.contains("pressed")) {
			newSelectedKanjiUnits = newSelectedKanjiUnits + separator + i;
			separator = ",";
		}
	}

	separator = "";
	for (var i = 1; i <= totalMinnaUnits; i++) {
		if (document.getElementById("btn-m" + i).classList.contains("pressed")) {
			newSelectedMinnaUnits = newSelectedMinnaUnits + separator + i;
			separator = ",";
		}
	}

	if (selectedKanjiUnits != newSelectedKanjiUnits || selectedMinnaUnits != newSelectedMinnaUnits || selectedLanguage != newSelectedLanguage || selectedOrder != newSelectedOrder) {
		selectedKanjiUnits = newSelectedKanjiUnits;
		selectedMinnaUnits = newSelectedMinnaUnits;
		selectedLanguage = newSelectedLanguage;
		selectedOrder = newSelectedOrder;
		localStorage.setItem("kunits", selectedKanjiUnits);
		localStorage.setItem("munits", selectedMinnaUnits);
		localStorage.setItem("lang", selectedLanguage);
		localStorage.setItem("order", selectedOrder);
		wordPointer = 0;
		localize();
		loadWords();
	}
}

function showLoader() {

}

function hideLoader() {

}

function toggleUnit(button) {
	if (button.classList.contains("pressed")) {
		button.classList.remove("pressed");
	} else {
		button.classList.add("pressed");
	}
}

function checkLang(lang) {
	document.getElementById("btn-lcat").classList.remove("pressed");
	document.getElementById("btn-len").classList.remove("pressed");
	document.getElementById("btn-les").classList.remove("pressed");
	document.getElementById("btn-l" + lang).classList.add("pressed");
	newSelectedLanguage = lang;
}

function checkOrder(order) {
	document.getElementById("btn-ofix").classList.remove("pressed");
	document.getElementById("btn-orand").classList.remove("pressed");
	document.getElementById("btn-o" + order).classList.add("pressed");
	newSelectedOrder = order;
}

function updateButtons() {
	var prevVisibility = (wordPointer <= 0) ? "hidden" : "visible";
	var nextVisibility = (wordPointer >= wordData.words.length - 1) ? "hidden" : "visible";
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
	localize();
	loadWords();
}
