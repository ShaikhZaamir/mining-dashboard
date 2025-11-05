# model_api/models/rock_detection.py

import os
import base64
import cv2
import numpy as np
from fastapi import UploadFile
from ultralytics import YOLO

# --- Locate model file safely ---
# Build absolute path to backend model weights
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "../../backend/RockDetectionModel/best.pt")
MODEL_PATH = os.path.normpath(MODEL_PATH)

# --- Load YOLO model once ---
try:
    model = YOLO(MODEL_PATH)
    print(f"[INFO] RockDetection model loaded successfully from: {MODEL_PATH}")
except Exception as e:
    print(f"[ERROR] Failed to load RockDetection model from {MODEL_PATH}: {e}")
    model = None


# --- Inference Function ---
def run_rock_detection(file: UploadFile):
    """
    Run YOLOv8 inference on an uploaded image and return
    the annotated image as base64 along with detection metadata.
    """
    if model is None:
        return {"error": "Model not loaded. Check model path or weights file."}

    try:
        # Read uploaded image bytes
        image_bytes = file.file.read()
        npimg = np.frombuffer(image_bytes, np.uint8)
        img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

        # Run YOLO inference
        results = model(img)[0]

        detections = []
        for box in results.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            label = results.names[int(box.cls[0])]
            confidence = float(box.conf[0])
            detections.append(
                {
                    "label": label,
                    "confidence": round(confidence, 2),
                    "box": [x1, y1, x2, y2],
                }
            )
            # Draw boxes and labels
            cv2.rectangle(img, (x1, y1), (x2, y2), (0, 255, 0), 2)
            cv2.putText(
                img,
                f"{label} {confidence:.2f}",
                (x1, y1 - 5),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.6,
                (0, 255, 0),
                2,
            )

        # Convert annotated image to base64
        _, buffer = cv2.imencode(".jpg", img)
        base64_img = base64.b64encode(buffer).decode("utf-8")

        # Return both image and detection data
        return {"result_image": base64_img, "detections": detections}

    except Exception as e:
        print(f"[ERROR] Inference failed: {e}")
        return {"error": str(e)}
