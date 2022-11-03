/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Ehr extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const ehrs = [
            
        ];

        for (let i = 0; i < ehrs.length; i++) {
            ehrs[i].docType = 'ehr';
            await ctx.stub.putState('EHR' + i, Buffer.from(JSON.stringify(ehrs[i])));
            console.info('Added <--> ', ehrs[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async queryEhr(ctx, ehrId) {
        const ehrAsBytes = await ctx.stub.getState(ehrId); // get the ehr from chaincode state
        if (!ehrAsBytes || ehrAsBytes.length === 0) {
            throw new Error(`${ehrId} does not exist`);
        }
        console.log(ehrAsBytes.toString());
        return ehrAsBytes.toString();
    }

    async createEhr(ctx, 
            id,
            name,
            age,
            sex, 
            nationality,
            medicalRecords,
            vital_sign, 
            medicalHistory, 
            diagnose, 
            immunizationHistory, 
            allergic, 

        ) {
        console.info('============= START : Create Ehr ===========');

        const ehr = {
            name,
            age,
            sex, 
            nationality,
            medicalRecords,
            vital_sign, 
            medicalHistory, 
            diagnose, 
            immunizationHistory, 
            allergic, 
        };

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(ehr)));
        console.info('============= END : Create Ehr ===========');
    }

    async queryAllEhrs(ctx) {
        const startKey = '';
        const endKey = '';
        const allResults = [];
        for await (const {key, value} of ctx.stub.getStateByRange(startKey, endKey)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    async changeEhrOwner(ctx, ehrId, newOwner) {
        console.info('============= START : changeEhrOwner ===========');

        const ehrAsBytes = await ctx.stub.getState(ehrId); // get the ehr from chaincode state
        if (!ehrAsBytes || ehrAsBytes.length === 0) {
            throw new Error(`${ehrId} does not exist`);
        }
        const ehr = JSON.parse(ehrAsBytes.toString());
        ehr.owner = newOwner;

        await ctx.stub.putState(ehrId, Buffer.from(JSON.stringify(ehr)));
        console.info('============= END : changeEhrOwner ===========');
    }

}

module.exports = Ehr;
