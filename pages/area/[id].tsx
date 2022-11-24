import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import style from './style.module.css'

type Automovel = {
    id: number, 
    modelo: string,
    preco: number
}

export default function Area({}) {
    const Router = useRouter();
    const [data, setData] = useState([]);
    const formatter = new Intl.NumberFormat('pt-BR');
    useEffect(() => {
        fetch(`/api/automoveis?area=${Router.query.id}`).then((res) => res.json()).then((data) => setData(data));
    }, [Router]);
  return (
    <Modal>
        <h1 className={style.area_title}>Área {Router.query.id}</h1>
        {data.map((item : Automovel) => {
            return (
                <div className={style.area_list_container} key={item.id}>
                    <p>Modelo: {item.modelo} | Preço: R${formatter.format(item.preco/100)}</p>
                    <a href={'/venda/'+item.id} className={style.btn_area}>Vender</a>
                </div>
            )
        })}
    </Modal>
  )
}
