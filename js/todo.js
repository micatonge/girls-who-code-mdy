var todo = todo || {},
    data = JSON.parse(localStorage.getItem("todoData"));

data = data || {};

(function (todo, data, $) {
 

    todo.init = function () {
  

        $.each(data, function (index, params) {
          
        });

        
        $('#add-btn').click(function (e) {
          
        });
 

       
    };
 
    var removeElement = function (id) {
       
    };

    todo.add = function () {
        var todotext = $('#todo-text').val();
 
    };


})(todo, data, jQuery);

