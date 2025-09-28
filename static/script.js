const submitBtn = document.getElementById("submit-btn");
const textInput = document.getElementById("input");
const output = document.getElementById("output");
submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (textInput.value == "") {
    textInput.focus();
  } else {
    output.style.display = 'none'
    unProcessedInputInJson = { data: textInput.value };
    response = await fetch("/api/process", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(unProcessedInputInJson),
    });
    processedResponse = await response.json();
    output.style.display = "block";
    if (processedResponse.processedInput) {
      output.value = processedResponse.processedInput;
    } else if (processedResponse.error) {
      output.value = processedResponse.error;
    }
    output.scrollIntoView({
        behaviour:'smooth',
        block:'center'
    })
  }
});
