var strErrorMsg;
var chkval = '';
console.log('hhh');
$("#user_detail_form").submit(function(e){
    console.log('submit');
    if(chkval == ''){
        validate_1();
        return false;
    }
});

function validate_1() {
    console.log('validate');
    strErrorMsg = "";
    notEmpty_2(document.getElementById('first-name'), 'Enter your first name');
    notEmpty_2(document.getElementById('Surname'), 'Enter your surname');
    notEmpty_2(document.getElementById('BirthdayDay'), 'Select your date of birth');
    notEmpty_2(document.getElementById('BirthdayMonth'), 'Select your month of birth');
    notEmpty_2(document.getElementById('BirthdayYear'), 'Select your year of birth');
    email(document.getElementById('email'), 'Enter your email address');
    notEmpty_2(document.getElementById('PhoneNumber'), 'Enter your house phone number');
    notEmpty_2(document.getElementById('Address'), 'Enter your Address');
    notEmpty_2(document.getElementById('Postcode'), 'Enter your postcode');


    if (strErrorMsg != '') {

        //send error to Google Tag Manager
        // dataLayer.push({
        //     'event': 'GAEvent',
        //     'eventCategory': 'form',
        //     'eventAction': 'submission error',
        //     'eventLabel': strErrorMsg,
        //     'eventValue': undefined
        // });

        alert(strErrorMsg);
        return false;
    }

    if (strErrorMsg == '') {
        var phone1 = document.getElementById('HouseNumber').value;
        if (phone1.indexOf('44') == 0)
            document.getElementById('HouseNumber').value = '0' + phone1.substring(2);
        else if (phone1.indexOf('044') == 0)
            document.getElementById('HouseNumber').value = '0' + phone1.substring(3);
        else if (phone1.indexOf('0044') == 0)
            document.getElementById('HouseNumber').value = '0' + phone1.substring(4);
        else if (phone1.indexOf('+44') == 0)
            document.getElementById('HouseNumber').value = '0' + phone1.substring(3);
        else if (phone1.indexOf('00') == 0)
            document.getElementById('HouseNumber').value = '0' + phone1.substring(2);
        jQuery.post('telephone_lookup.php', {
            phone1: phone1,
            pool: '454F13CA-8C71-40D6-9FEF-A88D821C99E4'
        }, function(data) {
            if (data.phone1 == 'INVALID') {

                //send error to Google Tag Manager
                dataLayer.push({
                    'event': 'GAEvent',
                    'eventCategory': 'form',
                    'eventAction': 'submission error',
                    'eventLabel': 'Both Main and Second phone numbers are invalid',
                    'eventValue': undefined
                });

                alert('The phone number is invalid.');
                return false;
            } else {
                var post_code = document.getElementById('Postcode').value;
                jQuery.post('postcode_lookup.php', {
                    postcode: post_code,
                    pool: '6C49BC44-C104-41b2-BB62-2AE45A09DD54'
                }, function(data) {
                    if (data.result == 'failed') {

                        //send error to Google Tag Manager
                        dataLayer.push({
                            'event': 'GAEvent',
                            'eventCategory': 'form',
                            'eventAction': 'submission error',
                            'eventLabel': 'Invalid Postcode',
                            'eventValue': undefined
                        });

                        alert('Invalid postal code.');

                        return false;

                    } else {
                        var address_listing = '';
                        jQuery.each(data.formattedAddress, function(k, v) {
                            address_listing += '<div class="form-group"><input type="radio" name="popup_address[]" class="popup_address" value="' + k + '">&nbsp;' + v + '</div>';
                        });

                        console.log(address_listing);
                        if (jQuery.trim(address_listing) != '')
                            jQuery('#get_trial_id .modal-body').html(address_listing);
                        jQuery.noConflict();
                        jQuery('.popup-with-form').magnificPopup({
                            titleSrc: 'Please select your address below',
                        });
                        jQuery('.hide_pop_show').trigger('click');
                        return false;
                    }
                });
            }
        });
        return false;
    }
    return false;
}

function notEmpty_2(elem, helperMsg) {
    if (elem.value == "")
        strErrorMsg = strErrorMsg + helperMsg + "\n";
}

function isAlphabet_2(elem, helperMsg) {
    var alphaExp = /^[a-zA-Z]+$/;
    if (!(elem.value.match(alphaExp)))
        strErrorMsg = strErrorMsg + helperMsg + "\n";
}

function numeric(elem, helperMsg) {
    var numcheck = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;;
    if (!(elem.value.match(numcheck)))
        strErrorMsg = strErrorMsg + helperMsg + "\n";
}

function email(elem, helperMsg) {
    var emailcheck = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
    if (!(elem.value.match(emailcheck)))
        strErrorMsg = strErrorMsg + helperMsg + "\n";
}
jQuery(document).ready(function() {
    jQuery(document).delegate(".popup_address", "click", function(ele) {
        chkval = jQuery(this).val();
        if (chkval !== '') {
            var result = chkval.split('_@_');
            var HouseNumber = '';
            if (typeof result[0] !== "undefined") {
                jQuery('input[name="HouseNumber"]').val(result[0]);
            }
            if (typeof result[1] !== "undefined") {
                jQuery('input[name="Address"]').val(result[1]);
            }
            console.log('pre submit');
            jQuery('.user_detail_form').submit();
        }
    });
});
