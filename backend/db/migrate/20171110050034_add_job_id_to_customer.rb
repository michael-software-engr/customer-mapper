class AddJobIdToCustomer < ActiveRecord::Migration[5.1]
  def change
    add_column :customers, :job_id, :string
    add_index :customers, :job_id
  end
end
