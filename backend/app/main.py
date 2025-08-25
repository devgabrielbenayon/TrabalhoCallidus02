from flask import Flask
from flask_cors import CORS
from app.api import task_routes
from app.api import auth_routes


app = Flask(__name__)

#Registrando rotas

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
app.register_blueprint(auth_routes.bp)
app.register_blueprint(task_routes.bp)


if __name__ == "__main__":
    app.run(debug=True)