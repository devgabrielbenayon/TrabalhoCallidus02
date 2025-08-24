from flask import Flask
from app.api import auth_routes
from app.api import task_routes
from app.api import pomodoro_routes
from app.api import stats_routes

app = Flask(__name__)

#Registrando rotas
app.register_blueprint(auth_routes.bp)
app.register_blueprint(task_routes.bp)
app.register_blueprint(pomodoro_routes.bp)
app.register_blueprint(stats_routes.bp)

if __name__ == "__main__":
    app.run(debug=True)