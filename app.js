const API_KEY = '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'
const submitButton = document.querySelector('#submit')
const outPutElement = document.querySelector('#output')
const inputElement = document.querySelector('input')
const historyElement = document.querySelector('.history')
const buttonElement = document.querySelector('button')

function changeInput(value){
   const inputElement = document.querySelector('input');
   inputElement.value = value
}
//function is called with a value, it finds the first input element on the page and updates its value to the specified value. 
//This function can be used to programmatically change the value of an input element in our application.

async function getMessage() { //answering func
    console.log('clicked')
    const options = {
        method: 'POST',
        headers: { //passes auth to OPEN AI
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ // specifies which model version to utilize
            "model": "gpt-3.5-turbo",
            "messages": [{role: "user", content: inputElement.value }],
            max_tokens: 100
        })
          
    }
    try {
       const response = await fetch('https://api.openai.com/v1/chat/completions', options) //  sends an HTTP request to the specified URL , just requesting the necessary chat completion data from the open-ai API
       const data = await response.json() // retrieves the response from the server and 
       //parses it as JSON data. It waits for the parsing to complete before assigning the parsed data to the data variable.
       outPutElement.textContent = data.choices[0].message.content 
       if (data.choices[0].message.content) { //if we have receive a response checks if the response contains any content. If it does, the code proceeds to execute the following block.
        const pElement = document.createElement('p') //creates p element to house response 
        pElement.addEventListener('click', () => changeInput(pElement.change)) //adds an event listener to click, which calls back on the chnage input func
        pElement.textContent = inputElement.value
        historyElement.append(pElement)  //represent a container or a list where user inputs and responses are displayed.
       }
    } catch (error) {
        console.error(error) //if it breaks it throws error 
    }
}

/* Without the changeInput function, the user would not have a straightforward way to modify their input and trigger a new message retrieval. They would need to manually delete the existing input text and type a new message each time they want to make a change.
If the changeInput function is not present, clicking on a previous input or response would not have any effect on the input field. The text content of the clicked element would not populate the input field automatically. As a result, the user would have to manually delete the existing text and type their new message from scratch.
*/

const clearInput = () => {
    inputElement.value = ''
}

buttonElement.addEventListener('click', clearInput)
submitButton.addEventListener('click', getMessage)
///-------------------------GRADIENT ANIMATIONS----------------------------------//
document.addEventListener('mousemove', function(event) {
    var circle = document.getElementById('circle');
    var container = document.querySelector('.container');
    
    var containerRect = container.getBoundingClientRect();
    var mouseX = event.clientX - containerRect.left;
    var mouseY = event.clientY - containerRect.top;
    
    circle.style.left = mouseX + 'px';
    circle.style.top = mouseY + 'px';
});
  ///-------------------------TRAIL ANIMATIONS----------------------------------//

  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const trailCanvas = document.getElementById('trail-canvas');
  const trailCtx = trailCanvas.getContext('2d');
  trailCanvas.width = window.innerWidth;
  trailCanvas.height = window.innerHeight;
  
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', function(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });
  
  function draw() {
    // Clear the trail canvas
    trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
  
    // Draw the trailing effect
    const gradient = trailCtx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 50);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');
  
    trailCtx.fillStyle = gradient;
    trailCtx.fillRect(0, 0, trailCanvas.width, trailCanvas.height);
  
    // Draw the glow circle
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.filter = 'blur(10px)';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00ffff';
  
    ctx.beginPath();
    ctx.arc(mouseX, mouseY, 50, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    ctx.fill();
  
    requestAnimationFrame(draw);
  }
  
  draw();
  
