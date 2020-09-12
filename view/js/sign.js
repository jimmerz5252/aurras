// Let's build the webpage.
$(document).ready(function(){


	// Set our variables here.
	function refreshContentContainer(){

		setTimeout(refreshContent, 100);

		function refreshContent() {
			

			// Random port.
			var IP = "127.0.0.1";
			var INGESTOR_PORT = 8765;
			var COMMANDOR_PORT = 8666;

			var connection = new WebSocket('ws://' + IP + ':' + INGESTOR_PORT );
			var connection_commandor = new WebSocket('ws://' + IP + ':' + COMMANDOR_PORT );

			connection.onopen = function(data){

					connection.onmessage = function (event) {
				  		
				  		var json = JSON.parse(event.data);
				  		
				  		if(json.value !== undefined){
				  			if( json.value[0] != undefined ){
				  				$('#title').html(json.value[0].title);
						  		$('#description').html(json.value[0].description);
						  		$('#image').css('background-image', "url(" + json.value[0].image.url + ")");
						  	}
				  		}
				}
			}

			connection_commandor.onopen = function(data){

					connection.onmessage = function (event) {

				  		// var json = JSON.parse(event.data);
				  		console.log(event.data);
				  		// if(json.value !== undefined){
			  			// 	$('#title').html(json.value[0].title);
					  	// 	$('#description').html(json.value[0].description);
					  	// 	$('#image').css('background-image', "url(" + json.value[0].image.url + ")");
				  		// }
				}
			}
		}
	}
	refreshContentContainer();
});