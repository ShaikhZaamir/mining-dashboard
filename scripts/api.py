from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import cv2
import numpy as np
import base64
from ultralytics import YOLO
import io
import os

# Import your model script here if needed, or just call functions inside crackdetection.py
# from crackdetection import run_model

app = FastAPI()

# Allow CORS so Next.js can call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLO model once
model_path = os.path.join(os.path.dirname(__file__), "Crack.pt")
model = YOLO(model_path)


@app.post("/detect-cracks/")
async def detect_cracks(image: UploadFile = File(...)):
    # Read uploaded image
    contents = await image.read()
    nparr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    height, width = img.shape[:2]

    # Run inference
    results = model(img)[0]

    # Draw bounding boxes
    line_thickness = max(1, int(round((height + width) / 600)))
    font_scale = max(0.3, (height + width) / 1500)
    boxes = results.boxes.xyxy.cpu().numpy()
    confidences = results.boxes.conf.cpu().numpy()
    class_ids = results.boxes.cls.cpu().numpy()
    class_names = results.names

    for i, box in enumerate(boxes):
        x1, y1, x2, y2 = map(int, box)
        label = f"{class_names[int(class_ids[i])]} {confidences[i]:.2f}"
        color = (0, 255, 0)
        cv2.rectangle(img, (x1, y1), (x2, y2), color, line_thickness)
        cv2.putText(
            img,
            label,
            (x1, max(y1 - 5, 0)),
            cv2.FONT_HERSHEY_SIMPLEX,
            font_scale,
            color,
            line_thickness,
        )

    # Encode result as base64
    _, buffer = cv2.imencode(".jpg", img)
    jpg_as_text = base64.b64encode(buffer).decode("utf-8")

    return JSONResponse(
        content={"processed_image": f"data:image/jpeg;base64,{jpg_as_text}"}
    )
