from flask import Flask, render_template,request,redirect, url_for
from flask_mysqldb import MySQL
from config import config
from werkzeug.security import generate_password_hash 

bancodearmasApp = Flask(__name__)
bancodearmasApp.config.from_object(config ['development'])
db = MySQL(bancodearmasApp)

@bancodearmasApp.route('/')
def home():
    return render_template('home.html')

@bancodearmasApp.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        nombre = request.form['nombre']
        correo = request.form['correo']
        clave = request.form['clave'] 
        claveCifrada = generate_password_hash(clave)
        regUsuario = db.connection.cursor()
        regUsuario.execute('INSERT INTO usuarios (nombre, correo, clave) VALUES (%s, %s, %s)', (nombre, correo, claveCifrada))
        db.connection.commit()

        return render_template('home.html')
    
    else: 
        return render_template('home.html')

@bancodearmasApp.route('/signin', methods=['GET','POST'])
def signin():
    if request.method == 'POST':
        usuario = User (0, None,request from['correo'],request.fore['Clave'],None)
        usuarioAutenticado =ModelUser.signin(db, usuario)
        if usuarioAutenticado is not None:
            login_user(usuarioAutenticado)
            if usuarioAutenticado.clave:
                if usuarioAutenticado.perfil == 'A':
                    return redirect(url_for('home_html'))
                else:
                    return redirect(url_for('home.user'))
            else:
                flash("Contraseña indirecta")
                redirect(url_for('home'))
        else:
            flash('Usuario no existente pa')
            redirect(url_for('home'))
    else: 
         render_template('home.html')  

@bancodearmasApp.route('/signout', method=['GET','POST'])
def signout():
    login_user()
    return redirect(url_for('home'))

@bancodearmasApp.route('/home_admin', method=['GET','POST'])
def home_admin():
    return render_template('admin.html')  

@bancodearmasApp.route('/home_user', method=['GET','POST'])
def home_user():
    return render_template('user.html')       
  

@bancodearmasApp.route('/sUsuario', methods=['GET', 'POST'])
def sUsuario():
    return render_template('use.html')


@bancodearmasApp.route('/logout')
def logout():
    session.clear()
    flash('Sesion cerrada.', 'success')
    return redirect(url_for('home'))

if __name__ == '__main__':
    bancodearmasApp.run(debug=True,port=6767)

