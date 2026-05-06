import json
import os
import psycopg2

HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    """Получение и обновление общих показателей фермы."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": HEADERS, "body": ""}

    method = event.get("httpMethod", "GET")

    if method == "GET":
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT key, value, label, unit FROM farm_stats ORDER BY id")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        stats = [{"key": r[0], "value": r[1], "label": r[2], "unit": r[3]} for r in rows]
        return {"statusCode": 200, "headers": HEADERS, "body": json.dumps({"stats": stats})}

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        updates = body.get("updates", [])  # [{key, value}]
        conn = get_conn()
        cur = conn.cursor()
        for item in updates:
            cur.execute(
                "UPDATE farm_stats SET value = %s, updated_at = NOW() WHERE key = %s",
                (str(item["value"]), item["key"]),
            )
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": HEADERS, "body": json.dumps({"ok": True})}

    return {"statusCode": 405, "headers": HEADERS, "body": json.dumps({"error": "Method not allowed"})}
