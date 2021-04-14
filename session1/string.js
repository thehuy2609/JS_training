// Bài 1.1

function formatMoney1(str){
    var count=0;
    var arr = str.split('');
    for( var i = arr.length-1; i>0; i-- ){
        count++;
        if(count % 3 == 0){
            count=0;
            arr.splice(i, 0, ",");
        }
    }
    var result = arr.join('');
    console.log(result);
    return result;
}

function formatMoney2(number){
    let result = new Intl.NumberFormat('en-IN', { }).format(number);
    return result; 
}

// Bài 1.2

function formatMoney3(str,num){
    var result;
    if(num==0) num=2;
    console.log(result);
    if(str / 1000000000 > 1){
        result = str / 1000000000;
        result = +result.toFixed(num);
        result = result + " B";
    }else if(str / 1000000 > 1){
        result = str / 1000000;
        result = +result.toFixed(num);
        result = result + " M";
    }else if(str / 1000 > 1){
        result = str / 1000;
        result = +result.toFixed(num);
        result = result + " K";
    }else{
        result = str;
    }
    return result;
}


// Bài 1.4

function getExtension(str){
    var arr = str.split('');
    for (var i = arr.length; i >=1; i--) {
        if( arr[i] === '.' ){
            var result = arr.slice(i+1);
            result = result.join('');
            break;
        }
    }
    
    console.log(result);
    return result;
}

