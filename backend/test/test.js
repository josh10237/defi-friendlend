const FL = artifacts.require("FriendLend");

contract("FriendLend", accounts => {
  it("should do something", async () => {
    // Dylan creates group and deposits 1 eth
    console.log(accounts)
    const FLInst = await FL.new("testGroup2", "dylan", "dylan123", {from: accounts[0]})
    assert.equal(await FLInst.memberCount.call(), 1, 'should have 1 members');
    await FLInst.depositFunds({ from: accounts[0], value: web3.utils.toWei('1', 'ether') }) 
    const dylan = await FLInst.members.call(accounts[0])
    console.log(dylan.balance.toString())

    // Dylan invites joey, votes yes on him, and joey joins and deposits 2 ether
    await FLInst.proposeInvite(accounts[1], { from: accounts[0] });
    await FLInst.voteOnPendingPerson(accounts[1], true, { from: accounts[0] });
    await FLInst.join("joey", { from: accounts[1] });
    await FLInst.depositFunds({ from: accounts[0], value: web3.utils.toWei('12', 'ether') }) 

    assert.equal(await FLInst.memberCount.call(), 2, 'should have 2 members');

  });
});