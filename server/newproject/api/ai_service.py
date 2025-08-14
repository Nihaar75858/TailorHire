# ai_service.py
import threading
import numpy as np
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline
from sentence_transformers import SentenceTransformer

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
        # LLM
        self.llm_tokenizer = AutoTokenizer.from_pretrained(TEXT_MODEL_ID)
        self.llm_model = AutoModelForCausalLM.from_pretrained(
            TEXT_MODEL_ID,
            torch_dtype="auto",           # uses GPU if available
            device_map="auto",            # auto places on GPU/CPU
        )
        self.generator = pipeline(
            "text-generation",
            model=self.llm_model,
            tokenizer=self.llm_tokenizer,
            device_map="auto",
        )

        # Embeddings
        self.embedder = SentenceTransformer(EMB_MODEL_ID)  # stays on CPU fine

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
        prompt = self._format_prompt(resume_text, job_text)
        out = self.generator(prompt, **GEN_KW)[0]["generated_text"]
        # For some models, output repeats the prompt; trim if needed:
        # Keep only what comes after the prompt:
        if out.startswith(prompt):
            out = out[len(prompt):].strip()
        return out.strip()

    def match_score(self, resume_text: str, job_text: str) -> float:
        a = self.embedder.encode(resume_text, normalize_embeddings=True)
        b = self.embedder.encode(job_text, normalize_embeddings=True)
        # cosine since normalized
        sim = float(np.dot(a, b))
        return round(sim * 100, 2)


ai_service = AIService.get()
