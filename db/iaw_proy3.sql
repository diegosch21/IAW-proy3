DROP TABLE IF EXISTS 'CDs';
CREATE TABLE 'CDs' ('id_cd' INTEGER PRIMARY KEY  NOT NULL ,'id_artista' INTEGER,'nombre' TEXT,'anio' INTEGER,'canciones' TEXT,'thumbnail' TEXT, 'imagenes' TEXT,'link' TEXT, 'visitas' INTEGER, 'megusta' INTEGER);
DROP TABLE IF EXISTS 'artistas';
CREATE TABLE 'artistas' ('id_artista' INTEGER PRIMARY KEY  NOT NULL , 'nombre' TEXT NOT NULL , 'id_genero' INTEGER NOT NULL , 'nacionalidad' TEXT, 'banda' TEXT, 'imagenes' TEXT, 'link' TEXT, 'visitas' INTEGER, 'megusta' INTEGER);
DROP TABLE IF EXISTS 'generos';
CREATE TABLE 'generos' ('id_genero' INTEGER PRIMARY KEY  NOT NULL , 'nombre' TEXT NOT NULL );
DROP TABLE IF EXISTS 'tags';
CREATE TABLE 'tags' ('id_tag' INTEGER PRIMARY KEY  NOT NULL , 'nombre' TEXT NOT NULL );
DROP TABLE IF EXISTS 'artista_tag';
CREATE TABLE 'artista_tag' ('id_artista' INTEGER NOT NULL , 'id_tag' INTEGER NOT NULL );
DROP TABLE IF EXISTS 'cd_tag';
CREATE TABLE 'cd_tag' ('id_cd' INTEGER NOT NULL , 'id_tag' INTEGER NOT NULL );
DROP TABLE IF EXISTS 'usuarios';
CREATE TABLE 'usuarios' ('id_user' INTEGER PRIMARY KEY  NOT NULL , 'user' TEXT, 'pass' TEXT);

INSERT INTO 'usuarios' VALUES(1,'admin','21232f297a57a5a743894a0e4a801fc3');

INSERT INTO 'generos' VALUES(1,'Rock nacional');
INSERT INTO 'generos' VALUES(2,'Rock internacional');
INSERT INTO 'generos' VALUES(3,'Folklore');
INSERT INTO 'generos' VALUES(4,'Pop');
INSERT INTO 'generos' VALUES(5,'Tango');
INSERT INTO 'generos' VALUES(6,'Reggae');

INSERT INTO 'artistas' VALUES(1,'Encias Sangrantes',1,'Argentina','Alequio: teclado y coros\nGaby: batería\nGordo Pablo: percusión y coros\nJuan Cruz: voz y bajo\nToto: voz y guitarra\nZoty: malodión y armónica','http://www.rock.com.ar/img/foto/3/3450.jpg','http://www.enciassangrantes.com.ar/',3,15);
INSERT INTO 'artistas' VALUES(2,'La Vela Puerca',1,'Uruguay','Alejandro Picone: trompeta\nCarlos Quijano: saxo tenor\nNicolás Lieutier: bajo\nPepe Canedo: batería\nRafael Dibello: guitarra\nSantiago Butler: guitarra\nSebastián Cebreiro: voz\nSebastián Teysera: voz\n','http://www.rock.com.ar/img/foto/1/1973.jpg','http://www.velapuerca.com/',25,1);
INSERT INTO 'artistas' VALUES(3,'Savoretti & los Indescriptibles',1,'Argentina','Diego Savoretti: Pianos, Guitarras y Voz.\nHernan Crosina: Bajo.\nLisandro Gabbarini: Bateria.\nVictor Fillipich: Guitarra, Teclados y Coros.\nAgustin Guarco: Guitarra y Coros','public_html/img/bandas/3/savore.jpg','http://www.myspace.com/savorettiylosindescriptibles',0,0);

INSERT INTO 'CDs' VALUES(1,1,'Encias Sangrantes',2005,'<ol><li>Tranky panky</li><li>Felicidad</li><li>Babilonia</li><li>La cosecha</li><li>Copate</li><li>Contento</li><li>La tormenta</li><li>Moca ñamo</li><li>Un poco mas</li><li>Jugo de paty</li><li>Campeon</li></ol>','http://www.rock.com.ar/img/foto/disco/7/7473.jpg','http://www.enciassangrantes.com.ar/disco1.png','http://www.enciassangrantes.com.ar/Encias%20Sangrantes.rar',5,0);
INSERT INTO 'CDs' VALUES(2,1,'Vehemencia',2009,'<ol><li>Rebozado</li><li>Oye Bien</li><li>Hasta</li><li>El Pozo</li><li>Keme Kemo</li><li>Agua</li><li>Santa Catalina</li><li>Viajero</li><li>Vuelo</li><li>Flores</li><li>Isabel</li></ol>','http://www.enciassangrantes.com.ar/disco2.png','http://a4.ec-images.myspacecdn.com/images02/113/c39039865d6a4647809f6a5f473e66e9/l.jpg|-|http://a2.ec-images.myspacecdn.com/images02/123/5d77cb508441492bb77e396557e5edd9/l.jpg','http://www.enciassangrantes.com.ar/Encias%20sangrantes%20-%20Vehemencia.rar',2,2);

INSERT INTO 'tags' VALUES(1,'rock');
INSERT INTO 'tags' VALUES(2,'nacional');
INSERT INTO 'tags' VALUES(3,'simpatico');
INSERT INTO 'tags' VALUES(4,'bahiablanca');
INSERT INTO 'tags' VALUES(5,'ska');
INSERT INTO 'tags' VALUES(6,'isabel');

INSERT INTO 'artista_tag' VALUES(1,3);
INSERT INTO 'artista_tag' VALUES(3,4);
INSERT INTO 'artista_tag' VALUES(2,5);
INSERT INTO 'artista_tag' VALUES(1,5);

INSERT INTO 'cd_tag' VALUES(1,1);
INSERT INTO 'cd_tag' VALUES(1,2);
INSERT INTO 'cd_tag' VALUES(1,3);
INSERT INTO 'cd_tag' VALUES(2,6);