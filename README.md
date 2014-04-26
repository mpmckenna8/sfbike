sfbikeshare
===========

Code and data relating to the Bay Area bike share. As of now I have a KML and geojson data set of the proposed bike share
stations for the launch of the program and some jam that was released to help people participate in a "Open Data Challenge". see http://bayareabikeshare.com/datachallenge

As usual I don't think I'll finish anything by the due time but hopeufully won't stop me or you from making something cool from it soon.

So all I made was a little bar chart bl.ock: http://bl.ocks.org/mpmckenna8/11305775

Also see http://bayareabikeshare.com/stations/json for a data feed.  

I hope to provide this data in other formats as well as other datasets relating to
the Bay Area Bike Share soon. I have made a request through Socrata that the MTA share some of their planning data,
but they're more into publishing meaningless maps.

See: https://data.sfgov.org/nominate for my nomination of bikeshare data.


So I imported a Bunch of the data into mongoDB because the files were a bit big to deal with in excel or similar jam.  So I ran

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

Go ride a bike in SF or help me out with this stuff cause I don't much know what I'm doing.
