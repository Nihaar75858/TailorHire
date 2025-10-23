import os
from sentence_transformers import SentenceTransformer

MODEL_NAME = "sentence-transformers/all-MiniLM-L6-v2"
MODEL_DIR = os.path.join(os.path.dirname(__file__), "models", "all-MiniLM-L6-v2")

def download_model():
    if os.path.exists(MODEL_DIR):
        print(f"✅ Model already exists at {MODEL_DIR}, skipping download.")
    else:
        print(f"⬇️ Downloading model {MODEL_NAME} ...")
        model = SentenceTransformer(MODEL_NAME)
        model.save(MODEL_DIR)
        print(f"✅ Model saved to {MODEL_DIR}")

if __name__ == "__main__":
    download_model()
