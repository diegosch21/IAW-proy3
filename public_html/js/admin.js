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
						for(i=0;i<data.imagenes.length;i++){
							jQuery('#imagenescargadas').append("<div class='tag2'>"+data.imagenes[i].url+"<div>");
						}
					});
				});
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
		jQuery("#imageArtistSubmitlisto2").button({
		   icons: {
		      primary: 'ui-icon ui-icon-check',
		   }
		});
		jQuery("#imageArtistSubmitlisto3").button({
		   icons: {
		      primary: 'ui-icon ui-icon-check',
		   }
		});
			jQuery("#imageArtistSubmitlisto4").button({
		   icons: {
		      primary: 'ui-icon ui-icon-check',
		   }
		});
		jQuery("#imageArtistSubmitlisto2").button({
		   icons: {
		      primary: 'ui-icon ui-icon-check',
		   }
		});
		jQuery("#imageArtistSubmitupload").button({
		   icons: {
		      primary: 'ui-icon ui-icon-document',
		   }
		});
		jQuery("#imageArtistSubmitupload2").button({
		   icons: {
		      primary: 'ui-icon ui-icon-document',
		   }
		});
		jQuery("#imageArtistSubmitupload3").button({
		   icons: {
		      primary: 'ui-icon ui-icon-document',
		   }
		});
		jQuery("#imageArtistSubmitupload4").button({
		   icons: {
		      primary: 'ui-icon ui-icon-document',
		   }
		});
		jQuery("#imageArtistSubmitURL").button({
		   icons: {
		      primary: 'ui-icon ui-icon-image',
		   }
		});
		jQuery("#imageArtistSubmitURL2").button({
		   icons: {
		      primary: 'ui-icon ui-icon-image',
		   }
		});
		jQuery("#imageArtistSubmitURL3").button({
		   icons: {
		      primary: 'ui-icon ui-icon-image',
		   }
		});
		jQuery("#imageArtistSubmitURL4").button({
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
				jQuery("#imageArtistSubmit2").button({
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
		jQuery("#imageArtistSubmit2").click(function(){
			jQuery('#li_19').hide("slow");
			jQuery('#li_411').show("slow");
		
		});
		jQuery("#imageArtistSubmitlisto").click(function(){
			jQuery('#li_10').show("slow");
			jQuery('#li_111').hide("slow");
		
		});