//* update 2012-10-18 16:15:00 *//
var href = window.location.pathname.split('/');
var Units, units;

$(document).ready(function(){
	reloadIfBack();
	
	Units = Backbone.Collection.extend({
		url: '/units',
		initialize: function(){
			this.fetch({
							error: function(){
								error_fetch('Ошибка получения едениц измерения');
							}
						});
		},
		parse: function(response, xhr){		
			if(response && 'code' in response && response.code == 200 && 'data' in response) {
				return response.data;
			} else {
				error_fetch('Ошибка получения едениц измерения');
			}
		}
	});
	units = new Units;
	
	$('.del').click(function(){
		return confirm ("Вы действительно хотите удалить элемент?");
	});
	
	$('.create').toggle(function() {
		$('i', this).attr('class', 'icon-minus-sign');
		$(".forms .alert").remove();
		$('.name_add').val('');
		$('.forms').slideDown();
		$('.name_add').focus();
		return false;
	}, function() {
		$('i', this).attr('class', 'icon-plus-sign');
		$('.forms').slideUp();
		return false;
	});
	
	$('.datepicker').datepicker({"format": "yyyy-mm-dd"})
		.on('changeDate', function(ev){
			var href = window.location.pathname.split('/');
			if (href[href.length-1] == 'order')
				$('#link_to_date').attr( 'href', window.location.pathname+'/'+$('.datepicker').val() );
			else
				$('#link_to_date').attr( 'href', $('.datepicker').val() );
	});
	
	
	$(document).on("keypress", '.pass_add', function() {
		if ($('.pass_add').val().length > 0)
			$('.controls-pass .help-block a').slideDown();
		else
			$('.controls-pass .help-block a').slideUp();
	});
	
	$(document).on("focusout", '.pass_add', function() {
		if ($('.pass_add').val().length > 0)
			$('.controls-pass .help-block a').slideDown();
		else
			$('.controls-pass .help-block a').slideUp();
	});
	
	
	$('.showpass').toggle(function(){
		var pass = $('.pass_add').val();
		$('.pass_add').remove();
		$('.controls-pass').prepend(	'<input name="pass_add" value="'+pass+
										'" type="text" placeholder="Password" class="pass_add span2">');
		$('small', this).html('Скрыть пароль');
	}, function(){
		var pass = $('.pass_add').val();
		$('.pass_add').remove();
		$('.controls-pass').prepend(	'<input name="pass_add" value="'+pass+
										'" type="password" placeholder="Password" class="pass_add span2">');
		$('small', this).html('Показать пароль');
	});
});

function error_fetch(message) {
	$('.span12').append('<div class="alert"><button type="button" class="close" data-dismiss="alert">×</button>'+message+'</div>');
	$('#preloader').fadeOut('fast');
}
// Refrech page after back button
function reloadIfBack() {
	console.log('reloadifBack');
	
	if ($('#refreshed').val()=="no") {
		$('#refreshed').val("yes");
	} else {
		$('#refreshed').val("no");
		location.reload();
	}
}
