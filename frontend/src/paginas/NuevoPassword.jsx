import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false)
  const [passwordModificada, setPasswordModificada] = useState(false)

  const params = useParams()
  const {token} = params

  useEffect(() => {
    const validarToken = async () => {
      try {
        const {data} = await clienteAxios(`/usuarios/olvide-password/${token}`)
        setTokenValido(true)
        setPasswordModificada(true)
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
    validarToken()

  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    
    if(password.length < 6 ) {
      setAlerta({
        msg: "Las password deben tener como minimo 6 caracteres",
        error: true
      })
      return
    }

    if(password !== repetirPassword) {
      setAlerta({
        msg: "Los password deben coincidir",
        error: true
      })
      return
    }


    try {
        const {data} = await clienteAxios.post(`/usuarios/olvide-password/${token}`, {password})
        setAlerta({
          msg: data.msg,
          error: false
        })
        setTokenValido(false)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }

  }
  
  const {msg} = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Restablece tu password y no pierdas acceso a tus <span className="text-gray-700 ">proyectos</span></h1>

      {msg && <Alerta alerta={alerta}/>}

      {tokenValido && (
        <form action="" className="my-10 bg-white shadow rounded-lg p-10" onSubmit={handleSubmit}>
          <div className="my-5">
            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Nuevo password</label>
            <input type="password" id="password" placeholder="Escribe tu nuevo password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-sky-600" onChange={e => setPassword(e.target.value)} value={password}/>
          </div>
          <div className="my-5">
            <label htmlFor="password2" className="uppercase text-gray-600 block text-xl font-bold">Repetir password</label>
            <input type="password" id="password2" placeholder="Repetir tu password" className="w-full mt-3 p-3 border rounded-xl bg-gray-50 outline-sky-600" onChange={e => setRepetirPassword(e.target.value)} value={repetirPassword}/>
          </div>
          <input type="submit" value="Guardar nuevo password" className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"/>
        </form>
      )}

      {passwordModificada && (
        <Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">Inicia Sesión</Link>
      )}
    </>
  )
}

export default NuevoPassword