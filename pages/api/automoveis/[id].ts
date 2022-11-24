// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import conn from '../conn/conn'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { id } = req.query;

  const data = await conn.promise().query('SELECT * from Automovel where id = '+id)
  const alocacao = await conn.promise().query('SELECT * from Alocacao where fk_Automoveis_id = '+id)
  return res.status(200).json({carro: data[0] ? data[0][0] : null, alocacao: alocacao[0] ? alocacao[0][0] : null});
}
