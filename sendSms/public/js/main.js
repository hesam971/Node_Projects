const numberInput = document.getElementById('number'),
textInput = document.getElementById('msg'),
button = document.getElementById('button'),
paragraph = document.querySelector('.something');


button.addEventListener('click',send,false);

// catch socket
const socket = io();
socket.on('smsStatus',(data)=>{
    paragraph.innerHTML = '<h5> text send to the  ' +  data.number  + '</h5>';
})

function send(){
    const  numberInputValue = numberInput.value.replace(/\D/g,'');
    const textValue = textInput.value;

    fetch('/',{
        method:'post',
        headers:{'Content-type':'application/json'},
        body: JSON.stringify({number:numberInputValue,text:textValue})
    }).then(function(res){console.log(res)}).catch(function(err){
        console.log(err)
    })
   
}