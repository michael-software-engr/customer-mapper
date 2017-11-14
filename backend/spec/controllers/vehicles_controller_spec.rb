require 'rails_helper'

RSpec.describe VehiclesController, type: :controller do # rubocop:disable Metrics/BlockLength, Metrics/LineLength
  let(:customer) { FactoryBot.create :customer }
  let(:valid_attributes) do
    { year: 2010, make: 'Make', model: 'Model', customer_id: customer.id }
  end

  let(:invalid_attributes) { { year: 2011 } }

  let(:valid_session) { {} }

  describe 'GET #index' do
    it 'returns a success response' do
      FactoryBot.create :vehicle, valid_attributes
      get :index, params: {}, session: valid_session
      expect(response).to be_success
    end
  end

  describe 'GET #show' do
    it 'returns a success response' do
      vehicle = FactoryBot.create :vehicle, valid_attributes
      get :show, params: { id: vehicle.to_param }, session: valid_session
      expect(response).to be_success
    end
  end

  describe 'POST #create' do
    context 'with valid params' do
      it 'creates a new Vehicle' do
        expect do
          post :create, params: { vehicle: valid_attributes },
                        session: valid_session
        end.to change(Vehicle, :count).by(1)
      end

      it 'renders a JSON response with the new vehicle' do
        post :create, params: { vehicle: valid_attributes },
                      session: valid_session
        expect(response).to have_http_status(:created)
        expect(response.content_type).to eq('application/json')
        expect(response.location).to eq(vehicle_url(Vehicle.last))
      end
    end

    context 'with invalid params' do
      it 'renders a JSON response with errors for the new vehicle' do
        post :create, params: { vehicle: invalid_attributes },
                      session: valid_session
        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to eq('application/json')
      end
    end
  end

  describe 'PUT #update' do
    context 'with valid params' do
      let(:new_attributes) { { year: 2012 } }

      it 'updates the requested vehicle' do
        vehicle = FactoryBot.create :vehicle, valid_attributes
        put :update, params: { id: vehicle.to_param, vehicle: new_attributes },
                     session: valid_session
        vehicle.reload

        expect(vehicle.year).to eq new_attributes.fetch :year
      end

      it 'renders a JSON response with the vehicle' do
        vehicle = FactoryBot.create :vehicle, valid_attributes

        put :update,
            params: { id: vehicle.to_param, vehicle: valid_attributes },
            session: valid_session
        expect(response).to have_http_status(:ok)
        expect(response.content_type).to eq('application/json')
      end
    end

    # Not applicable
    # context 'with invalid params' do
    #   it 'renders a JSON response with errors for the vehicle' do
    #     vehicle = FactoryBot.create :vehicle, valid_attributes

    #     put :update,
    #         params: { id: vehicle.to_param, vehicle: invalid_attributes },
    #         session: valid_session
    #     expect(response).to have_http_status(:unprocessable_entity)
    #     expect(response.content_type).to eq('application/json')
    #   end
    # end
  end

  describe 'DELETE #destroy' do
    it 'destroys the requested vehicle' do
      vehicle = FactoryBot.create :vehicle, valid_attributes
      expect do
        delete :destroy, params: { id: vehicle.to_param },
                         session: valid_session
      end.to change(Vehicle, :count).by(-1)
    end
  end
end
