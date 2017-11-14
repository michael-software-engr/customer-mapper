class ChangeLatLongToDecimalInCustomers < ActiveRecord::Migration[5.1]
  def change
    change_column :customers, :latitude, :decimal, precision: 11, scale: 8
    change_column :customers, :longitude, :decimal, precision: 11, scale: 8
  end
end
