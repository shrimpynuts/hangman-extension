
// Initial eventListener once page loads:
document.addEventListener("DOMContentLoaded", function() {
	var select_button = document.getElementById("select_button"); // Get select button
	select_button.addEventListener("click", generate_game); // Listen to select button
});

var tries = 10; // Number of tries
var word = ""

// Generate a game:
function generate_game() {
	tries = 10; 
	var category = document.getElementById("category").value; // Get selected category
	word = select_word(category); // Select word according to category
	var display = ("_\xa0\xa0\xa0").repeat(word.length); // Display _ for each letter
	display = display.substring(0, display.length -3); // Truncate end of string to remove extra space

	document.getElementById("word0").innerHTML = word; // Display word
	document.getElementById("word1").innerHTML = display; // Second display

	document.onkeypress = guess_letter;	// Begin reading keyboard input for letters
	document.getElementById("notif1").innerHTML = tries; // Display tries 

};

// Process guesses:
function guess_letter() {
    e = window.event; // Get keyboard input
	var charCode = (typeof e.which == "number") ? e.which : e.keyCode;

	// Process only letter inputs
    if (((charCode<123) && (charCode>96)) || ((charCode<91) && (charCode>64))) {
		var ltr = String.fromCharCode(charCode);

		// document.getElementById("notif0").innerHTML = ltr;

		tries --; // Decrease tries
		document.getElementById("notif1").innerHTML = tries; // Display tries

		if (tries <= 0) { // If tries get to 0, you lose the game
			document.getElementById("notif1").innerHTML = "You lost!";
		}

		// Check if letter is in the word
		flag = false
		for (i=0; i<word.length; i++) {
			if (ltr.toLowerCase() == word.charAt(i)){
				flag = true;
				display = document.getElementById("word1").innerHTML;
				display = display.substring(0, 10);
				// document.getElementById("notif0").innerHTML = i;
				// display = replaceAt(display, i*4, ltr.toLowerCase());
				document.getElementById("notif0").innerHTML = display
			}
			if (ltr.toUpperCase() == word.charAt(i)) {
				flag = true;
				display = document.getElementById("word1").innerHTML;
				// document.getElementById("notif0").innerHTML = i;
				// display = replaceAt(ltr.toUpperCase(), i, display);
				// document.getElementById("word1").innerHTML = display
			}
		}
		// if (flag == true) {
		// 	document.getElementById("notif0").innerHTML = "Got one: "+ ltr;
		// }
	}
};

// Replace _ with letter
// String.prototype.replaceAt = function(index, replacement) {
//     return this.substring(0, index) + replacement + this.substring(index + 1, this.length);
// }

// replace the 'n'th character of 's' with 't'
function replaceAt(s, n, t) {
    return s.substring(0, n) + t + s.substring(n + 1);
}

// Replace _ with letter
// function replaceAt(letter, index, displaystr) {
// 	return displaystr.substring(0, index) + letter + displaystr.substring(index+1, replacement.length);
// }

// Select the word based on the category:
function select_word(category) {
	if (category == "actors") {
		var word = "Actors";	
	}
	if (category == "movies") {
		var word = "Movies";	
	}
	if (category == "animals") {
		var word = "Animals";	
	}
	if (category == "brands") {
		var word = "Brands";	
	}
	if (category == "rappers") {
		var word = "Rappers";	
	}
	return word
}