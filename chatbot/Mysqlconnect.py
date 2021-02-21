from mysql.connector import connect, errorcode, Error


def ConnectMySql():
    try:
        mydb = connect(
            host="localhost", user="jeevidb", password="Jeevitha@db", database="fitness_jeevi_bot",
        )
        mycursor = mydb.cursor()
                   
        select_query = "select Pulse, Temperature, Glucose_level, oxygen_level from fitness_bot_new where phone_number = %s"
        search_id = (str(9597170515),)
        mycursor.execute(select_query,search_id)
        myresult = mycursor.fetchall()
        print(myresult)
        speech = "Your Glucose level is " + myresult[0][0]
        print(speech)
        return mydb
    except Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
            return False
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
            return False
        else:
            print(err)
            return False

print(ConnectMySql())