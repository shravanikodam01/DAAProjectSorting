import "./styles.css";

let randomOrUser = "none";
let input = undefined;
var i, j;
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

function display(arr, timeElapsed) {
  let displayDiv = document.getElementById("sortedDiv");
  displayDiv.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    let div = document.createElement("div");

    div.className = "element";

    div.innerHTML = `${arr[i]}`;
    displayDiv.appendChild(div);
  }
  let timeCal = document.getElementById("timeCal");
  timeCal.innerHTML = `${timeElapsed} milliseconds`;
}

function setInput() {
  if (randomOrUser == "user") {
    input = document.getElementById("inputArray").value.split(" ");
    input = input.map(function (num) {
      return Number(num);
    });
  }
  if (randomOrUser == "random") {
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
  input == undefined && setInput();
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
  input == undefined && setInput();
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
  input == undefined && setInput();
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

  // Create temp arrays
  var L = new Array(n1);
  var R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (var i = 0; i < n1; i++) L[i] = arr[l + i];
  for (var j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  var i = 0;

  // Initial index of second subarray
  var j = 0;

  // Initial index of merged subarray
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

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
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
  input == undefined && setInput();
  let inputForSort = input.slice();
  let startTime = window.performance.now();
  mergeSortAlgo(inputForSort, 0, inputForSort.length - 1);
  let endTime = window.performance.now();
  return { sortedArr: inputForSort, time: endTime - startTime };
}

function heapSortAlgo(arr) {
  var N = arr.length;

  // Build heap (rearrange array)
  for (var i = Math.floor(N / 2) - 1; i >= 0; i--) heapify(arr, N, i);

  // One by one extract an element from heap
  for (var i = N - 1; i > 0; i--) {
    // Move current root to end
    var temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    // call max heapify on the reduced heap
    heapify(arr, i, 0);
  }
}

function heapify(arr, N, i) {
  var largest = i; // Initialize largest as root
  var l = 2 * i + 1; // left = 2*i + 1
  var r = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (l < N && arr[l] > arr[largest]) largest = l;

  // If right child is larger than largest so far
  if (r < N && arr[r] > arr[largest]) largest = r;

  // If largest is not root
  if (largest != i) {
    var swap = arr[i];
    arr[i] = arr[largest];
    arr[largest] = swap;

    // Recursively heapify the affected sub-tree
    heapify(arr, N, largest);
  }
}

function heapSort() {
  input == undefined && setInput();
  let inputForSort = input.slice();
  let startTime = window.performance.now();
  heapSortAlgo(inputForSort);
  let endTime = window.performance.now();
  return { sortedArr: inputForSort, time: endTime - startTime };
}

function partition(arr, low, high) {
  // Choosing the pivot
  let pivot = arr[high];

  // Index of smaller element and indicates the right position of pivot found so far
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      // Increment index of smaller element
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot to its correct position
  return i + 1; // Return the partition index
}

function quickSortAlgo(arr, low, high) {
  if (low < high) {
    // pi is the partitioning index, arr[pi] is now at the right place
    let pi = partition(arr, low, high);

    // Separately sort elements before partition and after partition
    quickSortAlgo(arr, low, pi - 1);
    quickSortAlgo(arr, pi + 1, high);
  }
}

function quickSort() {
  input == undefined && setInput();
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
    // From left, find the first element greater than
    // or equal to v. This loop will definitely
    // terminate as v is last element
    while (a[++i] < v);

    // From right, find the first element smaller than
    // or equal to v
    while (v < a[--j]) if (j == l) break;

    // If i and j cross, then we are done
    if (i >= j) break;

    // Swap, so that smaller goes on left greater goes
    // on right
    var temp = a[i];
    a[i] = a[j];
    a[j] = temp;

    // Move all same left occurrence of pivot to
    // beginning of array and keep count using p
    if (a[i] == v) {
      p++;
      temp = a[i];
      a[i] = a[p];
      a[p] = temp;
    }

    // Move all same right occurrence of pivot to end of
    // array and keep count using q
    if (a[j] == v) {
      q--;
      temp = a[q];
      a[q] = a[j];
      a[j] = temp;
    }
  }

  // Move pivot element to its correct index
  var temp = a[i];
  a[i] = a[r];
  a[r] = temp;

  // Move all left same occurrences from beginning
  // to adjacent to arr[i]
  j = i - 1;
  for (let k = l; k < p; k++, j--) {
    temp = a[k];
    a[k] = a[j];
    a[j] = temp;
  }

  // Move all right same occurrences from end
  // to adjacent to arr[i]
  i = i + 1;
  for (let k = r - 1; k > q; k--, i++) {
    temp = a[i];
    a[i] = a[k];
    a[k] = temp;
  }
}
function threeWayQuickSortAlgo(a, l, r) {
  if (r <= l) {
    return;
  }

  (i = 0), (j = 0);

  // Note that i and j are passed as reference
  threeWayPartition(a, l, r);

  // Recur
  threeWayQuickSortAlgo(a, l, j);
  threeWayQuickSortAlgo(a, i, r);
}

function threeWayQuickSort() {
  input == undefined && setInput();
  let inputForSort = input.slice();
  let startTime = window.performance.now();
  threeWayQuickSortAlgo(inputForSort, 0, inputForSort.length - 1);
  let endTime = window.performance.now();
  return { sortedArr: inputForSort, time: endTime - startTime };
}

document.getElementById("checkTime").addEventListener("click", function (e) {
  let checkboxes = document.querySelectorAll(".sortCheckBox:checked");
  let selectedSortingAlgo = [];
  for (let i = 0; i < checkboxes.length; i++) {
    selectedSortingAlgo.push(checkboxes[i].value);
  }
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

  console.log(selectedSortingAlgo);
});
