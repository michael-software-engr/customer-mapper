# == Schema Information
#
# Table name: vehicles
#
#  id          :integer          not null, primary key
#  year        :integer
#  make        :string
#  model       :string
#  trim        :string
#  style       :string
#  vin         :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  customer_id :integer
#

FactoryBot.define do
  factory :vehicle do
    year 1
    make 'MyString'
    model 'MyString'
    trim 'MyString'
    style 'MyString'
    vin 'MyString'

    association :customer
  end
end
