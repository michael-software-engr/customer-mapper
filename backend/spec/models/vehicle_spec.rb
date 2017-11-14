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

require 'rails_helper'

RSpec.describe Vehicle, type: :model do # rubocop:disable Metrics/BlockLength
  let(:factory_name) { described_class.to_s.underscore.to_sym }
  describe 'factory' do
    subject { FactoryBot.build(factory_name) }
    it { should be_valid }
  end

  describe 'validations' do
    %i[year make model].each do |param|
      context "without '#{param}' param" do
        subject { FactoryBot.build(factory_name, param => nil) }
        it { should_not be_valid }
      end
    end
  end

  describe 'attributes' do
    param_for = {
      year: 1234,
      make: 'Vehicle Make',
      model: 'Vehicle Model',
      trim: 'Vehicle Trim',
      style: 'Vehicle Style',
      vin: 'VIN1234'
    }.freeze

    attributes = param_for.keys.map(&:to_s).freeze

    let(:customer) { FactoryBot.build factory_name, param_for }

    attributes.each do |attrib|
      describe attrib do
        subject { customer.public_send attrib }
        it { should eq param_for[attrib.to_sym] }
      end
    end
  end

  describe 'associations' do
    it { should belong_to :customer }
  end
end
