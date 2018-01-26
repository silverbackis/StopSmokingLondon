$(function(){
  var $faqsContainer = $('#faqs-container')
  var $text = $('#faq-btn-text')
  $('#faq-btn').on('click', function (e) {
    e.preventDefault()
    if ($faqsContainer.hasClass('d-none')) {
      $faqsContainer.removeClass('d-none')
      $text.text('Hide FAQs');
    } else {
      $faqsContainer.addClass('d-none')
      $text.text('Show FAQs');
    }
  });
});