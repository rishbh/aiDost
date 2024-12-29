// content.js
// Author:
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the webpage level activities (e.g. manipulating page data, etc.)
// Creation of AI_button , AI Chat Box and handling Webpage activities
// License: MIT

// Function to add the AI Helper AI_button if it doesn't exist
const AI_button_ID="ai-dost-button",
chatBoxID="ai-chat-box",
chatMessagesContainerId='chat-messages-container',
 btnLocationClass="py-4 px-3 coding_desc_container__gdB9M";



// Colors
const btnBackgroundColor="#4CAF50",
chatBoxBackgroundColor="#DDF6FF",
chatBoxHeaderBackgroundColor="#4CAF50",
chatBoxHeaderColor="white"


//Containers
const btncontainer = document.getElementsByClassName(btnLocationClass)[0]

 // Constants
const MAX_TOKENS = 4096; // GPT-3.5-turbo max token limit
const MAX_HISTORY_TOKENS = 3500; // Leave space for the response
lastVisitedPage="";
function isPageChange(){
         const currPage = window.location.pathname;
         if(currPage===lastVisitedPage){
          console.log("LastVisited Page is "+lastVisitedPage)
          console.log("Returning "+"false from isPageChange")
          return false;
         }
         lastVisitedPage=currPage;
         console.log("LastVisited Page is "+lastVisitedPage)
         console.log("Returning "+"true from isPageChange")
        
         return true;
}
function isOnProblemsRoute(){
         const currPathName= window.location.pathname;
         console.log("CurrPathname is "+currPathName)
         return currPathName.startsWith("/problems/") && currPathName.length>"/problems/".length;
}
function isPresentButton(){
        if(!document.getElementById(AI_button_ID)){
          console.log("Button not present")
          return false;
        }
          console.log("Button present")
        return  true;
}
function handlePageChangeEvent(){  
         if(!isPageChange())return;
         // Page changes  -> Check if we are on the Problems Page then addAiButton
         console.log("Page changes now checks ProblemRoute and isPresentButton")
         if(isOnProblemsRoute() && !isPresentButton()){
            addAIHelperAI_button();
         }
         return;
}



// Observe changes to detect when problems are loaded
  const observer = new MutationObserver(() => {
    // Call the function to add the AI_button dynamically
    console.log("Change observed ")
    handlePageChangeEvent();
  });
  observer.observe(document.body , {
      childList: true,
      subtree: true
  });



