const { Gateway, Wallets, DefaultQueryHandlerStrategies, DefaultEventHandlerStrategies } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const { getAllEhrParser } = require('../utils/converter');
// const fabproto6 = require('fabric-protos');

const getAllEhr = async (user) => {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', '..', '..',   'consortium', 'crypto-config', 'peerOrganizations', 'hospital', 'connection-hospital.json');
        
        // ccp = connection profile
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(user);
        if (!identity) {
            throw "User does not exist"
        }
        console.log(`identity: ${identity.mspId}`);
        console.log(`identity: ${ccp}`);
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        // await gateway.connect(ccp, { wallet, identity: identity, discovery: { enabled: true, asLocalhost: true },
        //     queryHandlerOptions: {strategy: DefaultQueryHandlerStrategies.PREFER_MSPID_SCOPE_ROUND_ROBIN}, 
        //     eventHandlerOptions: {strategy: DefaultEventHandlerStrategies.MSPID_SCOPE_ALLFORTX},
        //  });
        await gateway.connect(ccp, { wallet, identity: identity, discovery: { enabled: true, asLocalhost: true }
         }); 

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('hospital-channel');

        // Get the contract from the network.
        // defined in CC_NAME network-setup.sh
        const contract = network.getContract('fab-healthcare');
        // const qAll= contract.createTransaction('queryAllEhrs')
        // console.log("Qall", qAll)
        // Evaluate the specified transaction.
        let result = await contract.evaluateTransaction('queryAllEhrs');
        
        // const qscc = network.getContract('qscc');
        // const resultGetBlockByNumber = await qscc.evaluateTransaction('GetBlockByNumber', 'hospital-channel', '5');
        // const resultDecoded = JSON.stringify(fabproto6.common.Block.decode(resultGetBlockByNumber));
    
        // const resultDecoded = JSON.stringify(resultGetBlockByNumber);
        // console.log("RES ", resultDecoded)
        
        
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        
        await gateway.disconnect();
        
        return getAllEhrParser(result);
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        throw error.toString();
    }
}

module.exports = {getAllEhr};