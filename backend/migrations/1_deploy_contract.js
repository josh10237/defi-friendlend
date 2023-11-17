const FriendLend = artifacts.require("FriendLend.sol")

module.exports = function (deployer) {
    deployer.deploy(
        FriendLend,
        "Group",
        "Joey",
        "123456"
    )
}