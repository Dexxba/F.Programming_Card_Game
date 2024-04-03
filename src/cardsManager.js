// Function for updating a card's information in localStorage and reflecting the changes in the DOM.
const editCard = (id, newQuestion, newAnswer) => {
    // Retrieve the existing array of cards from localStorage and parse it into a JavaScript object.
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    // Find the index of the card that matches the given id.
    const cardIndex = cards.findIndex(card => card.id === id);
    
    // Check if the card exists in the array (cardIndex is not -1).
    if (cardIndex !== -1) {
        // Update the question and answer of the targeted card.
        cards[cardIndex].question = newQuestion;
        cards[cardIndex].answer = newAnswer;
        // Save the updated array of cards back to localStorage.
        localStorage.setItem("cards", JSON.stringify(cards));

        // Find the corresponding card element in the DOM using its data-id attribute.
        const cardElement = document.querySelector(`[data-id="${id}"]`);
        // Select the elements within the card that display the question and answer texts.
        const questionTextElement = cardElement.querySelector('.card-question-text');
        const answerTextElement = cardElement.querySelector('.card-answer-text');
        
        // Update the DOM elements with the new question and answer if they exist.
        if (questionTextElement && answerTextElement) {
            questionTextElement.textContent = newQuestion;
            answerTextElement.textContent = newAnswer;
        }
    }
};

// Function for deleting a specific card from localStorage and removing its element from the DOM.
const deleteCard = (id) => {
    // Retrieve the current array of cards from localStorage.
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    // Filter out the card with the specified id.
    const newCards = cards.filter(card => card.id != id);

    // Update localStorage with the new array of cards.
    localStorage.setItem('cards', JSON.stringify(newCards));

    // Find and remove the card's element from the DOM.
    const cardElement = document.querySelector(`[data-id="${id}"]`);
    if(cardElement) cardElement.remove();
};

// Function for updating the rating of a specific card stored in localStorage.
const rateCard = (id, rating) => {
    // Load the existing array of cards from localStorage.
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    // Find the index of the card to be rated.
    const cardIndex = cards.findIndex(card => card.id == id);

    // If the card is found, update its rating.
    if (cardIndex !== -1) {
        cards[cardIndex].rating = rating;
        // Save the updated cards back to localStorage.
        localStorage.setItem('cards', JSON.stringify(cards));
    }
};

// Function to sort cards based on their ratings and update localStorage accordingly.
const sortCards = () => {
    // Retrieve and parse the current list of cards from localStorage.
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    // Define a mapping of rating values to sort priority.
    const ratings = { "excellent": 3, "good": 2, "bad": 1, "": 0 };
    
    // Sort the cards array using the defined ratings.
    cards.sort((a, b) => {
        return ratings[a.rating] - ratings[b.rating]; // Note: Changed to sort in descending order of rating
    });

    // Save the sorted array of cards back to localStorage.
    localStorage.setItem('cards', JSON.stringify(cards));

    // Dispatch a custom event to notify the application that the cards have been sorted.
    // This allows other parts of the application to refresh the UI accordingly.
    document.dispatchEvent(new CustomEvent('cardsSorted'));
};

// Export the functions to make them available for import in other parts of the application.
export { editCard, deleteCard, rateCard, sortCards };
