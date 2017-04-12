$(function(){
  $("tr[data-href]").css({ cursor: 'pointer' }).on("click", function(){
    window.location.href = $(this).attr('data-href');
  });
});