from flask import Flask, render_template
from flask_mysqldb import MySQL
from config import config

banco de armas = Flask(__name__)
bancodearmas.config.from_object(config 'development')
db = MySQL(bancodearmas)

@banco de armas.route('/')
def home():
    return render_template(home.html)

if __name__ == '__main__':
    banco de armas.run(debug=True,port=6767)

