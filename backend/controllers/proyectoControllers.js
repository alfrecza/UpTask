import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tareas.js'

const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario)
    res.json(proyectos)
}

const nuevoProyecto = async (req, res) => {
    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario

    try {
        const proyectoAlmacenar = await proyecto.save()
        res.json(proyectoAlmacenar)
    }catch(error){
        console.log(error)
    }
}

const obtenerProyecto = async (req, res) => {
    const { id } = req.params
    if (id.match(/^[0-9a-fA-F]{24}$/)) { 
        const proyecto = await Proyecto.findById(id.trim());

        if(proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error("Accion no válida")
            return res.status(401).json({msg: error.message});
        }

        if(!proyecto) {
            const error = new Error("No existe el proyecto")
            return res.status(404).json({msg: error.message});
        } 

        //Obtener las tareas del proyecto
        const tareas = await Tarea.find().where('proyecto').equals(proyecto._id)
        

        res.json({
            proyecto,
            tareas
        })
    }else{
        return res.status(404).json({msg: "Id inválido"});
    }


}

const editarProyecto = async (req, res) => {

    const {id} = req.params

    if(id.match(/^[0-9a-fA-F]{24}$/)) {
        const {nombre, cliente, fechaEntrega, descripcion} = req.body
        const proyecto = await Proyecto.findById(id.trim())

        if(!proyecto) {
            const error = new Error("No existe el proyecto")
            return res.status(404).json({msg: error.message});
        } 

        if(proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error("Accion no válida")
            return res.status(402).json({msg: error.message})
        }

        proyecto.nombre = nombre || proyecto.nombre
        proyecto.cliente = cliente || proyecto.cliente
        proyecto.fechaEntrega = fechaEntrega || proyecto.fechaEntrega
        proyecto.descripcion = descripcion || proyecto.descripcion

        try {
            await proyecto.save()
            res.json(proyecto)
        } catch(error) {
            console.log(error)
        }


    } else {
        const error = new Error("El id introducida no es válida")
        return res.status(402).json({msg: error.message})
    }
}

const eliminarProyecto = async (req, res) => {
    const {id} = req.params

    if(id.match(/^[0-9a-fA-F]{24}$/)) {
        const proyecto = await Proyecto.findById(id.trim())
       
        if(!proyecto) {
            const error = new Error("El proyecto no existe")
            return res.status(402).json({msg: error.message})
        }

        if(proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error("Accion no válida")
            return res.status(402).json({msg: error.message})
        }

        try {
            await proyecto.deleteOne()
            res.json({msg: "Proyecto eliminado"})
        } catch(error) {
            console.log(error)
        }


    } else {
        const error = new Error("El id introducido no es válido")
        return res.status(402).json({msg: error.message})
    }
}

const agregarColaborador = async (req, res) => {

}

const eliminarColaborador = async (req, res) => {

}



export {obtenerProyectos, nuevoProyecto, obtenerProyecto, editarProyecto, eliminarProyecto, agregarColaborador, eliminarColaborador}