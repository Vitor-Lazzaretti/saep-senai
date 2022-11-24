// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import conn from '../conn/conn'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const alocacao = await conn.promise().query('SELECT * from Alocacao where fk_Automoveis_id = '+ req.query.id)
    if(alocacao[0]){
        let alocacaoAuto = alocacao[0][0];
        if(alocacaoAuto){
            if(alocacaoAuto.quantidade > 1){
                await conn.promise().query('UPDATE Alocacao SET quantidade='+(alocacaoAuto.quantidade-1)+' where id = '+ alocacaoAuto.id)
            }else{
                await conn.promise().query('DELETE from Alocacao where id = '+ alocacaoAuto.id)
            }
            res.json(alocacaoAuto);
        }
    }
    return res.status(404).json({message: 'Não encontrado'});
}
