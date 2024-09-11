document.getElementById("joinButton").addEventListener("click", function () {
  var selectorForm = document.getElementById("selectorScreen");
  var joinForm = document.getElementById("joinScreen");

  if (joinForm.style.display === "none") {
    joinForm.style.display = "block";
    selectorForm.style.display = "none";
  } else {
    joinForm.style.display = "none";
    selectorForm.style.display = "block";
  };
});

document.getElementById("createButton").addEventListener("click", function () {
  var selectorForm = document.getElementById("selectorScreen");
  var createForm = document.getElementById("createScreen");
  var generatedNumbers = [];
  var h2tag = document.getElementById("roomGenerator");

  if (createForm.style.display === "none") {
    createForm.style.display = "block";
    selectorForm.style.display = "none";
  } else {
    createForm.style.display = "none";
    selectorForm.style.display = "block";
  };

  while (true) {
    var randomNumber =
      Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    if (!generatedNumbers.includes(randomNumber)) {
      generatedNumbers.push(randomNumber);
      h2tag.innerHTML = randomNumber;
      break;
    }
  }
});

//Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, child, get, set, update, remove, onValue } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDolMvT9m2KGB5kDqRxCQwau-AeLZ1N-SQ",
  authDomain: "tic-tac-toe-6d2fd.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-6d2fd-default-rtdb.firebaseio.com",
  projectId: "tic-tac-toe-6d2fd",
  storageBucket: "tic-tac-toe-6d2fd.appspot.com",
  messagingSenderId: "589115832227",
  appId: "1:589115832227:web:fc0bc586e6311c66968c16",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Universal Variables
var wait;

//Creating A Room
document.getElementById("submit1").addEventListener("click", function createGame() {
  var roomCreated = document.getElementById("roomGenerator").textContent;
  var playerName1 = document.getElementById("playerName1").value;

  set(ref(db, roomCreated), {
    playerCount: 1,
    gameState: 0,
  });

  set(ref(db, roomCreated + "/Players/player1/"), {
    name: playerName1,
    sign: "X",
  });

  set(ref(db, roomCreated + "/Players/player2/"), {
    name: null,
    sign: null,
  });

  set(ref(db, roomCreated + "/Game/"), {
    TL: null,
    TM: null,
    TR: null,
    ML: null,
    MM: null,
    MR: null,
    BL: null,
    BM: null,
    BR: null,
  });

  var createForm = document.getElementById("createScreen");
  var waitMessage = document.getElementById("waitScreen");
  
  if (waitMessage.style.display === "none") {
    waitMessage.style.display = "block";
    createForm.style.display = "none";
  } else {
    waitMessage.style.display = "none";
    createForm.style.display = "block";

    console.log("Wait Message Error");
  };
  alert("Data Added Successfully");

  //Adding a Listener to go on the board when other player joins
  const playerCountRef = ref(db, roomCreated + "/playerCount");
  var boardScreen = document.getElementById("boardScreen");

  onValue(playerCountRef, (snapshot) => {
    if (snapshot.val() > 1){
      if (boardScreen.style.display === "none") {
        boardScreen.style.display = "block";
        waitMessage.style.display = "none";
      } else {
        boardScreen.style.display = "none";
        waitMessage.style.display = "block";

        console.log("Board Screen Error");
      };
    };
  });
});

//Join A Room (Only If Present)
document.getElementById("submit2").addEventListener("click", function joinGame() {
  var roomJoined = document.getElementById("roomId").value;
  var playerName2 = document.getElementById("playerName2").value;
  const dbRef = ref(db);

  get(child(dbRef, roomJoined)).then((snapshot) => {
    if(snapshot.exists()) {
      update(ref(db, roomJoined), {
        playerCount: 2,
        gameState: 1
      });
    
      update(ref(db, roomJoined + "/Players/player2/"), {
        name: playerName2,
        sign: "O",
      });

      //Going to the Board
      var boardScreen = document.getElementById("boardScreen");
      var joinForm = document.getElementById("joinScreen");

      if (boardScreen.style.display === "none") {
        boardScreen.style.display = "block";
        joinForm.style.display = "none";
      } else {
        boardScreen.style.display = "none";
        joinForm.style.display = "block";

        console.log("Board Screen Error");
      };

      alert("Data Added Successfully");
    }else {
      alert("No Room Created");
    }
  }).catch((error) => {
    console.error(error);
  });
});

