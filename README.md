# homeautomation
Interface for home automation
To run the project

1. npm install
2. node server.js
3. http://localhost:5000/ for the interface


//Assumption and points to note
1. Datetimepicker directive currently allows to choose time at the interval of 5 mins, can be changed to choose specific time
2. Each of the component is already created and stored in the DB(light, temperature, curtain, garage) and currently manipulating states only for 1 system, can add more.
3. Using already existing datetimepicker directive and temperature gauge 
4. Written few tests but can add more for every component to do specific assertions by mocking data.
5. Client will poll server every 1 sec to reflect the latest status
6. Server will poll at an interval of 1 min to change the status based on time
