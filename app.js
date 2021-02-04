// Input Values
let baseVal, termVal, amountVal, color="green";
const myObjects={
    "coCurr":[ 
        {"base":"AUD","term":"USD", "rate":0.8371},
        {"base":"CAD","term":"USD", "rate":0.8711},
        {"base":"USD","term":"CNY", "rate":6.1715},
        {"base":"EUR","term":"USD", "rate":1.2315},
        {"base":"GBP","term":"USD", "rate":1.5683},
        {"base":"NZD","term":"USD", "rate":0.7750},
        {"base":"USD","term":"JPY", "rate":119.95},
        {"base":"EUR","term":"CZK", "rate":27.6028},
        {"base":"EUR","term":"DKK", "rate":7.4405},
        {"base":"EUR","term":"NOK", "rate":8.6651},
  ]
  }
// UI Elements

const baseUI = document.querySelector('#base'),
      termUI = document.querySelector('#term'),
      amountUI = document.querySelector('#amount'),
      convertBtn = document.querySelector('#convert-btn'),
      gameUI = document.querySelector('#game'),
      messageUI = document.querySelector('.message');


// Event listeners for Currency converters

base.addEventListener('input', (event) =>{
    baseVal = event.target.value
    
})

term.addEventListener('input', (event) =>{
    termVal = event.target.value
    
})

amount.addEventListener('input', (event) =>{
    amountVal = event.target.value
    
})

convertBtn.addEventListener('click', () => {
    let result = calculateConverter(baseVal, termVal, amountVal);
    if(termVal==="JPY")
    {

        result = result.toFixed(0);
    }
    else
    {
        result= result.toFixed(2);
    }
    setMessage(`result is ${result}`, color)
})


// Display result

function setMessage(msg, color){
    messageUI.textContent = msg;
    messageUI.style.color = color;
}

// Currency converter function

function calculateConverter(base,term,amount){

    for(var i in myObjects.coCurr)
    {
       if( myObjects.coCurr[i].base=== base && term === myObjects.coCurr[i].term)
        {
            newAmount = myObjects.coCurr[i].rate * amount;
            return newAmount;
        }
        else if( myObjects.coCurr[i].base=== term && myObjects.coCurr[i].term=== base)
        {
            newAmount = 1 / myObjects.coCurr[i].rate *amount;
            return newAmount;
        }
        else if(myObjects.coCurr[i].base ===base &&  term ===myObjects.coCurr[i].base)
        {
                 newAmount = amount;
                 return newAmount;
        }
        else if(base ===myObjects.coCurr[i].base && term!= myObjects.coCurr[i].term)
         {
            for ( var j in myObjects.coCurr)
            {
                if(term === myObjects.coCurr[j].term )
                {
                    if(myObjects.coCurr[j].base=== myObjects.coCurr[i].term)
                    {
                        newAmount = myObjects.coCurr[i].rate * myObjects.coCurr[j].rate * amount;
                        return newAmount;
                    }
                }
            }
        }
        else if(base !=myObjects.coCurr[i].base && term=== myObjects.coCurr[i].term)
        {
           for ( var j in myObjects.coCurr)
           {
               if(base === myObjects.coCurr[j].term )
               {
                   if(myObjects.coCurr[j].base=== myObjects.coCurr[i].base)
                   {
                       newAmount = myObjects.coCurr[i].rate * myObjects.coCurr[j].rate * amount;
                       return newAmount;
                   }
               }
           }
       }
        
            

    
    }
}
    


