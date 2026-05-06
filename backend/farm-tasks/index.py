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
    """CRUD для задач фермы."""
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": HEADERS, "body": ""}

    method = event.get("httpMethod", "GET")
    params = event.get("queryStringParameters") or {}

    if method == "GET":
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT id, title, assignee, due, priority, done FROM farm_tasks ORDER BY done ASC, created_at DESC")
        rows = cur.fetchall()
        cur.close()
        conn.close()
        tasks = [
            {"id": r[0], "title": r[1], "assignee": r[2], "due": r[3], "priority": r[4], "done": r[5]}
            for r in rows
        ]
        return {"statusCode": 200, "headers": HEADERS, "body": json.dumps({"tasks": tasks})}

    if method == "POST":
        body = json.loads(event.get("body") or "{}")
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO farm_tasks (title, assignee, due, priority, done) VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (body.get("title", ""), body.get("assignee", ""), body.get("due", ""), body.get("priority", "medium"), False),
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": HEADERS, "body": json.dumps({"ok": True, "id": new_id})}

    if method == "PUT":
        body = json.loads(event.get("body") or "{}")
        task_id = body.get("id")
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            "UPDATE farm_tasks SET title=%s, assignee=%s, due=%s, priority=%s, done=%s WHERE id=%s",
            (body.get("title"), body.get("assignee"), body.get("due"), body.get("priority"), body.get("done"), task_id),
        )
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": HEADERS, "body": json.dumps({"ok": True})}

    if method == "DELETE":
        task_id = params.get("id")
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("DELETE FROM farm_tasks WHERE id=%s", (task_id,))
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": HEADERS, "body": json.dumps({"ok": True})}

    return {"statusCode": 405, "headers": HEADERS, "body": json.dumps({"error": "Method not allowed"})}
