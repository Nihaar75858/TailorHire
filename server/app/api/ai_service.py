# ai_service.py
import threading
import numpy as np
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from sentence_transformers import SentenceTransformer
import torch
import os

# -------- CONFIG --------
TEXT_MODEL_ID = "microsoft/phi-3-mini-4k-instruct"   # swap to Qwen2.5-3B-Instruct or mistral as you prefer
EMB_MODEL_ID  = "sentence-transformers/all-MiniLM-L6-v2"

# Generation defaults
GEN_KW = dict(
    max_new_tokens=400,
    temperature=0.7,
    do_sample=True
)

# Singleton pattern so models load once
class AIService:
    _instance = None
    _lock = threading.Lock()

    def __init__(self):
        self.llm_tokenizer = None
        self.llm_model = None
        self.generator = None
        self.embedder = None

    def _ensure_models_loaded(self):
        if self.generator is None:
            print("🔄 Loading LLM model...")
            self.llm_tokenizer = AutoTokenizer.from_pretrained(TEXT_MODEL_ID)
            self.llm_model = AutoModelForCausalLM.from_pretrained(
                TEXT_MODEL_ID,
                torch_dtype=torch.float32,
                device_map=None,
            )
            self.generator = pipeline(
                "text-generation",
                model=self.llm_model,
                tokenizer=self.llm_tokenizer
            )
        model_path = os.path.join(os.path.dirname(__file__), "..", "models", "all-MiniLM-L6-v2")
        
        if not os.path.exists(model_path):
            raise FileNotFoundError(
                f"❌ Embedding model not found at {model_path}. "
                f"Please run `python download_models.py` first."
            )

        print("🔄 Loading embeddings model...")
        self.embedder = SentenceTransformer(model_path, device="cpu")
        print("✅ Embeddings model loaded successfully.")

    @classmethod
    def get(cls):
        if not cls._instance:
            with cls._lock:
                if not cls._instance:
                    cls._instance = AIService()
        return cls._instance

    def _format_prompt(self, resume_text: str, job_text: str) -> str:
        # Keep it short and instruction-tuned
        return f"""
You are a career assistant AI. Using the RESUME and JOB below, write a concise, professional cover letter (200–300 words).
Focus on matching the candidate's experiences to the job requirements, with a confident tone.

RESUME:
{resume_text}

JOB:
{job_text}

Return only the letter. No preamble, no markdown.
"""

    def generate_cover_letter(self, resume_text: str, job_text: str) -> str:
        self._ensure_models_loaded()
        prompt = self._format_prompt(resume_text, job_text)
        print("Reached here in generate_cover_letter")
        out = self.generator(prompt, **GEN_KW)[0]["generated_text"]
        if out.startswith(prompt):
            out = out[len(prompt):].strip()
        print("Reached end in generate_cover_letter")
        return out.strip()

    def match_score(self, resume_text: str, job_text: str) -> float:
        self._ensure_models_loaded()
        a = self.embedder.encode(resume_text, normalize_embeddings=True)
        b = self.embedder.encode(job_text, normalize_embeddings=True)
        sim = float(np.dot(a, b))
        print(f"Match score between resume and job: {sim:.4f}")
        return round(sim * 100, 2)


ai_service = AIService.get()
