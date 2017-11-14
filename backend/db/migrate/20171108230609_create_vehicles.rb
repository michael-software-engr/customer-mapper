class CreateVehicles < ActiveRecord::Migration[5.1]
  def change
    create_table :vehicles do |t|
      t.integer :year
      t.string :make
      t.string :model
      t.string :trim
      t.string :style
      t.string :vin

      t.timestamps
    end
    add_index :vehicles, :year
    add_index :vehicles, :make
    add_index :vehicles, :model
    add_index :vehicles, :trim
    add_index :vehicles, :style
  end
end
