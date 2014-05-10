sfbikeshare
===========

This repo contains code and data relating to the Bay Area bike share. As of now I have a KML and geojson data set of the proposed bike share stations for the launch of the program and some jam that was released to help people participate in a "Open Data Challenge". see http://bayareabikeshare.com/datachallenge and for the files that would fit on github see the babs-open-data directory. Also in ./babs-open-data are some scripts for dealing with the live stream of bike share data.  

As usual I didn't finish anything super amazing by the due time but hopeufully won't stop me or you from making something cool from it soon.

So all I made was a little bar chart bl.ock: http://bl.ocks.org/mpmckenna8/11305775 and some trying to set up a few avenues for investigating a using the data further.

See http://bayareabikeshare.com/stations/json for a data feed.  

I hope to provide this data in other formats as well as other datasets relating to
the Bay Area Bike Share soon. I have made a request through Socrata that the MTA share some of their planning data.

See: https://data.sfgov.org/nominate for my nomination of bikeshare data.


So I imported a Bunch of the data into mongoDB because the files were a bit big to deal with in excel or similar jam.  So I ran:

mongoimport --db bags --collection trips --type csv --headerline --file babs-open-data/201402_trip_data.csv

or the like to get it into a collection I could aggregate on.  I accidently called the database bags when I meant to put babs.

For some aggregating to get the basic data for the Bar Chart and the babsTripStat.js file:

db.trips.aggregate(
[{
$group:{_id:"$Start Station", numTrips:{$sum:1}}
},
{$sort:{"numTrips":1}}
]
)

Or if you want to just get it for a specific station ex:

db.trips.aggregate(
[{$match:{"Start Station":"Evelyn Park and Ride"}},
{
$group:{_id:"$Start Station", numTrips:{$sum:1}}
},
{$sort:{"numTrips":1}}
]
)

Then I did some other jam to get the dataset in the bl.ock.


A aggregation doo-dah I thought also looked interesting showed the most popular too from combos:

db.trips.aggregate(
[{
$group:{_id:{fromStat:"$Start Station", toStat:"$End Station"}, numTrips:{$sum:1}}
},
{$sort:{"numTrips":1}}
]
)

I also made a brief start looking into the data feed but just got to putting it all in a nice array using the request node module. That script is BABSd.js but I hope to build more on that....

# Scripts for BABS stream
-------------------------
Run any of these using node [filename] at your bash or whatever shell.


    BABSd.js
      Uses the node.js request module to simply print the result of a call to the bike share station json feed.

    babs2file.js
      Takes the data from the loaded page and creates file titled babsD + Date.now().json w/ the objects representing the stations all up in a nice array.

    babs2file1.js
      This does the same as babs2file.js except only returns one name for the file.

Plus I made a BABS stations geojson dataset w/ the new .csv provided (pretty much by dragging it into geojson.io).  Hopefully I can attach interesting data to those points if I ever get to the point I want to map anything.  See:

    ./babs-open-data/babsStations.geojson


Go ride a bike in SF or help me out with this stuff cause I don't much know what I'm doing.
