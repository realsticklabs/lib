class Squeak2JS {
    constructor() {
        this.objects = {};
    }

    // Load .image file via URL
    loadImageFileFromURL(url, callback) {
        fetch(url)
            .then(response => response.json()) // Assuming .image files are JSON-like (adjust if necessary)
            .then(data => {
                this.objects = data;
                callback(this.objects);
            })
            .catch(error => console.error('Error loading .image file:', error));
    }

    // Add or modify objects
    addObject(name, obj) {
        this.objects[name] = obj;
    }

    getObject(name) {
        return this.objects[name];
    }

    // Save the modified environment to a .image file
    saveToImageFile(filename) {
        const data = JSON.stringify(this.objects);
        const blob = new Blob([data], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename + ".image";
        link.click();
    }

    // Run code in the environment
    runCode(code) {
        try {
            return eval(code);
        } catch (e) {
            console.error('Error executing code:', e);
            return null;
        }
    }
}
