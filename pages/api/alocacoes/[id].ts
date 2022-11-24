// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import conn from '../conn/conn'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    if(req.method == 'POST'){
        const alocacao = await conn.promise().query('SELECT * from Alocacao where fk_Automoveis_id = ?', [req.body.id])
        if(alocacao[0]){

        }
    }
    return res.status(404).json({message: 'Não encontrado'});
}
