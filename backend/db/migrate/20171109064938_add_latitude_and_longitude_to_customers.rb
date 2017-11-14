class AddLatitudeAndLongitudeToCustomers < ActiveRecord::Migration[5.1]
  def change
    add_column :customers, :latitude, :bigint
    add_column :customers, :longitude, :bigint
  end
end
