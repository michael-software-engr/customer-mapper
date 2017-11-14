require 'httparty'

RSpec.shared_context :http_client do
  let(:http_client) { HTTParty }
  let(:fake_response) { Struct.new(:code, :parsed_response).new(200, {}) }

  let(:longitude) { -0.73982544e2 }
  let(:latitude) { 0.40756992e2 }

  let(:valid_response) do
    fake_response.parsed_response = {
      'result' => {
        'addressMatches' => [{
          'coordinates' => {
            'x' => longitude, 'y' => latitude
          }
        }]
      }
    }

    fake_response
  end
end
