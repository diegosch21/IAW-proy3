<?php
class descriptor
{
	// Variable arreglo del descriptor
	var $tags;
	var $xml;
	

	// Constructor de la clase Descriptor
	function __construct($ruta,$temp_name)
	{
	   $this->xml = simplexml_load_file($ruta);
	   $this->cargar('template',$temp_name);
	}

	function cargar($campo,$temp)
	{
	  $s = trim($campo);	
	  $t = trim($temp);
	  $this->agregarItem($s, trim($this->xml->$t));
  	   
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