import urllib
import json
import os
import csv
from flask import Flask , request,  make_response, render_template
import Mysqlconnect as connection
from mysql.connector import Error
import re

app = Flask(__name__)

@app.route("/webhook/index")
def index():
    return render_template("index.html") 

@app.route('/webhook',methods = ['POST'])
def webhook():
    conn = connection.ConnectMySql()
    req = request.get_json(silent=True , force= True)
    res = makeWebhookResult(req)
    res = json.dumps(res , indent=4)
    print(res)
    r = make_response(res)
    print(r)
    r.headers['Content-Type'] = 'application/json'
    return r

def makeWebhookResult(req):
    print(req)
    if req.get("queryResult").get("action")=="status_level_person":
        fitness_db = connection.ConnectMySql()
        #update_table = connection.update_table(pizzadb)
        if fitness_db != False:
            result = req.get("queryResult")
            parameters = result.get("parameters")
            status_level = parameters.get("status_level")
            mobile_number = parameters.get("mobile_number")
            '''no_of_pizza = int(parameters.get("no_of_pizza"))
            amount = no_of_pizza*100
            name = parameters["name"]["name"]
            phone_no = parameters.get("phone_no")
            Email_id = parameters.get("Email_id")
            Address = parameters.get("Address")
            toppings = parameters.get("toppings")'''
            
            try:
                if status_level == "heartbeat":
                    mycursor = fitness_db.cursor()
                   
                    select_query = "select Pulse from fitness_bot where phone_number = %s"
                    search_id = (str(mobile_number),)
                    mycursor.execute(select_query,search_id)
                    myresult = mycursor.fetchall()
                    print(myresult)
                    speech = "Your pulse rate is " + myresult[0][0]
                    return{
                    "fulfillmentText" : speech,
                    "fulfillmentMessages": [
                    {
                        "platform": "ACTIONS_ON_GOOGLE",
                        "simpleResponses": {
                            "simpleResponses": [ {
                                "textToSpeech": speech
                            }]
                        }
                    }]
                    
                    }
                elif status_level == "temperature":
                    mycursor = fitness_db.cursor()
                    select_query = "select Temperature from fitness_bot where phone_number = %s"
                    search_id = (str(mobile_number),)
                    mycursor.execute(select_query,search_id)
                    myresult = mycursor.fetchall()
                    print(myresult)
                    speech = "Your Temperature is " + myresult[0][0]
                    return{
                    "fulfillmentText" : speech,
                    "fulfillmentMessages": [
                    {
                        "platform": "ACTIONS_ON_GOOGLE",
                        "simpleResponses": {
                            "simpleResponses": [ {
                                "textToSpeech": speech
                            }]
                        }
                    }]
                    
                    }
                elif status_level == "oxygen":
                    mycursor = fitness_db.cursor()
                   
                    select_query = "select oxygen_level from fitness_bot where phone_number = %s"
                    search_id = (str(mobile_number),)
                    mycursor.execute(select_query,search_id)
                    myresult = mycursor.fetchall()
                    print(myresult)
                    speech = "Your oxygen level is " + myresult[0][0]
                    return{
                    "fulfillmentText" : speech,
                    "fulfillmentMessages": [
                    {
                        "platform": "ACTIONS_ON_GOOGLE",
                        "simpleResponses": {
                            "simpleResponses": [ {
                                "textToSpeech": speech
                            }]
                        }
                    }]
                    
                    }
                elif status_level == "glucose":
                    mycursor = fitness_db.cursor()
                   
                    select_query = "select Glucose_level from fitness_bot where phone_number = %s"
                    search_id = (str(mobile_number),)
                    mycursor.execute(select_query,search_id)
                    myresult = mycursor.fetchall()
                    print(myresult)
                    speech = "Your Glucose level is " + myresult[0][0]
                    return{
                    "fulfillmentText" : speech,
                    "fulfillmentMessages": [
                    {
                        "platform": "ACTIONS_ON_GOOGLE",
                        "simpleResponses": {
                            "simpleResponses": [ {
                                "textToSpeech": speech
                            }]
                        }
                    }]
                    
                    }
                elif status_level == "complete":
                    mycursor = fitness_db.cursor()
                   
                    select_query = "select Pulse, Temperature, Glucose_level, oxygen_level from fitness_bot where phone_number = %s"
                    search_id = (str(mobile_number),)
                    mycursor.execute(select_query,search_id)
                    myresult = mycursor.fetchall()
                    print(myresult)
                    speech = "Your Health Status is <br/><br/>" + "Pulse Rate : " + myresult[0][0] + "<br/> Temperature: "+ myresult[0][1] + " <br/> Your Glucose level : " +myresult[0][2] + " <br/> Your Oxygen level : " +myresult[0][3] 
                    return{
                    "fulfillmentText" : speech,
                    "fulfillmentMessages": [
                    {
                        "platform": "ACTIONS_ON_GOOGLE",
                        "simpleResponses": {
                            "simpleResponses": [ {
                                "textToSpeech": speech
                            }]
                        }
                    }]
                    
                    }
                else:
                    return{
                "fulfillmentText" : "Sorry some error has occured :(",
                "fulfillmentMessages": [
                {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                        "simpleResponses": [ {
                            "textToSpeech": "Sorry some error has occured :("
                        }]
                    }
                }]
                
                }
            except Error as err:
                print(err)
                return{
                "fulfillmentText" : "Sorry some error has occured :(",
                "fulfillmentMessages": [
                {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                        "simpleResponses": [ {
                            "textToSpeech": "Sorry some error has occured :("
                        }]
                    }
                }]
                
            }

            

        else:
            return{
                "fulfillmentText" : "Sorry some error has occured :(",
                "fulfillmentMessages": [
                {
                    "platform": "ACTIONS_ON_GOOGLE",
                    "simpleResponses": {
                        "simpleResponses": [ {
                            "textToSpeech": "Sorry some error has occured :("
                        }]
                    }
                }]
                
            }

if __name__ == "__main__":
    port = int(os.getenv('PORT', 80))
    print("starting on port %d" %(port))
    app.run(debug= True, port= 80)