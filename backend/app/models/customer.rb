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

class Customer < ApplicationRecord
  has_many :vehicles
  validates_presence_of %i[name address city state zip email]
end
