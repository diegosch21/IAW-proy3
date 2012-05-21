<?php
class templateParser
{
	var $output;

	function templateParser($templateFile='')
	{
		if (file_exists($templateFile)) {
			$this->output=file_get_contents($templateFile);
		} else {
			die('Error: El template '.$templateFile.' no existe!');
		}
	}

	function parseTemplate($tags=array())
	{
		if(count($tags)>0) {
			foreach($tags as $tag=>$data) {
				$data = (file_exists($data))?$this->parseFile($data):$data;
				$this->output=str_replace('{'.$tag.'}',$data,$this->output);
			}
		} else {
			die('Error: No se han provisto tags para realizar el reemplazo.');
		}
	}

	function parseFile($file)
	{
		ob_start();
		include($file);
		$content=ob_get_contents();
		ob_end_clean();
		return $content;
	}

	function display()
	{
		return $this->output;
	}
}
?>