$(function(){
  $(".search-type-toggle").on("click", function(e)
  {
    e.preventDefault();
    $(this).parents(".toggle-area").hide();
    $($(this).attr("data-toggle")).show();
  });
});