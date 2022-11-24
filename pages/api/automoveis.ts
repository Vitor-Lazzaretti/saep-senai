// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import conn from './conn/conn'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { area } = req.query;

  let where = ' where 1=1';
  if(area){
    const carsIds = await conn.promise().query(`SELECT fk_Automoveis_id from alocacao where area = '${area}'`);
    where += ` and id in (${carsIds[0].map((car: any) => car.fk_Automoveis_id).join(',')})`;
  }
  
  const data = await conn.promise().query('SELECT * from Automovel'+where)
  return res.status(200).json(data[0]);
}
