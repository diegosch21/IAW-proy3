	
	jQuery("#guardarCambios").click(function(){
		jQuery("#loadingAdmin").show();
		jQuery.ajax({
			type: "POST",
			url: "data/config.php",
			data: { mode_destacados: jQuery("[name=element_58]select option:selected").val(),mostrar_destacados: true,cant_destacados: jQuery("[name=element_59]select option:selected").val(), order: jQuery("[name=element_510]select option:selected").val(),mode_order: jQuery("[name=element_511]select option:selected").val(),paginado: jQuery("[name=element_512]select option:selected").val(),busqueda: "cd"}
		}).done(function( msg ) {
			dato=(eval('(' + msg + ')'));
			if (dato.error!=undefined){
				jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
				jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				}
			else{
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> Configuraci&oacute;n guardada");
				jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
			}
			jQuery("#loadingAdmin").hide();
		});
	//	location.reload();
	});

	jQuery("#Backup").click(function(){
		jQuery("#loadingAdmin").show();
		jQuery.getJSON('data/backup.php',function(data) {
			jQuery('#linkBackup').attr('href',data.file).show();
			jQuery("#loadingAdmin").hide();
		});
		
		//window.open("data/backup.php", '_blank');
	});
	
	jQuery.getJSON('data/config.php',function(data) {
		jQuery("[name=element_59]select option[value="+data.cant_destacados+"]").attr("selected", "selected");
		jQuery("[name=element_58]select option[value="+data.mode_destacados+"]").attr("selected", "selected");
		jQuery("[name=element_510]select option[value="+data.order+"]").attr("selected", "selected");
		jQuery("[name=element_511]select option[value="+data.mode+"]").attr("selected", "selected");
		jQuery("[name=element_512]select option[value="+data.paginado+"]").attr("selected", "selected");
	});	
	jQuery("#volverAlHomeC").button({
	   icons: {
	      primary: 'ui-icon ui-icon-circle-check',
	   }
	});
	jQuery("#guardarCambios").button({
	   icons: {
	      primary: 'ui-icon ui-icon-disk',
	   }
	});
	jQuery("#Backup").button({
	   icons: {
	      primary: 'ui-icon ui-icon-folder-collapsed',
	   }
	});
	jQuery("#break0").click(function(){

		if(jQuery("#li_7").css("display")=="none"){
			jQuery("#li_7").show("slow");

		}
		 else{
			jQuery("#li_7").hide("slow");
		}
	});
	jQuery("#break").click(function(){

		if(jQuery("#divBackup").css("display")=="none"){
			jQuery("#divBackup").show("slow");

		}
		 else{
			jQuery("#divBackup").hide("slow");
		}
	});