// Add AI-Button
function addAIHelperAI_button() {
  if (document.getElementById(AI_button_ID)) {
      return;
  }
    
    console.log("Comingt oadd button")
    const AI_button = document.createElement('button');
    AI_button.id = AI_button_ID;
    AI_button.textContent = 'AI Dost';
      AI_button.style.padding = '8px 8px';
    
    AI_button.style.color = 'white';
    AI_button.style.border = 'none';
    AI_button.style.borderRadius = '6px';
    AI_button.style.boxShadow = '0px 4px 6px rgba(12, 26, 222, 0.1)';
    AI_button.style.cursor = 'pointer';
    AI_button.style.zIndex = '1000';
    AI_button.style.height = "fit-content";
    AI_button.style.backgroundColor = btnBackgroundColor;
  /*  AI_button.classList.add("ant-btn" ,"css-19gw05y", "ant-btn-default", "Button_gradient_dark_button__r0EJI", "py-2", "px-4") */

    console.log("Now insertingButton")
    console.log(btncontainer)

    // Append the AI_button to the webpage
    btncontainer.insertAdjacentElement("beforeend",AI_button)

    // Add click event to the AI_button
    AI_button.addEventListener('click', toggleChatBox);
  
};
function toggleChatBox() {
 
  let chatBox = document.getElementById(chatBoxID);
  if (chatBox) {
    chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
  } else {
    createChatBox();
  }
}
function createChatBox() {
  // Create chat box container
  const chatBox = document.createElement('div');
  chatBox.id = 'ai-chat-box';
  chatBox.style.bottom = '80px'; // Adjust to fit above the button
  chatBox.style.right = '20px';
  chatBox.style.width = '650px';
  chatBox.style.height = '500px';
  chatBox.style.backgroundColor = '#ffffff';
  chatBox.style.borderRadius = '20px';
  chatBox.style.boxShadow = '0px 8px 24px rgba(0, 0, 0, 0.2)';
  chatBox.style.display = 'flex';
  chatBox.style.flexDirection = 'column';
  chatBox.style.zIndex = '1001';
  chatBox.style.overflow = 'hidden';

  // Chat header
  const header = document.createElement('div');
  header.textContent = 'AI Helper';
  header.style.padding = '15px';
  header.style.backgroundColor = '#4CAF50';
  header.style.color = 'white';
  header.style.fontSize = '18px';
  header.style.fontWeight = 'bold';
  header.style.textAlign = 'center';

  // Chat messages container
  const messagesContainer = document.createElement('div');
  messagesContainer.id = 'chat-messages';
  messagesContainer.style.flex = '1';
  messagesContainer.style.padding = '10px';
  messagesContainer.style.overflowY = 'auto';
  messagesContainer.style.backgroundColor = '#f0f0f0';
  

  // Input box container
  const inputContainer = document.createElement('div');
  inputContainer.style.display = 'flex';
  inputContainer.style.alignItems = 'center';
  inputContainer.style.padding = '10px';
  inputContainer.style.backgroundColor = '#ffffff';
  inputContainer.style.borderTop = '1px solid #ddd';

  const inputField = document.createElement('input');
  inputField.id = 'chat-input';
  inputField.type = 'text';
  inputField.placeholder = 'Write your Message...';
  inputField.style.flex = '1';
  inputField.style.padding = '10px';
  inputField.style.border = 'none';
  inputField.style.borderRadius = '20px';
  inputField.style.backgroundColor = '#f3f3f3';
  inputField.style.marginRight = '10px';

  const sendButton = document.createElement('button');
  sendButton.textContent = 'Send';
  sendButton.style.padding = '10px 15px';
  sendButton.style.backgroundColor = '#4CAF50';
  sendButton.style.color = 'white';
  sendButton.style.border = 'none';
  sendButton.style.borderRadius = '50%';
  sendButton.style.cursor = 'pointer';

  // Add event listener for sending messages
  sendButton.addEventListener('click', () =>
  handleSendButtonEventListener(messagesContainer , inputField) );

  // Handles Enter key 
  inputField.addEventListener('keydown',(event)=>{
       if(event.key==='Enter'){
        event.preventDefault();
        handleSendButtonEventListener(messagesContainer,inputField)
       }
  })


  inputContainer.appendChild(inputField);
  inputContainer.appendChild(sendButton);

  chatBox.appendChild(header);
  chatBox.appendChild(messagesContainer);
  chatBox.appendChild(inputContainer);
  // Append chat box to the body
  btncontainer.insertAdjacentElement("beforeend",chatBox)
}

function handleSendButtonEventListener(messagesContainer , inputField){
  const message = inputField.value.trim();
  if (message) {
    appendMessage(messagesContainer, 'You', message,'left');
    inputField.value = '';
    const userMessage=processUserInput(message);
    simulateAIResponse(messagesContainer,userMessage);
  }
}
function processUserInput(message){
  return message;
}
// Helper function to format message with code blocks
function formatMessage(message) {
 // Convert code blocks
 const codeBlockRegex = /```(.*?)```/gs;
 message = message.replace(codeBlockRegex, (_, codeContent) => {
   return `
     <pre style="background-color: #f6f8fa; padding: 10px; border-radius: 5px; overflow-x: auto; margin: 10px 0; font-family: monospace;">
       ${codeContent.trim()}
     </pre>
   `;
 });

 // Convert bold text
 const boldRegex = /\*\*(.*?)\*\*/g;
 message = message.replace(boldRegex, '<strong>$1</strong>');

 // Convert newlines to line breaks
 message = message.replace(/\n/g, '<br>');

 // Convert unordered lists
 const unorderedListRegex = /\* (.+)/g;
 message = message.replace(
   unorderedListRegex,
   '<li style="margin-left: 20px;">$1</li>'
 );
 if (message.includes('<li')) {
   message = `<ul>${message}</ul>`;
 }

 // Convert ordered lists
 const orderedListRegex = /\d+\. (.+)/g;
 message = message.replace(
   orderedListRegex,
   '<li style="margin-left: 20px;">$1</li>'
 );
 if (message.includes('<li')) {
   message = `<ol>${message}</ol>`;
 }

 return message;
}

