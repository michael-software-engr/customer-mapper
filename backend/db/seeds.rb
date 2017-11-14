
require 'httparty'
require 'faker'

Faker::Config.locale = 'en-US'

Vehicle.delete_all
Customer.delete_all

vehicles = [
  {
    year: 2010,
    make: 'Ford',
    model: 'Taurus',
    trim: 'Trim0',
    style: 'Style0'
  },

  {
    year: 2018,
    make: 'Toyota',
    model: 'Prius',
    trim: 'Trim0',
    style: 'Style1'
  },

  {
    year: 2014,
    make: 'Lexus',
    model: 'ES',
    trim: 'Trim1',
    style: 'Style1'
  }
]

# rubocop:disable Style/NumericLiterals
[
  {
    email: 'customer0@example.org',
    address: '122 5th Ave.',
    city: 'New York',
    state: 'NY',
    zip: 10011,
    vehicles: vehicles
  },

  {
    email: 'customer1@example.org',
    address: '1166 Avenue of the Americas 40th Floor',
    city: 'New York',
    state: 'NY',
    zip: 10036,
    vehicles: [vehicles.first]
  },

  {
    email: 'customer2@example.org',
    address: '262 E 2nd St. #6C',
    city: 'New York',
    state: 'NY',
    zip: 10009,
    vehicles: [vehicles.first]
  },

  {
    email: 'customer3@example.org',
    address: '199 Water St. #20th Floor',
    city: 'New York',
    state: 'NY',
    zip: 10038,
    vehicles: [vehicles.last]
  },

  {
    email: 'customer4@example.org',
    address: '333 E 43rd St.',
    city: 'New York',
    state: 'NY',
    zip: 10017,
    vehicles: [vehicles.last]
  },

  {
    email: 'customer5@example.org',
    address: '310 Riverside Dr.',
    city: 'New York',
    state: 'NY',
    zip: 10025,
    vehicles: [vehicles.last]
  },

  {
    email: 'customer6@example.org',
    address: '222 W 10th St. #1B',
    city: 'New York',
    state: 'NY',
    zip: 10014,
    vehicles: [vehicles[1]]
  },

  {
    email: 'customer7@example.org',
    address: '212 W 35th St.',
    city: 'New York',
    state: 'NY',
    zip: 10001,
    vehicles: [vehicles[1]]
  },

  {
    email: 'customer8@example.org',
    address: '1633 Broadway',
    city: 'New York',
    state: 'NY',
    zip: 10019,
    vehicles: [vehicles[1]]
  },

  {
    email: 'customer9@example.org',
    address: '245 E 40th St.',
    city: 'New York',
    state: 'NY',
    zip: 10016,
    vehicles: [vehicles[1]]
  },

  {
    email: 'customerA@example.org',
    address: '751 Broad St.',
    city: 'Newark',
    state: 'NJ',
    zip: 7102, # 07102
    vehicles: vehicles
  },

  {
    email: 'customerB@example.org',
    address: '380 Mahogany Court',
    city: 'Newark',
    state: 'NJ',
    zip:  7104, # 07104,
    vehicles: vehicles
  }
].each do |customer_data|
  print "Creating user '#{customer_data.fetch(:email)}'... "

  phone = [
    '(212)',
    ' ',
    Faker::PhoneNumber.exchange_code,
    '-',
    Faker::PhoneNumber.subscriber_number
  ].join

  customer = Customer.find_or_create_by!(
    customer_data.reject { |key, _val| key == :vehicles }
  ) do |cinst|
    cinst.name = Faker::Name.name
    cinst.phone = phone
  end

  job_id = GeoCodeWorker.perform_async customer.id
  print "job id '#{job_id}'... "

  customer_data.fetch(:vehicles).each do |vdata|
    Vehicle.find_or_create_by! vdata.merge(
      customer_id: customer.id,
      vin: SecureRandom.uuid[0..16]
    )
  end

  puts "OK\n\n"
end
