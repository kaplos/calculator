
let operationArray = []
let displayArray = [];
let firstNumResult;
let operator;
let continueOperations = 1;
let negated = false; 
    function main(){
        const decimal = document.getElementById(".");
        const negateButton = document.getElementById("negate")
        document.querySelectorAll("button").forEach(element => {
                element.addEventListener('click', (event) => {
                        eventDecider(element);
                    });
                });
            
        function eventDecider(element){
            try{
                    if(element.classList[0] == "operator"){
                        decimal.disabled = false;
                        negateButton.disabled = false;
                        negated = false;
                        let operator2 = element.value;
                        if(continueOperations==2){
                            constNumber(operationArray);
                            operationArray = [];
                            operator = operator2;
                            continueOperations=1;
                        }
                        if(continueOperations == 1){
                            operator = element.value ;  
                            continueOperations=2;
                        }
                    }
                    if(element.value == "clear" ){
                        operationArray = [];
                        continueOperations = 1;
                        negated = false;
                        console.log("cleared")
                        console.log(`${operationArray}${continueOperations}`)
                        decimal.disabled = false;
                        negateButton.disabled = false;
                    }
                    if(element.id =="mod"){
                        calcMod(operationArray);
                    }
                    if(element.id == "negate"){
                        if(negated){
                            negated = false;
                            operationArray.pop();
                            console.log(operationArray);
                            displayArray.shift();
                        }else{
                            negated = true;
                            operationArray.push("@");
                            console.log(operationArray);
                            displayArray.unshift("-");
                        }
                        console.log(operationArray);
                        updateDisplay(displayArray.join(""));
                        //negateButton.disabled = true;
                    }
                    if(element.value == "Backspace"){
                        operationArray.pop();
                        console.log(operationArray);
                    }
                    if(element.classList[0] == "operator"  || element.classList[0]== "operand"  || element.classList[0] == "decimal" ){
                        operationArray.push(element.value);
                        if(element.id == "."){
                        decimal.disabled = true;
                    }
                        console.log(`${operationArray} ${continueOperations}`)
                    }
                    
                    if(element.classList[0] != "operand" && element.classList[0] != "decimal" && element.id != "negate"){
                        displayArray=[];
                    }else{
                        displayArray.push(element.value);
                    }
                    updateDisplay(displayArray.join(""));
                    if(element.value == "equals" ){
                        constNumber(operationArray);
                        operationArray = [];
                        negated = false;
                        negateButton.disabled = false;
                        decimal.disabled = false;
                        updateDisplay(firstNumResult);
                    }
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
    }
main();
    function updateDisplay(element){
        let clacDisplay = document.querySelector("#display-result");
        clacDisplay.textContent = element;
    }
    function constNumber(Array){
        let indexOfOperator = Array.indexOf(operator);
        
        let firstNum;
        let secondNum;
        let splitFirst; 
        let splitSecond;
    
        splitSecond = Array.splice(indexOfOperator+1,Array.length);
        splitFirst =  Array.splice(0,indexOfOperator);
        
            secondNum = removeNegatedElement(splitSecond.indexOf("@"),splitSecond);
        if(indexOfOperator -1 === -1){
            firstNum = firstNumResult;
            calculate(firstNumResult,operator,secondNum);    
        }else{
            firstNum = removeNegatedElement(splitFirst.indexOf("@"),splitFirst);
        }
        console.log(`${splitFirst} splits ${splitSecond} .`)
        
    
        console.log("index Of"+ splitFirst.indexOf("@"));
        firstNumResult = calculate(firstNum,operator,secondNum);
        continueOperations = 1;
        console.log(firstNum);
        console.log(operator);
        console.log(secondNum);
        console.log(firstNumResult);
    }
    function removeNegatedElement(index , NumPosition ){
        if(index === -1){
            console.log(Number(NumPosition.join("")));
            return Number(NumPosition.join(""));
        } 
        if (index >= 0 && index < NumPosition.length) {
            NumPosition.splice(index, 1);
        }
        return -Number(NumPosition.join(""));
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
                return  firstNum+= secondNum;
            case "-":
                return  firstNum-= secondNum;
            case '/':
                return  firstNum/= secondNum; 
            case "*":
                return  firstNum*= secondNum;
        }
    }
   