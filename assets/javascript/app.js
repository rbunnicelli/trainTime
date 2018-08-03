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
    //create object
    var trainInfo = {
      trainAdded: userTrain,
      destAdded: userDest,
      firstTimeAdded: userFirstTime,
      freqAdded: userFreq
    }
    //push to firebase to store data for these four values
    database.ref().push(trainInfo);

    $("#train_name").val("");
    $("#destination").val("");
    $("#firstTrain").val("");
    $("#frequency").val("");
  })

  //firebase watching this function, gets info from previous button handler (prevChildKey)
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    //local variables that capture value in firebase object
    var train = childSnapshot.val().trainAdded;
    var dest = childSnapshot.val().destAdded;
    var firstTimeofTrain = childSnapshot.val().firstTimeAdded;
    var freqMins = childSnapshot.val().freqAdded;

    //takes the time the user input and converts to hours and minutes. Subtract year to make sure its before the time right now
    var firstTimeConverted = moment(firstTimeofTrain, "HH:mm").subtract(1, "years");
    
    //sets moment() to the current time
    var currentTime = moment();
    
    //difference between current time and the user input time
    var diffInTime = moment().diff(moment(firstTimeConverted), "minutes");
    
    //divides the difference in time by how often the train comes
    var remainder = diffInTime % freqMins;
    
    //how often the train comes minus difference in time 
    var minutesAway = freqMins - remainder;
   
    //claculate next arrival time based the amount of minutes away
    var nextTrainArrival = moment().add(minutesAway, "minutes").format("HH:mm");
    

    //appends the local variables based on the user input to the table
    $("#trainInfo").append("<tr><td>" + train + "</td>" + "<td>" + dest +"</td> + <td>" + freqMins + "</td> + <td id = 'next'>" + nextTrainArrival + "</td> + <td = 'minAway'>" + minutesAway + "</td></tr>");
  });

