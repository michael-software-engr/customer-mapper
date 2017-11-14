# == Schema Information
#
# Table name: customers
#
#  id         :integer          not null, primary key
#  name       :string
#  address    :string
#  city       :string
#  state      :string
#  zip        :integer
#  phone      :integer
#  email      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  latitude   :decimal(11, 8)
#  longitude  :decimal(11, 8)
#  job_id     :string
#

FactoryBot.define do
  factory :customer do
    name 'MyString'
    address 'MyString'
    city 'MyString'
    state 'MyString'
    zip 1
    phone 1
    email 'MyString'

    transient do
      vehicles_count 0
    end

    after(:create) do |customer, evaluator|
      if evaluator.vehicles_count.positive?
        create_list(:vehicle, evaluator.vehicles_count, customer: customer)
      end
    end
  end
end
