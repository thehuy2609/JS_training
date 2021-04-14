function CountWord(str){
    var total=1;
    for( var i=0;i<str.length;i++){
        if( str[i]>"A" && str[i]<"Z"){
            total+=1;
        }
    }
    return total;
}

function CountWord2(str){
    var total =1;
    for(var i=0;i<str.length;i++){
        if( str[i] === str[i].toUpperCase() ){
            total +=1;
        }
    }
    return total;
}