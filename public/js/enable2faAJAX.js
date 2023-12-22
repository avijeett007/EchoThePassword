$(document).ready(function() {
  $('#enable-2fa-form').on('submit', function(e) {
    e.preventDefault();
    const token = $('#token').val();
    const userId = $('#userId').val();

    $.ajax({
      url: '/2fa/enable',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ token, userId }),
      success: () => {
        window.location.href = '/profile';
      },
      error: (jqXHR) => {
        $('#enable-2fa-error').text(jqXHR.responseText || 'Error enabling 2FA. Please try again.').show();
      }
    });
  });
});