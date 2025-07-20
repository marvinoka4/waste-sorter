// Get references to HTML elements
const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const imagePreviewText = document.getElementById('imagePreviewText');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const analyseButton = document.getElementById('analyseButton');
const loadingIndicator = document.getElementById('loadingIndicator');
const resultsDisplay = document.getElementById('resultsDisplay');
const errorDisplay = document.getElementById('errorDisplay');

// --- Configuration ---
// REPLACE THIS WITH YOUR ACTUAL GOOGLE CLOUD VISION AI API KEY
// IMPORTANT: For a real production app, you should never expose your API key directly in client-side code.
// This is acceptable for a quick hackathon demo.
const GOOGLE_CLOUD_VISION_API_KEY = 'AIzaSyC3rZ7N2Wu7Jnqn-bsrfzUvcQFQHMbuSKI'; 
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`;

// Comprehensive mapping for common labels to waste categories.
// Each category now includes an 'icon' property (Font Awesome class).
const wasteCategoryMap = {
    // --- Plastics ---
    'plastic': { type: 'Plastic', icon: 'fa-bottle-water' },
    'plastic bottle': { type: 'Plastic', icon: 'fa-bottle-water' },
    'bottle': { type: 'Plastic', icon: 'fa-bottle-water' }, 
    'plastic container': { type: 'Plastic', icon: 'fa-box-open' },
    'container': { type: 'Plastic', icon: 'fa-box-open' },
    'plastic bag': { type: 'Plastic', icon: 'fa-shopping-bag' },
    'bag': { type: 'Plastic', icon: 'fa-shopping-bag' },
    'plastic wrap': { type: 'Plastic', icon: 'fa-film' },
    'film': { type: 'Plastic', icon: 'fa-film' },
    'yogurt pot': { type: 'Plastic', icon: 'fa-box-open' },
    'food packaging': { type: 'Plastic', icon: 'fa-box-open' },
    'detergent bottle': { type: 'Plastic', icon: 'fa-bottle-water' },
    'shampoo bottle': { type: 'Plastic', icon: 'fa-bottle-water' },
    'water bottle': { type: 'Plastic', icon: 'fa-bottle-water' },

    // --- Paper & Cardboard ---
    'paper': { type: 'Paper & Cardboard', icon: 'fa-newspaper' },
    'cardboard': { type: 'Paper & Cardboard', icon: 'fa-box' },
    'newspaper': { type: 'Paper & Cardboard', icon: 'fa-newspaper' },
    'magazine': { type: 'Paper & Cardboard', icon: 'fa-book-open' },
    'book': { type: 'Paper & Cardboard', icon: 'fa-book' },
    'leaflet': { type: 'Paper & Cardboard', icon: 'fa-file-alt' },
    'brochure': { type: 'Paper & Cardboard', icon: 'fa-file-alt' },
    'cereal box': { type: 'Paper & Cardboard', icon: 'fa-box' },
    'pizza box': { type: 'Paper & Cardboard', icon: 'fa-box' }, 
    'cardboard box': { type: 'Paper & Cardboard', icon: 'fa-box' },
    'paper towel roll': { type: 'Paper & Cardboard', icon: 'fa-toilet-paper' },
    'egg carton': { type: 'Paper & Cardboard', icon: 'fa-egg' },
    'tissue box': { type: 'Paper & Cardboard', icon: 'fa-box' },

    // --- Organic/Food Waste ---
    'food': { type: 'Organic Waste', icon: 'fa-apple-alt' },
    'fruit': { type: 'Organic Waste', icon: 'fa-apple-alt' },
    'vegetable': { type: 'Organic Waste', icon: 'fa-carrot' },
    'banana peel': { type: 'Organic Waste', icon: 'fa-banana' }, 
    'apple core': { type: 'Organic Waste', icon: 'fa-apple-alt' },
    'coffee grounds': { type: 'Organic Waste', icon: 'fa-coffee' },
    'tea bag': { type: 'Organic Waste', icon: 'fa-mug-hot' },
    'plant': { type: 'Organic Waste', icon: 'fa-leaf' },
    'leaves': { type: 'Organic Waste', icon: 'fa-leaf' },
    'grass': { type: 'Organic Waste', icon: 'fa-leaf' },
    'compost': { type: 'Organic Waste', icon: 'fa-recycle' },
    'egg shell': { type: 'Organic Waste', icon: 'fa-egg' },

    // --- Glass ---
    'glass': { type: 'Glass', icon: 'fa-wine-bottle' },
    'glass bottle': { type: 'Glass', icon: 'fa-wine-bottle' },
    'jar': { type: 'Glass', icon: 'fa-jar' }, 
    'wine bottle': { type: 'Glass', icon: 'fa-wine-bottle' },
    'beer bottle': { type: 'Glass', icon: 'fa-beer' },
    'drinking glass': { type: 'Glass', icon: 'fa-glass-whiskey' },
    'glass jar': { type: 'Glass', icon: 'fa-jar' },

    // --- Metal ---
    'metal': { type: 'Metal', icon: 'fa-cog' },
    'can': { type: 'Metal', icon: 'fa-tin-can' }, 
    'aluminium can': { type: 'Metal', icon: 'fa-tin-can' },
    'tin can': { type: 'Metal', icon: 'fa-tin-can' },
    'soda can': { type: 'Metal', icon: 'fa-tin-can' },
    'food can': { type: 'Metal', icon: 'fa-tin-can' },
    'aluminium foil': { type: 'Metal', icon: 'fa-scroll' }, 
    'metal lid': { type: 'Metal', icon: 'fa-circle' }, 
    'cutlery': { type: 'Metal', icon: 'fa-utensils' },

    // --- E-waste (Electronic Waste) ---
    'electronic device': { type: 'E-waste', icon: 'fa-microchip' },
    'battery': { type: 'E-waste', icon: 'fa-battery-full' },
    'mobile phone': { type: 'E-waste', icon: 'fa-mobile-alt' },
    'laptop': { type: 'E-waste', icon: 'fa-laptop' },
    'computer': { type: 'E-waste', icon: 'fa-desktop' },
    'keyboard': { type: 'E-waste', icon: 'fa-keyboard' },
    'mouse': { type: 'E-waste', icon: 'fa-mouse' },
    'charger': { type: 'E-waste', icon: 'fa-plug' },
    'cable': { type: 'E-waste', icon: 'fa-ethernet' },
    'circuit board': { type: 'E-waste', icon: 'fa-microchip' },
    'printer': { type: 'E-waste', icon: 'fa-print' },
    'monitor': { type: 'E-waste', icon: 'fa-tv' },

    // --- Textiles ---
    'textile': { type: 'Textile', icon: 'fa-tshirt' },
    'cloth': { type: 'Textile', icon: 'fa-tshirt' },
    'fabric': { type: 'Textile', icon: 'fa-tshirt' },
    'clothing': { type: 'Textile', icon: 'fa-tshirt' },
    't-shirt': { type: 'Textile', icon: 'fa-tshirt' },
    'jeans': { type: 'Textile', icon: 'fa-tshirt' },
    'curtain': { type: 'Textile', icon: 'fa-tshirt' },
    'towel': { type: 'Textile', icon: 'fa-tshirt' },

    // --- General/Mixed Waste (if no specific category found) ---
    'rubbish': { type: 'General Waste', icon: 'fa-trash-alt' },
    'waste': { type: 'General Waste', icon: 'fa-trash-alt' },
    'debris': { type: 'General Waste', icon: 'fa-trash-alt' },
    'trash': { type: 'General Waste', icon: 'fa-trash-alt' },
    'miscellaneous': { type: 'General Waste', icon: 'fa-trash-alt' },
    'unidentified': { type: 'General Waste', icon: 'fa-question-circle' },
    'other': { type: 'General Waste', icon: 'fa-question-circle' }
};

// --- Event Listeners ---

// Handle image file selection and display preview
imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreview.classList.remove('hidden');
            imagePreviewText.classList.add('hidden');
            // Clear previous results/errors when a new image is selected
            hideResultsAndErrors();
        };
        reader.readAsDataURL(file);
    } else {
        imagePreview.src = '#';
        imagePreview.classList.add('hidden');
        imagePreviewText.classList.remove('hidden');
        hideResultsAndErrors();
    }
});

// Handle analyse button click
analyseButton.addEventListener('click', async () => {
    const file = imageUpload.files[0];
    if (!file) {
        showError("Please select an image first.");
        return;
    }

    hideResultsAndErrors(); // Clear previous states
    loadingIndicator.classList.remove('hidden'); // Show loading indicator
    analyseButton.disabled = true; // Disable button during analysis

    try {
        // Read image file as Base64
        const base64Image = await readFileAsBase64(file);
        
        // Call Google Cloud Vision AI
        const wasteInfo = await callVisionAPI(base64Image); // Now returns an object { type, icon }

        // Display results
        if (wasteInfo && wasteInfo.type) {
            showResults(wasteInfo.type, wasteInfo.icon); // Pass both type and icon
        } else {
            showResults("Could not determine waste type. Please try another image or a more specific item.", 'fa-question-circle'); // Default icon for unknown
        }

    } catch (error) {
        console.error("Analysis failed:", error);
        showError(`Analysis failed: ${error.message || 'Unknown error. Please try again.'}`);
    } finally {
        loadingIndicator.classList.add('hidden'); // Hide loading indicator
        analyseButton.disabled = false; // Re-enable button
    }
});

// --- Helper Functions ---

/**
 * Reads a file and returns its content as a Base64 encoded string.
 * @param {File} file - The file to read.
 * @returns {Promise<string>} A promise that resolves with the Base64 string.
 */
function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(',')[1]); // Get only the Base64 part
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

/**
 * Calls the Google Cloud Vision AI API with the Base64 image data.
 * @param {string} base64Image - The Base64 encoded image data.
 * @returns {Promise<{type: string, icon: string}|null>} The determined waste type and its icon, or null if not found.
 */
async function callVisionAPI(base64Image) {
    const payload = {
        requests: [{
            image: {
                content: base64Image
            },
            features: [
                { type: 'LABEL_DETECTION', maxResults: 15 }, // Increased maxResults for more labels
                { type: 'OBJECT_LOCALIZATION', maxResults: 10 } // Increased maxResults for more objects
            ]
        }]
    };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error ? errorData.error.message : 'API request failed');
    }

    const data = await response.json();
    console.log("Vision API Response:", data); // Log the full response for debugging

    // Process labels first (general categories)
    if (data.responses && data.responses.length > 0 && data.responses[0].labelAnnotations) {
        for (const label of data.responses[0].labelAnnotations) {
            const normalisedDescription = label.description.toLowerCase();
            // Check if the label description (or a part of it) matches any key in our map
            for (const key in wasteCategoryMap) {
                // Use includes for partial matches, e.g., "plastic bottle" matches "bottle"
                if (normalisedDescription.includes(key)) {
                    return wasteCategoryMap[key]; // Return the object with type and icon
                }
            }
        }
    }

    // If no clear label match, try object localisation (more specific items)
    if (data.responses && data.responses.length > 0 && data.responses[0].localizedObjectAnnotations) {
        for (const obj of data.responses[0].localizedObjectAnnotations) {
            const normalisedName = obj.name.toLowerCase();
             for (const key in wasteCategoryMap) {
                if (normalisedName.includes(key)) {
                    return wasteCategoryMap[key]; // Return the object with type and icon
                }
            }
        }
    }

    return null; // No matching waste type found
}

/**
 * Displays the analysis results with an icon.
 * @param {string} type - The waste type to display.
 * @param {string} iconClass - The Font Awesome class for the icon.
 */
function showResults(type, iconClass) {
    resultsDisplay.innerHTML = `<div class="flex items-center justify-center space-x-2">
                                    <i class="fas ${iconClass} text-2xl"></i>
                                    <span>This looks like: <span class="font-bold">${type}</span>.</span>
                                </div>`;
    resultsDisplay.classList.remove('hidden');
}

/**
 * Displays an error message.
 * @param {string} message - The error message to display.
 */
function showError(message) {
    errorDisplay.innerHTML = message;
    errorDisplay.classList.remove('hidden');
}

/**
 * Hides results and error messages.
 */
function hideResultsAndErrors() {
    resultsDisplay.classList.add('hidden');
    errorDisplay.classList.add('hidden');
}
