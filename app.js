let operationArray = []
let displayArray = [];
let firstNumResult;
let operator;
let continueOperations = 1; 
const clacDisplay = document.querySelector("#display-result");
const button = document.getElementsByTagName('button');
document.querySelectorAll("button").forEach(element => {
        element.addEventListener('click', (event) => {
                eventDecider(element);
            });
        });
function eventDecider(element){
    try{
            if(element.classList[0] == "operator"){
                let operator2 = element.value;
                if(continueOperations==2){
                    constNumber(operationArray);
                    operationArray = [];
                    operator = operator2;
                    continueOperations--;
                }
                if(continueOperations == 1){
                    operator = element.value;
                    continueOperations++
                }
            }else{

            }
            if(element.value == "clear" ){
                operationArray = [];
                continueOperations = 1;
                console.log("cleared" )
                console.log(`${operationArray}${continueOperations}`)
            }
            if(element.id =="mod"){
                calcMod(operationArray);
            }
            if(element.id == "negate"){
                NegateValue()
                constNumber(operationArray);
            }
            if(element.value == "equals" ){
                constNumber(operationArray);
                operationArray.length=[];
                //clacDisplay.textContent="";
                //clacDisplay.textContent = firstNumResult;
            }
            if(element.value == "Backspace"){
                operationArray.pop();
                console.log(operationArray);
            }
            if(element.classList[0] == "operator"  || element.classList[0]== "operand"  || element.classList[0] == "decimal" ){
                operationArray.push(element.value);
                console.log(`${operationArray} ${continueOperations}`)
            }
                    if(element.classList[0] != "operand" && element.classList[0] != "decimal" ){
                        displayArray=[];
                    }else{
                        displayArray.push(element.value);
                    }
                    clacDisplay.textContent = displayArray.join("");
        }catch{}
    }
    document.addEventListener('keydown',(event)=>{
        
        if(event.key=="0"){
            eventDecider(document.getElementById("zero"));
        }if(event.getModifierState("Control") && event.key =="5"){
            console.log("%");
            eventDecider(document.getElementById("zero"));
        }else{

            console.log(event.key);
            eventDecider(document.getElementById(event.key));
        }
    })
    function NegateValue(){
             
    }
    function constNumber(Array){
    let indexOfOperator = Array.indexOf(operator);
    let firstNum;
    let secondNum;
    secondNum  = Number(Array.splice(indexOfOperator+1,Array.length).join(""));
    if(indexOfOperator -1 == -1){
        firstNum = firstNumResult;
        calculate(firstNumResult,operator,secondNum);
    }else{
        firstNum = Number(Array.splice(0,indexOfOperator).join(""));
    }
    //isNaN(Array.splice(indexOfOperator+1,Array.length).join(""))? console.error("no number"):
    //isNaN(Array.splice(0,indexOfOperator).join(""))? console.error("no number"):
     
    
    calculate(firstNum,operator,secondNum);
    console.log(firstNum);
    console.log(operator);
    console.log(secondNum);
    clacDisplay.textContent = firstNumResult;
    console.log(firstNumResult);
    }
    function calcMod(modNum){
        let firstNum = Number(modNum.join(""));
        firstNumResult = firstNum / 100;
        operationArray = [];
        console.log(firstNumResult);
    }
    function calculate(firstNum,operator,secondNum){
        switch(operator){
            case "+":
                firstNumResult = firstNum + secondNum;
                break;
            case "-":
                firstNumResult = firstNum - secondNum;
                break;
            case '/':
                firstNumResult = firstNum / secondNum; 
                break;
            case "*":
                firstNumResult = firstNum * secondNum;
                break;
        }
        
    }