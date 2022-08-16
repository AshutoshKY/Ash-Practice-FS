function check(myform){
    if(myform.myname.value == "" || myform.myname.value == null){
        alert("Name is Man");
        myform.myname.focus();
        return false;
    }
    if(myform.myphone.value == "" || myform.myphone.value == null){
        alert("Phone is Man");
        myform.myphone.focus();
        return false;
    }else{
        return true;
    }
}