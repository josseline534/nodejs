const _data = require('./lib/data')
_data.crear (
    {
        directory:'usuarios',
        file:'test1',
        data:{
            name: 'josseline',
            apellido: 'sanchez',
            edad: 24
        }
    }, error =>{
        if (error) console.log(`ERROR: ${error}`)
        else console.log('Archivo creado correctamente')
    }
)