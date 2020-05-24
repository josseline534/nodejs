Creacion de servidor http con nodejs nativo
    -Creación de funcion:
        -Limpiar ruta
        -obtener metodo
        -Obtener headers
        -Obtener querys
    -Creacion de enrutador
    -Creacion de data y conversion en json
Creacion de lib 
    -Modulo para datos
        -Leer
        -Escribir
        -Actualizar
        -Eliminar
    -Importacion de fs (file System)
    -Importacion de path (modulo para utileria de rutas)
    Creacion de ruta 
        -data
            -usuarios
Funcion crear
    -Recibe un json para guardar o formar la ruta y la informacion (data )
    {
        directory, 
        file, 
        data (objeto JSON)
    } 
    -Recibe un callback
        -fs.open(
            -path o directorio
            baseDirectory + directory+'/'+file+'.json', 
            -flags o accion a realizar en el archivo
            'wx', 
            -callback controla los errores y si existe la ruta 
            (error, fileDescriptor)
        -Convertir data en JSON con stringify
        -Escribir el archivo
        fs.writeFile
            -ruta
            (fileDescriptor, 
            -data convertida en JSON
            dataString, 
            -Callback para controlar el error en caso de no poder escribir el archivo
            err
                -retornar un mensaje de error
            -Cerrar archivo
            fs.close(
                -ruta
                fileDescriptor, 
                -callback para el error en caso de no poder cerrar el archivo
                err1 
                    -retornar mensaje de error
                -En caso de no haber error retornar un false

Creacion de archivo temporal para verificar el correcto comportamiento de la funcion crear
(testData.js)
    -importar data.js
    -enviar el json 
    -callback de error
Ejecutar el archivo temporal
    -node testData.js