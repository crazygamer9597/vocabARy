# vocabARy: Learn Vocabulary in Various Languages Using AR

vocabARy is an interactive vocabulary learning application that leverages Augmented Reality (AR) to enhance language learning. It translates words into multiple Indian languages using the **IndicTrans2** model and detects objects using **YOLO11**.

## Features

- **AR-based Learning**: Identify objects in real-time and learn their translations.
- **Multi-Language Support**: Translations available in various Indian languages.
- **Object Detection**: Uses YOLO11 for accurate object identification.
- **User-Friendly Interface**: Built with a modern React-based frontend.

## Installation & Usage

### Frontend (React)

```sh
npm install
npm run dev
```

### Backend (Python)

```sh
pip install -r requirements.txt
streamlit run app.py
```

> **Note**: If `yolo11m.pt` is not found in the directory, it will be downloaded automatically on the first run.

## Technologies Used

- **Frontend**: React
- **Backend**: Streamlit, Python
- **Object Detection**: YOLO11
- **Translation Model**: IndicTrans2
