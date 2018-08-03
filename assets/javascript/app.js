  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD1-vEq86gWS_GMuvv7-2Iiuz6luUkm-UU",
    authDomain: "trainscheduler-245bb.firebaseapp.com",
    databaseURL: "https://trainscheduler-245bb.firebaseio.com",
    projectId: "trainscheduler-245bb",
    storageBucket: "trainscheduler-245bb.appspot.com",
    messagingSenderId: "512040376400"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $(".button").on("click", function() {
    event.preventDefault();
    //capturing the value of the user input fields
    var userTrain = $("#train_name").val().trim();
    var userDest = $("#destination").val().trim();
    var userFirstTime = $("#firstTrain").val().trim();
    var userFreq = $("#frequency").val().trim();
    
    var trainInfo = {
      trainAdded: userTrain,
      destAdded: userDest,
      firstTimeAdded: userFirstTime,
      freqAdded: userFreq
    }

    database.ref().push(trainInfo);

    $("#train_name").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
  })

  setInterval(function(startTime) {
    $()
  })

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    var train = childSnapshot.val().trainAdded;
    var dest = childSnapshot.val().destAdded;
    var firstTimeofTrain = childSnapshot.val().firstTimeAdded;
    var freqMins = childSnapshot.val().freqAdded;
    
    var firstTimeConverted = moment(firstTimeofTrain, "HH:mm").subtract(1, "years");
    console.log("1st time: " + firstTimeConverted);

    var currentTime = moment();
    console.log("current time: " + currentTime);

    var diffInTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("diffInTime: " + diffInTime);

    var remainder = diffInTime % freqMins;
    console.log("remainder: " +remainder);

    var minutesAway = freqMins - remainder;
    console.log("minutesAway: " + minutesAway);

    var nextTrainArrival = moment().add(minutesAway, "minutes").format("HH:mm");
    console.log("next arrival: " + nextTrainArrival);

    $("#trainInfo").append("<tr><td>" + train + "</td>" + "<td>" + dest +"</td> + <td>" + freqMins + "</td> + <td>" + nextTrainArrival + "</td> + <td>" + minutesAway + "</td></tr>");
  });



