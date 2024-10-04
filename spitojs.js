console.log("spitojs loaded");

class SmallProgInterpreter {
    constructor(inputElementId, outputElementId) {
        this.inputElement = document.getElementById(inputElementId);
        this.outputElement = document.getElementById(outputElementId);
    }

    interpret() {
        const input = this.inputElement.value.trim().split("\n"); // Split input by lines
        const output = [];

        // (Processing logic has been removed as per your request)

        // Display all interpreted lines
        this.outputElement.innerText = output.join("\n");
    }

    downloadFile(filename, extension) {
        const content = this.inputElement.value;
        const blob = new Blob([content], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${filename}.${extension}`; // Specify the filename with the given extension
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    compressToBase64() {
        const content = this.inputElement.value;
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

    loadFile(event) {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            let contents = e.target.result;
            if (file.name.endsWith('.smallprog')) {
                contents = atob(contents); // Decode Base64 if it's a .smallprog file
            }
            this.inputElement.value = contents; // Set the contents to the textarea
        };
        reader.readAsText(file);
    }
}
