
namespace :misc do
  desc 'Delete all records'
  task DELETE: :environment do
    Customer.delete_all
    Vehicle.delete_all
  end
end

namespace :sidekiq do
  desc 'Start Sidekiq'
  task start: :environment do
    exec 'sidekiq -c 5 -v'
  end

  desc 'Delete all pending Sidekiq jobs'
  task clear: :environment do
    print 'Deleting all pending Sidekiq jobs... '
    Sidekiq.redis(&:flushdb)
    puts 'OK'
  end

  desc 'Delete all pending Sidekiq jobs and start Sidekiq'
  task reset: %i[clear start]
end
