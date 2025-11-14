import logging
import json
from datetime import datetime
from pathlib import Path

LOG_FILE = Path("voicer.log")

logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format="%(message)s",
)

def log(event: str, data: dict | None = None):
    entry = {
        "timestamp": datetime.utcnow().isoformat(),
        "event": event,
        "data": data or {},
    }

    try:
        logging.info(json.dumps(entry))
    except Exception:
        logging.info(json.dumps({"error": "Failed to write JSON log", "event": event}))

    print(f"[LOG] {event} → {data}")
