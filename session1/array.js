// Bài 2.1
function getFactorial(num){
    var result=1;
    for (let i = 1; i <= num; i++) {
        result*=i;
    }
    return result;
}

//Bài 2.2

function getRandomMinMax(min,max){
    var result = Math.floor(Math.random() * (max - min)) + min;
    return result;
}

//Bài 2.3

function getRandomElement(arr){
    return arr[getRandomMinMax(0,arr.length)];
}

//Bài 2.4

function getMissingElement(arr1,arr2){
    var result=[];
    for (let i = 0; i < arr2.length; i++) {
        var count=0;
        for (let j = 0; j < arr1.length; j++) {
            if(arr2[i] === arr1[j]){
                count +=1;
            }
            if(j == arr1.length-1 && count==0 ){
                result.push(arr2[i]);
            }
        }
    }
    return result;
}

function getMissingElement2(arr1,arr2){
    let result=[];
    let arrTemp1 = arr1.filter(function(item){
        return arr2.indexOf(item)<0; 
    });
    let arrTemp2 = arr2.filter(function(item){
        return arr1.indexOf(item)<0; 
    });
    result = arrTemp1.concat(arrTemp2);
    return result;
}
