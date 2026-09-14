class Config: 
    SECRET_KEY = 'Lenoel1708'
    DEBUG      = True

<<<<<<< HEAD
    class DevelopmetConfig:
        MYSQL_HOST = 'localhost'
        MYSQL_HOST = 'root'
        MYSQL_PASSWORD = 'mysql'
        MYSQL_DATABASE = 'bancodearmas'
=======
class DevelopmetConfig:
    MYSQL_HOST = 'localhost'
    MYSQL_HOST = 'root'
    MYSQL_PASSWORD = 'mysql'
    MYSQL_DATABASE = 'bancodearmas'
>>>>>>> abec7b06deb66a3b7abb2ab889a63a0bcacb6301


config ={

    'development': DevelopmetConfig

}