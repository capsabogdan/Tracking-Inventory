$(document).ready(function () {
    $("#tableSearch").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

// getting data from local storage and displaying it in the Table

//getting the data from the Local Memory
var jsonData = JSON.parse(localStorage.getItem('itemsInventory'));

//Displaying the data in the table 
$.each(jsonData, function (key, item) {
    $('tbody').append(`
<tr>
  <td class="Inventory_Name">${item.name}</td>
  <td class="Inventory_Serial">${item.serialNb}</td>
  <td class="Value">${item.value}$</td>
  <td class="Quantity">${item.quantity}</td>
    <td class="Url">
        <a href="${item.url}">
            <img src="${item.url}" width="100px" alt="image for ${item.name}"/>
        </a>
    </td>
</tr>
`);
})
