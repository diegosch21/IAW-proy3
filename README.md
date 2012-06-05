IAW-proy3: Catálogo temático - La Rockola CDs
============================

http://larockolacds.nixiweb.com

*[PHP - SQLite - AJAX]*  

El  proyecto  consiste  en  la  implementación  de  una aplicación  web  que  permita  la  administración  de un catálogo relacionado  con  un  tema  específico.  La  aplicación  debe  ser visualmente  atractiva, con  un aspecto  acorde  al  tema  elegido,  permitiendo  un  fácil  acceso  a  los ítems  del  catálogo,  los  cuales  deberán estar agrupados por categorías y etiquetas o palabras clave.

Los ítems deberán contener imágenes, las cuales pueden ser almacenadas en el propio servidor, o pueden ser accedidas a través de la URL correspondiente. La aplicación web debe permitir a los usuarios ver en el tamaño original y de manera atractiva las distintas imágenes de un mismo ítem del catálogo.

El sitio debe permitir: 
    - Listar todas las categorías existentes o los ítems asociados a una etiqueta. 
    - Buscar ítems utilizando distintos criterios, incluyendo categoría, etiquetas, o cualquier otro campo          específico que corresponda para el tipo de ítem. 
    - A los visitantes  indicar cuáles  ítems consideran más interesantes (Me Gusta) y realizar comentarios utilizando su usuario de Facebook. 
    - Ordenar los ítems por cantidad de vistas o por popularidad (cantidad de visitantes que consideran interesante al ítem). 
    - A usuarios administradores: 
          o   Agregar  ítems junto  con una categoría, una o más etiquetas y cualquier otra información que considere relevante. 
          o   Modificar y eliminar los ítems existentes. 
          o   Configurar la forma en que se muestran los ítems en la página principal y los resultados de las  búsquedas   incluyendo,  por ejemplo, si se  muestran ítems  destacados,  la  cantidad de ítems mostrados luego de una búsqueda, el orden por defecto, etc. 
          o   Realizar resguardo de la base de datos y de todos los archivos del servidor en un archivo comprimido y permitir su descarga (opcional).
          
Además, la aplicación debe permitir un método de  consulta  por URL que devuelva un listado simple con todos los ítems obtenidos, para ser utilizado desde otra página web como servicio (iframe). Por ejemplo, el siguiente  link http://carmarks.com/?etiqueta=ford, debería devolver una página web con un listado de los ítems almacenados en un catálogo de automóviles que tienen la etiqueta “ford”. 

Opcional: Incluir con la entrega un instalador (instalar.php) que tome el archivo .zip con la aplicación web, la descomprima, elimine el archivo zip y deje lista la aplicación para su uso, inicializando la base de datos correspondiente. 