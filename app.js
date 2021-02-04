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
    let result = calculateConverter(baseVal, termVal, amountVal);
    
    //If conversion failed due to wrong input
    if (result === -1) { 
        color = "red"
        setMessage(`Unable to find rates for ${baseVal} /  ${termVal}`, color )
    }
    //if conversion succesful
    else {
        if(termVal==="JPY")
    {

        result = result.toFixed(0);
    }
    else
    {
         
        result= result.toFixed(2);
    }
        setMessage(`${termVal} ${result}`, color)

    }

         baseUI.value= ''
         termUI.value=''
         amountUI.value=0
         color ="green"
        
})

 

// Display result

function setMessage(msg, color){
    messageUI.textContent = msg;
    messageUI.style.color = color;
}

// Currency converter function

function calculateConverter(base,term,amount){

    let newAmount, reference;

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
                      
                        reference = myObjects.coCurr[j].base;
                        newAmount = myObjects.coCurr[i].rate * myObjects.coCurr[j].rate * amount;
                        return newAmount;
                    }
                    
                }
                else if( term=== myObjects.coCurr[j].base)
                {
                     if(myObjects.coCurr[i].term === myObjects.coCurr[j].term)
                    {
                        console.log("yes 4")
                         reference = myObjects.coCurr[j].term
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
                        reference = myObjects.coCurr[j].term
                        newAmount = (1 / myObjects.coCurr[i].rate * myObjects.coCurr[j].rate) * amount;
                        return newAmount;
                   }
               }
               else if(term === myObjects.coCurr[j].term ) 
              
               {
                   if (myObjects.coCurr[j].base === myObjects.coCurr[i].base)
                   {
                      reference = myObjects.coCurr[j].base
                      newAmount = (1/ myObjects.coCurr[i].rate) * myObjects.coCurr[j].rate * amount;
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
                       newAmount = (myObjects.coCurr[i].rate / myObjects.coCurr[j].rate) * amount;
                       return newAmount;
                   }
               }
           }
       }
 
   }
    }
    
    // for(var i in myObjects.coCurr){
    // for ( var j in myObjects.coCurr){
    //     if(base!= myObjects.coCurr[i].base && term!= myObjects.coCurr[j].term
    //        && term!= myObjects.coCurr[i].base && base!= myObjects.coCurr[j].term)
    //    {
    //         return -1;
           
    //    }
       
    //   }

    // }



    


