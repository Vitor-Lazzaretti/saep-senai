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
    const [automovel, setAutomovel] = useState({carro: {} as any, alocacao: {} as any});
    const [venda, setVenda] = useState({clientes: [], concessionarias: []});
    useEffect(() => {
      fetch(`/api/automoveis/${Router.query.id}`).then((res) => res.json()).then((data) => setAutomovel(data));
      fetch(`/api/venda/`).then((res) => res.json()).then((data) => setVenda(data));
    }, [Router]);
    function submit(){
      const form = document.getElementById('form') as HTMLFormElement;
      const formData = new FormData(form);
      fetch('/api/alocacoes/'+Router.query.id, {
        method: 'POST',
        body: formData
      }).then((res) => res.json()).then((data) => {
        alert('Venda realizada com sucesso!');
        Router.push('/');
      });
    }
  return (
    <Modal>
        <h1 className={style.venda_title}>{automovel.carro.modelo} - Quantidade: {automovel.alocacao.quantidade}</h1>
        <form action={"/api/automoveis/"+Router.query.id} id="form" method="post"></form>
        <div className={style.form_control}>
          <label htmlFor="concessionarias">Concessionarias</label>
          <select className={style.select} name="concessionarias" id="concessionarias">
              {venda.concessionarias.map((item : any) => {
                  return (
                      <option value={item.id}>{item.concessionaria}</option>
                  )
              })}
          </select>
        </div>
        <div className={style.form_control}>
          <label htmlFor="clientes">Clientes</label>
          <select className={style.select} name="clientes" id="clientes">
              {venda.clientes.map((item : any) => {
                  return (
                      <option value={item.id}>{item.Nome}</option>
                  )
              })}
          </select>
        </div>
        <div className={style.btn_container}>
          <input onClick={()=>submit()} type={'submit'} className={style.btn_venda} value="Confirmar" />
        </div>
    </Modal>
  )
}
