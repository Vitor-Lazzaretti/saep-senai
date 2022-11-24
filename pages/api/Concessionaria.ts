// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import conn from './conn/conn'

type Data = [{
  id: number,
  concessionaria : string,
}]
type Error = {
  error: string
}

export default async function handler(
  res: NextApiResponse<Data | Error>
) {
  return conn.query('SELECT * from concessionaria', function (err : string, result: Data, fields) {
    if(err) res.status(500).json({error: err})
    return res.status(200).json(result)
  })
}
