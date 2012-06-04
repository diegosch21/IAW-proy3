<?php

$destination = './backup.zip';
$source = '../';

try {
	$zip = new ZipArchive();
	
	
    $zip->open($destination, ZIPARCHIVE::CREATE | ZIPARCHIVE::OVERWRITE);
	
	if (is_dir($source) === true)
    {
        $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source), RecursiveIteratorIterator::SELF_FIRST);
		
        foreach ($files as $file)
        {
        	
            $file = str_replace('\\', '/', $file);
			
			if (!stripos($file, '.git') && !stripos($file, 'backup.zip')) {
				
	            if (is_dir($file) === true)
	            {
	                $path = str_replace($source, '', $file . '/');
				
	                $zip->addEmptyDir($path);
					
	            }
	            else if (is_file($file) === true)
	            {
	            	$path = str_replace($source, '', $file);
					
	                $zip->addFile($file,$path);
	            }
			}
        }
    }
    else if (is_file($source) === true && !stripos($file, '.git'))
    {
        $zip->addFromString(basename($source), file_get_contents($source));
    }
   /* 
	header("Content-type: application/octet-stream");
	header("Content-disposition: attachment; filename=backup.zip");
	header ("Content-Length: ".filesize($destination));
	readfile($destination);
	unlink($destination);
    * */
    $result['file'] = 'data/backup.zip';
	echo json_encode($result);
	
	
} catch(Exception $e){
	echo json_encode($e->getMessage());
}


?>