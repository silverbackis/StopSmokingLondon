$(function(){
  $("#shareF").on("click", function(e)
  {
    e.preventDefault();
    FB.ui({
      method: 'share',
      href: 'https://www.stopsmokingportal.com/',
    }, function(response){});
  });

  $("#shareL").on("click", function(e)
  {
    e.preventDefault();
    window.open(this.href,'targetWindow', 'toolbar=no, location=no, status=no, menubar=no, resizable=no, width=520, height=570');
  });

  var clipboard = new Clipboard('#shareLink');
  (function(){
    var hideTimeout = null,
    clearHT = function(){
      if(hideTimeout)
      {
        clearTimeout(hideTimeout);
      }
    },
    timeToHide = 4000;
    clipboard.on('success', function(e) {
      //console.info('Action:', e.action);
      //console.info('Text:', e.text);
      //console.info('Trigger:', e.trigger);
      clearHT();
      $("#copyError").hide();
      $("#copySuccess").show();
      e.clearSelection();
      hideTimeout = setTimeout(function()
      {
        $("#copySuccess").hide();
        hideTimeout = null;
      }, timeToHide);
    });

    clipboard.on('error', function(e) {
      clearHT();
      document.getElementById('shareLink').select();
      $("#copySuccess").hide();
      $("#copyError").show();
      hideTimeout = setTimeout(function()
      {
        $("#copyError").hide();
        hideTimeout = null;
      }, timeToHide);
    });
  })();
  
});