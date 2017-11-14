class CustomersController < ApplicationController
  before_action :set_customer, only: %i[show update destroy]

  def search_by_job_id
    job_id = params.permit(:job_id, :customer)[:job_id]

    @customers = Customer.includes(:vehicles)
                         .where(job_id: job_id)

    if @customers.count.zero?
      render json: nil
      return
    end

    if @customers.count != 1
      Rails.logger.error @customers
      raise 'Customer query result should == 1'
    end

    render json: { customer: @customers.first }
  end

  # GET /customers
  def index
    @customers = Customer.all

    render json: @customers
  end

  # GET /customers/1
  def show
    render json: @customer
  end

  # POST /customers
  def create
    @customer = Customer.new(customer_params)

    if @customer.save
      job_id = GeoCodeWorker.perform_async @customer.id
      render json: { job_id: job_id }, status: :created, location: @customer
      # render json: @customer, status: :created, location: @customer
    else
      render json: @customer.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /customers/1
  def update
    if @customer.update(customer_params)
      render json: @customer
    else
      render json: @customer.errors, status: :unprocessable_entity
    end
  end

  # DELETE /customers/1
  def destroy
    @customer.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_customer
    @customer = Customer.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def customer_params
    params.require(:customer).permit(
      :name, :address, :city, :state, :zip, :phone, :email
    )
  end
end
