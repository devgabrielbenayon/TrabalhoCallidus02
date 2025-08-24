from flask import Blueprint, jsonify, request
from models import Task
from models import TaskManager
import uuid
from datetime import datetime

bp = Blueprint('tasks', __name__, url_prefix='/tasks')

DB_FILE = 'database.json'

manager = TaskManager("database.json")


#GET lista todas as atividades
@bp.route('/', methods=['GET'])
def get_tasks():
    return jsonify([t.to_dict() for t in manager.load_tasks()])


#POST cria nova atividade
@bp.route('/', methods=['POST'])
def add_task():
    data = request.json

    if not data.get("title"):
        return jsonify({"error": "É obrigatório ter título definido"})
    
    new_task = Task(
        id=str(uuid.uuid4()),
        title=data["title"],
        description=data.get("description", "")
    )

    tasks = manager.load_tasks()
    tasks.append(new_task)
    manager.save_tasks(tasks)

    return jsonify(new_task.to_dict()), 201


#DELETE procura por id e remove atividade
@bp.route('/<task_id>', methods=['DELETE'])
def remove_task(task_id):
    tasks = manager.load_tasks()

    task = next((t for t in tasks if t.id == task_id), None)

    if not task:
        return jsonify({"error": "Atividade não encontrada"}), 404
    else:
        tasks.remove(task)
        manager.save_tasks(tasks)
        return jsonify({"message": "Atividade removida com sucesso"}), 200
    

#PATCH procura por id e atualiza tarefa
@bp.route('/<task_id>', methods=['PATCH'])
def update_task(task_id):
    tasks = manager.load_tasks()
    task = next((t for t in tasks if t.id == task_id), None)

    if not task:
        return jsonify({"error": "Atividade não encontrada"}), 404
    else:
        for key, value in request.json.items():
            if hasattr(task, key):
                setattr(task, key, value)

        task.updated_at = datetime.now().isoformat()

        manager.save_tasks(tasks)
        return jsonify(task.to_dict()), 200
