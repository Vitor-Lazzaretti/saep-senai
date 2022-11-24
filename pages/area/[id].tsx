import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import style from './style.module.css'

type Automovel = {
    id: number, 
    modelo: string,
    preco: number
}

export default function Automoveis({}) {
    const Router = useRouter();
    const [data, setData] = useState([]);
    const formatter = new Intl.NumberFormat('pt-BR');
    useEffect(() => {
        fetch(`http://localhost:3000/api/automoveis?area=${Router.query.id}`).then((res) => res.json()).then((data) => setData(data));
    }, [Router]);
  return (
    <div className={style.area_container}>
        <div className={style.area}>
            <div className={style.area_head_container}>
                <img src="/x.svg" alt="X" />
            </div>
            <div className={style.content_area}>
                <h1 className={style.area_title}>Área {Router.query.id}</h1>
                {data.map((item : Automovel) => {
                    return (
                        <div className={style.area_list_container} key={item.id}>
                            <p>Modelo: {item.modelo} | Preço: R${formatter.format(item.preco/100)}</p>
                            <button className={style.btn_area}>Vender</button>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}
