$(document).ready(function(){

    $('form').on('submit', function(){
  
        var item = $('form input');
        var todo = {item: item.val()};

        $.ajax({
          type: 'POST',
          url: '/todo',
          data: todo,
          success: function(data){
            //do something with the data via front-end framework
          }
        });
        location.reload();
    });
  
    $('li').on('click', (e) => {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
          type: 'DELETE',
          url: '/todo/'+id,
          success: (res) => {
            //do something with the data via front-end framework
          },
          error: (err) => { throw err; }
        });
        location.reload();
    });
  
  });