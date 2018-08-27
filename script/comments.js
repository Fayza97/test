$(function () {
    // GET/READ
    // $('#sub-button').on('click', );

    const loadData = function () {
        $.ajax({
            url: 'http://localhost:3000/comments',
            contentType: 'application/json',
            success: function (response) {
                var tbodyEl = $('tbody');

                tbodyEl.html('');

                response.forEach(function (el) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + el.id + '</td>\
                            <td><input type="text" class="comment" value="' + el.comment + '"></td>\
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

        let comment = $('#comment');

        $.ajax({
            url: 'http://localhost:3000/comments',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                comment: comment.val(),
            }),
            success: function (response) {
                console.log(response);

                comment.val('');
                loadData();
                // $('#sub-button').click();
            }
        });
    });

    // UPDATE/PUT
    $('table').on('click', '#update-button', function () {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var comment = rowEl.find('.comment').val();

        $.ajax({
            url: 'http://localhost:3000/comments/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                comment: comment,
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
            url: 'http://localhost:3000/comments/' + id,
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