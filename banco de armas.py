from flask import Flask, render_template

banco de armas = Flask(__name__)

@banco de armas.route('/')
def home():
    return "hola estas en el banco de armas"

if __name__ == '__main__':
    banco de armas.run(debug=True,port=6767)

