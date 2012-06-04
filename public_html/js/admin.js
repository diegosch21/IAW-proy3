function listaGeneros() {
	jQuery("#loadingAdmin").show();
	jQuery.getJSON('data/categorias.php',function(data) {
		option1 ="<option value='' selected='selected'></option>";
		option2 ="<option value='' selected='selected'></option><option value='nuevo' >Nuevo g&eacute;nero</option>";
		options = "";
		for(i=0;i<data.length;i++){
			options+="<option value='"+data[i].genero+"' >"+data[i].genero+"</option>";
		}
		jQuery('#generoList').html(option2+options);
		jQuery('#generoListEdir').html(option1+options);
		jQuery('#generoListAddcd').html(option1+options);
		jQuery('#generoListEditcd').html(option1+options);
		jQuery("#loadingAdmin").hide();
	});	
}
	
	listaGeneros();
	
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
		jQuery("#loadingAdmin").show();
		jQuery.getJSON('data/categorias.php',function(data) {
			for(i=0;i<data.length;i++){
				if(data[i].genero==jQuery("[name=element_7_edit]select option:selected").val()){
					for(j=0;j<data[i].artistas.length;j++)
						jQuery('#artistListEdir').append("<option value='"+data[i].artistas[j].id+"' >"+data[i].artistas[j].artista+"</option>");
				}
			
			}
			jQuery("#loadingAdmin").hide();
		});
	});				

	jQuery('[name=element_8_edit]').change(function () {
		//jQuery('#artistListEdir').html("<option value='' selected='selected'></option>");
		jQuery('#li_10').show("slow");
		jQuery("#loadingAdmin").show();
		jQuery.getJSON('data/artist.php?id='+jQuery("[name=element_8_edit]select option:selected").val(),function(data) {	
			jQuery('#element_101').val(data.artista);
			jQuery('#element_102').val(data.genero);
			jQuery('#element_103').val(data.nacionalidad);
			jQuery('#element_104').val(data.banda);
			jQuery('#element_105').val(data.link);
			
//			if(data.imagenes) 
//				for(i=0;i<data.imagenes.length;i++){
			if(data.imagenes) 
				actualizarImgArt(data.imagenes[0].url);
			else
				actualizarImgArt("");
			jQuery("#loadingAdmin").hide();
		});
	});
	
	function actualizarImgArt(url) {
		if(url!="") {
		imgs = "<div id='imgArt' style='width: 50px;margin: 0 auto 0 auto;'><img id='imgArtURL' style='max-width:50px; max-height:50px;' src='"+url+"' /><a class='tag2' style='cursor:pointer;' onClick='quitarImgArt();'>Quitar</a></div>";
		cantImgArt = 1;
		jQuery('#imagenescargadas').html(imgs);
		}
		else
			jQuery('#imagenescargadas').html("");
	}

	function quitarImgArt() {
		cantImgArt = 0;
		jQuery("#imgArt").hide();
	}
		

	jQuery('[name=element_11_edit]').change(function () {
		jQuery('#artistListAddcd').html("<option value='' selected='selected'></option>");
		jQuery('#li_14').show("slow");
		jQuery("#loadingAdmin").show();
		jQuery.getJSON('data/categorias.php?',function(data) {
			for(i=0;i<data.length;i++){
				if(data[i].genero==jQuery("[name=element_11_edit]select option:selected").val()){
					for(j=0;j<data[i].artistas.length;j++)
						jQuery('#artistListAddcd').append("<option value='"+data[i].artistas[j].id+"' >"+data[i].artistas[j].artista+"</option>");
				}
			
			}
			jQuery("#loadingAdmin").hide();
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
		jQuery("#loadingAdmin").show();
		jQuery.getJSON('data/categorias.php?',function(data) {
			for(i=0;i<data.length;i++){
				if(data[i].genero==jQuery("[name=element_13_edit]select option:selected").val()){
					for(j=0;j<data[i].artistas.length;j++)
						jQuery('#artistListEditcd').append("<option value='"+data[i].artistas[j].id+"' >"+data[i].artistas[j].artista+"</option>");
				}
			
			}
			jQuery("#loadingAdmin").hide();
		});
	});	

	jQuery('[name=element_14_edit]').change(function () {	
		jQuery('#li_19').hide("slow");
		jQuery('#cdListEditcd').html("<option value='' selected='selected'></option>");
		jQuery('#li_18').show("slow");
		jQuery("#loadingAdmin").show();
		jQuery.getJSON('data/cds.php?ar='+jQuery("[name=element_14_edit]select option:selected").val(),function(data) {
			if(data.CDs) {
			for(i=0;i<data.CDs.length;i++){
				jQuery('#cdListEditcd').append("<option value='"+data.CDs[i].id+"' >"+data.CDs[i].nombre+"</option>");
			}	
			}
			jQuery("#loadingAdmin").hide();
		});
	});	

	jQuery('[name=element_15_edit]').change(function () {					
		jQuery('#li_19').show("slow");
		jQuery("#loadingAdmin").show();
		jQuery.getJSON('data/cd.php?id='+jQuery("[name=element_15_edit]select option:selected").val(),function(data) {	
			jQuery('#element_301').val(data.nombre);
			jQuery('#element_303').val(data.anio);
			jQuery('#element_304').val(data.canciones);
			jQuery('#element_305').val(data.link);
			listaTags = "";
			if (data.listatags && data.listatags.tags) {
				for(i=0;i<data.listatags.tags.length;i++)
					listaTags+=data.listatags.tags[i]+" ";
			}
			
			jQuery('#element_306').val(listaTags);
			
			if(data.thumbnail) {
				thumbnail=true;
				actualizarThumb(data.thumbnail);
			}
			else {
				thumbnail=false;
				actualizarThumb("");
			}
			imgsCD = new Array();
			if(data.imagenes)
			{

				for(i=0;i<data.imagenes.length;i++){
					imgsCD[i] = data.imagenes[i].url;
				}
				actualizarImgsCD();
			}
			
			
			jQuery("#loadingAdmin").hide();
		});
	});
	
	function actualizarThumb(url) {
		if(url!="") {
		imgs = "<div id='thumbCD' style='width: 50px;margin: 0 auto 0 auto;'><img id='thumbURL' style='max-width:50px; max-height:50px;' src='"+url+"' /><a class='tag2' style='cursor:pointer;' onClick='quitarThumb();'>Quitar</a></div>";
		thumbnail = true;
		jQuery('#thumbnailCD').html(imgs);
		}
		else
			jQuery('#thumbnailCD').html("");
	}

	function quitarThumb() {
		thumbnail = false;
		jQuery("#thumbCD").hide();
	}
	
	function actualizarImgsCD() {
		imgs="";
		for(i=0;i<imgsCD.length;i++){
			if(imgsCD[i] != "")
				imgs+= "<div id='imgCD"+i+"' style='width: 50px;margin: 0 auto 0 auto; padding-bottom: 6px; padding-top:6px'><img id='imgCdURL"+i+"' style='max-width:50px; max-height:50px;' src='"+imgsCD[i]+"' /><a class='tag2' style='cursor:pointer;' onClick='quitarImgCD("+i+");'>Quitar</a></div>";
		}
		jQuery('#imagenesCD').html(imgs);
	}

	function quitarImgCD(i) {
		imgsCD.splice(i,1);
		actualizarImgsCD();
	}
		
			
	jQuery("#addArtistSubmin").click(function(){

		if (jQuery("[name=element_7]select option:selected").val()=="nuevo")
			_genero = jQuery("#textNuevoGenero").val();
		else
			_genero = jQuery("[name=element_7]select option:selected").val();
		jQuery("#loadingAdmin").show();
		jQuery.ajax({
			type: "POST",
			url: "data/add_artist.php",
			data: { genero: _genero, nombre: jQuery("#element_2").val(),nacion: jQuery("#element_5").val(), banda: jQuery("#element_4").val(),link: jQuery("#element_3").val() }
		}).done(function( msg ) {
			dato=(eval('(' + msg + ')'));
			if (dato.error!=undefined){
				jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
				jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				
				}
			else{
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> El artista <strong>"+dato.artista.artista+"</strong> fue creado correctamente</p>");
				jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
				jQuery("#addArtistSubmin").hide();
				jQuery("#li_211").show('slow');
				jQuery('#textNuevoGenero').attr('readonly', true);
				jQuery('#element_2').attr('readonly', true);
				jQuery('#element_3').attr('readonly', true);
				jQuery('#element_4').attr('readonly', true);
				jQuery('#element_5').attr('readonly', true);
				artID = dato.artista.id;
				
			}
			jQuery("#loadingAdmin").hide();
		});
	//	location.reload();
	});
	
	jQuery("#imageArtistSubmitURL2").click(function() {
		imgURL = jQuery("#imgURL2").val();
		RegExPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?$/;
		if ((imgURL=='')){// || (!imgURL.match(RegExPattern))) {
			alert('URL no valida');
		}
		else {
			jQuery("#loadingAdmin").show();
			jQuery.ajax({
				type: "POST",
				url: "data/add_img.php",
				data: { id: artID, url: imgURL, class:'artista' }
			}).done(function( msg ) {
				dato=(eval('(' + msg + ')'));
				if (dato.error!=undefined){
					jQuery("#mensajeError").html("<strong>Error al agregar imagen: </strong> "+dato.error+" </p>");
					jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				}
				else{
					jQuery("#mensajeAviso").html("<strong>Exito: </strong> Imagen agregada</p>");
					jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
					jQuery("#imgURL2").val("");
					listoAdd();
				}
				jQuery("#loadingAdmin").hide();
			});
		}
	});
	jQuery("#imageArtistSubmitUpload2").click(function() {
		if (jQuery('#fileToUpload2').val()=='') 
			alert('No seleccionaste imagen valida para subir');
		else {
		jQuery("#loadingAdmin").show();
		jQuery.ajaxFileUpload({
            url:'data/upload_img.php?class=artista&id='+artID, 
            fileElementId:'fileToUpload2',
            dataType: 'json',
            success: function (data, status)
            {
                
            	if(data.error != undefined)
                {
                    if(data.error != '')
                    {
                    	jQuery("#mensajeError").html("<strong>Error al agregar imagen: </strong> "+data.error+" </p>");
    					jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
                    }
                    else
                    	alert('error');
                }
                else
                {
                	jQuery("#mensajeAviso").html("<strong>Exito: </strong> Imagen subida y agregada</p>");
					jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
					jQuery("#fileToUpload2").val("");
					listoAdd();
                }
                jQuery("#loadingAdmin").hide();
            },
            error: function (data, status, e)
            {
                alert(e);
                jQuery("#loadingAdmin").hide();
            }
        });
		}
	});
			
	jQuery("#imageArtistSubmitListo2").click(function() {
		listoAdd();
	});
	
function listoAdd() {
	jQuery("#addArtistSubmin").show();
	jQuery("#li_211").hide('slow');
	jQuery('#divDatos').hide("slow");
	jQuery("#li_88").hide("slow");
	jQuery("#li_7").hide("slow");
	jQuery('#textNuevoGenero').val("").removeAttr('readonly');
	jQuery('#element_2').val("").removeAttr('readonly');
	jQuery('#element_3').val("").removeAttr('readonly');
	jQuery('#element_4').val("").removeAttr('readonly');
	jQuery('#element_5').val("").removeAttr('readonly');
	artID = 0;
	listaGeneros();
}
function listoEditArt(){
	jQuery("#li_8").hide("slow");
	jQuery("#li_9").hide("slow");
	jQuery("#li_10").hide("slow");
	jQuery('#element_101').val("");
	jQuery('#element_102').val("");
	jQuery('#element_103').val("");
	jQuery('#element_104').val("");
	jQuery('#element_105').val("");
	jQuery('#imagenescargadas').html("");
	listaGeneros();
}

	
	jQuery("#editArtistSubmit").click(function(){
		if(cantImgArt==1)
			lista = jQuery("#imgArtURL").attr('src');
		else
			lista = "";
		
		jQuery("#loadingAdmin").show();
		jQuery.ajax({
			type: "POST",
			url: "data/edit_artist.php",
			data:
			{ id:jQuery("[name=element_8_edit]select option:selected").val(),
				genero: jQuery("#element_102").val(),
				nombre: jQuery("#element_101").val(),
				nacion: jQuery("#element_103").val(),
				banda: jQuery("#element_104").val(),
				link: jQuery("#element_105").val(),
				imgs: lista }
		}).done(function( msg ) {
			dato=(eval('(' + msg + ')'));
			if (dato.error!=undefined){
				jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
				jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
			}
			else{
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> El artista <strong>"+dato.artista+"</strong> fue editado correctamente</p>");
				jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
				listoEditArt();
			}
			jQuery("#loadingAdmin").hide();
		});
	//	location.reload();
	});
	jQuery("#deleteArtistSubmit").click(function(){
		jQuery("#loadingAdmin").show();
		jQuery.ajax({
			type: "POST",
			url: "data/delete_artist.php",
			data: { id: jQuery("[name=element_8_edit]select option:selected").val() }
		}).done(function( msg ) {
			dato=(eval('(' + msg + ')'));
			if (dato.error!=undefined){
				jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
				jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
			}
			else{
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> El artista fue eliminado correctamente</p>");
				jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
				listoEditArt();
			}
			jQuery("#loadingAdmin").hide();
			
		});
	//	location.reload();
	});
	
	jQuery("#imageArtistSubmitURL").click(function() {
		imgURL = jQuery("#imgURL").val();
		RegExPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?$/;
		if ((imgURL=='')){// || (!imgURL.match(RegExPattern))) {
			alert('URL no valida');
		}
		else {
			jQuery("#loadingAdmin").show();
			jQuery.ajax({
				type: "POST",
				url: "data/add_img.php",
				data: { id:jQuery("[name=element_8_edit]select option:selected").val(), url: imgURL, class:'artista' }
			}).done(function( msg ) {
				dato=(eval('(' + msg + ')'));
				if (dato.error!=undefined){
					jQuery("#mensajeError").html("<strong>Error al agregar imagen: </strong> "+dato.error+" </p>");
					jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				}
				else{
					jQuery("#mensajeAviso").html("<strong>Exito: </strong> Imagen cambiada</p>");
					jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
					jQuery("#imgURL").val("");
					actualizarImgArt(imgURL);
				}
				jQuery("#loadingAdmin").hide();
			});
		}
	});
	jQuery("#imageArtistSubmitUpload").click(function() {
		if (jQuery('#fileToUpload').val()=='') 
			alert('No seleccionaste imagen valida para subir');
		else {
		jQuery("#loadingAdmin").show();
		jQuery.ajaxFileUpload({
            url:'data/upload_img.php?class=artista&id='+jQuery("[name=element_8_edit]select option:selected").val(), 
            fileElementId:'fileToUpload',
            dataType: 'json',
            success: function (data, status)
            {
                
            	if(data.error != undefined)
                {
                    if(data.error != '')
                    {
                    	jQuery("#mensajeError").html("<strong>Error al agregar imagen: </strong> "+data.error+" </p>");
    					jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
                    }
                    else
                    	alert('error');
                }
                else
                {
                	jQuery("#mensajeAviso").html("<strong>Exito: </strong> Imagen subida y agregada</p>");
					jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
					jQuery("#fileToUpload").val("");
					actualizarImgArt(data.uploaded);
                }
                jQuery("#loadingAdmin").hide();
            },
            error: function (data, status, e)
            {
                alert(e);
                jQuery("#loadingAdmin").hide();
            }
        });
		}
	});
	
	/*CDS*/
	
	jQuery("#addCDSubmit").click(function(){
		jQuery("#loadingAdmin").show();
		jQuery.ajax({
			type: "POST",
			url: "data/add_cd.php",
			data: { id_ar: jQuery("[name=element_12_edit]select option:selected").val(), nombre: jQuery("#element_200").val(), anio: jQuery("#element_201").val(), canc: jQuery("#element_204").val(), link: jQuery("#element_205").val(), tags: jQuery("#element_206").val()  }
		}).done(function( msg ) {
			dato=(eval('(' + msg + ')'));
			if (dato.error!=undefined){
				jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
				jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				}
			else{
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> El CD <strong>"+dato.cd.nombre+"</strong> de "+dato.cd.artista+" fue creado correctamente</p>");
				jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow');
				jQuery("#DIVaddCDSubmit").hide();
				jQuery("#li_311").show();	
				jQuery('#generoListAddcd').attr('disabled', true);
				jQuery('#artistListAddcd').attr('disabled', true);
				jQuery('#element_200').attr('readonly', true);
				jQuery('#element_201').attr('readonly', true);
				jQuery('#element_204').attr('readonly', true);
				jQuery('#element_205').attr('readonly', true);
				jQuery('#element_206').attr('readonly', true);
				cdID = dato.cd.id;
			}
			jQuery("#loadingAdmin").hide();
		});
	//	location.reload();
	});
		
	jQuery("#imageArtistSubmitURL3t").click(function() {
		imgURL = jQuery("#imgURL3t").val();
		RegExPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?$/;
		if ((imgURL=='')){ //|| (!imgURL.match(RegExPattern))) {
			alert('URL no valida');
		}
		else {
			jQuery("#loadingAdmin").show();
			jQuery.ajax({
				type: "POST",
				url: "data/add_img.php",
				data: { id: cdID, url: imgURL, class:'cd', thumb: true }
			}).done(function( msg ) {
				dato=(eval('(' + msg + ')'));
				if (dato.error!=undefined){
					jQuery("#mensajeError").html("<strong>Error al agregar imagen: </strong> "+dato.error+" </p>");
					jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				}
				else{
					jQuery("#mensajeAviso").html("<strong>Exito: </strong> Imagen miniatura agregada</p>");
					jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
					jQuery("#imgURL3t").val("");
					//listoAddCD();
				}
				jQuery("#loadingAdmin").hide();
			});
		}
	});
	jQuery("#imageArtistSubmitUpload3t").click(function() {
		if (jQuery('#fileToUpload3t').val()=='') 
			alert('No seleccionaste imagen valida para subir');
		else {
			
		jQuery("#loadingAdmin").show();
		jQuery.ajaxFileUpload({
            url:'data/upload_img.php?class=cd&id='+cdID+'&thumb=true', 
            fileElementId:'fileToUpload3t',
            dataType: 'json',
            success: function (data, status)
            {
                
            	if(data.error != undefined)
                {
                    if(data.error != '')
                    {
                    	jQuery("#mensajeError").html("<strong>Error al agregar imagen: </strong> "+data.error+" </p>");
    					jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
                    }
                    else
                    	alert('error');
                }
                else
                {
                	jQuery("#mensajeAviso").html("<strong>Exito: </strong> Imagen miniatura subida y agregada</p>");
					jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
					jQuery("#fileToUpload3").val("");
					//listoAddCD();
                }
                jQuery("#loadingAdmin").hide();
            },
            error: function (data, status, e)
            {
                alert(e);
                jQuery("#loadingAdmin").hide();
            }
        });
		}
	});
	jQuery("#imageArtistSubmitURL3").click(function() {
		imgURL = jQuery("#imgURL3").val();
		RegExPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?$/;
		if ((imgURL=='')) {//|| (!imgURL.match(RegExPattern))) {
			alert('URL no valida');
		}
		else {
			jQuery("#loadingAdmin").show();
			jQuery.ajax({
				type: "POST",
				url: "data/add_img.php",
				data: { id: cdID, url: imgURL, class:'cd' }
			}).done(function( msg ) {
				dato=(eval('(' + msg + ')'));
				if (dato.error!=undefined){
					jQuery("#mensajeError").html("<strong>Error al agregar imagen: </strong> "+dato.error+" </p>");
					jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				}
				else{
					jQuery("#mensajeAviso").html("<strong>Exito: </strong> Imagen agregada</p>");
					jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
					jQuery("#imgURL3").val("");
					//listoAddCD();
				}
				jQuery("#loadingAdmin").hide();
			});
		}
	});
	jQuery("#imageArtistSubmitUpload3").click(function() {
		if (jQuery('#fileToUpload3').val() == '') 
			alert('No seleccionaste imagen valida para subir');
		else {
		jQuery("#loadingAdmin").show();
		jQuery.ajaxFileUpload({
            url:'data/upload_img.php?class=cd&id='+cdID, 
            fileElementId:'fileToUpload3',
            dataType: 'json',
            success: function (data, status)
            {
                
            	if(data.error != undefined)
                {
                    if(data.error != '')
                    {
                    	jQuery("#mensajeError").html("<strong>Error al agregar imagen: </strong> "+data.error+" </p>");
    					jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
                    }
                    else
                    	alert('error');
                }
                else
                {
                	jQuery("#mensajeAviso").html("<strong>Exito: </strong> Imagen subida y agregada</p>");
					jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
					jQuery("#fileToUpload3").val("");
					//listoAddCD();
                }
                jQuery("#loadingAdmin").hide();
            },
            error: function (data, status, e)
            {
                alert(e);
                jQuery("#loadingAdmin").hide();
            }
        });
		}
	});
			
	jQuery("#imageArtistSubmitListo3").click(function() {
		listoAddCD();
	});
	
function listoAddCD() {
	jQuery("#DIVaddCDSubmit").show();
	jQuery("#li_311").hide('slow');
	jQuery("#li_13").hide("slow");
	jQuery("#li_14").hide("slow");
	jQuery("#li_15").hide("slow");
	jQuery('#generoListAddcd').val("").removeAttr('disabled');
	jQuery('#artistListAddcd').val("").removeAttr('disabled');
	jQuery('#element_200').val("").removeAttr('readonly');
	jQuery('#element_201').val("").removeAttr('readonly');
	jQuery('#element_204').val("").removeAttr('readonly');
	jQuery('#element_205').val("").removeAttr('readonly');
	jQuery('#element_206').val("").removeAttr('readonly');
	cdID = 0;
}
function listoEditCD(){
	jQuery('#li_19').hide("slow");
	jQuery('#li_18').hide("slow");
	jQuery('#li_17').hide("slow");
	jQuery('#li_16').hide("slow");
}


	

	jQuery("#editCDSubmit").click(function(){
		if(thumbnail)
			thumbURL = jQuery("#thumbURL").attr('src');
		else
			thumbURL = "";
		listaImgs = imgsCD.join("|-|");
		
		jQuery("#loadingAdmin").show();
		jQuery.ajax({
			type: "POST",
			url: "data/edit_cd.php",
			data: { id:jQuery("[name=element_15_edit]select option:selected").val(),
				id_ar:jQuery("[name=element_14_edit]select option:selected").val(),
				genero: jQuery("[name=element_13_edit]select option:selected").val(),
				nombre: jQuery("#element_301").val(),
				anio: jQuery("#element_303").val(),
				canc: jQuery("#element_304").val(),
				link: jQuery("#element_305").val(),
				thumb: thumbURL,
				imgs: listaImgs,
				tags: jQuery("#element_306").val() }
		}).done(function( msg ) {
			dato=(eval('(' + msg + ')'));
			if (dato.error!=undefined){
				jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
				jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				}
			else{
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> El CD <strong>"+dato.nombre+"</strong> de "+dato.artista+" fue editado correctamente</p>");
				jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
				listoEditCD();
			}
			jQuery("#loadingAdmin").hide();
		});
	//	location.reload();
	});
	
	
	jQuery("#deleteCDSubmit").click(function(){
		jQuery("#loadingAdmin").show();
		jQuery.ajax({
			type: "POST",
			url: "data/delete_cd.php",
			data: { id: jQuery("[name=element_15_edit]select option:selected").val() }
		}).done(function( msg ) {
			dato=(eval('(' + msg + ')'));
			if (dato.error!=undefined){
				jQuery("#mensajeError").html("<strong>Error: </strong> "+dato.error+" </p>");
				jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				}
			else{
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> El CD fue eliminado correctamente</p>");
				jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
				listoEditCD();
			}
			jQuery("#loadingAdmin").hide();
		});
	//	location.reload();
	});
	
	jQuery("#imageArtistSubmitURL4t").click(function() {
		imgURL = jQuery("#imgURL4t").val();
		RegExPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?$/;
		if ((imgURL=='')){ //|| (!imgURL.match(RegExPattern))) {
			alert('URL no valida');
		}
		else {
			jQuery("#loadingAdmin").show();
			jQuery.ajax({
				type: "POST",
				url: "data/add_img.php",
				data: { id: jQuery("[name=element_14_edit]select option:selected").val(), url: imgURL, class:'cd', thumb: true }
			}).done(function( msg ) {
				dato=(eval('(' + msg + ')'));
				if (dato.error!=undefined){
					jQuery("#mensajeError").html("<strong>Error al agregar imagen: </strong> "+dato.error+" </p>");
					jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				}
				else{
					jQuery("#mensajeAviso").html("<strong>Exito: </strong> Imagen miniatura agregada</p>");
					jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
					jQuery("#imgURL4t").val("");
					actualizarThumb(imgURL);
				}
				jQuery("#loadingAdmin").hide();
			});
		}
	});
	jQuery("#imageArtistSubmitUpload4t").click(function() {
		if (jQuery('#fileToUpload4t').val()=='') 
			alert('No seleccionaste imagen valida para subir');
		else {
			
		jQuery("#loadingAdmin").show();
		jQuery.ajaxFileUpload({
            url:'data/upload_img.php?class=cd&id='+jQuery("[name=element_14_edit]select option:selected").val()+'&thumb=true', 
            fileElementId:'fileToUpload4t',
            dataType: 'json',
            success: function (data, status)
            {
                
            	if(data.error != undefined)
                {
                    if(data.error != '')
                    {
                    	jQuery("#mensajeError").html("<strong>Error al agregar imagen: </strong> "+data.error+" </p>");
    					jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
                    }
                    else
                    	alert('error');
                }
                else
                {
                	jQuery("#mensajeAviso").html("<strong>Exito: </strong> Imagen miniatura subida y agregada</p>");
					jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
					jQuery("#fileToUpload4t").val("");
					actualizarThumb(data.uploaded);
                }
                jQuery("#loadingAdmin").hide();
            },
            error: function (data, status, e)
            {
                alert(e);
                jQuery("#loadingAdmin").hide();
            }
        });
		}
	});
	jQuery("#imageArtistSubmitURL4").click(function() {
		imgURL = jQuery("#imgURL4").val();
		RegExPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?$/;
		if ((imgURL=='')){ //|| (!imgURL.match(RegExPattern))) {
			alert('URL no valida');
		}
		else {
			jQuery("#loadingAdmin").show();
			jQuery.ajax({
				type: "POST",
				url: "data/add_img.php",
				data: { id: jQuery("[name=element_14_edit]select option:selected").val(), url: imgURL, class:'cd', thumb: true }
			}).done(function( msg ) {
				dato=(eval('(' + msg + ')'));
				if (dato.error!=undefined){
					jQuery("#mensajeError").html("<strong>Error al agregar imagen: </strong> "+dato.error+" </p>");
					jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
				}
				else{
					jQuery("#mensajeAviso").html("<strong>Exito: </strong> Imagen miniatura agregada</p>");
					jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
					jQuery("#imgURL4").val("");
					imgsCD[imgsCD.length] = imgURL;
					actualizarImgsCD();
				}
				jQuery("#loadingAdmin").hide();
			});
		}
	});
	jQuery("#imageArtistSubmitUpload4").click(function() {
		if (jQuery('#fileToUpload4').val()=='') 
			alert('No seleccionaste imagen valida para subir');
		else {
			
		jQuery("#loadingAdmin").show();
		jQuery.ajaxFileUpload({
            url:'data/upload_img.php?class=cd&id='+jQuery("[name=element_14_edit]select option:selected").val()+'&thumb=true', 
            fileElementId:'fileToUpload4',
            dataType: 'json',
            success: function (data, status)
            {
                
            	if(data.error != undefined)
                {
                    if(data.error != '')
                    {
                    	jQuery("#mensajeError").html("<strong>Error al agregar imagen: </strong> "+data.error+" </p>");
    					jQuery("#cartelError").fadeIn().delay(3000).fadeOut('slow'); 
                    }
                    else
                    	alert('error');
                }
                else
                {
                	jQuery("#mensajeAviso").html("<strong>Exito: </strong> Imagen miniatura subida y agregada</p>");
					jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
					jQuery("#fileToUpload4").val("");
					imgsCD[imgsCD.length] = data.uploaded;
					actualizarImgsCD();
                }
                jQuery("#loadingAdmin").hide();
            },
            error: function (data, status, e)
            {
                alert(e);
                jQuery("#loadingAdmin").hide();
            }
        });
		}
	});
	
	
	
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
				jQuery("#mensajeAviso").html("<strong>Exito: </strong> Configuración guardada");
				jQuery("#cartelAviso").fadeIn().delay(3000).fadeOut('slow'); 
			}
			jQuery("#loadingAdmin").hide();
		});
	//	location.reload();
	});

	



	jQuery("#Backup").click(function(){
		window.open("data/backup.php", '_blank');
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



			


		jQuery("#addArtistSubmin").button({
		   icons: {
		      primary: 'ui-icon ui-icon-circle-plus',
		   }
		});

		jQuery("#imageArtistSubmitListo2").button({
		   icons: {
		      primary: 'ui-icon ui-icon-check',
		   }
		});
		jQuery("#imageArtistSubmitListo3").button({
		   icons: {
		      primary: 'ui-icon ui-icon-check',
		   }
		});
			jQuery("#imageArtistSubmitListo4").button({
		   icons: {
		      primary: 'ui-icon ui-icon-check',
		   }
		});
		jQuery("#imageArtistSubmitUpload").button({
		   icons: {
		      primary: 'ui-icon ui-icon-document',
		   }
		});
		jQuery("#imageArtistSubmitUpload2").button({
		   icons: {
		      primary: 'ui-icon ui-icon-document',
		   }
		});
		jQuery("#imageArtistSubmitUpload3").button({
		   icons: {
		      primary: 'ui-icon ui-icon-document',
		   }
		});
		jQuery("#imageArtistSubmitUpload3t").button({
			   icons: {
			      primary: 'ui-icon ui-icon-document',
			   }
			});
		jQuery("#imageArtistSubmitUpload4").button({
		   icons: {
		      primary: 'ui-icon ui-icon-document',
		   }
		});
		jQuery("#imageArtistSubmitUpload4t").button({
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
		jQuery("#imageArtistSubmitURL3t").button({
			   icons: {
			      primary: 'ui-icon ui-icon-image',
			   }
			});
		jQuery("#imageArtistSubmitURL4").button({
		   icons: {
		      primary: 'ui-icon ui-icon-image',
		   }
		});
		jQuery("#imageArtistSubmitURL4t").button({
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


