const inquirer = require('inquirer');
const { v4: uuidv4 } = require('uuid');

require('colors');


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.blue}  Crear tarea`
            },
            {
                value: '2',
                name: `${'2'.blue}  Listar tareas `

            },
            {
                value: '3',
                name: `${'3'.blue}  Listar tareas completadas`

            },
            {
                value: '4',
                name: `${'4'.blue}  Listar Tareas pendientes`

            },
            {
                value: '5',
                name: `${'5'.blue}  Completar tarea(s)`

            },
            {
                value: '6',
                name: `${'6'.blue}  Borrar tarea`

            },
            {
                value: '0',
                name: `${'0'.red}  Salir`

            },
        ]

    }
];

const inquirerMenu = async () => {

    //console.clear();
    console.log('============================'.green);
    console.log('   Seleccione una opcion    '.rainbow);
    console.log('============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async () => {
    uuidv4();
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'enter'.rainbow} para continuar `
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async (message) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]


    const { desc } = await inquirer.prompt(question);

    console.log(desc);

    return desc;

}

const listadoTareasBorrar = async (tareas = []) => {
    console.log();

    const choices = tareas.map((tarea, i) => {
        // console.log('1');

        const idx = `${i + 1}`.rainbow;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0'.red + ' Cancelar'
    });




    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]


    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}


const mostrarListadoChecklist = async (tareas = []) => {
    console.log();

    const choices = tareas.map((tarea, i) => {
        // console.log('1');

        const idx = `${i + 1}`.rainbow;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: ( tarea.completadoEn) ? true : false
        }
    });

  




    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]


    const { ids } = await inquirer.prompt(preguntas);
    return ids;
}



module.exports = {
    inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist
}
