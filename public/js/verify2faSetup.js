$(document).ready(function() {
  // On page load, insert the QR code image from session storage
  const qrCodeDataUrl = sessionStorage.getItem('2faQRCodeDataUrl');
  if (qrCodeDataUrl) {
    $('#qrcode').html(`<img src='${qrCodeDataUrl}' alt='QR Code' class='img-fluid'>`);
  }

  $('#verify-2fa-form').on('submit', function(e) {
    e.preventDefault();
    const token = $('#token').val();

    $.ajax({
      url: '/2fa/enable',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ token }),
      success: () => {
        window.location.href = '/profile';
      },
      error: (jqXHR) => {
        $('#error-message').text(jqXHR.responseText || 'Error enabling 2FA. Please try again.').show();
      }
    });
  });
});
