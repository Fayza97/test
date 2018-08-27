$(function () {
    // GET/READ
    // $('#sub-button').on('click', );

    const loadData = function () {
        $.ajax({
            url: 'http://localhost:3000/categories',
            contentType: 'application/json',
            success: function (response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.forEach(function (el) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + el.id + '</td>\
                            <td><input type="text" class="name" value="' + el.name + '"></td>\
                            <td>\
                            <button id="update-button" class="btn btn-warning">Edit</button>\
                            <button id="delete-button" class="btn btn-danger">Delete</i></button>\
                            </td>\
                        </tr>\
                    ');
                });
            }
        });
    };
    // CREATE/POST
    $('.form').on('submit', function (event) {
        event.preventDefault();

        let nameInput = $('#name');

        $.ajax({
            url: 'http://localhost:3000/categories',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                name: nameInput.val(),
            }),
            success: function (response) {
                console.log(response);

                nameInput.val('');
                loadData();
                // $('#sub-button').click();
            }
        });
    });

    // UPDATE/PUT
    $('table').on('click', '#update-button', function () {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newName = rowEl.find('.name').val();
        console.log(newName);

        $.ajax({
            url: 'http://localhost:3000/categories/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                name: newName,
            }),
            success: function (response) {
                loadData();
                // $('#sub-button').click();
            }
        });
    });

    // DELETE
    $('table').on('click', '#delete-button', function () {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        console.log(rowEl.html);
        $.ajax({
            url: 'http://localhost:3000/categories/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            success: function (response) {
                console.log(response[0]);
                // $('#sub-button').click();
                loadData();
            }
        });
    });
    // $('#sub-button').click();
    loadData();
})