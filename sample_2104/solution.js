function factorial(n) {
    return n === 0 ? 1 : n * factorial(n - 1);
}

function formatCoin(coin) {
    return new Intl.NumberFormat('en-US').format(coin);
}

function formatWalletMoney(numb, digits) {
    char = ["", "K", "M", "B", "T"];
    index = 0;
    while (numb > 1000) {
        numb /= 1000;
        index++;
    }
    return numb.toString().slice(0, 4 + digits) + char[index];
}

function getExtension(fileName) {
    return fileName.split(".").pop();
}

function getWords(string) {
    return string.split("").filter(char => char === char.toUpperCase()).length + 1;
}

function getRandomInt(max, min) {
    return Math.floor((Math.random() * (max - min)) + min);;
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getMissingElements(sourceArr, targetArr) {
    let diffArr = []
    targetArr.forEach(element => {
        if (sourceArr.indexOf(element) === -1) diffArr.push(element);
    });
    return diffArr;
}
var garden = [[0, 0, 0], [0, 1, 1], [0, 1, 1], [0, 1, 1], [0, 0, 1]]

function getSafeWays(matrix) {
    let arr = [];
    matrix[0].forEach((cell, row) => { cell === 0 && arr.push("" + row); });
    for (let col = 1; col < matrix.length; col++) {
        let _tempArr = [];
        for (let row = 0; row < 3; row++) {
            let cell = matrix[col][row];
            if (cell === 0) {
                let newArr = arr.slice();
                for (let i = 0; i < newArr.length; i++) {
                    newArr[i] = newArr[i] + row;
                }
                _tempArr = _tempArr.concat(newArr);
            }
        }
        arr = _tempArr.slice().sort();
    }
    console.log(arr);
    return arr;
}
getSafeWays(garden)