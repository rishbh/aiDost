// content.js
// Author: Rishabh 
// Author URI: https://
// Author Github URI: https://www.github.com/
// Project Repository URI: https://github.com/
// Description: Handles all the webpage level activities (e.g. manipulating page data, etc.)
// Creation of AI_button , AI Chat Box and handling Webpage activities


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
         console.log("Page changes now checks ProblemRoute and isPresentButton")
         
         // Function to get the current button container
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
  if (isPresentButton()  ) {
      console.log(" Button is already present or button container is not present ")
      return;
  }

  //Containers
const btncontainer = document.getElementsByClassName(btnLocationClass)[0]
    
    console.log("Coming to add button")
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
   
    // Append the AI_button to the webpage
    btncontainer.insertAdjacentElement("beforeend",AI_button)

    // Add click event to the AI_button
    AI_button.addEventListener('click', toggleChatBox);
  
};
function toggleChatBox() {
 
  let chatBox = document.getElementById("ai-chat-box");

  if (chatBox) {
    console.log("Chatbox is present here ")
    chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
  } else {
    createChatBox();
    console.log("Chatbox is created now ",chatBox)
  }
  chatBox = document.getElementById("ai-chat-box");

  const currentProblemId = getProblemID();
  console.log("Current Problem ID in the toggle fn ",currentProblemId);
  // Load chat history when the chat box is displayed
  console.log("chatbox display is ",chatBox.style.display === 'flex')
  if (chatBox && chatBox.style.display === 'flex') {
    loadChatHistory()
      .then((history) => {
        console.log("History is loaded now ",history)
        chatHistory = history; // Update global chat history
        const messagesContainer = document.getElementById('chat-messages');
        messagesContainer.innerHTML = ''; // Clear previous messages

        // Display chat history
        chatHistory.forEach((entry) => {
          appendMessage(
            messagesContainer,
            entry.role === 'user' ? 'user' : 'model',
            entry.message,
            entry.role === 'user' ? 'left' : 'right'
          );
        });

      })
      .catch((error) => {
        console.error('Error loading chat history:', error);
      });
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
  sendButton.style.borderRadius = '30%';
  sendButton.style.cursor = 'pointer';
  

  // Handles Enter key 
  inputField.addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
     event.preventDefault();
     handleSendButtonEventListener(messagesContainer,inputField)
    }
})

  // Add event listener for sending messages
  sendButton.addEventListener('click', () =>
    handleSendButtonEventListener(messagesContainer , inputField) );
    

  // Delete Chat Button Funtcioning 
  const deleteChatHistoryButton = document.createElement('button');
  deleteChatHistoryButton.textContent = 'Delete Chat';
  deleteChatHistoryButton.style.padding = '5px 10px';
  deleteChatHistoryButton.style.backgroundColor = '#ff5722';
  deleteChatHistoryButton.style.color = 'white';
  deleteChatHistoryButton.style.border = 'none';
  deleteChatHistoryButton.style.borderRadius = '5px';
  deleteChatHistoryButton.style.cursor = 'pointer';

  // Add event listener to delete chat history AFTER messagesContainer is created
  deleteChatHistoryButton.addEventListener('click', () => {
    handleDeleteChatHistory(messagesContainer);
  });
  header.appendChild(deleteChatHistoryButton);


  // Appending Send Button and Delete button in the input container
  inputContainer.appendChild(inputField);
  inputContainer.appendChild(sendButton);

  chatBox.appendChild(header);
  chatBox.appendChild(messagesContainer);
  chatBox.appendChild(inputContainer);
  // Append chat box to the body
  const btncontainer = document.getElementsByClassName(btnLocationClass)[0]
  btncontainer.insertAdjacentElement("beforeend",chatBox)
  return messagesContainer;
}
function sendToAI(messagesContainer,inputField,message){
    const userMessage=processUserInput(message);  
    simulateAIResponse(messagesContainer,userMessage);
}
function handleSendButtonEventListener(messagesContainer , inputField){
  const userMessage = inputField.value.trim();
  if (!userMessage) return;

  // Append user message
  appendMessage(messagesContainer, 'user', userMessage, 'left');
  chatHistory.push({ role: 'user', message: userMessage });

  sendToAI(messagesContainer,inputField,userMessage)

  // Save updated chat history
  saveChatHistory();

  // Clear input field
  inputField.value = '';
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
  // message row
  const messageRow = document.createElement('div');
  messageRow.style.display = 'flex';
  messageRow.style.justifyContent = align === 'left' ? 'flex-start' : 'flex-end';
  messageRow.style.margin = '10px 0';

  // one message bubble 
  const messageBubble = document.createElement('div');
  messageBubble.innerHTML=formattedMessage;
  messageBubble.style.padding = '5px';
  messageBubble.style.borderRadius = '15px';
  messageBubble.style.maxWidth = '70%';
  messageBubble.style.wordBreak = 'break-word';
  messageBubble.style.boxShadow = '0px 1px 3px rgba(0, 0, 0, 0.1)';

   // if allignment is on left 
  if (align === 'left') {
     //user
    messageBubble.style.backgroundColor = '#DCF8C6';
    messageBubble.style.color = '#000';
  } else {
    messageBubble.style.backgroundColor = '#fff';
    messageBubble.style.color = '#000';
  }

  messageRow.appendChild(messageBubble)
  container.appendChild(messageRow);
  container.scrollTop = container.scrollHeight; // Auto-scroll to the bottom
  return messageRow;
}

