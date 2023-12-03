// BigInts are the death of me 

export const fixBigIntTypes = (obj) => {
    for (const key in obj) {
        const value = obj[key]
        if (typeof value == 'bigint') {
            obj[key] = Number(value)
        }
    }
    return obj
}

// abi shit
// export const abi = async (methodName, contractAddress, sender, PK, value, ...methodArgs) => {
//     return new Promise(async (resolve, reject) => {

//     const data = contract.methods[methodName](...methodArgs).encodeABI();
        
//     const tx = {
//             from: sender,
//             to: contractAddress,
//             gas: 2000000,
//             data: data,
//         };
//         if (value) {
//             tx.value = web3.utils.toWei(value.toString(), 'ether');
//         }
//         web3.eth.accounts.signTransaction(tx, privateKey)
//             .then((signedTx) => {
//                 if (!signedTx || !signedTx.rawTransaction) {
//                     reject('Failed to sign the transaction.');
//                     return;
//                 }
        
//                 web3.eth.sendSignedTransaction(signedTx.rawTransaction)
//                     .on('receipt', (receipt) => {
//                         console.log(receipt);
//                         resolve();
//                     })
//                     .on('error', (error) => {
//                         console.error('Transaction failed:', error);
//                         reject(error);
//                     });
//             })
//             .catch((error) => {
//                 console.error('Error signing the transaction:', error.message);
//                 reject(error);
//             });
//     });
// }