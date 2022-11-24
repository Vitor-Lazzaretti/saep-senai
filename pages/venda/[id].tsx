import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Modal from '../../components/Modal/Modal'
import style from './style.module.css'

type Automovel = {
    id: number, 
    modelo: string,
    preco: number
}

export default function Venda({}) {
    const Router = useRouter();
    const [automovel, setAutomovel] = useState({} as Automovel);
    const [venda, setVenda] = useState({clientes: [], concessionarias: []});
    useEffect(() => {
      fetch(`http://localhost:3000/api/automoveis/${Router.query.id}`).then((res) => res.json()).then((data) => setAutomovel(data));
      fetch(`http://localhost:3000/api/venda/`).then((res) => res.json()).then((data) => setVenda(data));
    }, [Router]);
  return (
    <Modal>
        <h1 className={style.venda_title}>{automovel.modelo}</h1>
        <div className={style.form_control}>
          <label htmlFor="concessionarias">Concessionarias</label>
          <select className={style.select} name="concessionarias" id="concessionarias">
              {venda.concessionarias.map((item : Automovel) => {
                  return (
                      <option value={item.id}>{item.concessionaria}</option>
                  )
              })}
          </select>
        </div>
        <div className={style.form_control}>
          <label htmlFor="clientes">Clientes</label>
          <select className={style.select} name="clientes" id="clientes">
              {venda.clientes.map((item : Automovel) => {
                  return (
                      <option value={item.id}>{item.Nome}</option>
                  )
              })}
          </select>
        </div>
        <div className={style.btn_container}>
          <button className={style.btn_venda}>
            Confirmar
          </button>
        </div>
    </Modal>
  )
}
