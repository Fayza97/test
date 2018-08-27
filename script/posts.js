$(function () {
    // GET/READ
    // $('#sub-button').on('click', );

    const loadData = function () {
        $.ajax({
            url: 'http://localhost:3000/posts',
            contentType: 'application/json',
            success: function (response) {
                var tbodyEl = $('tbody');

                console.log('asaaaasadasdasdasd')
                tbodyEl.html('');

                response.forEach(function (el) {
                    tbodyEl.append('\
                        <tr>\
                            <td class="id">' + el.id + '</td>\
                            <td><input type="text" class="userid" value="' + el.userid + '"></td>\
                            \
                            <td><input type="text" class="categoryid" value="' + el.categoryid + '"></td>\
                            \
                            <td><input type="text" class="title" value="' + el.title + '"></td>\
                            <td><input type="text" class="body" value="' + el.body + '"></td>\
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

        let ID = $('#id');
        let USERID = $('#userid');
        let CATEGORYID = $('#categoryid');
        let Title = $('#title');
        let Body = $('#body');

        $.ajax({
            url: 'http://localhost:3000/posts',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                userid: USERID.val(),
                categoryid: CATEGORYID.val(),
                title: Title.val(),
                body: Body.val(),

            }),
            success: function (response) {
                console.log(response);

                USERID.val('');
                CATEGORYID.val('');
                Title.val('');
                Body.val('');
                loadData();
                // $('#sub-button').click();
            }
        });
    });

    // UPDATE/PUT
    $('table').on('click', '#update-button', function () {
        var rowEl = $(this).closest('tr');
        var id = rowEl.find('.id').text();
        var newUser = rowEl.find('.userid').val();
        var newCategory = rowEl.find('.categoryid').val();
        var newTitle = rowEl.find('.title').val();
        var newBody = rowEl.find('.body').val();
        console.log(newTitle);
        console.log(newBody);

        $.ajax({
            url: 'http://localhost:3000/posts/' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({
                id: id,
                userid: newUser,
                categoryid: newCategory,
                title: newTitle,
                body: newBody

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
            url: 'http://localhost:3000/posts/' + id,
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