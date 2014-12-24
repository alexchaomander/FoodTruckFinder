# Data processing and food category generation

data = read.csv("Mobile_Food_Facility_Permit.csv", header=T)
require('sqldf')
# Only use food trucks that have status of 'approved'
approvedFoodTrucks = sqldf("select * from data where Status like '%Approved%'")

foodItems = approvedFoodTrucks$FoodItems
foodItems = paste(foodItems, sep="")

approvedFoodTrucks$Burgers = rep(FALSE, nrow(approvedFoodTrucks))
approvedFoodTrucks$Sandwiches = rep(FALSE, nrow(approvedFoodTrucks))
approvedFoodTrucks$Tacos = rep(FALSE, nrow(approvedFoodTrucks))
approvedFoodTrucks$HotDogs = rep(FALSE, nrow(approvedFoodTrucks))
approvedFoodTrucks$Pizza = rep(FALSE, nrow(approvedFoodTrucks))
approvedFoodTrucks$Drinks = rep(FALSE, nrow(approvedFoodTrucks))
approvedFoodTrucks$Fruit = rep(FALSE, nrow(approvedFoodTrucks))
approvedFoodTrucks$Candy = rep(FALSE, nrow(approvedFoodTrucks))
approvedFoodTrucks$IceCream = rep(FALSE, nrow(approvedFoodTrucks))
approvedFoodTrucks$Cupcakes = rep(FALSE, nrow(approvedFoodTrucks))

b = lapply(foodItems, function(x) {strsplit(x, split = ':')})
c = lapply(b, function(x) {unlist(x)})

for (i in 1:556) {
  approvedFoodTrucks$Burgers[i] = grepl("Burger|burger", c[i])
  approvedFoodTrucks$Sandwiches[i] = grepl("Sandwich|sandwich", c[i])
  approvedFoodTrucks$Tacos[i] = grepl("Taco|taco", c[i])
  approvedFoodTrucks$HotDogs[i] = grepl("Hot Dog|Dog|dog", c[i])
  approvedFoodTrucks$Pizza[i] = grepl("Pizza", c[i])
  approvedFoodTrucks$Candy[i] = grepl("Candy|candy|Candies|candies", c[i])
  approvedFoodTrucks$Fruit[i] = grepl("fruit|Fruit", c[i])
  approvedFoodTrucks$Drinks[i] = grepl("Drink|everage", c[i])
  approvedFoodTrucks$IceCream[i] = grepl("Ice Cream|cream|Cream", c[i])
  approvedFoodTrucks$Cupcakes[i] = grepl("Cupcake|cupcake", c[i]) 
}

write.csv(approvedFoodTrucks, "ApprovedFoodTrucks.csv")
