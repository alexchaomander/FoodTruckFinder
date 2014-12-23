data = read.csv("Mobile_Food_Facility_Permit.csv", header=T)
require('sqldf')
approvedFoodTrucks = sqldf("select * from data where Status like '%Approved%'")
write.csv(approvedFoodTrucks, "ApprovedFoodTrucks.csv")
