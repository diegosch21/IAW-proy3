jQuery.getJSON('data/categorias.php?',function(data) {
					for(i=0;i<data.length;i++){
					jQuery('#generoList').append("<option value='"+data[i].genero+"' >"+data[i].genero+"</option>");
					jQuery('#generoListEdir').append("<option value='"+data[i].genero+"' >"+data[i].genero+"</option>");
					jQuery('#generoListAddcd').append("<option value='"+data[i].genero+"' >"+data[i].genero+"</option>");
					jQuery('#generoListEditcd').append("<option value='"+data[i].genero+"' >"+data[i].genero+"</option>");
					}
				});	
				jQuery('[name=element_7]').change(function () {
					if(jQuery("[name=element_7]select option:selected").val()=="nuevo"){
							jQuery("#li_88").show("slow");
						}
						else{
							jQuery("#li_88").hide("slow");
						}
					jQuery('#divDatos').show("slow");
				});	
				jQuery('[name=element_7_edit]').change(function () {
					jQuery('#artistListEdir').html("<option value='' selected='selected'></option>");
					jQuery('#li_9').show("slow");
					jQuery('#li_10').hide("slow");
					jQuery.getJSON('data/categorias.php?',function(data) {
						for(i=0;i<data.length;i++){
							if(data[i].genero==jQuery("[name=element_7_edit]select option:selected").val()){
								for(j=0;j<data[i].artistas.length;j++)
									jQuery('#artistListEdir').append("<option value='"+data[i].artistas[j].id+"' >"+data[i].artistas[j].artista+"</option>");
							}
						
						}
					});
				});				
				jQuery('[name=element_8_edit]').change(function () {
					//jQuery('#artistListEdir').html("<option value='' selected='selected'></option>");
					jQuery('#li_10').show("slow");
					jQuery.getJSON('data/artist.php?id='+jQuery("[name=element_8_edit]select option:selected").val(),function(data) {	
						jQuery('#element_101').val(data.artista);
						jQuery('#element_102').val(data.genero);
						jQuery('#element_103').val(data.nacionalidad);
						jQuery('#element_104').val(data.banda);
						jQuery('#element_105').val(data.link);
						jQuery('#imagenescargadas').html("");
						for(i=0;i<data.imagenes.length;i++){
							jQuery('#imagenescargadas').append("<div id='img"+i+"'><a class='tag2'>"+data.imagenes[i].url+"</a><a style='cursor: pointer' onClick='quitarImg("+i+");'>Quitar</a></div>");
						}
					//	jQuery('#img_borrar').val("");
					});
				});
				function quitarImg(i) {
					jQuery('#img'+i).hide();
				//	jQuery('#cantimg').val(jQuery('#cantimg').val()-1);
				}
				jQuery('[name=element_11_edit]').change(function () {
					jQuery('#artistListAddcd').html("<option value='' selected='selected'></option>");
					jQuery('#li_14').show("slow");
					jQuery.getJSON('data/categorias.php?',function(data) {
						for(i=0;i<data.length;i++){
							if(data[i].genero==jQuery("[name=element_11_edit]select option:selected").val()){
								for(j=0;j<data[i].artistas.length;j++)
									jQuery('#artistListAddcd').append("<option value='"+data[i].artistas[j].id+"' >"+data[i].artistas[j].artista+"</option>");
							}
						
						}
					});
				});
				jQuery('[name=element_12_edit]').change(function () {
					//jQuery('#artistListEdir').html("<option value='' selected='selected'></option>");
					jQuery('#li_15').show("slow");

					});
				jQuery('[name=element_13_edit]').change(function () {
					jQuery('#li_18').hide("slow");
					jQuery('#li_19').hide("slow");
					jQuery('#cdListEditcd').html("<option value='' selected='selected'></option>");
					jQuery('#artistListEditcd').html("<option value='' selected='selected'></option>");
					jQuery('#li_17').show("slow");
					jQuery.getJSON('data/categorias.php?',function(data) {
						for(i=0;i<data.length;i++){
							if(data[i].genero==jQuery("[name=element_13_edit]select option:selected").val()){
								for(j=0;j<data[i].artistas.length;j++)
									jQuery('#artistListEditcd').append("<option value='"+data[i].artistas[j].id+"' >"+data[i].artistas[j].artista+"</option>");
							}
						
						}
					});
				});	
				jQuery('[name=element_14_edit]').change(function () {	
					jQuery('#li_19').hide("slow");
					jQuery('#cdListEditcd').html("<option value='' selected='selected'></option>");
					jQuery('#li_18').show("slow");
					jQuery.getJSON('data/cds.php?ar='+jQuery("[name=element_14_edit]select option:selected").val(),function(data) {
						for(i=0;i<data.CDs.length;i++){
							jQuery('#cdListEditcd').append("<option value='"+data.CDs[i].id+"' >"+data.CDs[i].nombre+"</option>");
						}						
					});
				});	
				jQuery('[name=element_15_edit]').change(function () {					
						jQuery('#li_19').show("slow");
						jQuery.getJSON('data/cd.php?id='+jQuery("[name=element_15_edit]select option:selected").val(),function(data) {	
						jQuery('#element_301').val(data.nombre);
						jQuery('#element_303').val(data.anio);
						jQuery('#element_304').val(data.canciones);
						jQuery('#element_305').val(data.link);
					});
				});


		
		
		jQuery("#imageArtistSubmitupload").click(function(){

			clas = 'artista'; idArt = jQuery("[name=element_8_edit]select option:selected").val();
			jQuery.ajaxFileUpload
			(
				{
					url:'data/upload_img.php?id='+idArt+'&class='+clas,
					secureuri:false,
					fileElementId:'fileToUpload',
					data: { file:jQuery("#fileToUpload").val() },
					dataType: 'file',
					beforeSend:function()
					{
						jQuery("#loadingImg").show();
					},
					complete:function()
					{
						jQuery("#loadingImg").hide();
					},				
					success: function (data, status)
					{
						if(typeof(data.error) != 'undefined')
						{
							if(data.error != '')
							{
								alert(data.error);
							}else
							{
								alert(data.msg);
							}
						}
					},
					error: function (data, status, e)
					{
						alert(e);
					}
				}
			)
		});
		
		jQuery("#imageArtistSubmitURL").click(function(){
			jQuery.ajax({
				type: "POST",
				url: "data/add_img.php",
				data: { class: 'artista', id:jQuery("[name=element_8_edit]select option:selected").val(), url:jQuery("#element_112").val() }
				}).done(function( msg ) {
				alert( "Data Saved: " + msg );
			});
			location.reload();
		});
		
		jQuery("#addArtistSubmin").click(function(){

			if (jQuery("[name=element_7]select option:selected").val()=="nuevo")
				_genero = jQuery("#textNuevoGenero").val();
			else
				_genero = jQuery("[name=element_7]select option:selected").val();
			jQuery.ajax({
				type: "POST",
				url: "data/add_artist.php",
				data: { genero: _genero, nombre: jQuery("#element_2").val(),nacion: jQuery("#element_5").val(), banda: jQuery("#element_4").val(),link: jQuery("#element_3").val() }
				}).done(function( msg ) {
				dato=(eval('(' + msg + ')'));
				if (dato.error!=undefined){
					jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
					jQuery("#cartelError").fadeIn().delay(2000).fadeOut('slow'); 
					}
				else{
					jQuery("#mensajeAviso").html("<strong>Exito: </strong> El artista <strong>"+dato.artista.artista+"</strong> fue creado correctamente</p>");
					jQuery("#cartelAviso").fadeIn().delay(2000).fadeOut('slow'); 
				}
				
			});
		//	location.reload();
		});
		
		jQuery("#editArtistSubmit").click(function(){
		//	borrarImg = 
			jQuery.ajax({
				type: "POST",
				url: "data/edit_artist.php",
				data: { id:jQuery("[name=element_8_edit]select option:selected").val(), genero: jQuery("#element_102").val(), nombre: jQuery("#element_101").val(),nacion: jQuery("#element_103").val(), banda: jQuery("#element_104").val(),link: jQuery("#element_105").val() }
				}).done(function( msg ) {
				dato=(eval('(' + msg + ')'));
				if (dato.error!=undefined){
					jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
					jQuery("#cartelError").fadeIn().delay(2000).fadeOut('slow'); 
					}
				else{
					jQuery("#mensajeAviso").html("<strong>Exito: </strong> El artista <strong>"+dato.artista+"</strong> fue editado correctamente</p>");
					jQuery("#cartelAviso").fadeIn().delay(2000).fadeOut('slow'); 
				}
			});
		//	location.reload();
		});
		jQuery("#editCDSubmit").click(function(){
			jQuery.ajax({
				type: "POST",
				url: "data/edit_cd.php",
				data: { id:jQuery("[name=element_15_edit]select option:selected").val(),id_ar:jQuery("[name=element_14_edit]select option:selected").val(), genero: jQuery("[name=element_13_edit]select option:selected").val(), nombre: jQuery("#element_301").val(),anio: jQuery("#element_303").val(), canc: jQuery("#element_404").val(),link: jQuery("#element_405").val() }
				}).done(function( msg ) {
				dato=(eval('(' + msg + ')'));
				if (dato.error!=undefined){
					jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
					jQuery("#cartelError").fadeIn().delay(2000).fadeOut('slow'); 
					}
				else{
					jQuery("#mensajeAviso").html("<strong>Exito: </strong> El CD <strong>"+dato.nombre+"</strong> de "+dato.artista+" fue editado correctamente</p>");
					jQuery("#cartelAviso").fadeIn().delay(2000).fadeOut('slow'); 
				}
			});
		//	location.reload();
		});
		jQuery("#addCDSubmit").click(function(){
			jQuery.ajax({
				type: "POST",
				url: "data/add_cd.php",
				data: { id_ar: jQuery("[name=element_12_edit]select option:selected").val(), nombre: jQuery("#element_200").val(), anio: jQuery("#element_201").val(), canc: jQuery("#element_204").val(), link: jQuery("#element_205").val()  }
				}).done(function( msg ) {
				dato=(eval('(' + msg + ')'));
				if (dato.error!=undefined){
					jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
					jQuery("#cartelError").fadeIn().delay(2000).fadeOut('slow'); 
					}
				else{
				alert(msg);
					jQuery("#mensajeAviso").html("<strong>Exito: </strong> El CD <strong>"+dato.cd.nombre+"</strong> de "+dato.cd.artista+" fue creado correctamente</p>");
					jQuery("#cartelAviso").fadeIn().delay(2000).fadeOut('slow'); 
				}
			});
		//	location.reload();
		});
		
		jQuery("#deleteArtistSubmit").click(function(){
			jQuery.ajax({
				type: "POST",
				url: "data/delete_artist.php",
				data: { id: jQuery("[name=element_8_edit]select option:selected").val() }
				}).done(function( msg ) {
				alert( "Data Saved: " + msg );
			});
		//	location.reload();
		});
		jQuery("#deleteCDSubmit").click(function(){
			jQuery.ajax({
				type: "POST",
				url: "data/delete_cd.php",
				data: { id: jQuery("[name=element_15_edit]select option:selected").val() }
				}).done(function( msg ) {
				alert( "Data Saved: " + msg );
			});
		//	location.reload();
		});
		
		jQuery("#addArtistSubmin").button({
			   icons: {
			      primary: 'ui-icon ui-icon-circle-plus',
			   }
			});
			jQuery("#imageArtistSubmitlisto").button({
			   icons: {
			      primary: 'ui-icon ui-icon-check',
			   }
			});
			jQuery("#imageArtistSubmitupload").button({
			   icons: {
			      primary: 'ui-icon ui-icon-document',
			   }
			});
			jQuery("#imageArtistSubmitURL").button({
			   icons: {
			      primary: 'ui-icon ui-icon-image',
			   }
			});
			jQuery("#editArtistSubmit").button({
			   icons: {
			      primary: 'ui-icon ui-icon-pencil',
			   }
			});		
			jQuery("#deleteArtistSubmit").button({
			   icons: {
			      primary: 'ui-icon ui-icon-trash',
			   }
			});
			jQuery("#imageArtistSubmit").button({
			   icons: {
			      primary: 'ui-icon ui-icon-image',
			   }
			});
			jQuery("#addCDSubmit").button({
			   icons: {
			      primary: 'ui-icon ui-icon-circle-plus',
			   }
			});
			jQuery("#editCDSubmit").button({
			   icons: {
			      primary: 'ui-icon ui-icon-pencil',
			   }
			});
			jQuery("#deleteCDSubmit").button({
			   icons: {
			      primary: 'ui-icon ui-icon-trash',
			   }
			});
			jQuery("#volverAlHome").button({
			   icons: {
			      primary: 'ui-icon ui-icon-circle-check',
			   }
			});


			jQuery("#break").click(function(){

				if(jQuery("#li_8").css("display")=="none"){
					jQuery("#li_8").show("slow");

				}
				 else{
					jQuery("#li_8").hide("slow");
					jQuery("#li_9").hide("slow");
					jQuery("#li_10").hide("slow");
				}
			});
			jQuery("#break0").click(function(){

				if(jQuery("#li_7").css("display")=="none"){
					jQuery("#li_7").show("slow");

				}
				 else{
					jQuery("#li_7").hide("slow");
					jQuery("#divDatos").hide("slow");
				}
			});
			jQuery("#break1").click(function(){

				if(jQuery("#li_13").css("display")=="none"){
					jQuery("#li_13").show("slow");

				}
				 else{
					jQuery("#li_13").hide("slow");
					jQuery("#li_14").hide("slow");
					jQuery("#li_15").hide("slow");

				}
			});
			jQuery("#break2").click(function(){

				if(jQuery("#li_16").css("display")=="none"){
					jQuery("#li_16").show("slow");

				}
				 else{
					jQuery("#li_16").hide("slow");
					jQuery("#li_17").hide("slow");
					jQuery("#li_18").hide("slow");
					jQuery("#li_19").hide("slow");
				}
			});
			jQuery("#imageArtistSubmit").click(function(){
				jQuery('#li_10').hide("slow");
				jQuery('#li_111').show("slow");
			
			});
			jQuery("#imageArtistSubmitlisto").click(function(){
				jQuery('#li_10').show("slow");
				jQuery('#li_111').hide("slow");
			
			});