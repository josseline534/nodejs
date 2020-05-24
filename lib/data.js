//dependencias
const fs = require('fs')
const path = require('path')
const baseDirectory = path.join(__dirname, '../data/')

const libData = {
    crear: ({
        directory, 
        file, 
        data
    }, 
    callback) => {
        fs.open(baseDirectory + directory+'/'+file+'.json', 'wx', (error, fileDescriptor)=>{
            if (!error && fileDescriptor) {
                const dataString = JSON.stringify(data)
                fs.writeFile(fileDescriptor, dataString, err =>{
                    if(err) return callback('Error al escribir el nuevo archivo')
                    fs.close(fileDescriptor, err1 =>{
                        if(err1) return callback ('Error Al cerrar el archivo')
                        callback(false)
                    })
                })
            }else{

                callback(`No se pudo crear el archivo ${error}`)
            }
        })
    }  
}
module.exports= libData