$(document).ready(function () {

    $('.popup-link').magnificPopup({
        type: 'inline',

        overflowY: 'auto',

        closeBtnInside: true,
        preloader: false,

        midClick: true,
        removalDelay: 300,
        mainClass: 'my-mfp-zoom-in'
    });

});