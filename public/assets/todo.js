$(document).ready(function(){

    $('form').on('submit', function(){
  
        var item = $('form input');
        var todo = {item: item.val()};

        $.ajax({
          type: 'POST',
          url: '/todo',
          data: todo,
          success: function(data){
            location.reload();
          }
        });
    });
  
    $('li').on('click', (e) => {
        $target = $(e.target);
        const id = $target.attr('data-id');
        $.ajax({
          type: 'DELETE',
          url: '/todo/'+id,
          success: (res) => {
            location.reload();
          },
          error: (err) => { throw err; }
        });
    });
  
  });