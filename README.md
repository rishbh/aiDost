# Chrome-Extension-Base-Template
This is a basic AI Helper type Bot which help the end user in solving the DSA Problem on the maang.in website .

## Features
1) AI Dost Button with Toggle Functionality:
The button is well-designed and toggles the visibility of the chatbox, providing a seamless UI experience.

2) Interactive Chatbox:
The chatbox opens when the button is clicked, giving users a space to interact with the chatbot.

3) Chat History Persistence:
Saving chat history using chrome.storage.local ensures data persists even after page reloads.
Loading chat history tied to a specific Problem ID is a great touch, allowing contextual discussions.

4) Dynamic Initial Prompt:
Including the problem description in the initial prompt sets the context for AI responses effectively.
Clear instructions for AI behavior ensure consistent and concise responses.

5) API Integration for Responses using Gemini-1.5-flash Application ProgInterface:
Fetching responses dynamically via an API call keeps interactions responsive and adaptable to user input.

7) Delete Chat History:
Giving users control over their chat data with a delete button enhances usability and privacy.

## Author
Rishabh Jain
- [Author Website]()
- [Author Github](https://github.com/rishbh/aiDost)
- [Project Repository](https://github.com/rishbh/aiDost)

## Requirements
Nothing :)
### Knowledge
- Logical Thinking and Thrill to make something on our own :)
###Programming Language
- Javascript
### Tools
- Google Chrome Browser
- Visual Studio
  

## Setup Instructions
### For Developers
1. Make a clone of this project, unzipped.
2. Add your own Gemini-1.5-flash API Key in the content.js file which has variable named as API_KEY
3. Open Chrome Browser
4. In a new or blank tab, type in "chrome://extensions/" (without the quotes of course) and click [Enter].
5. At the top right corner of the page, **enable** "Developer Mode"
6. Click the button on the page that says "Load Unpacked"
7. Navigate to your unzipped project folder and select that and hit OK.
8. You are now ready to start working on the extension! Just make sure you reload after each change you make to see the changes take place.

### For End Users
1. Added the extension in your Chrome browser . 
2. Just open any Practise Problem maang.in . 
3. You will find the AI Dost button below the SampleTestcases .
4. Just use it !! It is user friendly .

## License
Please refer to LICENSE file.
