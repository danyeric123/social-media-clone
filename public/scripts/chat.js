// OMG, CACHED ELEMENT REFERENCES?!?!? NO WAI!!!!
let message = document.getElementById("message");
let recipient = document.getElementById("recipient")
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

send_message.addEventListener("click", () => {
  socket.emit("new_message", {
    username: username.value,
    message: message.value,
    avatar: avatar.value,
  });
  message.value = "";
});

/**
 * When a user presses the 'Enter' key, emit a message containing the 
 * chat info to the server
 */

message.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    socket.emit("new_message", {
      username: username.value,
      message: message.value,
      avatar: avatar.value,
    });
    message.value = "";
  }
});

/**
 * When a user presses a key while typing in the 'message' element, 
 * send the user's name to the server
 */
message.addEventListener("keypress", () => {
  socket.emit("typing", { username: username.value });
});


// Socket events

/**
 * Define/execute a function to get the username from the server so 
 * that it can be broadcast on connection
 */
 function getUserName() {
  fetch("/profiles/getName")
      .then(response => {
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
  socket.on("update-chatter-list", (data) => {
    let chatterList = "<li>" + data.join("</li><li>") + "</li>";
    chatters.innerHTML = chatterList;
  });

// When a user enters the room, play a sound
// socket.on("user-enter", () => {
//   enterAudio.play();
// });

// // When a user leaves the room, play a sound
// socket.on("user-exit", () => {
//   exitAudio.play();
// });

/**
 * When someone is typing (something we'll need the server to tell us),
 * adjust the 'isTyping' element to reflect that
 */
  socket.on("typing", (data) => {
    isTyping.innerText = `${data.username} is typing...`;
  });

/**
 * When a new message is posted, play a sound, update the newMessage 
 * element with the message/user info, and add the message to the 
 * database (we'll check server-side to make sure the message is only 
 * posted once, by checking the id of the user making the post)
 */
 socket.on("new_message", (data) => {
  isTyping.innerText = "";
  let newMessage = document.createElement("p");
  newMessage.innerHTML = `<p><img id="avatar" height="30" src="${data.avatar}" alt=""> ${data.username}: ${data.message}</p>`;
  chatroom.append(newMessage);
  fetch("/chatroom", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      avatar: data.avatar,
      username: data.username,
      message: data.message,
    }),
  });
});