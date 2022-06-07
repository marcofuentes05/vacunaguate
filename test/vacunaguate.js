const VacunaGuate = artifacts.require("VacunaGuate");

contract('VacunaGuate', (accounts) => {
  it('Should mint a new NFT and assign it to first wallet', async () => {
    const contract = await VacunaGuate.deployed();
    const accounts = await web3.eth.getAccounts();

    const result = await contract.mint(accounts[0], 5);

    const owner = await contract.getOwnerOfToken(5);

    assert.equal(owner, accounts[0], "Token was not assigned to the first wallet");
  });

  it('Should mint a new NFT to first wallet and transfer it to second wallet', async () => {

    const contract = await VacunaGuate.deployed();
    const accounts = await web3.eth.getAccounts();

    const result = await contract.mint(accounts[0], 5);

    const transferResult = await contract.transfer(accounts[1], 5);

    const wallet2Tokens = await contract.getTokensOfId(accounts[1]);

    assert.equal(wallet2Tokens[0], 5, 'Token was not transferred to the second wallet');
  });

  it('Should retreive a wallets own NFTs', async () => {
    const contract = await VacunaGuate.deployed();
    const accounts = await web3.eth.getAccounts();

    let result = await contract.mint(accounts[3], 5);

    result = await contract.mint(accounts[3], 56);

    const tokens = await contract.getTokensOfId(accounts[3]);

    assert.equal(tokens[0].words[0], 5, 'Token 1 was not assigned to the first wallet');
    assert.equal(tokens[1].words[0], 56, 'Token 2 was not assigned to the first wallet');
  });
});
