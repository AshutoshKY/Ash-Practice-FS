function SumOfDigits(num){
    sum=0;
    while(num){
        sum+=num%10;
        num=Math.floor(num/10);
    }
    return sum;
}

function myfunc(){
    document.querySelectorAll('div.square').forEach(item => item.remove());
    let n1 = document.getElementById("numbers").value;
    n1=Number(n1);
    if(n1==null || n1=="" || n1==" "){
        document.getElementById("p1").innerHTML=
        "<span>ERROR ---> Bhai likh de kuch <--- ERROR</span>";
        return;
        }
    if(!isNaN(n1)){
        if(n1.toString().length<=5){
            const myNode = document.getElementById("p1");
            myNode.innerHTML = '';
            numberNum = SumOfDigits(n1);
            box = document.getElementById("p1");
            document.querySelectorAll('div.square').forEach(item => item.remove());
            var square = document.createElement('div');
            square.className = 'square';
            square.style.width = numberNum + 'px'; // width
            square.style.height = numberNum + 'px'; // height
            square.style.borderRadius = numberNum/5 + 'px';
            document.body.appendChild(square);
            // document.getElementsByClassName("square").style.transition="all 10s";
            // document.getElementsByClassName("square").style.visibility="visible";
        }
        else{
            document.getElementById('p1').innerHTML=
       "<span>ERROR ---> Enter Max 5 digit Number <--- ERROR</span>";
        }
    }
    else{
        document.getElementById('p1').innerHTML=
       "<span>ERROR ---> Entered Value is Not a Number <--- ERROR</span>";
    }
}

