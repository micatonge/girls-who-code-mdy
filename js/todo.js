var todo = todo || {},
    data = JSON.parse(localStorage.getItem("todoData"));

data = data || {};

(function (todo, data, $) {
    var markcomplete = function (id) {
        data[id].completed = true;
        localStorage.setItem("todoData", JSON.stringify(data));
        $('#item-' + id).empty();
  
        var completeHtml = '<s>' + data[id].description + '</s><button class="btn btn-default btn-xs pull-right  remove-item" data-id="' + id + '"><span class="glyphicon glyphicon-remove"></span></button> ' + '</div>';
         $('#item-' + id).html(completeHtml);

        $('.remove-item').click(function (e) {
            e.preventDefault();
            var id = $(this).data('id');
            removeElement(id);
        });
    };

    var search = function (input) {
        
    }

    todo.init = function () {
        $('.filter-btn').click(function (e) {

            e.preventDefault();
            $('.filter-btn.btn-primary').removeClass('btn-primary');

            $(this).addClass('btn-primary');
            $('.list-group').empty();

            var filter = $(this).data('val');
 
            if(filter=='all'){
                $.each(data, function (index, params) {

                    generateElement(params);
                });
            } else if (filter == 'completed')
            {
                $.each(data, function (index, params) {
                    if (!params.completed) {
                        generateElement(params);
                    }
                });
            } else if (filter == "active") {
                $.each(data, function (index, params) {
                    if (params.completed) {
                        generateElement(params);
                    }
                });
            }
        });

        $.each(data, function (index, params) {
            generateElement(params);
        });

        $('#add-btn').click(function (e) {
            e.preventDefault();
            todo.add();
        });

        $('.complete-check').change(function (e) {
            e.preventDefault();
            var id = $(this).data('id');
            markcomplete(id);
        });

        $('.remove-item').click(function (e) {
            e.preventDefault();
            var id = $(this).data('id');
            removeElement(id);
        });
    };

    var generateElement = function (params) {
        var parent = $('.list-group');

        if (!parent) {
            return;
        }
        if (!params.completed) {
            var template = '<li class="list-group-item" id="item-' + params.id + '"><div class="checkbox">' +

                  '<label class="float-right">' +
                    '<input type="checkbox" value="" data-id="' + params.id + '" class="complete-check">' +
                    params.description +
                 ' </label></div></li>';

        } else {
            var template = '<li class="list-group-item"  id="item-' + params.id + '"><s>' +
     params.description +
         '</s><button class="btn btn-default btn-xs pull-right  remove-item" data-id="' + params.id + '"><span class="glyphicon glyphicon-remove"></span></button> ' +

         '</div>';
        }
        $(template).appendTo(parent);

        $('.complete-check').change(function (e) {
            e.preventDefault();
            var id = $(this).data('id');
            markcomplete(id);
        });

        $('.remove-item').click(function (e) {
            e.preventDefault();
            var id = $(this).data('id');
            removeElement(id);
        });
    };


    var removeElement = function (id) {
        delete data[id];
        localStorage.setItem("todoData", JSON.stringify(data));
        $("#item-" + id).remove();
    };

    todo.add = function () {
        var todotext = $('#todo-text').val(),
            errorMessage = "Text cannot be empty";

        if (!todotext || todotext.length <= 4) {

            alert("Must be longer than 4 characters!");
            return;
        }


        id = new Date().getTime();

        var todoItem = {
            id: id,
            code: "1",
            date: id,
            description: todotext,
            completed: false
        };


        data[id] = todoItem;
        localStorage.setItem("todoData", JSON.stringify(data));


        generateElement(todoItem);
    };


})(todo, data, jQuery);

