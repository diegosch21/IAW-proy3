<?php
class descriptor
{
	// Variable arreglo del descriptor
	var $tags;

	// Constructor de la clase Descriptor
	function descriptor($ruta)
	{
	   $this->cargaInicial($ruta);
	}

	function cargaInicial($ruta)
	{
	  $sx = simplexml_load_file($ruta);
	  $this->agregarItem(trim('template'), trim($sx->template));
  	  $this->agregarItem(trim('titulo'), trim($sx->titulo));
  	  $this->agregarItem(trim('header'), trim($sx->header));
  	  $this->agregarItem(trim('footer'), trim($sx->footer));
  	  $this->agregarItem(trim('anio'), trim($sx->anio));
	  $this->agregarItem(trim('Homecontent'), trim($sx->Homecontent));
	  $this->agregarItem(trim('Contactcontent'), trim($sx->Contactocontent));
	  $this->agregarItem(trim('Bandascontent'), trim($sx->Bandascontent));

	}
	// FunciÃ³n que agrega un nuevo item al arreglo de tags.
	function agregarItem($campo, $valor)
	{
	   $this->tags[$campo] = $valor;
	}

	// Funcion que retorna un arreglo con los valores de las variables locales.
	function getTags($tags=array())
	{
	   return $this->tags;
	}

	// Funcion que retorna el template utilizado.
	function getTemplate()
	{
	   return $this->tags['template'];
	}

}
?>