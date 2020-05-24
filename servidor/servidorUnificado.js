//dependencias
const url = require('url')
const dataUser= require('../lib/data')
//payload
const payload= require('string_decoder').StringDecoder
//enrutamiento de request retornar objeto json
const enrutador={
    ejemplo:(data,callback)=>{
        callback(200, JSON.stringify({ mensaje:'Esto es una prueba' }))
    },
    usuarios: (data, callback)=>{
        switch(getMethod(data)){
            case 'get':
                break
            case 'post':
                const identificador= 3
                dataUser.crear(
                    {
                        directory:data.ruta,
                        file:identificador,
                        data: data.buffer
                    },error => {
                        if (error) callback(404,JSON.stringify({ mensaje:error }))
                        else {
                            callback(200, JSON.stringify({ mensaje:data.buffer }))
                        }
                    }
                )
                break
            case 'put':
                break
            case 'delete':
                break
            default:
                console.log(`METODO: ${getMethod(data)}`)
                break
        }
    },
    noEncontrado: (data, callback)=>{
        callback(404,JSON.stringify({ mensaje:'no encontrado' }))
    }
}

const server =(req, res)=>{
    //observar el objeto request (req)
    //console.log(req)
    //observar la url que devuelve el request
    console.log(`URL: ${req.url}`)
    //obtener la url como cadena codificada
    //url.parse(urlString[, parseQueryString[, slashesDenoteHost]])
    //urlString= req.url
    //parseQueryString = boolean true codificar false sin codificar (opcional)
    //slashesDenoteHost = boolean true {host: 'foo', pathname: '/bar'}
    const urlParseada= url.parse(req.url, true,true)
    //console.log(`urlParseada: ${urlParseada}`)
    //obtener la ruta
    const ruta= urlParseada.pathname
    console.log(`RUTA: ${ruta}`)
    //crear enrutador
    
    const rutaLimpia =limpiarRuta(ruta)
    console.log(`RUTA LIMPIA: ${rutaLimpia}`)
    const method = getMethod(req)
    console.log(method)
    //Obtener los query variables de lo formularios por ejemplo 
    //?variable=valor&variab
    const query = urlParseada.query
    console.log(query)
    //obtener headers
    const headers= req.headers
    console.log(`headers: ${headers}`) 
    
    //obtener payload si hay
    const decoder = new payload('utf-8')

    //crear controlador que va a guardar la data
    let buffer=''
    //escuchar si hay data

    req.on('data',data=>{
        //concatenar la data dentro den controlador
        buffer += decoder.write(data)
        console.log(`DATA: ${data}`)
    })

    req.on('end', ()=>{
        buffer += decoder.end()
        console.log(`BUFFER: ${buffer}`)
        //creacion de objeto data
        const data ={
            ruta:rutaLimpia,
            query,
            method,
            headers,
            buffer
        }
        let handler =''
        if (rutaLimpia && enrutador[rutaLimpia])
            handler=enrutador[rutaLimpia]
        else
            handler=enrutador.noEncontrado

        handler(data, (statusCode=200, mensaje)=>{
            res.setHeader('content-type', 'application/json')
            res.writeHead(statusCode)
            res.end(mensaje)
        })
    })
    
}
const limpiarRuta = (ruta)=>{ 
    //ruta limpia
    return ruta.replace(/^\/+|\/+$/g,'').toLowerCase() 
}

const getMethod = (request)=> request.method.toLowerCase() //obtener metodos
module.exports=server