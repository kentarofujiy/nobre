  var options = {
            onKeyPress: function(phone_with_ddd, e, field, options) {
                var masks = ['(00) 00000-0000', '(00) 0000-0000'];
                var mask = (phone_with_ddd.length < 11) ? masks[1] : masks[0];
                $('#telefone').mask(mask, options);
                $('#telefone2').mask(mask, options);
            }
        };

        $('#telefone').mask('(00) 00000-0000', options);
        $('#telefone2').mask('(00) 00000-0000', options);