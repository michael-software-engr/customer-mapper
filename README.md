
# Demo

  [customer-mapper.surge.sh](https://customer-mapper.surge.sh/)

# Backend

  The backend is a Rails API app. Besides the basic functionality, it takes the customer address entered and finds the latitude and longitude of that address. This is all done by a Sidekiq background task. Please be patient when the app first loads because the backend is hosted on a free Heroku account.

# Frontend

  I used React, Redux to manage state, Semantic UI for styling and Google Maps for the maps.

A. Task Details:

1. Create Customers and Vehicles models. Relationship - 1 customer can have 0 or many vehicles: a. (customers - name, address, city, state, zip, phone, email, etc.): [backend/app/models/customer.rb](backend/app/models/customer.rb), b.(vehicles - year, make, model, trim, style, vin, etc.) [backend/app/models/vehicle.rb](backend/app/models/vehicle.rb).

2. Add interface to add customers and vehicles with basic information - When adding customers, the address has to be a valid address that can be geo-coded by [geocoding.geo.census.gov](https://geocoding.geo.census.gov/geocoder/locations/address;jsessionid=Vzu6MK0xKvNGi63TBS9FR05syJaCpNDbldXR62Hoel6g5y54GaX6!2023320970?form) or the app will fail. I haven't got time to fix this yet. Files: [backend/app/controllers/customers_controller.rb](backend/app/controllers/customers_controller.rb), [backend/app/controllers/vehicles_controller.rb](backend/app/controllers/vehicles_controller.rb).

3. Add at least 10 customers with Address around New York City and their vehicles. Files: [backend/db/seeds.rb](backend/db/seeds.rb).

4. Create map view as shown in the screen and display map markers for those customers address in the map. A simplified version of the map will work. Files: [frontend/src/components/apps/customerMapper/gMap/](frontend/src/components/apps/customerMapper/gMap/).

5. Map filter should work for city, state or zip. Files: [frontend/src/components/apps/customerMapper/search/](frontend/src/components/apps/customerMapper/search/)


B. The following skills will be accessed:

1. Code Quality - for Ruby, I use RuboCop linter. Almost all Ruby files comply with RuboCop rules. For JavaScript, I use ESLint linter. Almost all JS files comply with ESLint.

2. Design Capabilities

3. Testing - I used RSpec to write tests for the backend [backend/spec/](backend/spec/). I haven't found the time to write tests for the frontend.

4. Code Performance and Scalability - the backend should be fairly performant since I created a background job handler to handle getting the latitude and longitude info. The frontend... I'm not sure. It might croak when processing large numbers of customers. For now, I'm fetching all customers. Ideally, there should be some kind of pagination feature to limit memory consumption. Or there could be a default filter feature.
