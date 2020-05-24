//creacion de servidor
//puertos
const puertoHttp= 80
const puertoHttps=443
//dependencias
const http = require('http')
const server = require('./servidor/servidorUnificado')

const serverhttp = http.createServer(server)

//crear servidor

serverhttp.listen(puertoHttp, ()=>{
    console.log(`Servidor escuchando en el puerto ${puertoHttp}`)
})