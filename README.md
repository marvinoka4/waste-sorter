# AI Waste Sorter: Smart Sorting for a Greener Africa 🌍♻️🧠

## Project Tagline

**Smart Sorting for a Greener Africa.**

## Description

The **AI Waste Sorter** is a web-based prototype designed to empower individuals and communities to efficiently categorise waste using artificial intelligence.  
It addresses the critical challenge of effective waste management, particularly in regions where sorting and recycling infrastructure may be limited.  
By providing an intuitive tool for waste identification, the project aims to simplify the 'work' of waste separation, fostering a culture of responsible waste management and contributing to environmental sustainability.

## Demo

- **Video Demo**: [Link to video demo on YouTube, https://youtu.be/F2iXASZ_SZs]
- **Live Demo**: [Link to deployed Google Cloud Storage website., https://storage.googleapis.com/waste-sorter-project/index.html]

## Features

- **Image Upload**: Users can easily upload images of waste items.
- **AI-Powered Identification**: Leverages Google Cloud Vision AI to analyse images and identify various labels and objects.
- **Waste Type Classification**: Maps AI-detected labels to specific waste categories (e.g., Plastic, Paper & Cardboard, Organic Waste, Glass, Metal, E-waste, General Waste).
- **Clear Results**: Displays the identified waste type with a corresponding icon for easy understanding.
- **User-Friendly Interface**: Clean, responsive design built with Tailwind CSS for an intuitive user experience.

## Built With

- **Languages**: HTML, CSS, JavaScript
- **Frameworks/Libraries**:
  - Tailwind CSS — A utility-first CSS framework for rapid UI development.
  - Font Awesome — For scalable vector icons.
- **Platforms/Cloud Services**: Google Cloud Platform
- **APIs**: Google Cloud Vision AI API — For powerful image analysis and object recognition.
- **CI/CD**: Google Cloud Build — For automated deployments from GitHub to Google Cloud Storage.

## Setup & Installation

### Clone the repository

```bash
git clone https://github.com/[Your-GitHub-Username]/waste-sorter.git
cd waste-sorter
```

### Google Cloud Vision AI API Key

1. Follow the instructions in the [Google Cloud Vision API setup guide](https://cloud.google.com/vision/docs/setup) to create a Google Cloud Project, enable the Cloud Vision AI API, and generate an API key.
2. Open `script.js` and replace `'YOUR_GOOGLE_CLOUD_API_KEY'` with your actual API key:

```javascript
const GOOGLE_CLOUD_VISION_API_KEY = 'YOUR_GOOGLE_CLOUD_API_KEY';
```

### Open `index.html`

Simply open the `index.html` file in your web browser.  
All necessary CSS and JavaScript are loaded via CDNs or linked locally.

## Deployment to Google Cloud Storage (with CI/CD)

### Create a GCS Bucket

- Navigate to **Cloud Storage > Buckets** in your Google Cloud Console.
- Create a new bucket with a globally unique name (e.g., `ai-waste-sorter-yourname-project`).
- **Important**: Uncheck "Enforce public access prevention on this bucket".
- Set access control to **Fine-grained**.
- Set "Index page suffix" to `index.html` under the **Configuration** tab.

### Grant Cloud Build Permissions

- Go to **IAM & Admin > IAM**.
- Find the Cloud Build service account (`[YOUR_PROJECT_NUMBER]@cloudbuild.gserviceaccount.com`).
- Grant this service account the **Storage Admin** role.

### Make Bucket Objects Public

- Upload your `index.html`, `script.js`, and other assets.
- Select all files, click **Edit access**, and add a new entry:
  - **Principal**: `allUsers`
  - **Role**: `Storage Object Viewer`
- Confirm public access.

### Configure `cloudbuild.yaml`

- Ensure `cloudbuild.yaml` is in the root of your GitHub repository.
- Update `gs://waste-sorter-project` in `cloudbuild.yaml` with your bucket name.

### Set up Cloud Build Trigger

- Go to **CI/CD > Cloud Build > Triggers**.
- Create a new trigger:
  - **Event**: Push to a branch
  - **Source**: Connect your GitHub repository
  - **Configuration**: Cloud Build configuration file (`cloudbuild.yaml`)
- Save the trigger.

Now, every push to the configured GitHub branch will automatically trigger deployment to your GCS bucket!

## Usage

1. **Upload Image**: Click the "Upload Waste Image" button and select an image file.
2. **Preview**: The selected image appears in the preview area.
3. **Analyse Waste**: Click the "Analyse Waste" button.
4. **View Results**: The app displays the waste type identified or shows an error if not detected.

## Challenges I Ran Into

- **API Key Management**: Correct API enablement and permissions led to initial 403 errors.
- **Typographical Errors**: Debugging a typo in the API request (`OBJECT_LOCALISATION` instead of `OBJECT_LOCALIZATION`).
- **Mapping AI Labels to Waste Categories**: Refining `wasteCategoryMap` for accurate label-to-category mapping.
- **Time Constraints**: Delivering a polished prototype within the hackathon timeframe.

## Accomplishments

- Built a **Functional Prototype** in record time.
- **Seamless AI Integration** with client-side code.
- **User-Centric Design** with Tailwind CSS and Font Awesome.
- **Direct Impact Potential** for environmental sustainability in Africa.
- Demonstrated strong **Problem-Solving Agility** during the hackathon.

## Lessons Learned

- Integrating **Google Cloud Vision AI** for real-world use cases.
- Advanced **asynchronous JavaScript** with `fetch` API.
- Rapid **frontend prototyping** with Tailwind CSS.
- Effective **mapping of AI outputs** to meaningful categories.
- The importance of **focused scoping** and iterative development.

## What's Next for AI Waste Sorter: Smart Sorting for a Greener Africa

- **Mobile App Development** for iOS and Android.
- **Localised Recycling Guidelines** integration.
- Enhanced **Waste Category Mapping** with user feedback.
- **Team Expansion**.
- **Educational Resources** on waste segregation.
- **Community Engagement Features** for tracking and sharing.
- **Integration with Waste Collection Services**.