// Simulate an AI response
async function simulateAIResponse(container,userMessage) {
// Show a typing indicator (optional)
const  typingIndicator = appendMessage(container, 'model', 'AI is typing...', 'right');
  try {
    // Fetch the AI response
    const aiResponse = await makeAICALL(userMessage);
    
    // Remove the typing indicator
    if (typingIndicator && typingIndicator.parentNode) {
      typingIndicator.parentNode.removeChild(typingIndicator);
    }

    // Append the actual AI response
    appendMessage(container, 'model', aiResponse, 'right');
  } catch (error) {
    console.error('Error handling AI response:', error);

    // Remove the typing indicator
    if (typingIndicator && typingIndicator.parentNode) {
      typingIndicator.parentNode.removeChild(typingIndicator);
    }

    // Show an error message
    appendMessage(container, 'model', 'Error: Unable to fetch AI response.', 'right');
  }
}

 function makeAICALL(userMessage){
          return fetchAIResponse(userMessage)
 }

 function getProblemID(){
         if(isOnProblemsRoute()){
            // Get the YRL of the website
            const url = window.location.href;
            console.log("URL we got is ",url);
            // Regular expression to match the problem ID, which follows the last hyphen in the problem name.
            const regex =  /-([\d]+)(\?|$)/;
            const match = url.match(regex);
        
            if (match) {
                console.log(match[1]," is the problem id ");
                return match[1]; // Return the problem ID found in the URL
            }
            return null; // Return null if no problem ID is found
        }
         else{
              console.log("Not on Problem page");
              return null;
         }
 }
const API_KEY = 'AIzaSyAA-XWex0j6pYQ9wTfwKm7tdWSDZtyIDoE'; // Replace with your actual API key.
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key='+API_KEY;



// Chat History from chrome storage
let chatHistory = [];
function extractProblemDescription(){ 
  const targetElement = document.querySelector('.coding_desc__pltWY.problem_paragraph');
  let problemDescription = null;
  if (targetElement) {
    problemDescription = targetElement.textContent.trim(); // Trim extra spaces
  }
  return problemDescription;

}  function makeInitialPrompt() {
    const systemMessage = {
      role: 'model',
      message: "You are an AI assistant helping with DSA questions. Keep responses concise."
    };
  
    // Extract problem description
    const problemDescription = extractProblemDescription();
    if (problemDescription) {
      const problemContextMessage = {
        role: 'user',
        message: `Here is the problem description:\n${problemDescription}`
      };
  
      // Add problem description after the system message
      chatHistory.unshift(problemContextMessage); // Problem context message
    }
  
    // Always include the system message at the beginning
    chatHistory.unshift(systemMessage);
  }
  

// Function to load chat history for a specific problem
async function loadChatHistory() {
  const problemId = getProblemID();
  if (problemId == null) return null;

  const historyKey = `chatHistory_${problemId}`;
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([historyKey], function (result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }

      // Update global chatHistory and resolve
      chatHistory = result[historyKey] || [];
      resolve(chatHistory);
    });
  });
}

 

// Function to save chat history for a specific problem in chrome.storage.local
function saveChatHistory( ) {
  const problemId=getProblemID();
  const history=chatHistory;
  const historyKey = `chatHistory_${problemId}`;
  chrome.storage.local.set({ [historyKey]: history }, function() {
    console.log(`Chat history for ${problemId} saved.`);
  });
}

// Function to calculate available tokens dynamically
function calculateAvailableTokens(prompt) {
  const totalPromptTokens = prompt.length; // Approximate token count
  return MAX_TOKENS - totalPromptTokens - 500; // Reserve space for the response
}

