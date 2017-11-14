require 'httparty'

class GeoCodeWorker
  include Sidekiq::Worker
  sidekiq_options retry: false

  def perform(customer_id)
    customer = Customer.find customer_id

    puts_if "Updating customer '#{customer.email}..."

    if !Rails.env.test?
      delay = 2
      sleep delay
      puts "Sleeping for '#{delay}'..."
    end

    # https://geocoding.geo.census.gov/geocoder/locations/onelineaddress?address=4600+Silver+Hill+Rd%2C+Suitland%2C+MD+20746&benchmark=9&format=json
    uri = URI::HTTPS.build(
      host: 'geocoding.geo.census.gov',
      path: '/geocoder/locations/address',
      query: URI.encode_www_form(
        street: customer.address,
        city: customer.city,
        state: customer.state,
        zip: customer.zip,

        # ...
        benchmark: 'Public_AR_Current',
        format: 'json'
      )
    )

    puts_if "Getting location: '#{uri}'..."

    response = HTTParty.get uri
    raise "Response != 200 for '#{uri}'" if response.code != 200

    parsed_response = response.parsed_response
    if !parsed_response || parsed_response.keys.empty?
      raise "Empty parsed_response for '#{uri}'... \n#{response}"
    end

    matches = parsed_response.fetch('result').fetch('addressMatches')

    raise "Address matches count != 1 for '#{uri}'" if matches.count != 1

    coordinates = matches.first.fetch 'coordinates'

    customer.update!(
      latitude: coordinates.fetch('y'),
      longitude: coordinates.fetch('x'),
      job_id: jid
    )

    puts_if "OK\n\n"
  end

  private

  def puts_if(str)
    puts str if !Rails.env.test?
  end
end
