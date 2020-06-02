const jsonData = JSON.parse(localStorage.getItem('itemsInventory'));

// Displaying the data in the table
$.each(jsonData, function (key, item) {
    $('tbody').append(`<tr id="${item.name + item.serialNb}">
    <td class="Inventory_Name">${item.name}</td>
    <td class="Inventory_Serial">${item.serialNb}</td>
    <td class="multiplied">${item.value}$</td>
    <td class="multiplied">${item.quantity}</td>
    <td class="Url">
        <a href="${item.url}">
            <img id="itemImg" src="${item.url}" width="100px" alt="image for ${item.name}"/>
        </a>
    </td>
    <td class="Total" id="totalValue"></td>
    <td class="DeleteItem">
        <img src="./img/delete-icon.png" onclick="deleteItem(${item.name + item.serialNb})" style="cursor: pointer"/>
    </td>
  </tr>`);
});

// Multiply quantity and value to get the total value for each item
$('#inventoryTable tr:not(:first)').each(function () {
    let cells = $('td', this);
    $(cells[cells.length - 2]).text(parseInt(cells.eq(2).text()) * parseInt(cells.eq(3).text()) + "$");
});

/**
 * As soon as the script loads, compute the items count, total value and average value
 */
(function (items) {
    if (items.length) {
        let totalItemsValue = 0;
        $.each(items, function () {
            const itemValue = parseFloat($('#totalValue', this)[0].innerHTML.replace('$', ''));
            totalItemsValue += itemValue;
        });
        $('#itemsCount')[0].innerHTML = items.length;
        $('#itemsTotal')[0].innerHTML = totalItemsValue;
        $('#itemsAverage')[0].innerHTML = parseFloat(totalItemsValue) / parseInt(items.length);
    }
})($('#inventoryTable tr:not(:first)'));

// Delete all items
function deleteAllItems() {
    localStorage.clear();
    location.reload();
}

// Export to excel
function exportExcel() {
    let tableAsString = "<table border='2px'><tr>";
    const table = document.getElementById('inventoryTableBody'); // id of table

    let j;
    for (j = 0; j < table.rows.length; j++) {
        tableAsString = tableAsString + table.rows[j].innerHTML + "</tr>";
    }

    tableAsString = tableAsString + "</table>";
    tableAsString = tableAsString.replace(/<img id="itemImg"[^>]*>/gi, "image"); // replaces items images with their links
    tableAsString = tableAsString.replace(/<img[^>]*>/gi, ""); // removes any other image
    tableAsString = tableAsString.replace(/<td class="DeleteItem"[^>]*>/gi, ""); // removes last column value
    tableAsString = tableAsString.replace(/<input[^>]*>|<\/input>/gi, ""); // removes input params

    const saveFile = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tableAsString));

    return (saveFile);
}

/**
 * Delete an item from the table and the localStorage
 *
 * @param item
 */
function deleteItem(item) {
    displayFeedbackAlert('Successfully deleted the item with id ', item.id)
    item.remove();
    let updatedInventory = jsonData;
    delete updatedInventory[item.id];
    localStorage.setItem('itemsInventory', JSON.stringify(updatedInventory));
}
