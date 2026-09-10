class Config: 
    SECRET_KEY = 'Lenoel1708'
    DEBUG      = True

class DevelopmetConfig:
    MYSQL_HOST = 'localhost'
    MYSQL_HOST = 'root'
    MYSQL_PASSWORD = 'mysql'
    MYSQL_DATABASE = 'bancodearmas'


config ={

    'development': DevelopmetConfig

}