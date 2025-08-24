from flask import Flask
from app.api import task_routes


app = Flask(__name__)

#Registrando rotas

app.register_blueprint(task_routes.bp)


if __name__ == "__main__":
    app.run(debug=True)