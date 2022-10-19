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

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;
}

 const pausa = async() => { uuidv4();
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
            validate( value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
         }
    ]

    
    const {desc} = await inquirer.prompt(question);
    return desc;

 }

 const listadoTareasBorrar = async (tareas = [] ) => {

        const choices = tareas.map( (tarea, i)=> {

            const idx = `${i + 1}`.rainbow;
             
            return {
                value: tarea.id,
                name: `${idx} ${tarea.desc}`
            }
        });

    const preguntas = [
        {
            type: 'List',
            name: 'id',
            message:'Borrar',
            choices
        }
    ]         
    
    
    const {id} = await inquirer.prompt(preguntas);
    return id;


        




   /*  {
        value: 'tarea.id',
        name: `${'1'.blue}  Crear tarea`
    } */
 }



 module.exports = {
    inquirerMenu, pausa, leerInput, listadoTareasBorrar
}
