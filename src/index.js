

let randomOrUser = "none",
  data = [],
  arrLength = [],
  checkedSortingAlgoArray = [];
let input = undefined;
var i, j;

// code to reset tables and graphs
document.getElementById("reset").addEventListener("click", function (e) {
  input = undefined;
  randomOrUser = "none";
  data = [];
  arrLength = [],
  checkedSortingAlgoArray = [];
  document.getElementById("randomArrayDiv").style.display = "none";
  document.getElementById("inputArrayDiv").style.display = "none";
    document.getElementById("randomArrayButton").style.display = "inline-block";
    document.getElementById("userArrayButton").style.display = "inline-block";
  document.getElementById('canvasDiv').innerHTML=''
  displayTableAndGraph()
});
document
  .getElementById("randomArrayButton")
  .addEventListener("click", function (e) {
    document.getElementById("randomArrayDiv").style.display = "block";
    document.getElementById("randomArrayButton").style.display = "none";
    document.getElementById("userArrayButton").style.display = "none";
    randomOrUser = "random";
  });

document
  .getElementById("userArrayButton")
  .addEventListener("click", function (e) {
    document.getElementById("inputArrayDiv").style.display = "block";
    document.getElementById("randomArrayButton").style.display = "none";
    document.getElementById("userArrayButton").style.display = "none";
    randomOrUser = "user";
  });

// function display(arr, timeElapsed) {
//   let displayDiv = document.getElementById("sortedDiv");
//   displayDiv.innerHTML = "";
//   for (let i = 0; i < arr.length; i++) {
//     let div = document.createElement("div");

//     div.className = "element";

//     div.innerHTML = `${arr[i]}`;
//     displayDiv.appendChild(div);
//   }
//   let timeCal = document.getElementById("timeCal");
//   timeCal.innerHTML = `${timeElapsed} milliseconds`;
// }

//This function is used to display the entire data
function displayTableAndGraph() {

  let tableDiv = document.getElementById("comparisionTable");
  let tableStr = `<table><tr>
  <th>Input size</th>
  <th>Insertion</th>
  <th>Bubble</th>
  <th>Selection</th>
  <th>Merge</th>
  <th>Heap</th>
  <th>Quick</th>
  <th>3 way Quick</th>
  </tr>
</tr>`;
  let canvas,chart;
  for (let i = 0; i < data.length; i++) {
    canvas = document.createElement("div");
    canvas.setAttribute("id", "canvas" + i);
    canvas.setAttribute("class", "graph");

    document.getElementById("canvasDiv").appendChild(canvas);
    
    document.getElementById('canvas'+i).style.width='700px'
    document.getElementById('canvas'+i).style.height='500px'
    document.getElementById('canvas'+i).style.padding='20px'
    document.getElementById('canvas'+i).style.display='inline-block'
    chart = new CanvasJS.Chart("canvas" + i, {
      animationEnabled: true,
      theme: "light2", // "light1", "light2", "dark1", "dark2"
      title: {
        text: "Sorting Algorithms behaviour for array length "+arrLength[i]
      },
      axisY: {
        title: "Running time for array length "+arrLength[i]
      },
      data: [
        {
          type: "column",
          showInLegend: true,
          legendMarkerColor: "grey",
          legendText: "milliseconds",
          dataPoints: data[i].map(function(value,ind){
            if (checkedSortingAlgoArray[i].includes("insertion") && ind == 0) {
              return {y: data[i][ind]['insertion'].time, label: "insertion"}
            }
            if (checkedSortingAlgoArray[i].includes("bubble") && ind == 1) {
              return {y: data[i][ind]['bubble'].time, label: "bubble"}
            }
            if (checkedSortingAlgoArray[i].includes("selection") && ind == 2) {
              return {y: data[i][ind]['selection'].time, label: "selection"}
            }
            if (checkedSortingAlgoArray[i].includes("merge") && ind == 3) {
              return {y: data[i][ind]['merge'].time, label: "merge"}
            }
            if (checkedSortingAlgoArray[i].includes("heap") && ind == 4) {
              return {y: data[i][ind]['heap'].time, label: "heap"}
            }
            if (checkedSortingAlgoArray[i].includes("quick") && ind == 5) {
              return {y: data[i][ind]['quick'].time, label: "quick"}
            }
            if (checkedSortingAlgoArray[i].includes("threeWayQuick") && ind == 6) {
              return {y: data[i][ind]['threeWayQuick'].time, label: "threeWayQuick"}
            }
          }).filter(function(ele){
            return ele != undefined
          })
        }
      ]
    });
    chart.render();

    
    tableStr = tableStr + "<tr>";

    tableStr = tableStr + "<td>" + arrLength[i] + "</td>";
    for (let j = 0; j < data[i].length; j++) {
      if (checkedSortingAlgoArray[i].includes("insertion") && j == 0) {
        tableStr = tableStr + "<td>" + data[i][j].insertion.time + "</td>";
      } else if (checkedSortingAlgoArray[i].includes("bubble") && j == 1) {
        tableStr = tableStr + "<td>" + data[i][j].bubble.time + "</td>";
      } else if (checkedSortingAlgoArray[i].includes("selection") && j == 2) {
        tableStr = tableStr + "<td>" + data[i][j].selection.time + "</td>";
      } else if (checkedSortingAlgoArray[i].includes("merge") && j == 3) {
        tableStr = tableStr + "<td>" + data[i][j].merge.time + "</td>";
      } else if (checkedSortingAlgoArray[i].includes("heap") && j == 4) {
        tableStr = tableStr + "<td>" + data[i][j].heap.time + "</td>";
      } else if (checkedSortingAlgoArray[i].includes("quick") && j == 5) {
        tableStr = tableStr + "<td>" + data[i][j].quick.time + "</td>";
      } else if (
        checkedSortingAlgoArray[i].includes("threeWayQuick") &&
        j == 6
      ) {
        tableStr = tableStr + "<td>" + data[i][j].threeWayQuick.time + "</td>";
      } else {
        tableStr = tableStr + "<td>" + "-" + "</td>";
      }
    }
    tableStr = tableStr + "</tr>";
  }
  tableStr = tableStr + "</table>";

  tableDiv.innerHTML = tableStr;

  document.getElementById("randomArrayDiv").style.display = "none";
  document.getElementById("inputArrayDiv").style.display = "none";
  document.getElementById("randomArrayButton").style.display = "inline-block";
  document.getElementById("userArrayButton").style.display = "inline-block";
}

