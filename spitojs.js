// Get references to the input and output elements
const inputElement = document.getElementById("input");
const outputElement = document.getElementById("output");

function interpret() {
    const input = inputElement.value.trim().split("\n"); // Split input by lines
    const output = [];

    input.forEach(line => {
        const values = line.trim().split(" ").map(Number); // Split line by spaces and convert to numbers
        const lineOutput = values.map(e => isNaN(e) ? '&' : String.fromCharCode(e + 96)).join(""); // Interpret each value in the line
        output.push(lineOutput); // Store the interpreted line
    });

    outputElement.innerText = output.join("\n"); // Display interpreted lines
}

function downloadFile(filename, extension) {
    const content = inputElement.value;
    const blob = new Blob([content], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.${extension}`; // Specify the filename with the given extension
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function compressToBase64() {
    const content = inputElement.value;
    const compressedContent = btoa(content); // Compress content to Base64
    const blob = new Blob([compressedContent], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'smallprog.smallprog'; // Specify the filename with .smallprog extension
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function loadFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        let contents = e.target.result;
        if (file.name.endsWith('.smallprog')) {
            contents = atob(contents); // Decode Base64 if it's a .smallprog file
        }
        inputElement.value = contents; // Set the contents to the textarea
    };
    reader.readAsText(file);
}

function loadSpiFromUrl(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(contents => {
            inputElement.value = contents; // Set the contents to the textarea
            interpret(); // Optionally, automatically interpret the loaded content
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}
