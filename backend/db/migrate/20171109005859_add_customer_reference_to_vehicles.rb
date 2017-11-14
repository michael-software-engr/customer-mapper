class AddCustomerReferenceToVehicles < ActiveRecord::Migration[5.1]
  def change
    add_reference :vehicles, :customer, foreign_key: true
  end
end
