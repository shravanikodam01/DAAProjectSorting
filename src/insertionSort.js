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

document.getElementById("insertion").addEventListener("click", function (e) {
  let input = document.getElementById("inputArray").value.split(" ");
  input = input.map(function (num) {
    return Number(num);
  });
  let key, j;
  let startTime = new Date();
  for (let i = 1; i < input.length; i++) {
    key = input[i];
    j = i - 1;
    while (j >= 0 && input[j] > key) {
      input[j + 1] = input[j];
      j = j - 1;
    }
    input[j + 1] = key;
  }
  let endTime = new Date();
  display(input, endTime - startTime);
});
