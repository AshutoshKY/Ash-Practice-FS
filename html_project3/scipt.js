function planetWeight(num){

    let n1 = document.getElementById("numbers").value;

    if(n1==null || n1=="" || n1==" "){
        document.querySelectorAll('p1').forEach(item => item.remove());
        document.getElementById("p1").innerHTML="<span>Enter Weight First</span>";
        return;
    }

    if(!isNaN(n1)){
        if(num==1){
            document.getElementById("p1").innerHTML="Your weight on Mercury is ";
            document.getElementById("p2").innerHTML=Math.round(n1*0.38)+" kgs ";
        }
        else if(num==2){
            document.getElementById("p1").innerHTML="Your weight on Venus is ";
            document.getElementById("p2").innerHTML=Math.round(n1*0.91)+" kgs ";
        }
        else if(num==3){
            document.getElementById("p1").innerHTML="Your weight on Earth is ";
            document.getElementById("p2").innerHTML=Math.round(n1*1)+" kgs ";
        }
        else if(num==4){
            document.getElementById("p1").innerHTML="Your weight on Mars is ";
            document.getElementById("p2").innerHTML=Math.round(n1*0.38)+" kgs ";
        }
        else if(num==5){
            document.getElementById("p1").innerHTML="Your weight on Jupiter is ";
            document.getElementById("p2").innerHTML=Math.round(n1*2.34)+" kgs ";
        }
        else if(num==6){
            document.getElementById("p1").innerHTML="Your weight on Saturn is ";
            document.getElementById("p2").innerHTML=Math.round(n1*1.06)+" kgs ";
        }
        else if(num==7){
            document.getElementById("p1").innerHTML="Your weight on Neptune is ";
            document.getElementById("p2").innerHTML=Math.round(n1*1.19)+" kgs ";
        }
        else{
            document.getElementById("p1").innerHTML="Your weight on Uranus is ";
            document.getElementById("p2").innerHTML=Math.round(n1*0.92)+" kgs ";
        }
    }
    else{
        document.querySelectorAll('p1').forEach(item => item.remove());
        document.getElementById('p1').innerHTML="<span>Entered Value is Not a Number </span>";
    }
}