# model_api/main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

# Import model functions
from models.rock_detection import run_rock_detection
from models.crack_detection import run_crack_detection
from models.land_detection import run_land_detection  # ✅ Added

app = FastAPI()

# Allow your Next.js frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Later you can restrict to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Mining Detection API is running"}


# --- Rock Detection Endpoint ---
@app.post("/rock-detection")
async def rock_detection(file: UploadFile = File(...)):
    return run_rock_detection(file)


# --- Crack Detection Endpoint ---
@app.post("/crack-detection")
async def crack_detection(file: UploadFile = File(...)):
    return run_crack_detection(file)


# --- Landslide Detection Endpoint ---
@app.post("/land-detection")
async def land_detection(file: UploadFile = File(...)):
    return run_land_detection(file)
