# model_api/models/crack_detection.py

import os
import base64
import cv2
import numpy as np
from fastapi import UploadFile
from ultralytics import YOLO
from scipy.spatial import distance

# --- Locate model file safely ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "../../backend/CrackDetectionModel/Crack.pt")
MODEL_PATH = os.path.normpath(MODEL_PATH)

# --- Load YOLO model once ---
try:
    model = YOLO(MODEL_PATH)
    print(f"[INFO] CrackDetection model loaded successfully from: {MODEL_PATH}")
except Exception as e:
    print(f"[ERROR] Failed to load CrackDetection model from {MODEL_PATH}: {e}")
    model = None

# --- Settings ---
PIXELS_PER_CM = 50  # Change this if your scale differs


# --- Inference Function ---
def run_crack_detection(file: UploadFile):
    """
    Run YOLOv8 segmentation inference on an uploaded image and return
    the annotated image (with cracks highlighted) as base64.
    Also calculates approximate gaps (cm) between multiple cracks.
    """
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
            return {"error": "No cracks detected."}

        masks = results.masks.data.cpu().numpy()
        crack_centers = []

        # Process each mask
        for mask in masks:
            mask = cv2.resize(mask, (width, height))
            mask = (mask > 0.5).astype(np.uint8)

            # Green mask for visualization
            green_mask = np.zeros_like(img)
            green_mask[:, :, 1] = mask * 255
            img = cv2.addWeighted(img, 1, green_mask, 0.5, 0)

            # Find crack center
            ys, xs = np.where(mask == 1)
            if len(xs) > 0 and len(ys) > 0:
                crack_centers.append((int(np.mean(xs)), int(np.mean(ys))))

        # Calculate gaps between cracks (if multiple)
        gaps = []
        if len(crack_centers) > 1:
            for i, center in enumerate(crack_centers):
                min_dist_px = float("inf")
                nearest = None
                for j, other in enumerate(crack_centers):
                    if i != j:
                        dist = distance.euclidean(center, other)
                        if dist < min_dist_px:
                            min_dist_px = dist
                            nearest = other

                # Convert to cm
                gap_cm = min_dist_px / PIXELS_PER_CM
                gaps.append({"from": center, "to": nearest, "gap_cm": round(gap_cm, 2)})

                # Annotate image with gap
                mid_x = int((center[0] + nearest[0]) / 2)
                mid_y = int((center[1] + nearest[1]) / 2)
                cv2.putText(
                    img,
                    f"{gap_cm:.2f} cm",
                    (mid_x, mid_y),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.4,
                    (0, 0, 0),
                    2,
                )

        # Convert annotated image to base64
        _, buffer = cv2.imencode(".jpg", img)
        base64_img = base64.b64encode(buffer).decode("utf-8")

        return {"result_image": base64_img, "gaps": gaps}

    except Exception as e:
        print(f"[ERROR] Inference failed: {e}")
        return {"error": str(e)}
