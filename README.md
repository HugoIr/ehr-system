Start Docker First

cd src/
./startFabric.sh

clean src/wallet/ dir if neccessary
node enrollAdmin.js && node registerUser.js
node query.js

darimana hyperledger tau contract yang kita buat?
pada startFabric.sh, ada command sbg berikut
./network.sh deployCC -ccn ehr -ccv 1 -cci initLedger -ccl ${CC_SRC_LANGUAGE} -ccp ${CC_SRC_PATH}

CC_SRC_PATH disini adalah alamat chaincode kita.