(function($){
	$.fn.sprawdz = function(method, options){
		var settings = $.extend({
			'liczba': '8',
		}, options);
		var methods = {
			liczby : function() {
				$(this).keyup(function(){
					if (isNaN($(this).val())) {
						$(this).next().html("Wpisz liczbe.");
					} else {
							$(this).next().html("");
					}
					
				});
			}
		}
		
		return this.each(function(){
			if (methods[method]) {
				return methods[method].apply(this, 
					Array.prototype.slice.call(arguments, 1));
			} else {
				$.error('Method ' + method + ' does not exist in jquery.sprawdz');
			}

		});
	};

})(jQuery);
			

$(document).ready(function(){
	$("#send").html("send");
	
	$("#a").sprawdz('liczby');
	$("#b").sprawdz('liczby');
	$("#c").sprawdz('liczby');
	
	
	$("#send").click(function(){
		var a = $("#a").val();
		var b = $("#b").val();
		var c = $("#c").val();
		
		var sendInfo = '[{"a": '+ a +',	"b": ' + b + ',	"c": '+ c + '}]';
		var obj = $.parseJSON(sendInfo);
		var lang ='';
		$.each(obj, function() {
			lang += this['Lang'] + "<br/>";
		});
		$('span').html(lang);

		/*
		$.ajax({
			 type: "POST",
			 url: 'http://localhost:9000/calc',
			 async: false,
			 
			 dataType: "json",
			 success: function(data){
				//do your stuff with the JSON data
				 if (data) {
					alert("Twoje dane: "+ data);
					location.reload(true);
				 }
				 else {
					alert("Brak json");
				 }
			 },
			 data: sendInfo
		});*/
		/*var req = {
			a: 2.0,
			b: 4.0,
			c: 1.0
		};
		
		//$(this).next().html("");
		$.ajax({
			headers: {
		        "Content-Type": "application/json"			    },
			  url: 'http://localhost:9000/calc',
			  type: 'POST',
			  dataType: 'json',
			  crossDomain: true,
			  data: JSON.stringify(req),
			  complete: function(xhr, textStatus) {
			    alert('request sent: ' + a + ' ' + b + ' ' + c + ' ' + textStatus );    
			  },
			  success: function(data, textStatus, xhr) {
			    alert('success! ' + data);
			  },
			  error: function(xhr, textStatus, errorThrown) {
			    alert('error: ' + errorThrown );
			  }
		});
	}) */
	
	/*$('#send').live('click', function(){
        $.getJSON('json-data.php', function(data) {
            //alert(data); //uncomment this for debug
            //alert (data.item1+" "+data.item2+" "+data.item3); //further debug
            $('#showdata').html("<p>item1="+data.item1+" item2="+data.item2+" item3="+data.item3+"</p>");
        });
    });*/
	});
});