//Based on user input we are generating the array to sort
function setInput() {
  if (randomOrUser == "user") {
    input = document.getElementById("inputArray").value.split(" ");
    input = input.map(function (num) {
      return Number(num);
    });
  }
  else if (randomOrUser == "random") {
    let min = Number(document.getElementById("min").value);
    let max = Number(document.getElementById("max").value);
    let n = Number(document.getElementById("inputSize").value);
    const randomIntArrayInRange = (min, max, n = 1) =>
      Array.from(
        { length: n },
        () => Math.floor(Math.random() * (max - min + 1)) + min
      );
    input = randomIntArrayInRange(min, max, n);
  } else {
    input = [];
  }
  return input;
}

function insertionSort() {
  setInput();
  let inputForSort = input.slice();
  let key, j;
  let startTime = window.performance.now();
  for (let i = 1; i < inputForSort.length; i++) {
    key = inputForSort[i];
    j = i - 1;
    while (j >= 0 && inputForSort[j] > key) {
      inputForSort[j + 1] = inputForSort[j];
      j = j - 1;
    }
    inputForSort[j + 1] = key;
  }
  let endTime = window.performance.now();
  return { sortedArr: inputForSort, time: endTime - startTime };
  //display(inputForSort, endTime - startTime);
}

function bubbleSort() {
  setInput();
  let inputForSort = input.slice();
  let startTime = window.performance.now();
  for (let i = 0; i < inputForSort.length - 1; i++) {
    for (let j = 0; j < inputForSort.length - i - 1; j++) {
      if (inputForSort[j] > inputForSort[j + 1]) {
        let swap = inputForSort[j];
        inputForSort[j] = inputForSort[j + 1];
        inputForSort[j + 1] = swap;
      }
    }
  }
  let endTime = window.performance.now();
  return { sortedArr: inputForSort, time: endTime - startTime };
  //display(inputForSort, endTime - startTime);
}

function selectionSort() {
  setInput();
  let inputForSort = input.slice();
  let startTime = window.performance.now();
  for (let i = 0; i < inputForSort.length - 1; i++) {
    for (let j = i + 1; j < inputForSort.length; j++) {
      if (inputForSort[j] < inputForSort[i]) {
        let swap = inputForSort[j];
        inputForSort[j] = inputForSort[i];
        inputForSort[i] = swap;
      }
    }
  }
  let endTime = window.performance.now();
  return { sortedArr: inputForSort, time: endTime - startTime };
  //display(inputForSort, endTime - startTime);
}

