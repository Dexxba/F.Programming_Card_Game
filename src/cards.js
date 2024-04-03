// Import necessary functions from cardsManager.js for card manipulation
import { editCard, deleteCard, rateCard } from "./cardsManager.js";

// Function to create a card element with a given question, answer, and identifier
const createCardElement = (question, answer, id) => { 
    // Initialize a card element as a div and apply the 'card' class for styling
    const cardElement = document.createElement('div');
    cardElement.classList.add("card");  
    cardElement.setAttribute("data-id", id); // Assign a unique identifier to each card for reference

    // Create a container for edit and delete actions, styled as a flexbox for alignment
    const actionContainer = document.createElement('div');
    actionContainer.style.display = "flex";
    actionContainer.style.justifyContent = "space-between";
    cardElement.appendChild(actionContainer); // Append the container to the card element

    // Add an edit button that triggers a prompt to edit the question and answer
    const editButton = document.createElement('button');
    editButton.textContent = "Edit";
    editButton.classList.add("edit-button");
    editButton.addEventListener("click", () => {
        const newQuestion = prompt("Enter a new question:", question); // Prompt for a new question
        const newAnswer = prompt("Enter a new answer:", answer); // Prompt for a new answer

        // Update the card if changes were made
        if (newQuestion !== null && newAnswer !== null && (newQuestion !== question || newAnswer !== answer)) {
            editCard(id, newQuestion, newAnswer);
            loadCards(); // Reload cards to reflect changes
        }
    });
    actionContainer.appendChild(editButton); // Append edit button to the action container

    // Add a delete button that removes the card from storage
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button");
    deleteButton.addEventListener("click", () => {
        deleteCard(id); // Call deleteCard function with the card's id
    });
    actionContainer.appendChild(deleteButton); // Append delete button to the action container
    

    // Display the question part of the card
    const questionLabel = document.createElement('p');
    questionLabel.textContent = "Question:";
    cardElement.appendChild(questionLabel);
    
    // Add the actual question text to the card
    const questionText = document.createElement('p');
    questionText.className = "card-question-text";
    questionText.textContent = question;
    cardElement.appendChild(questionText);

    // Display the answer part of the card, hidden by default
    const answerLabel = document.createElement('p');
    answerLabel.textContent = "Answer:";
    answerLabel.style.display = "none"; // Initially hide the answer
    cardElement.appendChild(answerLabel);

    const answerText = document.createElement('p');
    answerText.className = "card-answer-text";
    answerText.textContent = answer;
    answerText.style.display = "none"; // Initially hide the answer
    cardElement.appendChild(answerText);

    // Include a selector for rating the answer's accuracy, hidden by default
    const ratingSelect = document.createElement('select');
    ratingSelect.classList.add("rating-select");
    ratingSelect.innerHTML = `
    <option value="">Rate your answer</option>
    <option value="bad" style="color: red;">Bad</option>
    <option value="good" style="color: #8da536;">Good</option>
    <option value="excellent" style="color: #0b7c07;">Excellent</option>
    `;
    ratingSelect.style.display = "none"; // Initially hide the rating selector
    ratingSelect.addEventListener("change", (e) => {
        const rating = e.target.value;
        rateCard(id, rating); // Update the card's rating based on user selection
    });
    cardElement.appendChild(ratingSelect);

    // Toggle visibility of answer and rating when the question is clicked
    questionText.addEventListener("click", () => {
        answerLabel.style.display = "block";
        answerText.style.display = "block";
        ratingSelect.style.display = "block";
    });

    return cardElement; // Return the fully constructed card element
};

// Function to append a card element to the DOM in a specified container
const addCardToDOM = (cardElement) => {
    const container = document.querySelector(".yourCardContainer");
    container.append(cardElement);
};

// Function to save a card object to local storage
const saveCardToStorage = (card) => { 
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    cards.push(card); // Add the new card to the array of cards
    localStorage.setItem("cards", JSON.stringify(cards)); // Save back to local storage
};

// Loads cards from local storage and displays them in the specified container
const loadCards = () => {
    const container = document.querySelector(".yourCardContainer");
    container.innerHTML = ''; // Clear the container before loading cards to avoid duplicates

    // Retrieve cards from local storage, parsing the JSON string back into an array
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    cards.forEach(card => {
        // For each card, create a card element and append it to the DOM
        const cardElement = createCardElement(card.question, card.answer, card.id);
        addCardToDOM(cardElement); // Utilize the function to append the card element
    });
};

// Listen for the DOMContentLoaded event to load cards as soon as the DOM is fully loaded
window.addEventListener("DOMContentLoaded", loadCards);

// Function to create a new card with a given question and answer
const createCard = (question, answer) => {
    const id = Date.now(); // Use the current timestamp as a unique identifier for the card
    const card = { question, answer, id }; // Construct a card object with the provided data

    // Create a card element for the new card and append it to the DOM
    const cardElement = createCardElement(question, answer, id);
    addCardToDOM(cardElement); // Utilize the function to append the newly created card element

    // Save the new card to local storage for persistence
    saveCardToStorage(card);
};

// Listen for a custom event 'cardsSorted' to reload cards when they are sorted
document.addEventListener('cardsSorted', loadCards);

// Export the createCard function to make it available for import in other modules
export { createCard };

