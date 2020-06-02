/**
 * Triggered when the form is submitted
 */
$('#addItemForm').submit(function (e) {
    e.preventDefault(); // Disable browser's default form submission behaviour (don't refresh the page)
    const submittedData = $(this).serializeArray(); // Here's the raw data in the submitted form
    const newItem = addNewItem(submittedData); // Add a new item
    displayFeedbackAlert('Successfully added the item ', newItem.name);
});

/**
 * Add a new item into the local storage
 *
 * @param submittedData
 * @returns {{serialNb: null, name: null, url: null, value: null, quantity:null, delete:null}}
 */
function addNewItem(submittedData) {
    // Create an empty item object
    let newItem = {
        name: null,
        serialNb: null,
        value: null,
        quantity: null,
        url: null,
        delete: null,
    }
    // Iterate over the submitted data and assign the inputs' values to newItem object properties
    submittedData.map(input => {
        newItem[input.name] = input.value;
    });
    // Get the inventory from local storage
    let inventory = JSON.parse(localStorage.getItem('itemsInventory'));
    // If the inventory is null, initialise it with an empty object
    if (inventory === null) {
        inventory = {};
    }
    // Add the new item in the inventory
    inventory[newItem.name + newItem.serialNb] = newItem;
    // Set the inventory with the updated item
    localStorage.setItem('itemsInventory', JSON.stringify(inventory))

    return newItem;
}

/**
 * Display an alert to the user
 *
 * @param message
 * @param itemId
 */
function displayFeedbackAlert(message, itemId) {
    let existingFeedbackAlert = $('.alert.alert-success');
    // Check if there's an alert already displayed
    if (!existingFeedbackAlert.length) {
        // Add a new alert
        let feedbackItem = document.createElement('div');
        feedbackItem.className = 'alert alert-success';
        feedbackItem.innerHTML = message + itemId;
        $('.feedback').append(feedbackItem);
    } else {
        // Replace the content of the existing alert
        existingFeedbackAlert[0].innerHTML = message + itemId;
    }
}
