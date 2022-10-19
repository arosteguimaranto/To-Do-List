
require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar } = require('./helpers/inquirer');

const { Tareas } = require('./models/tareas');


const main = async () => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) { // cargar tareas
        tareas.cargarTareasFromArray(tareasDB);

    }

    do {
        // //Imprimir el menur
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //crear opcio/*  */n
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea(desc);
                break;

            case '2':
                tareas.listadoCompleto();

                break;

            case '3': // listar completadas

                tareas.listarPendientesCompletadas(true);
                break;

            case '4':

                tareas.listarPendientesCompletadas(false);

                break;
            
            case '6': // listar pendientes

            const id = await listadoTareasBorrar( tareas.listadoArr);
            
            
            break;


        }


        guardarDB(tareas.listadoArr);

        await pausa();


    } while (opt !== '0');




    //pausa();
}

main();