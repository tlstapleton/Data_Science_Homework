from flask import Flask, jsonify
import numpy as np
import pandas as pd
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
engine = create_engine("sqlite:///Resources/hawaii.sqlite")
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

Base.classes.keys()

Measurement = Base.classes.measurement
Station = Base.classes.station
session = Session(engine)


app = Flask(__name__)


@app.route("/")
def welcome():
    return (
        f"Welcome to the API!<br/>"
        f"Available Routes:<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/<start><br/>"
        f"/api/v1.0/<start>/<end><br/>"
    )



@app.route("/api/v1.0/precipitation")
def precipitation():

    measurements = session.query(Measurement).all()
    
    all_prec = []
    for measurement in measurements:
        prcp_dict = {}
        prcp_dict["date"] = measurement.date
        prcp_dict["age"] = measurement.prcp
        all_prec.append(prcp_dict)

    return jsonify(all_prec)

@app.route("/api/v1.0/stations")
def stations():
    stations = session.query(Measurement.station).group_by(Measurement.station).all()

    all_stations = []
    for station in stations:
        station_dict = {}
        station_dict["Station"] = station
        all_stations.append(station_dict)

    return jsonify(all_stations)

@app.route("/api/v1.0/tobs")
def tobs():

    lastdate=dt.datetime.strptime(session.query(Measurement.date).order_by(Measurement.date.desc()).first()[0],'%Y-%m-%d')
    query_date=lastdate-dt.timedelta(days=365)

    temps=session.query(Measurement.date,Measurement.tobs).filter(Measurement.date > query_date).all()

    all_temps = []
    for temp in temps:
        temp_dict = {}
        temp_dict["Date"] = temp.date
        temp_dict["Temp"] = temp.tobs
        all_temps.append(temp_dict)

    return jsonify(all_temps)

@app.route("/api/v1.0/<start>")
def startdate(start):
    
        search=session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
            filter(Measurement.date >= start).all()
        return jsonify(search)

@app.route("/api/v1.0/<start>/<end>")
def enddate(start,end):

        search=session.query(func.min(Measurement.tobs), func.avg(Measurement.tobs), func.max(Measurement.tobs)).\
            filter(Measurement.date >= start).filter(Measurement.date <= end).all()
        return jsonify(search)
