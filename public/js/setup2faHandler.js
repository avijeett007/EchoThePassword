$(document).ready(function() {
  $('#setup-2fa-button').on('click', function() {
    $.get('/2fa/generate-secret', function(data) {
      // Store the QR code data in session storage to be used in the next page
      sessionStorage.setItem('2faQRCodeDataUrl', data.dataUrl);
      // Now redirect to the verification page
      window.location.href = '/profile/verify-2fa';
    }).fail(function(jqXHR, textStatus, errorThrown) {
      alert('Error fetching QR code: ' + textStatus + ' - ' + errorThrown);
    });
  });
});
