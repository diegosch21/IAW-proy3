<?php
require_once ('../_lib/db.php');
require_once ('../_lib/data.php');

try {

	session_start();

	if (!isset($_SESSION['user']) || $_SESSION['user'] != 'admin') {
		$result['error'] = 'Sesion admin no iniciada';
	} else if (!isset($_GET['id']) || $_GET['id'] == "" || !is_numeric($_GET['id'])) {
		$result['error'] = 'Falta atributo id';
	} else if (!isset($_GET['class']) || ($_GET['class'] != "artista" && $_GET['class'] != "cd")) {
		$result['error'] = 'Falta atributo class(artista o img)';
	} else if (!isset($_FILES['file']) || $_FILES['file'] == "") {
		$result['error'] = 'Falta archivo';
	} else {
		$file = $_FILES['file'];

		$db = new DB('../db/iaw_proy3');

		$id = $_GET['id'];

		$class = $_GET['class'];

		if ($class == 'artista') {
			$artistas = $db -> query("SELECT id_genero, imagenes FROM artistas WHERE id_artista = $id");
			$art = $db -> getRow($artistas);

			if (!$art) {
				//no existe artista
				$result['error'] = "Artista inexistente con ID=$id";
			} else {
				$result['id'] = $id;
				$resul['class'] = $class;

				$imgs = $art['imagenes'];
				$idGen = $art['id_genero'];
				$folder = 'img/gen' . $idGen . '/art' . $id;
				createFolder($folder);
				$path = saveFile($file, $folder);

				if ($path == 'error') {
					$result['uploaded'] = false;
					$result['error'] = 'Archivo no aceptado';
				} else {
					$url = 'data/' . $path;
					$result['uploaded'] = $url;

				//	if ($imgs == "") {
						$imgs = $url;
				/*	} else {
						$imgs .= '|-|' . $url;
					}
*/
					$res = $db -> execute("UPDATE artistas SET  imagenes = ? WHERE id_artista = ?", array($imgs, $id));
					if ($res > 0)
						$result['added'] = true;
					else {
						$result['added'] = false;
					}
				}

				$result['listimgs'] = $imgs;
			}

		} elseif ($class == 'cd') {
			$cds = $db -> query("SELECT id_artista, imagenes, thumbnail FROM CDs WHERE id_cd = $id");
			$cd = $db -> getRow($cds);

			if (!$cd) {
				//no existe artista
				$result['error'] = "CD inexistente con ID=$id";
			} else {
				$result['id'] = $id;
				$result['class'] = $class;
				$thumb = (isset($_GET['thumb']) && $_GET['thumb']);

				if ($thumb) {
					$col = 'thumbnail';
					$result['thumbnail'] = true;
				} else {
					$col = 'imagenes';
				}

				$imgs = $cd[$col];

				$idArt = $cd['id_artista'];
				$artistas = $db -> query("SELECT id_genero, imagenes FROM artistas WHERE id_artista = $idArt");
				$art = $db -> getRow($artistas);
				$idGen = $art['id_genero'];

				$folder = 'img/gen' . $idGen . '/art' . $idArt . '/cd' . $id;
				createFolder($folder);
				$path = saveFile($file, $folder);

				if ($path == 'error') {
					$result['uploaded'] = false;
				} else {
					$url = 'data/' . $path;
					$result['uploaded'] = $url;

					if ($imgs == "" || $thumb) {
						$imgs = $url;
					} else {
						$imgs .= '|-|' . $url;
					}

					$res = $db -> execute("UPDATE CDs SET  $col = ? WHERE id_cd = ?", array($imgs, $id));
					if ($res > 0)
						$result['added'] = true;
					else {
						$result['added'] = false;
					}
				}

				$result[$col] = $imgs;

			}

		}

		$db -> disconnect();
	}

} catch(Exception $e) {
	$result['error'] = $e -> getMessage();
}

if (isset($result['error']))
	echo json_encode($result);
else if (isset($result))
	echo json_encode($result);
?>