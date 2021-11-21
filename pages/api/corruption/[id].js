
var Corruption = require('../src/index.js');

export default async (req, res) => {

  const {
    query: { id, skipInfura },
    method,
  } = req
  
  
  switch (method) {
    case 'GET':
      let corruption = new Corruption("https://mainnet.infura.io/v3/dc503cd8a1f249a1a6500d0f5f331eca");
      const getAttributes = !!skipInfura ? corruption.attributesNoInfura: corruption.attributes;
      const attributes = await getAttributes(id);
      res.end(JSON.stringify(attributes))
      break
    case 'OPTIONS':
      res.end(JSON.stringify({data: 'OK'}));
      break;
    default:
      res.setHeader('Allow', ['GET', 'OPTIONS'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}
