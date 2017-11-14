
require 'sidekiq/testing'

require 'shared_contexts/http_client'

Sidekiq::Testing.fake!

RSpec.describe GeoCodeWorker do # rubocop:disable Metrics/BlockLength
  include_context :http_client

  before { Sidekiq::Worker.clear_all }

  let(:customer) { FactoryBot.create :customer }

  it 'should push jobs to queue' do
    expect do
      described_class.perform_async(customer.id)
    end.to change(described_class.jobs, :size).by(1)
  end

  context 'invalid response' do # rubocop:disable Metrics/BlockLength
    before { described_class.perform_async(customer.id) }
    context 'response.code != 200' do
      specify do
        error_regexp = Regexp.new(Regexp.escape('Response != 200'))

        expect do
          fake_response.code = 404
          allow(http_client).to receive(:get).and_return(fake_response)

          described_class.drain
        end.to raise_error RuntimeError, error_regexp
      end
    end

    context 'response.parsed_response is nil' do
      specify do
        error_regexp = Regexp.new(Regexp.escape('Empty parsed_response'))

        expect do
          fake_response.parsed_response = nil
          allow(http_client).to receive(:get).and_return(fake_response)

          described_class.drain
        end.to raise_error RuntimeError, error_regexp
      end
    end

    context 'response.parsed_response is empty hash' do
      specify do
        error_regexp = Regexp.new(Regexp.escape('Empty parsed_response'))

        expect do
          fake_response.parsed_response = {}
          allow(http_client).to receive(:get).and_return(fake_response)

          described_class.drain
        end.to raise_error RuntimeError, error_regexp
      end
    end

    context 'result key is not found in response.parsed_response' do
      specify do
        error_regexp = Regexp.new(Regexp.escape('key not found'))

        expect do
          fake_response.parsed_response = { 'fakeKey' => 'fakeValue' }
          allow(http_client).to receive(:get).and_return(fake_response)

          described_class.drain
        end.to raise_error KeyError, error_regexp
      end
    end

    context 'addressMatches key is not found in response.parsed_response' do
      specify do
        error_regexp = Regexp.new(Regexp.escape('key not found'))

        expect do
          fake_response.parsed_response = {
            'result' => { 'fakeKey' => 'fakeValue' }
          }
          allow(http_client).to receive(:get).and_return(fake_response)

          described_class.drain
        end.to raise_error KeyError, error_regexp
      end
    end

    context 'address matches != 1' do
      specify do
        error_regexp = Regexp.new(Regexp.escape('Address matches count != 1'))

        expect do
          fake_response.parsed_response = {
            'result' => { 'addressMatches' => [] }
          }
          allow(http_client).to receive(:get).and_return(fake_response)

          described_class.drain
        end.to raise_error RuntimeError, error_regexp
      end
    end

    context 'coordinates key not found in address match' do
      specify do
        error_regexp = Regexp.new(Regexp.escape('key not found'))

        expect do
          fake_response.parsed_response = {
            'result' => { 'addressMatches' => [{ 'fakeKey' => 'fakeValue' }] }
          }
          allow(http_client).to receive(:get).and_return(fake_response)

          described_class.drain
        end.to raise_error KeyError, error_regexp
      end
    end

    context 'y key not found in coordinates' do
      specify do
        error_regexp = Regexp.new(Regexp.escape('key not found'))

        expect do
          fake_response.parsed_response = {
            'result' => {
              'addressMatches' => [{
                'coordinates' => {
                  'fakeKey' => 'fakeValue', 'x' => longitude
                }
              }]
            }
          }
          allow(http_client).to receive(:get).and_return(fake_response)

          described_class.drain
        end.to raise_error KeyError, error_regexp
      end
    end

    context 'x key not found in coordinates' do
      specify do
        error_regexp = Regexp.new(Regexp.escape('key not found'))

        expect do
          fake_response.parsed_response = {
            'result' => {
              'addressMatches' => [{
                'coordinates' => {
                  'fakeKey' => 'fakeValue', 'y' => latitude
                }
              }]
            }
          }
          allow(http_client).to receive(:get).and_return(fake_response)

          described_class.drain
        end.to raise_error KeyError, error_regexp
      end
    end
  end

  context 'valid response' do
    context 'before job execution' do
      describe 'customer latitude' do
        subject { customer.latitude }
        it { should be_falsy }
      end

      describe 'customer longitude' do
        subject { customer.longitude }
        it { should be_falsy }
      end
    end

    context 'after job execution' do
      before do
        described_class.perform_async customer.id
        allow(http_client).to receive(:get).and_return(valid_response)
        described_class.drain
        customer.reload
      end

      describe 'customer latitude' do
        specify { expect(customer.latitude).to eq latitude }
      end

      describe 'customer longitude' do
        specify { expect(customer.longitude).to eq longitude }
      end
    end
  end
end
