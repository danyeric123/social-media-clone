let socket = io()

// OMG, CACHED ELEMENT REFERENCES?!?!? NO WAI!!!!
let message = document.getElementById("message");
let username = document.getElementById("username");
let send_message = document.getElementById("send_message");
let chatroom = document.getElementById("chatroom");
let avatar = document.getElementById("avatar");
let isTyping = document.getElementById("isTyping");
let chatters = document.getElementById("chatters");

// Event listeners (No, you're not having a flashback.  Everything will be ok!)

  /**
   * When the JavaScript file is loaded, emit an event with the user's 
   * info to the server
   */


  /**
   * When 'send message' is clicked, emit a message containing the chat 
   * info to the server
   */


  /**
   * When a user presses the 'Enter' key, emit a message containing the 
   * chat info to the server
   */


  /**
   * When a user presses a key while typing in the 'message' element, 
   * send the user's name to the server
   */


// Socket events

  /**
   * Define/execute a function to get the username from the server so 
   * that it can be broadcast on connection
   */
   function getUserName() {
      fetch("/users/getName")
      .then((response) => {
        return response.json()
        .then((data) => {
          socket.emit("register-user", data);
        });
      });
    }
    
    getUserName();


  /**
   * When the socket receives an updated chat list, re-render the list 
   * of users connected
   */


  // When a user enters the room, play a sound
  socket.on("user-enter", () => {
    enterAudio.play();
  });

  // When a user leaves the room, play a sound
  socket.on("user-exit", () => {
    exitAudio.play();
  });

  /**
   * When someone is typing (something we'll need the server to tell us),
   * adjust the 'isTyping' element to reflect that
   */
  
  
  /**
   * When a new message is posted, play a sound, update the newMessage 
   * element with the message/user info, and add the message to the 
   * database (we'll check server-side to make sure the message is only 
   * posted once, by checking the id of the user making the post)
   */