$(function(){

				// Tabs
				$('#tabs').tabs();
				
				// Accordion
				$("#accordion").accordion({ header: "h3" });
				

				$("#button").button({
					   icons: {
					      primary: 'ui-icon ui-icon-key',
					   }
					});
				$("#buttonSearch").button({
					   icons: {
					      primary: 'ui-icon ui-icon-search',
					   }
					});
				

				$('.bandaButton').each(function(index) {
					 $(this).button();
				});
/*


				// Dialog
				$('#dialog').dialog({
					autoOpen: false,
					width: 600,
					buttons: {
						"Ok": function() {
							$(this).dialog("close");
						},
						"Cancel": function() {
							$(this).dialog("close");
						}
					}
				});

				// Dialog Link
				$('#dialog_link').click(function(){
					$('#dialog').dialog('open');
					return false;
				});

				// Datepicker
				$('#datepicker').datepicker({
					inline: true
				});

				// Slider
				$('#slider').slider({
					range: true,
					values: [17, 67]
				});

				// Progressbar
				$("#progressbar").progressbar({
					value: 20
				});

				//hover states on the static widgets
				$('#dialog_link, ul#icons li').hover(
					function() { $(this).addClass('ui-state-hover'); },
					function() { $(this).removeClass('ui-state-hover'); }
				);
*/
			});