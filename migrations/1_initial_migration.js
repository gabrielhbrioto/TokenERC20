const GHBToken = artifacts.require("GHBToken");

module.exports = function(deployer) {
  deployer.deploy(GHBToken);
};
