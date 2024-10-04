class SmallProgInterpreter {
    data(input, type) {
        // Basic interpreter logic
        const lines = input.trim().split("\n");
        const output = lines.map(line => {
            const values = line.trim().split(" ").map(e => parseInt(e));
            return values.map(e => isNaN(e) ? '&' : String.fromCharCode(e + 96)).join("");
        }).join("\n");
        
        return output;
    }

    downloadAsFile(content, filename) {
        const blob = new Blob([content], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    compress(type) {
        const content = document.getElementById("input").value;
        const compressedContent = btoa(content); // Convert to Base64
        const blob = new Blob([compressedContent], { type: 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'smallprog.smallprog'; // Download as .smallprog
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    loadFile(file, callback) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            callback(contents);
        };
        reader.readAsText(file);
    }
}

const spInterpreter = new SmallProgInterpreter();
function data(input, type) {
    return spInterpreter.data(input, type);
}
function downloadAsFile(content, filename) {
    spInterpreter.downloadAsFile(content, filename);
}
function compress(type) {
    spInterpreter.compress(type);
}
function loadFile(file, callback) {
    spInterpreter.loadFile(file, callback);
}
