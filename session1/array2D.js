//Bài 3

function findSafeWay(){
    arr = [[0,1,1], [0,1,1], [0,1,1], [0,1,1], [0,0,1]];
    safeWay = [];

    for (let row = 0; row < arr.length; row++) {
        for (let col = 0; col < arr[row].length; col++) {
            if(arr[col][row]==0){
                safeWay.push(row);
            }
        }
    }
    
    return safeWay;
}
