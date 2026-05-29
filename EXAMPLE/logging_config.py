# logging_config.py
import logging
import logging.config

LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {
            "format": "%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
    },
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
            "formatter": "default",
        },
        "file": {
            "class": "logging.FileHandler",
            "filename": "api_logs/app.log",
            "formatter": "default",
        },
    },
    "root": {
        "level": "INFO",
        "handlers": ["console", "file"],
    },
}


def setup_logging():
    import os

    os.makedirs("api_logs", exist_ok=True)
    logging.config.dictConfig(LOGGING_CONFIG)
