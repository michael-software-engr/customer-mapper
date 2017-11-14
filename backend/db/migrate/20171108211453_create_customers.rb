class CreateCustomers < ActiveRecord::Migration[5.1]
  def change
    create_table :customers do |t|
      t.string :name
      t.string :address
      t.string :city
      t.string :state
      t.integer :zip
      t.integer :phone
      t.string :email

      t.timestamps
    end
    add_index :customers, :name
    add_index :customers, :city
    add_index :customers, :state
    add_index :customers, :zip
  end
end
