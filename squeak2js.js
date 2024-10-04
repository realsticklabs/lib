// squeak2js.js
class Squeak2JS {
    constructor() {
        this.objects = {}; // Store objects from the .image file
    }

    // Load existing .image file (assuming JSON or similar format)
    loadImageFile(file, callback) {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                // Assuming .image file is JSON-like (adjust if binary)
                this.objects = JSON.parse(event.target.result);
                callback(this.objects);
            } catch (e) {
                console.error("Failed to load .image file:", e);
            }
        };
        reader.readAsText(file);
    }

    // Add or modify objects
    addObject(name, obj) {
        this.objects[name] = obj;
    }

    getObject(name) {
        return this.objects[name];
    }

    // Save the modified environment back to .image file
    saveToImageFile(filename) {
        const data = JSON.stringify(this.objects);
        const blob = new Blob([data], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename + ".image";
        link.click();
    }

    // Run code within the environment (sandbox)
    runCode(code) {
        try {
            return eval(code);
        } catch (e) {
            console.error("Error running code:", e);
            return null;
        }
    }
}
