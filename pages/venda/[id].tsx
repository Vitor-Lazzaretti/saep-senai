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
    useEffect(() => {
        fetch(`http://localhost:3000/api/automoveis/${Router.query.id}`).then((res) => res.json()).then((data) => console.log(data));
    }, []);
  return (
    <Modal>
        <h1 className={style.area_title}>Área {Router.query.id}</h1>
        
    </Modal>
  )
}
