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

class VehicleSerializer < ActiveModel::Serializer
  attributes :id, :year, :make, :model, :trim, :style, :vin, :customer_id
end