// Function to format chat history for the API
function formatChatHistory(history) {
  return history.map(entry => ({
    "role": entry.role==='system'?'model':entry.role,
    "parts": [
      { "text": entry.message }
    ],
  }));
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
    
    chatHistory = await loadChatHistory()
    if(chatHistory.length>0){
     
    }else{ makeInitialPrompt();}
  // Truncate history if needed
  truncateHistoryIfNeeded(chatHistory, userMessage);

  // Format the history for the API
  let contents=formatChatHistory(chatHistory);
  console.log("ActualContents is ",contents)
  console.log("Contents after formatted history :", JSON.stringify({ contents }, null, 2));
  console.log("History previously is ",chatHistory)
 // let contents = formatChatHistory(chatHistory);
  console.log("History after formatting  is ",chatHistory)


  // Log the payload for debugging


  let contents4=JSON.stringify({  "contents": [
      {
        "role": "system",
        "parts": [
          {
            "text": "You are an AI assistant helping with DSA questions. Provide concise and clear explanations."
          }
        ]
      },
      {
        "role": "user",
        "parts": [
          {
            "text": "I have the following DSA problem: 'Find the longest common subsequence in two strings. Can you help me solve this?'"
          }
        ]
      },
      {
        "role": "model",
        "parts": [
          {
            "text": "Sure! Let's break down the problem step by step."
          }
        ]
      },
      {
        "role": "user",
        "parts": [
          {
            "text": "Here is the problem description: 'Given two sequences, find the longest subsequence that appears in both sequences.'"
          }
        ]
      },
      {
        "role": "model",
        "parts": [
          {
            "text": "To solve this, we can use dynamic programming. First, create a 2D table to store the lengths of common subsequences."
          }
        ]
      },
      {
        "role": "user",
        "parts": [
          {
            "text": "Can you provide a solution?"
          }
        ]
      },
      {
        "role": "model",
        "parts": [
          {
            "text": "Sure! Here’s the Python code to find the longest common subsequence:"
          },
          {
            "text": "def lcs(X, Y):\n  m = len(X)\n  n = len(Y)\n  dp = [[0]*(n+1) for _ in range(m+1)]\n\n  for i in range(1, m+1):\n    for j in range(1, n+1):\n      if X[i-1] == Y[j-1]:\n        dp[i][j] = dp[i-1][j-1] + 1\n      else:\n        dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n\n  return dp[m][n]"
          }
        ]
      },
      {
        "role": "user",
        "parts": [
          {
            "text": "What are some hints for solving this problem?"
          }
        ]
      },
      {
        "role": "model",
        "parts": [
          {
            "text": "Here’s a hint: Try breaking the problem into smaller subproblems by comparing the characters of the two strings one by one."
          }
        ]
      }
    ]})

  let contents3 =JSON.stringify({contents: [
   
    {
      "role": "user",
      "parts": [
        {
          "text": "You are an AI assistant helping with DSA questions. Keep responses concise."
        }
      ]
    },
    {
      "role": "user",
      "parts": [
        {
          "text": "hi"
        }
      ]
    },
    {
      "role": "user",
      "parts": [
        {
          "text": "hello"
        }
      ]
    },
    {
      "role": "model",
      "parts": [
        {
          "text": "There are 8 paws in your house (2 dogs x 4 paws/dog)."
        }
      ]
    },
    {
      "role": "user",
      "parts": [
        {
          "text": "hello"
        }
      ]
    },
    {
      "role": "model",
      "parts": [
        {
          "text": "There are 8 paws in your house (2 dogs x 4 paws/dog)."
        }
      ]
    },
    {
      "role": "user",
      "parts": [
        {
          "text": "hi"
        }
      ]
    },
    {
      "role": "user",
      "parts": [
        {
          "text": "AI"
        }
      ]
    }
  ]
})
  console.log(" contents being passed to the AI is  ",JSON.stringify({contents}));
  contents = JSON.stringify({ contents }, null, 2);
  console.log("Contents before sending:", contents);
  // Make API request
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: contents,
      
    });
     
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    let aiResponse="";
    if(data.candidates && data.candidates.length >0 ){
       aiResponse = data.candidates[0].content.parts[0].text.trim();
       console.log("AI Resposne is ",aiResponse)
    }else{
      console.error("No candidates fond in the aiResponse");
    }
    
    // Add the AI's response to history
    if(aiResponse)
    chatHistory.push({ role: 'model', message: aiResponse });
    else
    console.warn("Empty repsosne from AI ,Not adding to chatHistory")

    // save the updated Chat History to storage
    saveChatHistory();
    return aiResponse;
  } catch (error) {
    console.error('Error fetching AI response:', error);
    return 'Error: Unable to fetch AI response.';
  }
}
function handleDeleteChatHistory(messagesContainer){
  
console.log('Messages container before clearing:', messagesContainer.innerHTML);

deleteChatHistory().then(() => {
  // Clear messages from chatbox
  messagesContainer.innerHTML = '';
  console.log('Messages container cleared:', messagesContainer.innerHTML);
})
.catch(error => console.error('Error clearing chat history:', error));
}

function deleteChatHistory() {
  return new Promise((resolve, reject) => {
    const problemId = getProblemID();
    if (problemId == null) {
      console.error("Problem ID is null. Cannot delete chat history.");
      reject("Problem ID is null.");
      return;
    }

    const historyKey = `chatHistory_${problemId}`;
    console.log('before deleting', JSON.stringify({ chatHistory }));

    // Clear local storage
    chrome.storage.local.remove(historyKey, function () {
      if (chrome.runtime.lastError) {
        console.error(`Failed to delete chat history for problem ID ${problemId}:`, chrome.runtime.lastError);
        reject(chrome.runtime.lastError);
        return;
      }

      console.log(`Chat history for problem ID ${problemId} has been deleted.`);

      // Clear global chatHistory
      chatHistory.length = 0; // Clear the array
      console.log('Global chatHistory cleared:', chatHistory);

      resolve();
    });
  });
}


handlePageChangeEvent();
