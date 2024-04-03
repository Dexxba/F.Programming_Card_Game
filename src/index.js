// Importing necessary functions from other modules
import { createCard } from "./cards.js";
import { sortCards } from "./cardsManager.js";

// Adding an event listener to the 'Add Flashcard' button to display the modal
document.getElementById("addFlashcardButton").addEventListener('click', function() {
    document.getElementById("flashcardModal").style.display = "block";
});

// Adding an event listener to the close button inside the modal to hide the modal
document.querySelector(".close").addEventListener('click', function() {
    document.getElementById("flashcardModal").style.display = "none";
});

// Adding an event listener to the 'Save Flashcard' button inside the modal
document.getElementById("saveFlashcardButton").addEventListener('click', function() {
    // Retrieving the user input for the question and answer from the modal
    const questionInput = document.getElementById('modalQuestionInput').value;
    const answerInput = document.getElementById('modalAnswerInput').value;

    // Checking if both question and answer fields are filled
    if (questionInput && answerInput) {
        // Creating a new flashcard with the provided question and answer
        createCard(questionInput, answerInput); 
        // Hiding the modal after saving the flashcard
        document.getElementById('flashcardModal').style.display = 'none';
        // Resetting the input fields for question and answer in the modal
        document.getElementById('modalQuestionInput').value = '';
        document.getElementById('modalAnswerInput').value = '';
    } else {
        // Alerting the user if either the question or answer field is empty
        alert('Both question and answer fields must be filled!');
    }
});

// Adding an event listener to the 'Sort' button to sort the flashcards
document.getElementById("sortButton").addEventListener( 'click' ,()=> {
    sortCards(); // Calling the sortCards function from the cardsManager module
});
