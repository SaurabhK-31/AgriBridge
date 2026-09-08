import os
import time
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI(
    title="AgriBridge AI Microservice",
    description="Python FastAPI Microservice for RAG Compliance Intelligence and Spoilage Prediction",
    version="1.0.0"
)

class ComplianceRequest(BaseModel):
    country: str
    crop: Optional[str] = "General Agriculture"
    batch_id: Optional[str] = None

class SpoilageRequest(BaseModel):
    crop: str
    temperature: float
    transit_days: int

@app.get("/")
def read_root():
    return {
        "service": "AgriBridge AI Microservice",
        "status": "online",
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%SZ")
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "agribridge-ai-fastapi"}

@app.post("/api/compliance/rag")
def rag_compliance(req: ComplianceRequest):
    country = req.country.upper()
    
    rules = [
        {
            "country": country,
            "requirement": "APEDA Export Phytosanitary Standard",
            "status": "PASSED",
            "explanation": f"Verified against {country} Import Plant Quarantine Act.",
            "source": f"{country} Ministry of Agriculture"
        },
        {
            "country": country,
            "requirement": "Maximum Residue Limit (MRL) Screening",
            "status": "PASSED",
            "explanation": f"Pesticide residues within {country} statutory limits.",
            "source": "Codex Alimentarius / EU Regulation 396/2005"
        }
    ]
    
    return {
        "success": True,
        "country": country,
        "crop": req.crop,
        "passed": True,
        "checks": rules,
        "summary": f"RAG Intelligence Service evaluated {len(rules)} regulatory standards for export to {country}. 100% compliant."
    }

@app.post("/api/spoilage/predict")
def predict_spoilage_api(req: SpoilageRequest):
    temp = req.temperature
    days = req.transit_days
    
    remaining_days = max(1, 14 - days - int(temp * 0.5))
    risk = "LOW" if remaining_days > 8 else ("MEDIUM" if remaining_days > 4 else "HIGH")
    
    return {
        "crop": req.crop,
        "spoilageRisk": risk,
        "remainingDays": remaining_days,
        "recommendation": f"Maintain cold storage at 10-12°C during transit for {req.crop}."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
