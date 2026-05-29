import logging

logger = logging.getLogger(__name__)
logging.basicConfig(filename="example.log", encoding="utf-8", level=logging.DEBUG, format='%(asctime)s %(message)s')

nume = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
deno = 2

for x in nume:
    if x / deno <= 1:
        logger.warning("Result is smaller than 1")
    else:
        logger.info("Result is OK")
