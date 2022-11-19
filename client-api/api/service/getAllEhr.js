const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');
const { EHRParser } = require('../utils/converter');

const getAllEhr = async () => {
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
        const identity = await wallet.get('admin');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        console.log(`identity: ${identity.mspId}`);
        console.log(`identity: ${ccp}`);
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: identity, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('hospital-channel');

        // Get the contract from the network.
        // defined in CC_NAME network-setup.sh
        const contract = network.getContract('fab-healthcare');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction('queryAllEhrs');
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
        // Disconnect from the gateway.
        // console.log("JSON.parse((result)) ", result)
        // console.log("JSON.parse((result)) ", JSON.parse((result)))
        // console.log("JSON.parse((result)) ", result[0])
        // console.log("JSON.parse((result)) ", JSON.parse((result))[0]["Record"].vitalSign)
        
        await gateway.disconnect();
        
        return JSON.parse((result));
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        // process.exit(1);
    }
}

module.exports = {getAllEhr};