# model_api/models/land_detection.py
import os
import base64
import cv2
import numpy as np
from fastapi import UploadFile
from ultralytics import YOLO

# --- Locate model file safely ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(
    BASE_DIR,
    "../../backend/LandSlidesDetectionModel/LandSlidesDetectionModel/LandSlides.pt",
)
MODEL_PATH = os.path.normpath(MODEL_PATH)

# --- Load YOLO model once ---
try:
    model = YOLO(MODEL_PATH)
    print(f"[INFO] LandDetection model loaded successfully from: {MODEL_PATH}")
except Exception as e:
    print(f"[ERROR] Failed to load LandDetection model: {e}")
    model = None


# --- Inference Function ---
def run_land_detection(file: UploadFile):
    if model is None:
        return {"error": "Model not loaded. Check model path or weights file."}

    try:
        # Read uploaded image bytes
        image_bytes = file.file.read()
        npimg = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
        height, width = img.shape[:2]

        # Run segmentation
        results = model(img)[0]

        if results.masks is None:
            return {"error": "No landslide detected."}

        masks = results.masks.data.cpu().numpy()

        # Draw borders of landslide regions
        for mask in masks:
            mask = cv2.resize(mask, (width, height))
            mask = (mask > 0.5).astype(np.uint8)

            contours, _ = cv2.findContours(
                mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE
            )
            cv2.drawContours(img, contours, -1, (0, 0, 255), 2)  # Red outline

        # Convert annotated image to base64
        _, buffer = cv2.imencode(".jpg", img)
        base64_img = base64.b64encode(buffer).decode("utf-8")

        return {"result_image": base64_img}

    except Exception as e:
        print(f"[ERROR] Land detection inference failed: {e}")
        return {"error": str(e)}
