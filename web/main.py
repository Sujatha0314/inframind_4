from flask import Flask
import random

app = Flask(__name__)
app.config["DEBUG"] = True


@app.route("/", methods=["GET"])
def home():
    i = 0
    while i >= 0:
        data = {
            "Health_status": "",
            "body temperature": round(random.uniform(35.1, 38.3), 2),
            "blood Pressure": random.randint(70, 140),
            "respiratory rate": random.randint(10, 30),
            "blood sugar level": random.randint(120, 210),
            "pulse": random.randint(50, 120),
            "oxygen saturation level": random.randint(89, 110),
            "cholestrol": random.randint(50, 240),
            "steps": random.randint(0, 10000),
        }

        if (
            (data["body temperature"] > 36.5 and data["body temperature"] < 37.5)
            or (data["blood Pressure"] > 90 and data["blood Pressure"] < 120)
            or (data["respiratory rate"] > 12 and data["respiratory rate"] < 16)
            or (data["blood sugar level"] < 140)
            or (data["pulse"] > 60 and data["pulse"] < 100)
            or (
                data["oxygen saturation level"] > 96
                and data["oxygen saturation level"] < 100
            )
            or (data["cholestrol"] > 200)
        ):
            data["Health_status"] = "Normal"
        if data["blood sugar level"] > 140 and data["blood sugar level"] < 199:
            data["Health_status"] = "Pre Diabetics"
        if data["blood sugar level"] > 200:
            data["Health_status"] = "Diabetics"
        if (
            (data["blood Pressure"] > 139 and data["blood Pressure"] < 150)
            and (data["pulse"] > 100)
            and (data["cholestrol"] > 200 and data["cholestrol"] < 239)
        ):
            data["Health_status"] = "coronary heart disease"
        if data["oxygen saturation level"] < 90:
            data["Health_status"] = "Hypoxemia"
        if (
            (
                data["oxygen saturation level"] > 92
                and data["oxygen saturation level"] < 95
            )
            and (data["blood Pressure"] < 90)
            and (data["respiratory rate"] > 20 and data["respiratory rate"] < 30)
            and (data["pulse"] > 100 and data["pulse"] < 125)
        ):
            data["Health_status"] = "asthma"
        if data["body temperature"] > 37.5 or data["oxygen saturation level"] > 100:
            data["Health_status"] = "abnormal"
        if (
            data["body temperature"] < 36
            or data["respiratory rate"] < 12
            or data["pulse"] < 60
            or (data["cholestrol"] > 50 and data["cholestrol"] < 120)
        ):
            data["Health_status"] = "abnormal"

        return data


app.run()
