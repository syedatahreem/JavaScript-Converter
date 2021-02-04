// Input Values
let baseVal, termVal, amountVal, color="green";
const myObjects=
{
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

const listOfCurrencies = ["AUD", "USD", "CAD", "CNY", "EUR", "GBP", "NZD", "JPY", "CZK", "DKK", "NOK" ]

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
    baseVal = baseVal.toUpperCase()
    
})

term.addEventListener('input', (event) =>{
    termVal = event.target.value
    termVal = termVal.toUpperCase()
})

amount.addEventListener('input', (event) =>{
    amountVal = event.target.value
    
})


convertBtn.addEventListener('click', () => {

    if(!(listOfCurrencies.includes(baseVal) && listOfCurrencies.includes(termVal))) {
        // Cannot convert as values entered are out of scope
        color = "red"
        setMessage(`Unable to find rate for ${baseVal} / ${termVal}`, color)
}
else {

    let result = calculateConverter(baseVal, termVal, amountVal);
    // JPY is fixed to 0 decimal places
    if(termVal==="JPY")
    {
        result = result.toFixed(0);
    }
    else
    {  // Rest countries are fixed to 2 decimal places
        result= result.toFixed(2);
    }
        setMessage(`The converted value from ${baseVal} to ${termVal} is ${result}`, color)

}
         baseUI.value= ''
         termUI.value=''
         amountUI.value= ''
         color ="green"

})

 

// Display result

function setMessage(msg, color){
    messageUI.textContent = msg;
    messageUI.style.color = color;
}

// Currency converter function

function calculateConverter(base,term,amount){

    let newAmount;

    for(var i in myObjects.coCurr)

    {
        // Base to Term exists
       if( myObjects.coCurr[i].base=== base && term === myObjects.coCurr[i].term)
        {
            newAmount = myObjects.coCurr[i].rate * amount;
            return newAmount;
        }

        // Base to Term inverted exists
        else if( myObjects.coCurr[i].base=== term && myObjects.coCurr[i].term=== base)
        {
            newAmount = (1 / myObjects.coCurr[i].rate )*amount;
            return newAmount;
        }

        // Base = Term
        else if(base===term)
        {
            newAmount = 1* amount;
            return newAmount;
        }

        //Base to reference and Reference to Term exists.
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
                    else if(myObjects.coCurr[j].base != myObjects.coCurr[i].term)
                    {
                        
                        let tempResult = calculateConverter(base, myObjects.coCurr[j].base , 1 );
    
                         let newObject = {"base" : base, "term":myObjects.coCurr[j].base, rate: parseFloat(tempResult.toFixed(4)) }
    
                         myObjects.coCurr.push(newObject);
                         if(base ===myObjects.coCurr[i].base && term === myObjects.coCurr[j].term)
                         {
                               
                            if(newObject.term=== myObjects.coCurr[j].base)
                            {
                                
                                newAmount = newObject.rate * myObjects.coCurr[j].rate * amount;
                                 
                                return newAmount;
                                
                            }
                         }

                        myObjects.coCurr.pop()
                         
                          
                    }
                    
                }
                else if( term=== myObjects.coCurr[j].base)
                {
                     if(myObjects.coCurr[i].term === myObjects.coCurr[j].term)
                    {
                        
                         
                         newAmount = (myObjects.coCurr[i].rate / myObjects.coCurr[j].rate) * amount;
                         return newAmount;
                    }
                }
                
            }
        }

        //Reference to Base and Term to Reference exists.
        else if(base ===myObjects.coCurr[i].term && term !== myObjects.coCurr[i].base)
        {
           for ( var j in myObjects.coCurr)
           {
               if(term === myObjects.coCurr[j].base )
               {
                 
                   if(myObjects.coCurr[j].term=== myObjects.coCurr[i].base)
                   {
                         
                        newAmount = (1 / (myObjects.coCurr[i].rate * myObjects.coCurr[j].rate)) * amount;
                        
                        return newAmount;
                   }
               }
               else if(term === myObjects.coCurr[j].term ) 
              
               { 
                   if (myObjects.coCurr[j].base === myObjects.coCurr[i].base)
                   {
                       
                      newAmount = (1/ myObjects.coCurr[i].rate) * myObjects.coCurr[j].rate * amount;
                      return newAmount;
  
                   }
                      
               }
               
           }
       }
     // reference to base and  base to reference exists hence cross 
     else if(base !=myObjects.coCurr[i].base && term=== myObjects.coCurr[i].term)
        {
           for ( var j in myObjects.coCurr)
           {
               if(base === myObjects.coCurr[j].term )
               {
                 
                   if(myObjects.coCurr[j].base=== myObjects.coCurr[i].base)
                   {
                       newAmount = (myObjects.coCurr[i].rate / myObjects.coCurr[j].rate) * amount;
                       return newAmount;
                   }
               }
           }
       }

       // Cross takes place, inversion of base and term is calculated
       else if(base!= myObjects.coCurr[i].base && term!= myObjects.coCurr[i].term)
       { 
        
           for ( var j in myObjects.coCurr)
        {
             

            if(term!= myObjects.coCurr[j].term && base=== myObjects.coCurr[j].term && term=== myObjects.coCurr[i].base)
            {
                 
                if(myObjects.coCurr[i].term === myObjects.coCurr[j].base )
                {
                    newAmount = (1/ (myObjects.coCurr[i].rate * myObjects.coCurr[j].rate)) * amount;
                    return newAmount;
                }

            }
            else if(term!= myObjects.coCurr[j].term && base=== myObjects.coCurr[i].term && term=== myObjects.coCurr[j].base)
            {
                 
               if( myObjects.coCurr[i].base === myObjects.coCurr[j].term )
               {
                newAmount = (1/ (myObjects.coCurr[i].rate * myObjects.coCurr[j].rate)) * amount;
                return newAmount;

               }
          

               }
            }
        }

       }
   }
    
    
    



    


