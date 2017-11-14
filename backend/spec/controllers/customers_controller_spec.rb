require 'sidekiq/testing'

require 'shared_contexts/http_client'

Sidekiq::Testing.fake!

RSpec.describe CustomersController, type: :controller do # rubocop:disable Metrics/BlockLength, Style/LineLength
  let(:valid_attributes) do
    {
      name: 'Name',
      email: 'email@example.org',
      address: '123 Main St.', city: 'City', state: 'ST', zip: 12_345
    }
  end

  let(:invalid_attributes) { { name: 'Name' } }

  let(:valid_session) { {} }

  describe 'GET #index' do
    it 'returns a success response' do
      FactoryBot.create :customer, valid_attributes
      get :index, params: {}, session: valid_session
      expect(response).to be_success
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      customer = FactoryBot.create :customer, valid_attributes
      get :show, params: { id: customer.to_param }, session: valid_session
      expect(response).to be_success
    end
  end

  describe 'POST #create' do # rubocop:disable Metrics/BlockLength
    context 'with valid params' do
      include_context :http_client

      before { Sidekiq::Worker.clear_all }

      it 'creates a new Customer' do
        expect do
          allow(http_client).to receive(:get).and_return(valid_response)

          post :create, params: { customer: valid_attributes },
                        session: valid_session
        end.to change(Customer, :count).by(1)
      end

      it 'renders a JSON response with the new customer' do
        allow(http_client).to receive(:get).and_return(valid_response)
        post :create, params: { customer: valid_attributes },
                      session: valid_session
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json')

        GeoCodeWorker.drain
        expect(response.body).to eq(
          { job_id: Customer.first.reload.job_id }.to_json
        )

        expect(response.location).to eq(customer_url(Customer.last))
      end
    end

    context 'with invalid params' do
      it 'renders a JSON response with errors for the new customer' do
        post :create, params: { customer: invalid_attributes },
                      session: valid_session
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json')
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { { name: 'New Name' } }

      it 'updates the requested customer' do
        customer = FactoryBot.create :customer, valid_attributes
        put :update,
            params: { id: customer.to_param, customer: new_attributes },
            session: valid_session
        customer.reload

        expect(customer.name).to eq new_attributes.fetch :name
      end

      it 'renders a JSON response with the customer' do
        customer = FactoryBot.create :customer, valid_attributes

        put :update,
            params: { id: customer.to_param, customer: valid_attributes },
            session: valid_session
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('application/json')
      end
    end

    # Not applicable
    # context 'with invalid params' do
    #   it 'renders a JSON response with errors for the customer' do
    #     customer = FactoryBot.create :customer, valid_attributes

    #     put :update,
    #         params: { id: customer.to_param, customer: invalid_attributes },
    #         session: valid_session
    #     expect(response).to have_http_status(:unprocessable_entity)
    #     expect(response.content_type).to eq('application/json')
    #   end
    # end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested customer' do
      customer = FactoryBot.create :customer, valid_attributes
      expect do
        delete :destroy, params: { id: customer.to_param },
                         session: valid_session
      end.to change(Customer, :count).by(-1)
    end
  end
end
