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

class CustomerSerializer < ActiveModel::Serializer
  attributes :id, :name, :address, :city, :state, :zip, :phone, :email,
             :latitude, :longitude

  has_many :vehicles
end
