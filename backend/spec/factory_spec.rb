
require 'rails_helper'

describe 'Validation of factories' do
  FactoryBot.factories.map(&:name).each do |factory_name|
    describe "'#{factory_name}' factory" do
      subject { FactoryBot.build(factory_name) }
      it { should be_valid }
    end
  end
end
