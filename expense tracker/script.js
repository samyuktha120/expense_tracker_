const balance = document.getElementById("balance");
const money_plus= document.getElementById('money-plus');
const money_minus= document.getElementById('money-minus');
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById('text');
const amount = document.getElementById('amount');




const localStorageTransaction = JSON.parse(localStorage.getItem("transactions"));
let transactions = localStorage.getItem("transactions") !== null ? localStorageTransaction: [];


function addTransaction(e){
    e.preventDefault();
    if(
        text.value.trim === "" || amount.value.trim()=== ""
    ){
        alert("please enter text and value");
    }else{
        const transaction ={
            id:genrateId(),
            text:text.value,
            amount: +amount.value,
        };

        transactions.push(transaction);
        addTransactionDDM(transaction);
        updateLocalStorage();
        updateValues();
        text.value="";
        amount.value="";

    }
}

function genrateId(){
    return Math.floor(Math.random()*1000000000);
}


function addTransactionDDM(transaction){
    const sign = transaction.amount < 0? "-":"+";
    const item = document.createElement("li");

    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus"
    );

    item.innerHTML=`    
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>`;

    list.appendChild(item);
}

function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id!== id);
    updateLocalStorage();
    Init();
}



function updateValues(){
    const amounts = transactions.map((transaction) =>transaction.amount);
    const total = amounts.reduce((acc,item) => (acc+=item),0).toFixed(2);
    const income = amounts.filter((item) =>item >  0).reduce((acc,item)=>(acc+=item),0).toFixed(2);
    const expense = (
        amounts.filter(item=> item<0).reduce((acc,item)=>(acc+=item),0)*-1
    ).toFixed(2);


    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

function updateLocalStorage(){
    localStorage.setItem(
        "transactions",JSON.stringify(transactions)
    );
}


//init app
function Init(){
    list.innerHTML="";
    transactions.forEach(addTransactionDDM);
    updateValues();
}
Init();
form.addEventListener("submit", addTransaction);
