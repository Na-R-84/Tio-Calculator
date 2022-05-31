let inputBill = document.querySelector("#bill");
let tipButtons=document.querySelectorAll(".tip-button");
let inputs=document.querySelectorAll("input")
let resetKey = Document.querySelector("#reset-btn");
let customTip=document.querySelector(".tip-custom");
let personAmount=document.querySelector(".person-amount");
let tipAmountPerPerson=document.querySelector(".tip-amount");
let totalPerPerson=document.querySelector(".total-price");
let alerts=document.querySelectorAll(".alert");
// ----------------Events-----------------//

tipButtons.forEach(e=>{
    e.addEventListener("click",()=>{
        if(e.classList.contains("active")){
            tipButtons.forEach(item=>{
                item.classList.remove("active")
            })
        }else{
            tipButtons.forEach(item=>{
                item.classList.remove("active")
            })
            e.classList.add("active");
            tipField.value="";
        }
        checkInputs()
    })
})

inputBill.addEventListener("input",(e)=>{
    checkInputs(e.target)
});
personAmount.addEventListener("input",(e)=>{
    checkInputs(e.target)
});
customTip.addEventListener("input",(e)=>{
    checkInputs(e.target)
});
customTip.addEventListener("input",()=>{
    tipButtons.forEach(item=>{
        item.classList.remove("active")
    })
});
resetKey.addEventListener("click",reset);
// -------------------------------Funktions-----------------//

// calculateTip function calculate result and show them 
function calculateTip(bill,person,tip) {
    let tipAmount;
    let total;
    if (tip===true){
        tip=0
    }
    if(tip===0){
         tipAmount=(0).toFixed(2);
         total=withTwoDesimals(bill/person);
    }else{
        tipAmount=withTwoDesimals((bill*(tip/100))/person);
        total=withTwoDesimals(((bill*(tip/100)+bill))/person);
    }
    tipAmountPerPerson.textContent=tipAmount;
    totalPerPerson.textContent=total;
}

function reset(){
    tipAmountPerPerson.textContent="0.00";
    totalPerPerson.textContent="0.00";
    inputBill.value="";
    customTip.value="";
    personAmount.value=""
    tipButtons.forEach(e=>{
        e.classList.remove("active")
    })
    alerts.forEach(e=>{
        e.style.opacity=0;
    })
    resetKey.disabled=true;
    inputs.forEach(item=>{
        item.classList.remove("invalid")
    })
}

function checkInputs(){
    const checkBill=checkNumber(inputBill.value,inputBill);
    const checkPerson=checkNumber(personAmount.value,personAmount);
    const checkTip=getTip();
    resetKey.disabled=false;
    if(checkBill && checkPerson && checkTip){
        calculateTip(checkBill,checkPerson,checkTip)
    }
}

function checkNumber(value,field,acceptZero=false){
    const number=Number(value);
    const parent=field.parentElement.parentElement;
    const nodes=Array.from(parent.childNodes);
    const alert=nodes.find(e=>{
        if(e.classList){

            if(e.classList.contains("alert")){
                return e
            }
        }
    }
)};


// getTip function get the tip from tip-buttons or tip input and return it
function getTip(){
    const activeTip=Array.prototype.find.call(tipButtons,(item)=>{
       return item.classList.contains("active")
    })
    if(activeTip){
        const text=activeTip.textContent;
        const tipBtnVal=Number(text.split("%")[0])
        return tipBtnVal
    }else{
        const tipFieldVal=Number(tipField.value)
        const result=checkNumber(tipFieldVal,tipField,true);
        return result===0? true : result;
        }
    
}
// the function to return number with 2 desimal number
function withTwoDesimals(number){
    return number.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
}