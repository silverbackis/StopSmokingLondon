$(function(){
  $("tr[data-href]").css({ cursor: 'pointer' }).on("click", function(){
    window.location.href = $(this).attr('data-href');
  });

  $(".confirm-link").on("click", function(e){
    e.preventDefault();
    var conf = typeof $(this).attr("data-confirm")=='string' ? $(this).attr("data-confirm") : "Are you sure?";
    if(confirm(conf))
    {
      window.location.href = $(this).attr("href");
    }
  });
});