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

require 'rails_helper'

RSpec.describe Customer, type: :model do # rubocop:disable Metrics/BlockLength
  let(:factory_name) { described_class.to_s.underscore.to_sym }
  describe 'factory' do
    subject { FactoryBot.build(factory_name) }
    it { should be_valid }
  end

  describe 'validations' do
    %i[name address city state zip email].each do |param|
      context "without '#{param}' param" do
        subject { FactoryBot.build(factory_name, param => nil) }
        it { should_not be_valid }
      end
    end
  end

  describe 'attributes' do
    param_for = {
      name: 'First Last',
      address: '123 Main St.',
      city: 'New York',
      state: 'New York',
      zip: 12_345,
      phone: 1_234_567_890.to_s,
      email: 'email@example.org'
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
    it { should have_many :vehicles }

    describe 'vehicles' do
      let(:count) { 3 }
      let(:customer) { FactoryBot.create factory_name, vehicles_count: count }

      describe 'count' do
        subject { customer.vehicles.count }
        it { should eq count }
      end
    end
  end
end