function merge(arr, l, m, r) {
  var n1 = m - l + 1;
  var n2 = r - m;

  
  var L = new Array(n1);
  var R = new Array(n2);

  for (var i = 0; i < n1; i++) L[i] = arr[l + i];
  for (var j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  
  var i = 0;

  
  var j = 0;

  var k = l;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
}
function mergeSortAlgo(arr, l, r) {
  if (l >= r) {
    return;
  }
  var m = l + parseInt((r - l) / 2);
  mergeSortAlgo(arr, l, m);
  mergeSortAlgo(arr, m + 1, r);
  merge(arr, l, m, r);
}
function mergeSort() {
  setInput();
  let inputForSort = input.slice();
  let startTime = window.performance.now();
  mergeSortAlgo(inputForSort, 0, inputForSort.length - 1);
  let endTime = window.performance.now();
  return { sortedArr: inputForSort, time: endTime - startTime };
}

function heapSortAlgo(arr) {
  var N = arr.length;

  for (var i = Math.floor(N / 2) - 1; i >= 0; i--) heapify(arr, N, i);

  for (var i = N - 1; i > 0; i--) {
    var temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    heapify(arr, i, 0);
  }
}

function heapify(arr, N, i) {
  var largest = i; 
  var l = 2 * i + 1; 
  var r = 2 * i + 2; 

  
  if (l < N && arr[l] > arr[largest]) largest = l;

  
  if (r < N && arr[r] > arr[largest]) largest = r;

  if (largest != i) {
    var swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;

    heapify(arr, N, largest);
  }
}

function heapSort() {
  setInput();
  let inputForSort = input.slice();
  let startTime = window.performance.now();
  heapSortAlgo(inputForSort);
  let endTime = window.performance.now();
  return { sortedArr: inputForSort, time: endTime - startTime };
}

function partition(arr, low, high) {
  let pivot = arr[high];

  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; 
  return i + 1; 
}

function quickSortAlgo(arr, low, high) {
  if (low < high) {
    let pi = partition(arr, low, high);

    quickSortAlgo(arr, low, pi - 1);
    quickSortAlgo(arr, pi + 1, high);
  }
}

function quickSort() {
  setInput();
  let inputForSort = input.slice();
  let startTime = window.performance.now();
  quickSortAlgo(inputForSort, 0, inputForSort.length - 1);
  let endTime = window.performance.now();
  return { sortedArr: inputForSort, time: endTime - startTime };
}
function threeWayPartition(a, l, r) {
  (i = l - 1), (j = r);
  var p = l - 1,
    q = r;
  var v = a[r];

  while (true) {
    while (a[++i] < v);

    while (v < a[--j]) if (j == l) break;

    if (i >= j) break;

  
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;

    
    if (a[i] == v) {
      p++;
      temp = a[i];
      a[i] = a[p];
      a[p] = temp;
    }

    if (a[j] == v) {
      q--;
      temp = a[q];
      a[q] = a[j];
      a[j] = temp;
    }
  }

  var temp = a[i];
  a[i] = a[r];
  a[r] = temp;


  j = i - 1;
  for (let k = l; k < p; k++, j--) {
    temp = a[k];
    a[k] = a[j];
    a[j] = temp;
  }

  i = i + 1;
  for (let k = r - 1; k > q; k--, i++) {
    temp = a[i];
    a[i] = a[k];
    a[k] = temp;
  }
}
function threeWayQuickSortAlgo(arr, l, r) {
  if (r <= l) {
    return;
  }

  (i = 0), (j = 0);

  threeWayPartition(arr, l, r);

  threeWayQuickSortAlgo(arr, l, j);
  threeWayQuickSortAlgo(arr, i, r);
}

function threeWayQuickSort() {
  setInput();
  let inputForSort = input.slice();
  let startTime = window.performance.now();
  threeWayQuickSortAlgo(inputForSort, 0, inputForSort.length - 1);
  let endTime = window.performance.now();
  return { sortedArr: inputForSort, time: endTime - startTime };
}

document.getElementById("checkTime").addEventListener("click", function (e) {
  let checkboxes = document.querySelectorAll(".sortCheckBox:checked");
  let selectedSortingAlgo = [
    "insertion",
    "bubble",
    "selection",
    "merge",
    "heap",
    "quick",
    "threeWayQuick"
  ];
  // for (let i = 0; i < checkboxes.length; i++) {
  //   selectedSortingAlgo.push(checkboxes[i].value);
  // }
  for (let i = 0; i < selectedSortingAlgo.length; i++) {
    if (selectedSortingAlgo[i] == "insertion") {
      selectedSortingAlgo[i] = { insertion: insertionSort() };
    }
    if (selectedSortingAlgo[i] == "bubble") {
      selectedSortingAlgo[i] = { bubble: bubbleSort() };
    }
    if (selectedSortingAlgo[i] == "selection") {
      selectedSortingAlgo[i] = { selection: selectionSort() };
    }
    if (selectedSortingAlgo[i] == "merge") {
      selectedSortingAlgo[i] = { merge: mergeSort() };
    }
    if (selectedSortingAlgo[i] == "heap") {
      selectedSortingAlgo[i] = { heap: heapSort() };
    }
    if (selectedSortingAlgo[i] == "quick") {
      selectedSortingAlgo[i] = { quick: quickSort() };
    }
    if (selectedSortingAlgo[i] == "threeWayQuick") {
      selectedSortingAlgo[i] = { threeWayQuick: threeWayQuickSort() };
    }
  }
  data.push(selectedSortingAlgo);
  arrLength.push(input.length);
  checkboxes = document.querySelectorAll(".sortCheckBox:checked");
  let checkedSortingAlgo = [];
  for (let i = 0; i < checkboxes.length; i++) {
    checkedSortingAlgo.push(checkboxes[i].value);
  }
  checkedSortingAlgoArray.push(checkedSortingAlgo);
  displayTableAndGraph();
  console.log(data);
});

// document.getElementById("viewSortedArray").addEventListener("click", function (e) {
//   document.getElementById('sortedDiv').innerHTML = "<pre>"+JSON.stringify(data,null,2)+"</pre>"
// })
