const ConvertLib = artifacts.require("ConvertLib");
const VacunaGuate = artifacts.require("VacunaGuate");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, VacunaGuate);
  deployer.deploy(VacunaGuate);
};
