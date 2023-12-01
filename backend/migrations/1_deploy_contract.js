const FriendLend = artifacts.require("FriendLend.sol")

module.exports = function (deployer, network, accounts) {
    deployer.deploy(FriendLend, "testGroup", "joey", "joey123",)
    .then(async () => {
        const dylan = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef"
        const joey_add = "0x69294144bC1445C0E92a4ad3C572249841091544"
        const FLInst = await FriendLend.deployed();
        // assert.equal(await FLInst.memberCount.call(), 1, 'should have 1 members');
        //await FLInst.depositFunds({value: web3.utils.toWei('0.01', 'ether'), from: joey_add}) 
        const joey = await FLInst.members.call(joey_add)
        console.log("joey BALANCE", joey.balance.toString())
    
        // Joet invites dylan, votes yes on him, and joey joins and deposits 2 ether
        await FLInst.proposeInvite(dylan, {from: joey_add});
        await FLInst.voteOnPendingPerson(dylan, true, {from: joey_add});

        await FLInst.join("Dylan", {from: dylan, gas: 200000});
        //await FLInst.depositFunds({ from: accounts[0], value: web3.utils.toWei('0.05', 'ether') }) 
        
        // assert.equal(await FLInst.memberCount.call(), 2, 'should have 2 members')
    });
}