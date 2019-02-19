App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: async () =>{
    return await App.initWeb3();
  },

  initWeb3: async () => {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }

    return App.initContract();
  },

  initContract: () => {
    $.getJSON("Election.json", election => {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      App.contracts.Election.setProvider(App.web3Provider);
      return App.render();
    });
  },
  render: async () =>  {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");
    loader.show();
    //content.hide();

    web3.eth.getCoinbase( (err, account) => {
      if (err === null) {
        App.account = account;
        $('#accountAddress').html("Your Account: " + account);
      } else {
        console.warn(err);
      }
    });

    electionInstance = await App.contracts.Election.deployed();
    candidatesCount = await electionInstance.candidatesCount();
    var candidateResults = $("#candidateResults");
    candidateResults.empty();

    for (var i = 1; i <= candidatesCount; i++) {
      candidate = await electionInstance.candidates(i);
      console.log(candidate);
      var id = candidate[0];
      var name = candidate[1];
      var voteCount = candidate[2];

      var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>";
      console.log(candidateTemplate);
      candidateResults.append(candidateTemplate);
    }

    loader.hide();
    content.show();

  }


};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
