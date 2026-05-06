import json
import os
import psycopg2

HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    """CRUD для текущих посевов фермы."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": HEADERS, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}

    if method == "GET":
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT id, name, area, progress, stage, icon FROM farm_crops ORDER BY sort_order ASC, id ASC")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        crops = [
            {"id": r[0], "name": r[1], "area": r[2], "progress": r[3], "stage": r[4], "icon": r[5]}
            for r in rows
        ]
        return {"statusCode": 200, "headers": HEADERS, "body": json.dumps({"crops": crops})}

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO farm_crops (name, area, progress, stage, icon, sort_order) VALUES (%s, %s, %s, %s, %s, (SELECT COALESCE(MAX(sort_order),0)+1 FROM farm_crops)) RETURNING id",
            (body.get("name", ""), int(body.get("area", 0)), int(body.get("progress", 0)), body.get("stage", ""), body.get("icon", "🌾")),
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": HEADERS, "body": json.dumps({"ok": True, "id": new_id})}

    if method == "PUT":
        body = json.loads(event.get("body") or "{}")
        crop_id = body.get("id")
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "UPDATE farm_crops SET name=%s, area=%s, progress=%s, stage=%s, icon=%s WHERE id=%s",
            (body.get("name"), int(body.get("area", 0)), int(body.get("progress", 0)), body.get("stage"), body.get("icon"), crop_id),
        )
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": HEADERS, "body": json.dumps({"ok": True})}

    if method == "DELETE":
        crop_id = params.get("id")
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("DELETE FROM farm_crops WHERE id=%s", (crop_id,))
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": HEADERS, "body": json.dumps({"ok": True})}

    return {"statusCode": 405, "headers": HEADERS, "body": json.dumps({"error": "Method not allowed"})}
