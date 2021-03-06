App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  loading: false,
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
      App.listenForEvents();
      return App.render();
    });
  },
  listenForEvents: async () => {
    electionInstance = await App.contracts.Election.deployed();
    electionInstance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch( (error, event) => {
        var message = error ? error : "Event triggered: " + event;
        console.log(message);

        App.render();
      });
  },
  castVote: async () => {
    var candidateId = $('#candidatesSelect').val();
    electionInstance = await App.contracts.Election.deployed();
    try {
      result = await electionInstance.vote(candidateId, { from: App.account} );
    } catch(e) {
      App.handleError(e);
    }

  },
  handleError: e => {
    console.log('error...');
    //possible errors
    var messages = ['You can only vote once.', 'Invalid Candidate Id.'];
    var revert_error = false;
    $.each(messages, (index, message) =>
  {
    console.log(message);
    if (e.message.indexOf(message) > -1) {
      revert_error = true;
      alert(message);
      return false;
  }
    });
  if (!revert_error){
    //some unknown error
    alert(e.message);
  }

  },
  render: async () =>  {
    if (App.loading) {
      return false;
    }
    App.loading = true;
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");
    loader.show();
    content.hide();

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

    var candidatesSelect = $("#candidatesSelect");
    candidatesSelect.empty();

    var candidatesResults = $("#candidatesResults");
    candidatesResults.empty();

    for (var i = 1; i <= candidatesCount; i++) {
      candidate = await electionInstance.candidates(i);

      var id = candidate[0];
      var name = candidate[1];
      var voteCount = candidate[2];

      var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>";
      var candidateOption = '<option value="' + id + '">' + name + "</option>";

      candidatesSelect.append(candidateOption);
      candidatesResults.append(candidateTemplate);
    }
    App.loading = false;
    loader.hide();
    content.show();

  }


};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
