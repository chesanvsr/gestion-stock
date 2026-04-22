import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function AjusteStock() {
    const [productos, setProductos] = useState([])
    const [prod, setProd] = useState(0)
    const [fecha, setFecha] = useState('')
    const [motivo, setMotivo] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [ajustes, setAjustes] = useState([])
    const [modo, setModo] = useState('A')

    const handleAceptar = async () => {
        try {
            if (!prod || !fecha || !cantidad) {
                alert('Debe completar los campos indicados con (*)')
                return;
            }
            const ajuste =
            {
                Producto_id: prod,
                Fecha: fecha,
                Motivo: motivo,
                Cantidad: cantidad
            }

            const { data } = await axios.post('http://localhost:3001/ajustes', ajuste)
            if (data) {
                alert('Se grabo el ajuste!')
                cargarAjustes()
                setModo('C')
            }

        } catch (error) {
            console.log('Error al registrar el ajuste| ', error)
        }
    }

    useEffect(() => {
        cargarProductos()
    }, [])

    const cargarProductos = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/productos')
            setProductos(data)
        } catch (error) {
            console.log('Error al cargar los productos: ', error)
        }
    }

    const cargarAjustes = async () => {
        try {
            const { data } = await axios.get('http://localhost:3001/ajustes')
            setAjustes(data)
        } catch (error) {
            console.log('Error al cargar los ajustes: ', error)
        }
    }

    const formatFecha = (fecha) => {
        const [anio, mes, dia] = fecha.toString().split("-");
        return `${dia}/${mes}/${anio}`;
    }

    return (
        <div>
            <p className='fs-5'><strong>Ajustes de Stock</strong></p>
            {
                modo === 'A' && (
                    <form style={{ minWidth: 300 }}>
                        <div className="form-group">
                            <label>Producto (*)</label>
                            <select  value={prod}  onChange={(e) => { setProd(Number(e.target.value)) }} className="form-control" >
                                <option value="">-- Seleccione un producto --</option>
                                {
                                    productos && productos.map((e) => {
                                        return (
                                            <option key={e.Id} value={e.Id} >{e.Nombre} [Stock: {e.Stock} unid.]</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Fecha (*)</label>
                            <input onChange={(e) => { setFecha(e.target.value) }} type='date' className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Cantidad (*)</label>
                            <input onChange={(e) => { setCantidad(e.target.value) }} type='number' className="form-control"></input>
                        </div>
                        <div className="form-group">
                            <label>Motivo</label>
                            <input onChange={(e) => { setMotivo(e.target.value) }} type='text' className="form-control"></input>
                        </div>
                        <div className="form-group mt-5">
                            <button type='button' onClick={handleAceptar} className='btn btn-success'>Aceptar</button>
                            <Link className='btn btn-secondary mx-1' to='/'>Volver</Link>
                        </div>
                    </form>
                )
            }
            {
                modo !== 'A' && (
                    <>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Producto</th>
                                    <th scope="col">Fecha</th>
                                    <th scope="col">Cantidad</th>
                                    <th scope="col">Motivo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ajustes && ajustes.map((e, i) => {
                                    return (
                                        <tr key={i}>
                                            <th>{e.Producto_id}</th>
                                            <td>{new Date(e.Fecha).toLocaleString("es-AR", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric"
                                            })}</td>
                                            <td>{e.Cantidad}</td>
                                            <td>{e.Motivo}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        <Link className='btn btn-secondary mx-1' to='/'>Volver</Link>
                    </>
                )
            }
        </div>
    )
}
