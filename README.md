# token-sale

After following the *excellent* tutorial given by Gregory from  http://www.dappuniversity.com (github link: https://github.com/dappuniversity/dapp_token) through his Youtube video series (https://www.youtube.com/channel/UCY0xL8V6NzzFcwzHCgB8orQ), I updated the code in a few ways:

1. made compatible with solidity version 5.0 (constructor, added the emit keyword, address(this) for the contract address)
2. Cleaned up promises in testing to use async/await
3. Used the truffle-assertions library (https://www.npmjs.com/package/truffle-assertions) to handle reverts and events
4. Added a beforeEach statement in the contract testing so that contract instance code would be implemented once
5. Added handleError to my App so that the user would receive human readable error messages for common reverts