// Function to append user and AI messages
function appendMessage(container, sender, message,align) {

  const formattedMessage = formatMessage(message);
 console.log("formatted message is "+formattedMessage);
  const messageRow = document.createElement('div');
  messageRow.style.display = 'flex';
  messageRow.style.justifyContent = align === 'left' ? 'flex-start' : 'flex-end';
  messageRow.style.margin = '10px 0';

  const messageBubble = document.createElement('div');
  messageBubble.innerHTML=formattedMessage;
  messageBubble.style.padding = '5px';
  messageBubble.style.borderRadius = '15px';
  messageBubble.style.maxWidth = '70%';
  messageBubble.style.wordBreak = 'break-word';
  messageBubble.style.boxShadow = '0px 1px 3px rgba(0, 0, 0, 0.1)';
  
  


  
  if (align === 'left') {
     //User
    messageBubble.style.backgroundColor = '#DCF8C6';
    messageBubble.style.color = '#000';
  } else {
    messageBubble.style.backgroundColor = '#fff';
    messageBubble.style.color = '#000';
  }

  messageRow.appendChild(messageBubble)
  container.appendChild(messageRow);
  container.scrollTop = container.scrollHeight; // Auto-scroll to the bottom
}

// Simulate an AI response
function simulateAIResponse(container,userMessage) {
// Show a typing indicator (optional)
const typingIndicator = appendMessage(container, 'AI', 'AI is typing...', 'right');
  
setTimeout(async () => {
  try {
    // Fetch the AI response
    const aiResponse = await handleAIResponse(userMessage);
    
    // Remove the typing indicator
    if (typingIndicator && typingIndicator.parentNode) {
      console.log("removing the AI is typing ")
      typingIndicator.parentNode.removeChild(typingIndicator);
    }

    // Append the actual AI response
    appendMessage(container, 'AI', aiResponse, 'right');
  } catch (error) {
    console.error('Error handling AI response:', error);

    // Remove the typing indicator
    if (typingIndicator && typingIndicator.parentNode) {
      typingIndicator.parentNode.removeChild(typingIndicator);
    }

    // Show an error message
    appendMessage(container, 'AI', 'Error: Unable to fetch AI response.', 'right');
  }
}, 8000);
}

 function handleAIResponse(userMessage){
          return fetchAIResponse(userMessage)
 }
const API_KEY = '$APIKEY'; // Replace with your actual API key.
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + API_KEY;



// Chat History from chrome storage
let chatHistory = [];

// Load chat history from chrome storage
function loadChatHistory() {
  chrome.storage.local.get('chatHistory', function(result) {
    if (result.chatHistory) {
      chatHistory = result.chatHistory;
    }
  });
}

// Save chat history to chrome storage
function saveChatHistory() {
  chrome.storage.local.set({ 'chatHistory': chatHistory });
}
// Function to calculate available tokens dynamically
function calculateAvailableTokens(prompt) {
  const totalPromptTokens = prompt.length; // Approximate token count
  return MAX_TOKENS - totalPromptTokens - 500; // Reserve space for the response
}

// Function to format chat history for the API
function formatChatHistory(history) {
  return history.map(entry => ({ role: entry.role, content: entry.message }));
}
// Function to truncate chat history dynamically
function truncateHistoryIfNeeded(history, currentMessage) {
  let totalTokens = currentMessage.length; // Start with the current message's length

  history.forEach(entry => {
    totalTokens += entry.message.length;
  });

  while (totalTokens > MAX_HISTORY_TOKENS && history.length > 0) {
    totalTokens -= history[0].message.length;
    history.shift(); // Remove the oldest entry
  }
}
// Function to summarize old history
function summarizeOldHistory(history) {
  if (history.length > 2) {
    const summary = history.slice(0, 2).map(entry => entry.message).join(' ');
    history.splice(0, 2, { role: 'system', message: `Summary: ${summary}` });
  }
}
// Function to send API request with history
async function fetchAIResponse(userMessage) {
  // Add the user's message to history
  chatHistory.push({ role: 'user', message: userMessage });

  // Truncate history if needed
  truncateHistoryIfNeeded(chatHistory, userMessage);

  // Format the history for the API
  const messages = formatChatHistory(chatHistory);

  console.log(" We are sedning the input to the AI is "+messages);
  // Make API request
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: messages }],
          },
        ],
      }),
    });

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: userMessage }],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content.trim();

    // Add the AI's response to history
    chatHistory.push({ role: 'assistant', message: aiResponse });

    return aiResponse;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'Error: Unable to fetch AI response.';
  }
}



handlePageChangeEvent();



